import {toBeDeepCloseTo} from 'jest-matcher-deep-close-to';
expect.extend({toBeDeepCloseTo});

import * as Data1 from './test_data1';
import * as SharpInterface from './sharp_fdm_glover_v2.worker.js';


describe("Testing Sharp Interface", () => {

	describe("initIterationLoop return proper values", () => {
		let x;
		let h;
		let z;
		beforeAll(() => {
			[x, h, z] = SharpInterface.initIterationLoop(101, 60);
		})
		it("x", () => {
			expect(x).toEqual(Data1.get_OutputXInit());
		})
		it("h", () => {
			expect(h).toEqual(new Array(z.length).fill(0));
		})
		it("z", () => {
			expect(z).toEqual(new Array(z.length).fill(-50.0));
		})
	});

	describe("Testing initial output", () => {
		let x;
		let hh;
		let zz;

		beforeAll(() => {
			[x, hh, zz] = SharpInterface.SharpInterface();
		})

		it("zz", () => {
			expect(zz[0]).toBeDeepCloseTo(Data1.get_OutputZZ0(), 5);
		})

		it("hh", () => {
			expect(hh[0]).toBeDeepCloseTo(Data1.get_OutputHH0(), 5);
		})

	})

	describe("Testing overall output", () => {
		let x;
		let hh;
		let zz;

		beforeAll(() => {
			[x, hh, zz] = SharpInterface.SharpInterface();
		})

		it("zz", () => {
			expect(zz[9]).toBeDeepCloseTo(Data1.get_OutputZZ9(), 5);
		})

		it("hh", () => {
			expect(hh[9]).toBeDeepCloseTo(Data1.get_OutputHH9(), 5);
		})

	})

	describe("calculateTransmissivities return proper values", () => {
		let Tf;
		let Ts;

		beforeAll(() => {
			[Tf, Ts] = SharpInterface.calculateTransmissivities(new Array(101).fill(0), new Array(101).fill(-50), 101, 8.475840000000002, 7.239780000000001);
		});

		it("Tf", () => {
			expect(Tf).toBeDeepCloseTo(Data1.get_OutputTF());
		})

		it("Ts", () => {
			expect(Ts).toBeDeepCloseTo(Data1.get_OutputTS());
		})
	})
});

