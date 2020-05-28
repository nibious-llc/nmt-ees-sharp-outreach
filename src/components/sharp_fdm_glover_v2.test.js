import * as SharpInterface from '../../public/sharp_fdm_glover_v2';


describe("Testing Sharp Interface", () => {
	it.each([30, 40, 60, 80, 120])("initIterationLoop return proper h values", (delx) => {
		const [x, h, z] = SharpInterface.initIterationLoop(101, delx);
		for (let i = 0; i < h.length; i++) {
			expect(h[i]).toBe(0);
		}
	})

	it.each([30, 40, 60, 80, 120])("initIterationLoop return proper z values", (delx) => {
		const [x, h, z] = SharpInterface.initIterationLoop(101, delx);
		for (let i = 0; i < z.length; i++) {
			expect(z[i]).toBe(-50.0);
		}
	})

	it.each([60])("initIterationLoop return proper x values", (delx) => {
		const [x, h, z] = SharpInterface.initIterationLoop(101, delx);
		const goldValues = [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1440, 1500, 1560, 1620, 1680, 1740, 1800, 1860, 1920, 1980, 2040, 2100, 2160, 2220, 2280, 2340, 2400, 2460, 2520, 2580, 2640, 2700, 2760, 2820, 2880, 2940, 3000, 3060, 3120, 3180, 3240, 3300, 3360, 3420, 3480, 3540, 3600, 3660, 3720, 3780, 3840, 3900, 3960, 4020, 4080, 4140, 4200, 4260, 4320, 4380, 4440, 4500, 4560, 4620, 4680, 4740, 4800, 4860, 4920, 4980, 5040, 5100, 5160, 5220, 5280, 5340, 5400, 5460, 5520, 5580, 5640, 5700, 5760, 5820, 5880, 5940, 6000];
		for (let i = 0; i < h.length; i++) {
			expect(x[i]).toBe(goldValues[i]);
		}
	})

	it("return proper values", () => {
		const [x, hh, zz] = SharpInterface.SharpInterface();
		expect(zz.get([0,0])).toBe(-50);
		expect(zz.get([0,1])).toBeCloseTo(-35.96103749009004, 5)
		expect(zz.get([0,2])).toBeCloseTo(-19.26155335475096, 5)
		expect(zz.get([0,3])).toBeCloseTo(-16.02823424898521, 5)
		expect(zz.get([0,4])).toBeCloseTo(-12.8300021077386, 5)
		expect(zz.get([0,5])).toBeCloseTo(-12.04636481656879, 5)
		expect(zz.get([0,6])).toBeCloseTo(-10.36773552314449, 5)
		expect(zz.get([0,7])).toBeCloseTo(-9.951880278525037, 5)
		expect(zz.get([0,8])).toBeCloseTo(-8.984052256468724, 5)
		expect(zz.get([0,9])).toBeCloseTo(-8.706577917640544, 5)

		expect(hh.get([1,0])).toBeCloseTo(1.078831124702701, 5);
		expect(hh.get([1,1])).toBeCloseTo(0.8034342735547727, 5);
		expect(hh.get([1,2])).toBeCloseTo(1.248204178067895, 5);
		expect(hh.get([1,3])).toBeCloseTo(1.200693904434692, 5);
		expect(hh.get([1,4])).toBeCloseTo(1.408382249131064, 5);
	})


	it("calculateTransmissivities return proper values", () => {
		const [x, h, z] = SharpInterface.initIterationLoop(101, 60);
		const [Tf, Ts] = SharpInterface.calculateTransmissivities(h, z, 101, 8.475840000000002, 7.239780000000001);
		expect(Tf[0]).toBe(423.7920000000001);
	})
});

