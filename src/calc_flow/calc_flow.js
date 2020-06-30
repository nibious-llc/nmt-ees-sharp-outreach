/* eslint-disable  no-restricted-globals */
import { lusolve, flatten, zeros} from 'mathjs';


const nrows = 21;
const ncols = 101;

function getKf() {
	const rho_f = 1000.0;  // kg/m^3 do not change
	const vis_f = 0.001;   // Pa-s  do not change
	const k=1.0e-12;       // permeability (m^2) redundant
	const grav = 9.81; 

	return k*rho_f*grav/vis_f*3600*24;
}

function generateMesh(hcol, zcol) {
	const delx = 60;
	let ic = 0;
	let xx = -1 * delx;

	const delz = new Array(ncols);
	const x = new Array(ncols * nrows);
	const z = new Array(ncols * nrows);

	for(let n = 0; n < ncols; n++) {
		delz[n] = (hcol[n]-zcol[n])/22;
		let zz = zcol[n];
	  xx = xx + delx
		for(let m = 0; m < nrows; m++) {
			x[ic] = xx;
			z[ic] = zz;
			ic = ic + 1;
			zz = zz + delz[n];
		}
	}
	
	let nn = 0;
	let ne = 0;
	const ni = new Array();
	const nj = new Array();
	const nk = new Array();


	for(let m = 0; m < ncols - 1; m++) {
		let nc1 = nrows;
		let nc2 = nrows;

		// %%%%%%%%%%%%%%%%%%%%%%% Case #1  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

		if(nc1 < nc2) {
			for(let i = 0; i < nc1 - 1; i++) {
				ni[ne] = nn;
				nj[ne] = ni[ne] + nc1;
				nk[ne] = nj[ne] + 1;
				nn = nn + 1;
				ne = ne + 1;
				
				
				ni[ne] = ni[ne - 1];
				nj[ne] = nj[ne - 1] + 1;
				nk[ne] = ni[ne] + 1;
				ne = ne + 1;
			}
			
			ni[ne] = nn;
			nj[ne] = ni[ne] + nc1;
			nk[ne] = nj[ne] + 1;
			nn = nn + 1;
			ne = ne + 1;
		}


		// %%%%%%%%%%%%%%%%%%%%%%% Case #2  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

		if(nc1 === nc2) {
			for(let i = 0; i < nc1 - 1; i++) {
				
        ni[ne] = nn;
        nj[ne] = ni[ne] + nc1;
				nk[ne] = ni[ne] + 1;
				nn = nn + 1;
        ne = ne + 1;
        
        
        ni[ne] = ni[ne-1] + 1;
        nj[ne] = nj[ne-1];
				nk[ne] = nj[ne]+ 1;
				ne = ne + 1;
			}
			nn = nn + 1;
		}


		// %%%%%%%%%%%%%%%%%%%%%%% Case #3  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

		if( nc1 > nc2) {
			
			let i1 = nn;
			let j1 = nn + nc1;
			let k1 = i1 + 1;
	 
			// set i,j,k for lower two elements
	
			ni[ne] = i1;
			nj[ne] = j1;
			nk[ne] = k1;
			ne = ne + 1;
			nn = nn + 1;
	
			
			 
			i2 = j1;
			j2 = j1 + 1;
			k2 = k1;
	
	
			ni[ne] = i2;
			nj[ne] = j2;
			nk[ne] = k2;
			ne = ne + 1;

			// now permute up the first elemental column

			const nend = 2 * (nc2 - 1)/2 - 1;
		
			for(let nr = 0; nr < nend; nr++) {
				
				 
				i1 = i1 + 1;
				j1 = j1 + 1;
				k1 = k1 + 1;
			
 
				ni[ne] = i1;
				nj[ne] = j1;
				nk[ne] = k1;

				ne = ne + 1;

				i2 = i2 + 1;
				j2 = j2 + 1;
				k2 = k2 + 1;

				

				ni[ne]= i2;
				nj[ne]= j2;
				nk[ne]= k2;

				ne = ne + 1;
			}

			// now do the top extra element

			
			
			i1 = i1 + 1;
			j1 = j1 + 1;
			k1 = k1 + 1;
		

			ni[ne] = i1;
			nj[ne] = j1;
			nk[ne] = k1;   
		
			nn = nk[ne];
			ne = ne + 1;
		} 
	}

	nn = nn + nrows;

	return [x, z, ni, nj, nk, nn, ne];
}


function areasSharp(x, z, ni, nj, nk, nelem) {

	const ba = new Array(3);
	const ca = new Array(3);
	for(let i = 0; i < 3; i++) {
		ba[i] = new Array(nelem);
		ca[i] = new Array(nelem);
	}
	const area = new Array(nelem);

	for(let m = 0; m < nelem; m++) {
		let i = ni[m];
		let j = nj[m];
		let k = nk[m];

		ba[0][m] = z[j] - z[k];
		ba[1][m] = z[k] - z[i];
		ba[2][m] = z[i] - z[j];
		ca[0][m] = x[k] - x[j];
		ca[1][m] = x[i] - x[k];
		ca[2][m] = x[j] - x[i];

		// calculate element area & check for negative area
		area[m] = 0.5*((x[i] * z[j] - x[j] * z[i]) + (x[k] * z[i] - x[i] * z[k]) + (x[j] * z[k] - x[k] * z[j]));
	}
	return [ba, ca, area];
}

function matrixSharp(ba, ca, ni, nj, nk, area, nnode, nelem) {
	const a = zeros(nnode, nnode, 'sparse');

	const Kf = getKf();

	for(let m = 0; m < nelem; m++) {
		
		const ii = ni[m];
		const jj = nj[m];
		const kk = nk[m];

		const ar = 1/(4.0*area[m]);
		zeros
		// sum local conductance matrix and buoyancy vector
		a.set([ii, ii], a.get([ii, ii]) + ar*(Kf*ba[0][m]*ba[0][m]+Kf*ca[0][m]*ca[0][m]));
    a.set([ii, jj], a.get([ii, jj]) + ar*(Kf*ba[1][m]*ba[0][m]+Kf*ca[1][m]*ca[0][m]));
    a.set([ii, kk], a.get([ii, kk]) + ar*(Kf*ba[2][m]*ba[0][m]+Kf*ca[2][m]*ca[0][m]));
    a.set([jj, ii], a.get([jj, ii]) + ar*(Kf*ba[0][m]*ba[1][m]+Kf*ca[0][m]*ca[1][m]));
    a.set([jj, jj], a.get([jj, jj]) + ar*(Kf*ba[1][m]*ba[1][m]+Kf*ca[1][m]*ca[1][m]));
    a.set([jj, kk], a.get([jj, kk]) + ar*(Kf*ba[2][m]*ba[1][m]+Kf*ca[2][m]*ca[1][m]));
    a.set([kk, ii], a.get([kk, ii]) + ar*(Kf*ba[0][m]*ba[2][m]+Kf*ca[0][m]*ca[2][m]));
    a.set([kk, jj], a.get([kk, jj]) + ar*(Kf*ba[1][m]*ba[2][m]+Kf*ca[1][m]*ca[2][m]));
		a.set([kk, kk], a.get([kk, kk]) + ar*(Kf*ba[2][m]*ba[2][m]+Kf*ca[2][m]*ca[2][m]));
	}
	return [a];
}


function applyBCSharp(a, hFinal, nnode) {
	const b = new Array(nnode).fill(0);

	for(let l = 0; l < ncols; l++) {
		const nnn = nrows * (l + 1) - 1;

		for(let n = 0; n < nnode; n++) {
			a.set([nnn, n], 0);
			b[n] = b[n] - a.get([n,nnn]) * hFinal[l];
			if(a.get([n, nnn]) !== 0) {
				a.set([n, nnn], 0);
			}
		}
		a.set([nnn,nnn], 1);
		b[nnn] = hFinal[l];	
	}
	return [a, b];
}

// hfem = a\b; % solve the system of equations
function hfemCalc(a, b) {
	return flatten(lusolve(a, b)).toArray();
}


function fluxSharp(x, z, ni, nj, nk, ba, ca, area, hfem, nelem) {
	const qx = new Array(nelem).fill(0);
	const qz = new Array(nelem).fill(0);
	const xc = new Array(nelem);
	const zc = new Array(nelem);

	for(let m = 0; m < nelem; m++) {
		const ar = 1/(2.0*area[m]);

		const kxe = getKf();
		const kze = getKf();

		const node = [ni[m], nj[m], nk[m]];

		for(let n = 0; n < 3; n++) {
			qx[m] =  qx[m] - ar*kxe*ba[n][m]*hfem[node[n]];
			qz[m] =  qz[m] - ar*kze*ca[n][m]*hfem[node[n]];
		}

		xc[m] = (x[ni[m]]+x[nj[m]]+x[nk[m]])/3;
		zc[m] = (z[ni[m]]+z[nj[m]]+z[nk[m]])/3;
	}
	return [xc, zc, qx, qz];
}

export function main(hFinal, zFinal) {
	const [x, z, ni, nj, nk, nnode, nelem] = generateMesh(hFinal, zFinal);
	const [ba, ca, area] = areasSharp(x, z, ni, nj, nk, nelem);
	const [aa] = matrixSharp(ba, ca, ni, nj, nk, area, nnode, nelem);
	const [a, b] = applyBCSharp(aa, hFinal, nnode);
	const hfem = hfemCalc(a, b);
	const [xc, zc, qx, qz] = fluxSharp(x, z, ni, nj, nk, ba, ca, area, hfem, nelem);
	return [hfem, xc, zc, qx, qz];
}


if(process.env.NODE_ENV == "test") {
	module.exports =  {main, generateMesh, areasSharp, matrixSharp, applyBCSharp, hfemCalc, fluxSharp}
} 

self.onmessage = async (e) => {
	if (!e) return;

	const h = e.data[0];
	const z = e.data[1];

	const result = main(h, z);
	self.postMessage({type: 'results', data: result});
};