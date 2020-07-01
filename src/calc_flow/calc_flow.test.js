import {toBeDeepCloseTo} from 'jest-matcher-deep-close-to';
expect.extend({toBeDeepCloseTo});

/* eslint-disable  no-restricted-globals */
import { zeros } from 'mathjs';

import * as Data1 from './test_data1';
import * as FlowCalc from './calc_flow';


function convertMatrixToSparse(a) {

	const sparse = new Array();
	const n = new Array();
	const m = new Array();

	for(let i = 0; i < a.size()[0]; i++) {
		for(let j = 0; j < a.size()[0]; j++) {
			if(a.get([i,j]) != 0) {
				sparse.push(a.get([i,j]));
				n.push(i);
				m.push(j);
			}
		}
	}

	return [sparse, n, m];
}

function LoadSparseToMatrix(data, n, m, requestedSize) {
	if(data.length !== n.length || n.length !== m.length) {
		throw "Lengths are Different";
	}
	const output = zeros(requestedSize, requestedSize, 'sparse');
	
	for(let elementNumber = 0; elementNumber < n.length; elementNumber++) {
		output.set([n[elementNumber], m[elementNumber]], data[elementNumber]);
	}

	return output;
}



describe("Testing Flow Vector Calculations", () => {
	describe("Test mesh generation output", () => {
		let x,z,ni,nj,nk,nnode,nelem;
		beforeAll(() => {
			[x, z, ni, nj, nk, nnode, nelem] = FlowCalc.generateMesh(60, Data1.getH(), Data1.getZ());
		})
		it("nnode", () => {
			expect(nnode).toBe(Data1.getOutputNNODE());
		});
		it("nelem", () => {
			expect(nelem).toBe(Data1.getOutputNELEM());
		});

		it("x", () => {
			expect(x.length).toBe(Data1.getOutputX().length);
			expect(x).toStrictEqual(Data1.getOutputX());
		});

		it("z", () => {
			expect(z.length).toBe(Data1.getOutputZ().length);
			expect(z).toBeDeepCloseTo(Data1.getOutputZ(), 5);
		});

		it("ni", () => {
			expect(ni.length).toBe(Data1.getOutputNI().length);
			//Adjusted data for starting at 0 in the Data1 set
			expect(ni).toStrictEqual(Data1.getOutputNI());
		});

		it("nj", () => {
			expect(nj.length).toBe(Data1.getOutputNJ().length);
			//Adjusted data for starting at 0 in the Data1 set
			expect(nj).toStrictEqual(Data1.getOutputNJ());
		});

		it("nk", () => {
			expect(nk.length).toBe(Data1.getOutputNK().length);
			//Adjusted data for starting at 0 in the Data1 set
			expect(nk).toStrictEqual(Data1.getOutputNK());
		});

	});

	describe("test areaSharp output", () => {
		let ba, ca, area;
		
		beforeAll( () => {
			[ba, ca, area] = FlowCalc.areasSharp(Data1.getOutputX(), Data1.getOutputZ(), Data1.getOutputNI(), Data1.getOutputNJ(), Data1.getOutputNK(), Data1.getOutputNELEM());
		});

		it.each([0,1,2])("ba[%p]", (i) => {
			expect(ba[i].length).toBe(Data1.getOutputBA()[i].length);
			expect(ba[i]).toBeDeepCloseTo(Data1.getOutputBA()[i], 5);
		});

		it.each([0,1,2])("ca[%p]", (i) => {
			expect(ca[i].length).toBe(Data1.getOutputCA()[i].length);
			expect(ca[i]).toStrictEqual(Data1.getOutputCA()[i], 5);
		});

		it("area", () => {
			expect(area.length).toBe(Data1.getOutputArea().length);
			expect(area).toBeDeepCloseTo(Data1.getOutputArea(), 5);
		});	
	});

	describe("test matrixSharp output", () => {
		let a_sparse, a_n, a_m ;

		beforeAll(() => {
			const [a] = FlowCalc.matrixSharp(Data1.getOutputBA(), Data1.getOutputCA(), Data1.getOutputNI(), Data1.getOutputNJ(), Data1.getOutputNK(), Data1.getOutputArea(), Data1.getOutputNNODE(), Data1.getOutputNELEM());
			// Build sparse matrix from a, then compare those results with single calls.
			// This is to optimize the tests. Otherwise they will take forever. Literally.
			[ a_sparse, a_n, a_m ] = convertMatrixToSparse(a);
		});

		it("a_n", () => {
			expect(a_n.length).toBe(Data1.getOutputA_n_MatrixSharp().length);
			expect(a_n).toStrictEqual(Data1.getOutputA_n_MatrixSharp());
		});

		it("a_m", () => {
			expect(a_m.length).toBe(Data1.getOutputA_m_MatrixSharp().length);
			expect(a_m).toStrictEqual(Data1.getOutputA_m_MatrixSharp());
		});
		
		it("a_sparse", () => {
			expect(a_sparse.length).toBe(Data1.getOutputA_MatrixSharp().length);
			expect(a_sparse).toBeDeepCloseTo(Data1.getOutputA_MatrixSharp(), 5);
		});
	});

	describe("test apply_bc_sharp output", () => {
		let a_sparse;
		let a_n;
		let a_m;
		let b;

		beforeAll(() => {
			const aa = LoadSparseToMatrix(Data1.getOutputA_MatrixSharp(), Data1.getOutputA_n_MatrixSharp(), Data1.getOutputA_m_MatrixSharp(), Data1.getOutputNNODE());
			const [a, b_output] = FlowCalc.applyBCSharp(aa, Data1.getH(), Data1.getOutputNNODE());
			// Build sparse matrix from a, then compare those results with single calls.
			// This is to optimize the tests. Otherwise they will take forever. Literally.
			b = b_output;
			[ a_sparse, a_n, a_m ] = convertMatrixToSparse(a);
		});

		it("a_n", () => {
			expect(a_n.length).toBe(Data1.getOutputA_n_ApplyBCSharp().length);
			expect(a_n).toStrictEqual(Data1.getOutputA_n_ApplyBCSharp());
		});

		it("a_m", () => {
			expect(a_m.length).toBe(Data1.getOutputA_m_ApplyBCSharp().length);
			expect(a_m).toStrictEqual(Data1.getOutputA_m_ApplyBCSharp());
		});
		
		it("a_sparse", () => {
			expect(a_sparse.length).toBe(Data1.getOutputA_ApplyBCSharp().length);
			expect(a_sparse).toBeDeepCloseTo(Data1.getOutputA_ApplyBCSharp(), 5);
		});

		it("b", () => {
			expect(b.length).toBe(Data1.getOutputB_ApplyBCSharp().length)
			expect(b).toBeDeepCloseTo(Data1.getOutputB_ApplyBCSharp(), 5);
		});
	});

	describe("test hfem output", () => {
		let hfem;
		beforeAll(() => {
			const a = LoadSparseToMatrix(Data1.getOutputA_ApplyBCSharp(), Data1.getOutputA_n_ApplyBCSharp(), Data1.getOutputA_m_ApplyBCSharp(), Data1.getOutputNNODE());
			const b = Data1.getOutputB_ApplyBCSharp();
			hfem = FlowCalc.hfemCalc(a, b);
		});
		
		it("hfem", () => {
			expect(hfem).toBeDeepCloseTo(Data1.getOutputHFEM(), 5);
		});
	});

	describe("test fluxSharp output", () => {
		let elements;

		beforeAll(() => {
			const x = Data1.getOutputX();
			const z = Data1.getOutputZ();
			const ni = Data1.getOutputNI();
			const nj = Data1.getOutputNJ();
			const nk = Data1.getOutputNK();
			const ba = Data1.getOutputBA();
			const ca = Data1.getOutputCA();
			const area = Data1.getOutputArea();
			const hfem = Data1.getOutputHFEM();
			const nelem = Data1.getOutputNELEM();
	
			[elements] = FlowCalc.fluxSharp(x, z, ni, nj, nk, ba, ca, area, hfem, nelem);
		});
	
		it("xc", () => {
			expect(elements.map(x => x.point.x)).toBeDeepCloseTo(Data1.getOutputXC(), 5);
		});
		it("zc", () => {
			expect(elements.map(x => x.point.y)).toBeDeepCloseTo(Data1.getOutputZC(), 5);
		});
		it("qx", () => {
			expect(elements.map(x => x.qx)).toBeDeepCloseTo(Data1.getOutputQX(), 5);
		});
		it("qz", () => {
			expect(elements.map(x => x.qz)).toBeDeepCloseTo(Data1.getOutputQZ(), 5);
		});
	});

	describe("test main method output", () => {
		let hfem, elements;
		beforeAll(() => {
			[hfem, elements] = FlowCalc.main(60, Data1.getH(), Data1.getZ());
		});

		it("hfem", () => {
			expect(hfem).toBeDeepCloseTo(Data1.getOutputHFEM(), 5);
		});
		it("xc", () => {
			expect(elements.map(x => x.point.x)).toBeDeepCloseTo(Data1.getOutputXC(), 5);
		});
		it("zc", () => {
			expect(elements.map(x => x.point.y)).toBeDeepCloseTo(Data1.getOutputZC(), 5);
		});
		it("qx", () => {
			expect(elements.map(x => x.qx)).toBeDeepCloseTo(Data1.getOutputQX(), 5);
		});
		it("qz", () => {
			expect(elements.map(x => x.qz)).toBeDeepCloseTo(Data1.getOutputQZ(), 5);
		});
	});

	it.each([1,2,3,4,5,6,7,8,9])("profile the code [%p]", () => {
		FlowCalc.main(60, Data1.getH(), Data1.getZ());
	})
});