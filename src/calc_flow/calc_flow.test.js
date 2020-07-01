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
	it("Test Mesh Generation", () => {
		const [x, z, ni, nj, nk, nnode, nelem] = FlowCalc.generateMesh(60, Data1.getH(), Data1.getZ());
		expect(nnode).toBe(Data1.getOutputNNODE());
		expect(nelem).toBe(Data1.getOutputNELEM());

		expect(x.length).toBe(Data1.getOutputX().length);
		expect(x).toStrictEqual(Data1.getOutputX());

		expect(z.length).toBe(Data1.getOutputZ().length);
		expect(z).toBeDeepCloseTo(Data1.getOutputZ(), 5);

		expect(ni.length).toBe(Data1.getOutputNI().length);
		//Adjust data for starting at 0
		expect(ni).toStrictEqual(Data1.getOutputNI());

		expect(nj.length).toBe(Data1.getOutputNJ().length);
		//Adjust data for starting at 0
		expect(nj).toStrictEqual(Data1.getOutputNJ());

		expect(nk.length).toBe(Data1.getOutputNK().length);
		//Adjust data for starting at 0
		expect(nk).toStrictEqual(Data1.getOutputNK());
	})

	it("test areaSharp", () => {
		const [ba, ca, area] = FlowCalc.areasSharp(Data1.getOutputX(), Data1.getOutputZ(), Data1.getOutputNI(), Data1.getOutputNJ(), Data1.getOutputNK(), Data1.getOutputNELEM());

		for(let i = 0; i < 3; i++) {
			expect(ba[i].length).toBe(Data1.getOutputBA()[i].length);
			expect(ba[i]).toBeDeepCloseTo(Data1.getOutputBA()[i], 5);
		}

		for(let i = 0; i < 3; i++) {
			expect(ca[i].length).toBe(Data1.getOutputCA()[i].length);
			expect(ca[i]).toStrictEqual(Data1.getOutputCA()[i], 5);
		}

		expect(area.length).toBe(Data1.getOutputArea().length);
		expect(area).toBeDeepCloseTo(Data1.getOutputArea(), 5);
	});

	it("test matrixSharp", () => {
		const [a] = FlowCalc.matrixSharp(Data1.getOutputBA(), Data1.getOutputCA(), Data1.getOutputNI(), Data1.getOutputNJ(), Data1.getOutputNK(), Data1.getOutputArea(), Data1.getOutputNNODE(), Data1.getOutputNELEM());
		// Build sparse matrix from a, then compare those results with single calls.
		// This is to optimize the tests. Otherwise they will take forever. Literally.
		const [ a_sparse, a_n, a_m ] = convertMatrixToSparse(a);

		expect(a_n.length).toBe(Data1.getOutputA_n_MatrixSharp().length);
		expect(a_m.length).toBe(Data1.getOutputA_m_MatrixSharp().length);
		expect(a_sparse.length).toBe(Data1.getOutputA_MatrixSharp().length);
		
		expect(a_n).toStrictEqual(Data1.getOutputA_n_MatrixSharp());
		expect(a_m).toStrictEqual(Data1.getOutputA_m_MatrixSharp());
		expect(a_sparse).toBeDeepCloseTo(Data1.getOutputA_MatrixSharp(), 5);
	});

	it("test apply_bc_sharp", () => {
		const aa = LoadSparseToMatrix(Data1.getOutputA_MatrixSharp(), Data1.getOutputA_n_MatrixSharp(), Data1.getOutputA_m_MatrixSharp(), Data1.getOutputNNODE());
		const [a, b] = FlowCalc.applyBCSharp(aa, Data1.getH(), Data1.getOutputNNODE());
	

		// Build sparse matrix from a, then compare those results with single calls.
		// This is to optimize the tests. Otherwise they will take forever. Literally.
		const [ a_sparse, a_n, a_m ] = convertMatrixToSparse(a);

		expect(a_n.length).toBe(Data1.getOutputA_n_ApplyBCSharp().length);
		expect(a_m.length).toBe(Data1.getOutputA_m_ApplyBCSharp().length);
		expect(a_sparse.length).toBe(Data1.getOutputA_ApplyBCSharp().length);
		
		expect(a_n).toStrictEqual(Data1.getOutputA_n_ApplyBCSharp());
		expect(a_m).toStrictEqual(Data1.getOutputA_m_ApplyBCSharp());
		expect(a_sparse).toBeDeepCloseTo(Data1.getOutputA_ApplyBCSharp());

		expect(b.length).toBe(Data1.getOutputB_ApplyBCSharp().length)
		expect(b).toBeDeepCloseTo(Data1.getOutputB_ApplyBCSharp(), 5);
	});

	it("test hfem", () => {
		const a = LoadSparseToMatrix(Data1.getOutputA_ApplyBCSharp(), Data1.getOutputA_n_ApplyBCSharp(), Data1.getOutputA_m_ApplyBCSharp(), Data1.getOutputNNODE());
		const b = Data1.getOutputB_ApplyBCSharp();
		const hfem = FlowCalc.hfemCalc(a, b);
		expect(hfem).toBeDeepCloseTo(Data1.getOutputHFEM(), 5);
	});

	it("test fluxSharp", () => {
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

		const [elements] = FlowCalc.fluxSharp(x, z, ni, nj, nk, ba, ca, area, hfem, nelem);
		expect(elements.map(x => x.point.x)).toBeDeepCloseTo(Data1.getOutputXC(), 5);
		expect(elements.map(x => x.point.y)).toBeDeepCloseTo(Data1.getOutputZC(), 5);
		expect(elements.map(x => x.qx)).toBeDeepCloseTo(Data1.getOutputQX(), 5);
		expect(elements.map(x => x.qz)).toBeDeepCloseTo(Data1.getOutputQZ(), 5);

	});

	it("test main method", () => {
		const [hfem, elements] = FlowCalc.main(60, Data1.getH(), Data1.getZ());
		expect(hfem).toBeDeepCloseTo(Data1.getOutputHFEM(), 5);
		expect(elements.map(x => x.point.x)).toBeDeepCloseTo(Data1.getOutputXC(), 5);
		expect(elements.map(x => x.point.y)).toBeDeepCloseTo(Data1.getOutputZC(), 5);
		expect(elements.map(x => x.qx)).toBeDeepCloseTo(Data1.getOutputQX(), 5);
		expect(elements.map(x => x.qz)).toBeDeepCloseTo(Data1.getOutputQZ(), 5);
	});
});