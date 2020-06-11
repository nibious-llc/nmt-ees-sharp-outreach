/* eslint-disable  no-restricted-globals */
import { lusolve, matrix, zeros} from 'mathjs';



function initIterationLoop(Nx, delx) {
	let xx = 0.0;
	const x = new Array(Nx)
	const h = new Array(Nx)
	const z = new Array(Nx)
	for (let i = 0; i < Nx; i++) {
		x[i] = xx;
		xx = xx+delx;
		h[i] = 0.0;
		z[i] = -50.0;
	}
	return [x, h, z];
}

function calculateTransmissivities(h, z, Nx, Kf, Ks) {
	let Tf = new Array(Nx);
	let Ts = new Array(Nx);
	for (let n = 0; n < Nx; n++) {
		const bf = h[n] - z[n];

		let bs = Math.abs(-1000 - z[n]);
		if(bs < 50) {
			bs = 50;
		}

		Tf[n] = bf*Kf;		
		Ts[n] = bs*Ks;
	}
	return [Tf, Ts];
}

/**
 * Validates All User Input
 * @param {double} delx m: controls size of grid; perhaps vary between 30m to 120m
 * @param {double} k permeability (m^2): controls permeability of aquifer, higher perm leads to lower water table perhaps constrain between 10^-10 to10^-14 m2
 * @param {double} Rech m/day: contrains amount of water replenishing the aquifer; recharge can't be zero 
 * @param {double} Qp Pumping rate (m^3/day/island length) The higher Qp, the lower the water table falls around the pumpming node nQp. If pumping rate is set too high, the code blows up. 
 * @param {int} nQp node where pumping occurs from. Shoud be constrated to be between nodes 10-90
 */
function validateUserInput(delx, k, Rech, Qp, nQp) {
	if (delx < 30 || delx > 120) {
		return false;
	}

	if(k > Math.pow(10, -10) || k < Math.pow(10, -14)) {
		return false;
	}

	if(Rech <= 0) {
		return false;
	}

	if(nQp < 10 || nQp > 90) {
		return false;
	}
	return true;
}





/**
 * Calculate the Sharp Interface with given inputs
 * @param {double} delx m: controls size of grid; perhaps vary between 30m to 120m
 * @param {double} k permeability (m^2): controls permeability of aquifer, higher perm leads to lower water table perhaps constrain between 10^-10 to10^-14 m2
 * @param {double} Rech m/day: contrains amount of water replenishing the aquifer; recharge can't be zero 
 * @param {double} Qp Pumping rate (m^3/day/island length) The higher Qp, the lower the water table falls around the pumpming node nQp. If pumping rate is set too high, the code blows up. 
 * @param {int} nQp node where pumping occurs from. Shoud be constrated to be between nodes 10-90
 */
export function SharpInterface(delx=60, k = 1.0e-11, Rech = 0.009, Qp = 0.30, nQp = 10) {


	if (validateUserInput(delx, k, Rech, Qp, nQp) === false) {
		return false;
	}

	const Nx = 101;  			// number nodes, do not change.
	//let delx = 60;   			// (m) MAP: controls size of grid; perhaps vary between 30m to 120m
  //let k = 1.0e-11; 			// permeability (m^2) MAP controls permeability of aquifer, 
												// higher perm leads to lower water table perhaps constrain 
												// between 10^-10 to10^-14 m2
  const rho_f = 1000.0; // kg/m^3 do not change
  const rho_s = 1025.0; // kg/m^3 do not change
  const vis_f = 0.001;  // Pa-s  do not change
  const vis_s = 0.0012; // Pa-s  do not change
  //let Rech = 0.009;    	// m/day MAP: contrains amount of water replenishing the aquifer; recharge can't be zero 
  const grav = 9.81;  	// m/s^2  do not change
  //let Qp = 0.35; 				// MAP Pumping rate (m^3/day/island length) The higher Qp, the lower the water table falls
												// around the pumpming node nQp. If pumping rate is set too high, the code
												// blows up. 
	//let nQp = 10;         // MAP node where pumping occurs from. Shoud be constrated to be between nodes 10-90
	const Iter = 10;      // number of iterations to find the stable solution. We could potentially change this 
		   									// to illstrate the non-linear nature of the solution. 


	const zz = new Array(Iter)
	const hh = new Array(Iter)

	for(let i = 0; i < Iter; i++) {
		zz[i] = new Array(Nx)
		hh[i] = new Array(Nx)
	}


	const Kf = k*rho_f*grav/vis_f*3600*24;
	const Ks = k*rho_s*grav/vis_s*3600*24;

	const qf_glover1 = matrix();
	const qf_glover2 = matrix();

	const D = rho_f/rho_s;
	const Rr = (rho_s-rho_f)/rho_s;
	
	const [x, h, z] = initIterationLoop(Nx, delx);

	for (let it = 0; it < Iter; it++) {

		// calculate Transmissivities
		const [Tf, Ts] = calculateTransmissivities(h, z, Nx, Kf, Ks);

		// assign spatially varying FDM parameters
		let Bfp = new Array(Nx)
		let Bfm = new Array(Nx)
		let Bsp = new Array(Nx)
		let Bsm = new Array(Nx)
		for (let n = 1; n < Nx - 1; n++) {
			Bfp[n] = (Tf[n]+ Tf[n+1])/2;
			Bfm[n] = (Tf[n]+ Tf[n-1])/2;
			Bsp[n] = (Ts[n]+ Ts[n+1])/2;
			Bsm[n] = (Ts[n]+ Ts[n-1])/2;
		}

		Bfp[0] = (Tf[Nx - 2]+ Tf[Nx - 1])/2; 
    Bfm[0] = Tf[0];
    Bsp[0] = (Ts[Nx - 2] + Ts[Nx - 1])/2;
    Bsm[0] = Ts[0];

		Bfp[Nx - 1] = Tf[Nx - 1];
		Bfm[Nx - 1] = (Tf[Nx - 1] + Tf[Nx - 2])/2;
		Bsp[Nx - 1] = Ts[Nx - 1];
		Bsm[Nx - 1] = (Ts[Nx - 1] + Ts[Nx - 2])/2;
		
		// zero A matrix and B vector

		const Nx2 = 2 * Nx - 6;

		const a = matrix(zeros(Nx2, Nx2))
		const b = matrix(zeros(Nx2, 1))
	
		// populate first two unknowns associated with boundary conditions
		a.set([0, 0], Bfm[1]+Bfp[1]);
		a.set([0, 1], 0);
		a.set([0, 2], -1 * Bfp[1]);
		b.set([0, 0], Bfm[1]*h[0] + Rech*Math.pow(delx, 2));
		
		a.set([1,0], D*(Bsm[1]+ Bsp[1]));
		a.set([1,1], Rr*(Bsm[1]+Bsp[1]));
		a.set([1,2], -1 * D*Bsp[1]);
		a.set([1,3], -1 * Rr*Bsp[1]);
		b.set([1,0], D*Bsm[1]*h[0]+Rr*Bsm[1]*z[0]);

		// populate a matrix with fdm coefficients
		// for freshwater transport equation

		let ic = 2;
		for(let n = 2; n < Nx2; n = n + 2) {
			a.set([n, n], Bfm[ic]+Bfp[ic]);
			a.set([n, n-2], -1 * Bfm[ic]);
			a.set([n, n-1], 0);
			a.set([n, n+1], 0);
			a.set([n, n+2], -1 * Bfp[ic]);
			b.set([n, 0], Rech*Math.pow(delx, 2));

			if (ic == nQp - 1) {
				b.set([n, 0], b.get([n,0]) - Qp*Math.pow(delx, 2));
			}
			ic = ic+1;
		}

		ic = 2;
		for (let n = 3; n < Nx2; n = n + 2) {
			a.set([n,n],   Rr*(Bsm[ic]+Bsp[ic]));
			a.set([n,n-3],  -1 * D*Bsm[ic]);
			a.set([n,n-2], -1 * Rr*Bsm[ic]);
			a.set([n,n-1],  D*(Bsm[ic]+Bsp[ic]));
			a.set([n,n+1],  -1 * D*Bsp[ic]);
			a.set([n,n+2], -1 * Rr*Bsp[ic]);
			b.set([n,0], 0);
			ic = ic+1;	
		}

		// populate a matrix and b vector for last two unknowns
		{
			let n = 196;
			ic = 99;

			a.set([n, n], Bfm[ic]+Bfp[ic]);
			a.set([n, n+1], 0);
			a.set([n, n-2], -Bfm[ic]);
			a.set([n, n-1], 0);
			b.set([n, 0], Rech*Math.pow(delx, 2)+Bfp[ic]*h[Nx - 1]);
		}
		
		{
			let n = 197;
			ic = 99;
			
			a.set([n,n], Rr*(Bsm[ic]+ Bsp[ic]));
			a.set([n,n-1], D*(Bsm[ic]+Bsp[ic]));
			a.set([n,n-2], -Rr*Bsm[ic]);
			a.set([n,n-3], -D*Bsm[ic]);
			b.set([n,0], D*Bsp[ic]*h[Nx - 1]+Rr*Bsp[ic]*z[Nx - 1]);
		}

		//hz =a\b;
		const hz = lusolve(a, b);

		{
			ic = 1;
			for (let n = 0; n < Nx2+ 2; n = n + 2) {
				h[ic] = hz.get([n,0]);
				z[ic] = hz.get([n + 1,0]);
				ic=ic+1;
			}
		}

		qf_glover1.set([it, 0], rho_f*Tf[0] *(h[1]-h[0])/Kf/(rho_s-rho_f)/delx);
		qf_glover2.set([it, 0],rho_f*Tf[Nx - 1] *(h[Nx-2] - h[Nx -1])/Kf/(rho_s-rho_f)/delx); 


		z[0] = 0 -  qf_glover1.get([it, 0]);
		z[Nx - 1] = 0 -  qf_glover2.get([it, 0]);

		for(let n = 0; n < Nx; n++) {
			hh[it][n] = h[n];
			zz[it][n] = z[n];
		}
	}
	return [x, hh, zz]

}


if(process.env.NODE_ENV == "test") {
	module.exports =  {SharpInterface,initIterationLoop, validateUserInput, calculateTransmissivities}
} 

self.onmessage = async (e) => {
	if (!e) return;

	const delx = e.data[0];
	const k = e.data[1];
	const Rech = e.data[2];
	const Qp = e.data[3];
	const nQp = e.data[4]

	const result = SharpInterface(delx, Math.pow(10,k), Rech, Qp, nQp);
	self.postMessage({type: 'results', data: result});
};
