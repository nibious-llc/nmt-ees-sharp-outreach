import * as Data1 from './test_data1';
import * as FlowCalc from './calc_flow';

/* eslint-disable  no-restricted-globals */
import { zeros } from 'mathjs';

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

const trials = [1,2,3,4];

describe("Testing Flow Vector Speed", () => {
	
	describe("main", () => {
		let h,z;
		beforeEach(() => {
			h = Data1.getH();
			z = Data1.getZ();
		});
		it.each(trials)("run #[%p]", () => {
			FlowCalc.main(60, h, z);
		})
	});

	describe("fluxSharp", () => {
		let x;
		let z;
		let ni;
		let nj;
		let nk;
		let ba;
		let ca;
		let area;
		let hfem;
		let nelem;

		beforeEach(() => {
			x = Data1.getOutputX();
			z = Data1.getOutputZ();
			ni = Data1.getOutputNI();
			nj = Data1.getOutputNJ();
			nk = Data1.getOutputNK();
			ba = Data1.getOutputBA();
			ca = Data1.getOutputCA();
			area = Data1.getOutputArea();
			hfem = Data1.getOutputHFEM();
			nelem = Data1.getOutputNELEM();
		})
		it.each(trials)("run #[%p]", () => {
			FlowCalc.fluxSharp(x, z, ni, nj, nk, ba, ca, area, hfem, nelem);
		})
	});

	describe("hfemCalc", () => {
		let a, b;
		beforeEach(() => {
			a = LoadSparseToMatrix(Data1.getOutputA_ApplyBCSharp(), Data1.getOutputA_n_ApplyBCSharp(), Data1.getOutputA_m_ApplyBCSharp(), Data1.getOutputNNODE());
			b = Data1.getOutputB_ApplyBCSharp();
		});
		it.each(trials)("run #[%p]", () => {
			FlowCalc.hfemCalc(a, b);
		})
	});

	describe("applyBCSharp", () => {
		let aa;
		let h, nnode;

		beforeEach(() => {
			aa = LoadSparseToMatrix(Data1.getOutputA_MatrixSharp(), Data1.getOutputA_n_MatrixSharp(), Data1.getOutputA_m_MatrixSharp(), Data1.getOutputNNODE());
			h = Data1.getH();
			nnode = Data1.getOutputNNODE();
		});
		it.each(trials)("run #[%p]", () => {
			FlowCalc.applyBCSharp(aa, h, nnode);
		})
	});

	describe("matrixSharp", () => {
		let ba, ca, ni, nj, nk, area, nnode, nelem;

		beforeEach(() => {
			ba = Data1.getOutputBA();
			ca = Data1.getOutputCA();
			ni = Data1.getOutputNI();
			nj = Data1.getOutputNJ();
			nk = Data1.getOutputNK();
			area = Data1.getOutputArea();
			nnode = Data1.getOutputNNODE();
			nelem = Data1.getOutputNELEM();
		});
		it.each(trials)("run #[%p]", () => {
			FlowCalc.matrixSharp(ba, ca, ni, nj, nk, area, nnode, nelem);
		})
	});

	describe("areaSharp", () => {
		let x, z, ni, nj, nk, nelem;

		beforeEach(() => {
			ni = Data1.getOutputNI();
			nj = Data1.getOutputNJ();
			nk = Data1.getOutputNK();
			x = Data1.getOutputX();
			z = Data1.getOutputZ();
			nelem = Data1.getOutputNELEM();
		});
		it.each(trials)("run #[%p]", () => {
			FlowCalc.areasSharp(x, z, ni, nj, nk, nelem);
		})
	});


	describe("generateMesh", () => {
		let h,z;
		beforeEach(() => {
			h = Data1.getH();
			z = Data1.getZ();
		});
		it.each(trials)("run #[%p]", () => {
			FlowCalc.generateMesh(60, h, z);
		})
	});
});