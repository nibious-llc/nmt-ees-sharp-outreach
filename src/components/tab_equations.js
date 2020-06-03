import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Container, Box, Grid} from '@material-ui/core';
import NumericSchematic from '../images/numeric_schematic.jpg';
import MatrixPic from '../images/matrix.jpg';
import InterfaceChanges from '../images/InterfaceChanges.jpg';
import MathJax from 'react-mathjax';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
	image: {
		width: '100%'
	},
	equationNumber: {
		marginLeft: theme.spacing(2)
	}
}));


function Equation(props) {
	const tex = props.tex;
	const eqNumber = props.equationNumber;
	const classes = useStyles();
	return (
		<Grid container alignItems="center" justify="center">
			<Grid item>
				<MathJax.Node formula={tex}/>
			</Grid>
			<Grid item>
				<Typography className={classes.equationNumber}>({eqNumber})</Typography>
			</Grid>
		</Grid>
	);
}

export default function Equations(props) {

	const classes = useStyles();
	const eq1 = `\\frac{\\partial }{\\partial x}\\left[T^f\\left(x\\right)\\frac{\\partial h}{\\partial x}\\right]=R-Q_p`;
	const eq2 = `\\frac{\\partial }{\\partial x}\\left[\\frac{\\rho_s-\\rho_f}{\\rho_s}T^s\\left(x\\right)\\frac{\\partial z}{\\partial x}+\\frac{\\rho_f}{\\rho_s}T^s\\left(x\\right)\\frac{\\partial h}{\\partial x}\\right]=0`;
	const eq_bfp = `\\text{Bfp}(i)=\\frac{T_i^f+T_{i+1}^f}{2}`;
	const eq_bfm = `\\text{Bfm}(i)=\\frac{T_i^f+T_{i-1}^f}{2}`;
	const eq_bsp = `\\text{Bsp}(i)=\\frac{T_i^s+T_{i+1}^s}{2}`;
	const eq_bsm = `\\text{Bsm}(i)=\\frac{T_i^s+T_{i-1}^s}{2}`;
	
	return (
		<Container maxWidth="lg">
			<Paper className={classes.root}>
				<Box textAlign="left">
					<MathJax.Provider>
						<Typography variant="h1">
							Equations
						</Typography>
						<Typography>
							The ordinary differential equations (one for freshwater and one for saltwater) are given by: 
						</Typography>
            <Equation tex={eq1} equationNumber="1"/>
						<Equation tex={eq2} equationNumber="2"/>
						<Typography>
							where <MathJax.Node inline formula={'T^f'}/> is the freshwater transmissivity <MathJax.Node inline formula={'(T^f = [K^f(h-z)])'}/>, <MathJax.Node inline formula={'T^s'}/> is the saltwater transmissivity <MathJax.Node inline formula={'(T^s = abs[-1000 - z]K^s)'}/>, <MathJax.Node inline formula={'\\rho_s'}/> is salt water density, 			<MathJax.Node inline formula={'\\rho_f'}/> is freshwater density, <MathJax.Node inline formula={'h'}/> is water table elevation, <MathJax.Node inline formula={'z'}/>  is interface position, <MathJax.Node inline formula={'x'}/>  is lateral distance, <MathJax.Node inline formula={'Q_p'}/>  is the pumping rate, <MathJax.Node inline formula={'K^s'}/>  is the salt water hydraulic conductivity and <MathJax.Node inline formula={'K^f'}/>  is the freshwater hydraulic conductivity, and <MathJax.Node inline formula={'R'}/>  is the recharge rate. Recharge is precipitation minus evapotranspiration. Evapotranspiration is the amount of water removed from the soil by plants and direct evaporation of moisture near the land surface.
						</Typography>
						<Typography variant="h2">Initial Conditions</Typography>
						<Typography>
							While this is a steady-state problem, we have to assign initial guesses of the values of <MathJax.Node inline formula={'h(x)'}/> and <MathJax.Node inline formula={'z(x)'}/>. We initial guesses are:
						</Typography>
						<MathJax.Node formula={'h(x) = 0m'}/>
						<MathJax.Node formula={'z(x) = -50m'}/> 
						<Typography>
							Boundary conditions at the coastlines for hydraulic head <MathJax.Node inline formula={'(h)'}/> and the position of the freshwater-saltwater interface <MathJax.Node inline formula={'(z)'}/> are given by:
						</Typography>
						<MathJax.Node formula={'h(x=0) = h(x=L) = 0 m'}/> 
						<MathJax.Node formula={'z(x=0) = z(x=L) = \\frac{-\\rho_f T_f \\frac{\\partial h}{\\partial x}}{K_f (\\rho_s - \\rho_f)}'}/>
						<Typography>
							The position of the freshwater-saltwater thickness varies depending on the flux to the coastline (Glover, 1959). Values of variables initially set in the model are listed in Table 1. Some of these variables are listed in Figure 1.
						</Typography>
						<Container maxWidth="md">
							<Box textAlign="center" alignItems="center">
								<img className={classes.image} src={NumericSchematic} alt="Schematic diagram numerical grid used in the sharp interface model to be developed in this assignment."/>
								<Typography variant="caption">
									<b>Figure 1.</b> <i>Schematic diagram numerical grid used in the sharp interface model to be developed in this assignment.</i>
								</Typography>
							</Box>
						</Container>
						
						<Typography>
							The program must calculate interblock transmisivities due to changes in saturated thickness. The variables listed in Figure 2 are as follows:
						</Typography>
							<Grid container direction="column">
								<Grid container justify="center">
									<Grid item xs={3}>
										<MathJax.Node formula={eq_bfp}/>
									</Grid>
									<Grid item xs={3}>
										<MathJax.Node formula={eq_bfm}/>
									</Grid>
								</Grid>
								<Grid container justify="center">
									<Grid item xs={3}>
										<MathJax.Node formula={eq_bsp}/>
									</Grid>
									<Grid item xs={3}>
										<MathJax.Node formula={eq_bsm}/> 
										<Typography>(3)</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Typography>where the matrix coefficients Bfp, Bfm, Bsp, Bsm are the forward (node <MathJax.Node formula={'i'} inline/> and <MathJax.Node formula={'i+1'} inline/>) and backwards (node <MathJax.Node formula={'i'} inline/> and <MathJax.Node formula={'i-1'} inline/>) averages of the nodal transmissivities. The letters <MathJax.Node formula={'f'} inline/> and <MathJax.Node formula={'s'} inline/> denotes freshwater or saltwater transmissivities. </Typography>

							<Container maxWidth="sm">
								<TableContainer component={Paper}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Variable</TableCell>
												<TableCell>Value</TableCell>
												<TableCell>Units</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
												<TableCell><MathJax.Node formula={'Q_p'} inline/></TableCell>
												<TableCell>0.07</TableCell>
												<TableCell>m/day</TableCell>
											</TableRow>
											<TableRow>
												<TableCell><MathJax.Node formula={'nQp'} inline/></TableCell>
												<TableCell>10</TableCell>
												<TableCell>Pumping Node</TableCell>
											</TableRow>
											<TableRow>
												<TableCell><MathJax.Node formula={'\\rho_f'} inline/></TableCell>
												<TableCell>1000</TableCell>
												<TableCell>kg/m<sup>3</sup></TableCell>
											</TableRow>
											<TableRow>
												<TableCell><MathJax.Node formula={'\\rho_s'} inline/></TableCell>
												<TableCell>1025</TableCell>
												<TableCell>kg/m<sup>3</sup></TableCell>
											</TableRow>
											<TableRow>
												<TableCell><MathJax.Node formula={'K^s'} inline/></TableCell>
												<TableCell>7.2</TableCell>
												<TableCell>m/day</TableCell>
											</TableRow>
											<TableRow>
												<TableCell><MathJax.Node formula={'K^f'} inline/></TableCell>
												<TableCell>8.5</TableCell>
												<TableCell>m/day</TableCell>
											</TableRow>
											<TableRow>
												<TableCell><MathJax.Node formula={'\\Delta x'} inline/></TableCell>
												<TableCell>60</TableCell>
												<TableCell>m</TableCell>
											</TableRow>
											<TableRow>
												<TableCell><MathJax.Node formula={'Nx'} inline/></TableCell>
												<TableCell>101</TableCell>
												<TableCell>Number of Nodes</TableCell>
											</TableRow>
											<TableRow>
												<TableCell><MathJax.Node formula={'R'} inline/></TableCell>
												<TableCell>0.0019</TableCell>
												<TableCell>m/day</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
								<Box textAlign="center" alignItems="center">
									<Typography variant="caption">
										<b>Table 1.</b> List of variables and variable values to be used in this problem set.
									</Typography>
								</Box>
							</Container>							
							<Typography>
								These two equations are non-linear and need to be solved simultaneously.  There are a of 101 nodes and two variables (unknowns: <MathJax.Node inline formula={'h'}/> and <MathJax.Node inline formula={'z'}/>) yielding 202 "degrees of freedom" (unknowns). In the codes, the boundary conditions (elevations of the interface and water table) are specified for nodes <MathJax.Node inline formula={'(1)'}/> and <MathJax.Node inline formula={'(101)'}/>. The base of the domain is at dynamically calculated. Imposing specified values at the two boundaries reduces the number of unknowns to 198 which is the size of the <MathJax.Node inline formula={'A'}/> matrix.  The first two unknowns are <MathJax.Node inline formula={'h(2)'}/> and <MathJax.Node inline formula={'z(2)'}/>. The last two are <MathJax.Node inline formula={'h(100)'}/> and <MathJax.Node inline formula={'z(100)'}/>.  The <MathJax.Node inline formula={'A'}/> matrix and <MathJax.Node inline formula={'B'}/> vector for the first 
							</Typography>
							<Container maxWidth="md">
								<Box textAlign="center" alignItems="center">
									<img className={classes.image} src={MatrixPic} alt="A Matrix and B vector for sharp interface equations using the finite difference method for the first few unknowns."/>
									<Typography variant="caption">
										<b>Figure 2.</b> <i><MathJax.Node inline formula={'A'}/> Matrix and <MathJax.Node inline formula={'B'}/> vector for sharp interface equations using the finite difference method for the first few unknowns. </i>
									</Typography>
									</Box>
								</Container>
							<Typography>
								four nodes (boundary conditions imposed) is shown in Figure 2. The code uses transmissivity with is the product of saturated thickness (the difference between <MathJax.Node inline formula={'h(x)-z(x)'}/>) times the hydraulic conductivity. And illustration of how the saturated thickness changes with each iteration is shown in Figure 3.
							</Typography>
							<Container maxWidth="md">
								<Box textAlign="center" alignItems="center">
									<img className={classes.image} src={InterfaceChanges} alt="Changes in saturated thickness (h(x)-z(x))with iteration level."/>
									<Typography variant="caption">
										<b>Figure 3.</b> Changes in saturated thickness <MathJax.Node inline formula={"(h(x)-z(x))"}/> with iteration level.
									</Typography>
								</Box>
							</Container>
							<Typography variant="h2">References</Typography>
							<Typography>
							Glover, R.E., 1959. The pattern of fresh‐water flow in a coastal aquifer. Journal of Geophysical Research, 64(4), pp.457-459.
							</Typography>
							<Typography>
							Person, M., Taylor, J. and S. L. Dingman, 1998, Sharp-Interface Models of Salt Water Intrusion and Well Head Delineation on Nantucket Island, Massachusetts, Ground Water, v. 36, p. 731-742. 
							</Typography>

        	</MathJax.Provider>
				</Box>
			</Paper>
		</Container>
	);
}