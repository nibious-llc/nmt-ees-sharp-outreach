import React, {useEffect} from 'react';
import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { min, max } from 'mathjs';
import { Paper, Typography, Grid, CircularProgress, Switch, FormGroup, FormControlLabel } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import SliderForm from './SliderForm';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SharpInterfaceWorker from 'workerize-loader!../calc_interface/sharp_fdm_glover_v2.worker';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FlowWorker from 'workerize-loader!../calc_flow/calc_flow';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(2),
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer,
		position:"absolute",
		color: '#fff',
		width:"100%",
		height:"100%",
	},
	graphGrid: {
		positon: "relative"
	},
	updatingText: {
		color: "white"
	},
	formControlLabel: {
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(2),
		marginTop: 0
	},
	formLabel: {
		textAlign: 'left',
		color: "black",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginBottom: 0
	}
}));

const calcSharpInterfaceUpdatingText = "Calculating Sharp Interface..."

export default function InterfaceCalculator(props) {
	const [sharpInterfaceWorker, setSharpInterfaceWorker] = useState(null);
	const [flowWorker, setFlowWorker] = useState(null);
	const [delx, setDelx] = useState(60);
	const [k, setK] = useState(-11);
	const [Rech, setRech] = useState(0.009);
	const [Qp, setQp] = useState(0.30);
	const [nQp, setnQp] = useState(10);
	const [calculatedData, setCalculatedData] = useState(null);
	const [calculateFlowVectors, setCalculateFlowVectors] = useState(false);
	const [calculatedFlowData, setCalculatedFlowData] = useState(null);

	const [updatingGraph, setUpdatingGraph] = useState(true);
	const [updatingGraphText, setUpdatingGraphText] = useState(calcSharpInterfaceUpdatingText);
	const [minY, setMinY] = useState(0);
	const [maxY, setMaxY] = useState(0);
	const [minX, setMinX] = useState(0);
	const [maxX, setMaxX] = useState(0);
	const [errorText, setErrorText] = useState(null);
	const classes = useStyles();
	
	function handleSwitchOnChange(event) {
		setCalculateFlowVectors(event.target.checked);
		// If it hasn't been calculated, calculate it right now
		if(calculatedFlowData === null && event.target.checked) {
			calcFlowVectors(delx, calculatedData.map(x => x.h), calculatedData.map(x => x.z))
		}
	}

	useEffect(() => {
		setSharpInterfaceWorker(SharpInterfaceWorker());
		setFlowWorker(FlowWorker());

		// Cleanup Function
		return function () {
			sharpInterfaceWorker.terminate();
			flowWorker.terminate();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps,
	}, []);

	function calcFlowVectors(delx, h, z) {
		flowWorker.onmessage= (message) => {
			if(message.data.type === 'results' ) {
				setCalculatedFlowData(message.data.data);
				setUpdatingGraph(false);
			}
		}
		flowWorker.postMessage([delx, h, z]);
		setUpdatingGraph(true);
		setUpdatingGraphText("Calculating Flow Vectors...");
	}
	
	function calcInterface() {
		setUpdatingGraph(true);
		setUpdatingGraphText(calcSharpInterfaceUpdatingText);
		setErrorText(null);
		sharpInterfaceWorker.postMessage([delx, k, Rech, Qp, nQp]);
	}

	function generateGraph(results) {
			const [x, hh, zz, elements] = results;

			// Check for invalid results
			const z = zz[zz.length - 1];
			const h = hh[hh.length - 1];
			if(max(z) > -5) {
				setErrorText("Calculated freshwater thickness less than 5 m thickness. Please choose a lower pumping rate or higher permeability.");
				setUpdatingGraph(false);
				return;
			}

			setCalculatedData(elements);
			setCalculatedFlowData(null);
			if(calculateFlowVectors) {
				calcFlowVectors(delx, h, z);
			}
			props.OnUpdateData(results);
			
			setMinY(min(min(z), min(h)));
			setMaxY(max(max(z), max(h)));
			setMinX(min(x));
			setMaxX(max(x));

			if(calculateFlowVectors === false) {
				setUpdatingGraph(false);
			}
	}

	useEffect(() => {
		if(sharpInterfaceWorker !== null) {
			sharpInterfaceWorker.onmessage = (message) => {
				if(message.data.type === 'results' ) {
					generateGraph(message.data.data);
				}
			}
			calcInterface();
			
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sharpInterfaceWorker, delx, k, Rech, Qp, nQp]);

	/**
	 * Converts to degrees with the vertical flip
	 * This is to adjust for the default position of the element line
	 * @param {float} angle 
	 */
	function toAdjustedDegrees (angle) {
		return 360 - angle * (180 / Math.PI);
	}

	return(
		<Paper className={classes.root}>
			<Grid container spacing={3}>
				<Grid item md={8} xs={12} className={classes.graphGrid}>
					<div style={{position: "relative"}}>	
					<Line
					  data={{
							datasets: [
								{
									type: 'line',
									data: calculatedData == null ? null : calculatedData.map(e => ({ x : e.x, y: e.z})),
									fill: 'bottom',
									label: "Seawater",
									backgroundColor: '#ffab55'
								},
								{
									type: 'line',
									data: calculatedData == null ? null : calculatedData.map(e => ({ x : e.x, y: e.h})),
									fill: 0,
									label: "Fresh Water",
									backgroundColor: '#72a9e1'
								},
								{
									type: 'scatter',
									data: calculatedFlowData == null ? null : calculatedFlowData[1].map(x => x.point),
									rotation: calculatedFlowData == null ? null : calculatedFlowData[1].map(x => toAdjustedDegrees(Math.atan(x.qz/x.qx))),
									label: "Flow Vectors",
									pointStyle: "line",
									borderColor: "rgba(0,0,0,1)"
								}
							]
				
							}} 
							title="Freshwater/Saltwater Interface" 
							options={
							{
								scales: {
										yAxes: [{
											type: 'linear',
											position: 'left',
											scaleLabel: {
												display: true,
												labelString: "Elevation (m)"
											},
											ticks: {
													suggestedMin: minY, 
													suggestedMax: maxY
												}
										}],
										xAxes: [{
											beginAtZero: true,
											type: 'linear',
											position: 'bottom',
											scaleLabel: {
												display: true,
												labelString: "Distance (m)"
											},
											ticks: {
												suggestedMin: minX,
												suggestedMax: maxX,
												stepSize: delx
										}
										}]
								},
								tooltips: {
									enabled: false
								},
								legend: {
									onClick: (e) => e.stopPropagation(),
									labels: {
										usePointStyle: true
									}
								}
						}}/>
						{ errorText && <Grid container justify="center"  alignItems="center" style={{position: "absolute", top:0, bottom:0, left:0, right:0, backgroundColor: 'red', opacity: '75%', borderRadius: '15px'}}>
							<Typography><b>{errorText}</b></Typography>
							</Grid>
						}										
						{updatingGraph && <Grid container justify="center"  alignItems="center" style={{position: "absolute", top:0, bottom:0, left:0, right:0, backgroundColor: 'black', opacity: '75%', borderRadius: '15px'}}>
							<CircularProgress/>
							<Typography className={classes.updatingText}>{updatingGraphText}</Typography>
						</Grid>
						}		
					</div>
				</Grid>
				<Grid item md={4} xs={12}>
					<Typography variant="h1" >
						Controls
					</Typography>


						<FormGroup>
							<SliderForm
								disabled={updatingGraph}
								title="delx (m): Controls the grid size"
								min={30}
								valueLabelDisplay="auto"
								max={120}
								value={delx}
								onChange={(event, value) => setDelx(value)}
							/>

							<SliderForm
								disabled={updatingGraph}
								title="k (m^2): Controls the permeability of aquifer"
								min={-14}
								valueLabelDisplay="auto"
								max={-10}
								step={.1}
								value={k}
								onChange={(event, value) => setK(value)}
							/>


							<SliderForm
								title="Rech (m/day): The amount of water replenishing the aquifer"
								disabled={updatingGraph}
								min={.001}
								valueLabelDisplay="auto"
								max={.020}
								step={.001}
								value={Rech}
								onChange={(event, value) => setRech(value)}
							/>

							<SliderForm
								title="Qp (m^3/day/island area): The pumping rate"
								disabled={updatingGraph}
								min={.1}
								valueLabelDisplay="auto"
								max={1}
								step={.05}
								value={Qp}
								onChange={(event, value) =>  setQp(value)}
							/>

							<SliderForm
								title="nQp: The node where pumping occurs from"
								disabled={updatingGraph}
								min={10}
								valueLabelDisplay="auto"
								max={90}
								value={nQp}
								marks
								onChange={(event, value) => setnQp(value)}
							/>

							<FormControlLabel
								className={classes.formControlLabel}
								disabled={updatingGraph}
								control={
									<Switch
										color='primary'
										checked={calculateFlowVectors}
										onChange={handleSwitchOnChange}
									/>
								}
								label="Calculate Flow Vectors"
							/>
					</FormGroup>
				</Grid>
			</Grid>
		</Paper>
	);
}