import React, {useEffect} from 'react';
import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { min, max } from 'mathjs';
import { Paper, Typography, Grid, CircularProgress, Switch, FormGroup, FormControlLabel } from '@material-ui/core';
import { Line, Chart } from 'react-chartjs-2';
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
	const [calculateFlowVectors, setCalculateFlowVectors] = useState(true);
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

	function registerScatter3DChart() {
		Chart.defaults.scatter3D = Chart.defaults.scatter;
		var custom = Chart.controllers.scatter.extend({
			draw: function(ease) {
				var meta = this.getMeta();
				if(meta.data.length > 0 ) {

					var ctx = this.chart.chart.ctx;
					ctx.save();
					for(let i = 0; i < meta.data.length - 22; i++) {
						var pt = meta.data[i];
						var nextPt = meta.data[i + 1];

						const startX = pt._view.x;
						const startY = pt._view.y;
						const belowX = nextPt._view.x;
						const belowY = nextPt._view.y;

						const nextX = meta.data[i+21]._view.x;
						const nextY = meta.data[i+21]._view.y;

						const nextBelowX = meta.data[i + 22]._view.x;
						const nextBelowY = meta.data[i + 22]._view.y;

						if(startX > belowX) {
							//We don't need to be drawing backwards
							continue;
						}
						if(startY < belowY) { continue; }

						//if(startY > belowY) { console.log("skipping"); continue; }

						
						var grd1 = ctx.createLinearGradient(startX, startY, nextX, nextY);
						grd1.addColorStop(0, pt._view.backgroundColor);
						grd1.addColorStop(1, meta.data[i+21]._view.backgroundColor);

						ctx.fillStyle = grd1;
						ctx.strokeStyle = grd1;
						ctx.lineWidth = -1;
						

						ctx.beginPath();
						ctx.moveTo(startX, startY);

						ctx.lineTo(nextX, nextY);
						

						ctx.lineTo(nextBelowX, nextBelowY);		
						
						ctx.lineTo(belowX, belowY);	
						

						ctx.lineTo(startX, startY);	
						ctx.stroke();

						ctx.fill();
							
					}
					ctx.restore();
				}
			}
		});

		Chart.controllers.scatter3D = custom;
	}
	registerScatter3DChart();



	function registerVectorChart() {
		Chart.defaults.vector = Chart.defaults.scatter;
		var custom = Chart.controllers.scatter.extend({
			draw: function(ease) {
				var meta = this.getMeta();
				if(meta.data.length > 0 ) {

					var ctx = this.chart.chart.ctx;
					ctx.save();
					for(let i = 0; i < meta.data.length; i++) {
						var pt = meta.data[i];

						const startX = pt._view.x;
						const startY = pt._view.y;

						const qz = pt._view.rotation.qx;
						const qx = pt._view.rotation.qz;

						const magnitude = Math.sqrt(Math.pow(qx, 2) + Math.pow(qz, 2));
						let  angle = Math.atan(qz/qx);
						if(qx > 0) {
							angle = angle - Math.PI;
						}

						const endX = 0;
						const endY = magnitude * 10;

						ctx.beginPath();
						ctx.strokeStyle = 'rgba(0,0,0,1)';						
						ctx.translate(startX, startY);
						ctx.rotate(angle);
						
						ctx.moveTo(0, 0);
						ctx.lineTo(endX, endY);
						ctx.lineTo(endX - 3, endY - 3);
						ctx.moveTo(endX, endY);
						ctx.lineTo(endX + 3, endY - 3);						
						ctx.stroke();

						ctx.rotate(-1 * angle);
						ctx.translate(-1 * startX, -1 * startY);
					}
					ctx.restore();
				}
			}
		});

		Chart.controllers.vector = custom;
	}
	registerVectorChart();


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



	function reduceElementCount(e, index) {
		return index % 7 === 0;
	}
	
	function calcFlowVectors(delx, h, z) {
		flowWorker.onmessage= (message) => {
			if(message.data.type === 'results' ) {
				const results = message.data.data;
				results[1] = results[1].filter(reduceElementCount);
				setCalculatedFlowData(results);
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

	function determineColor(x) {
		const min = Math.min(...calculatedFlowData[0].map(x => x.hfem));
		const max = Math.max(...calculatedFlowData[0].map(x => x.hfem));
		const colorStep = Math.ceil(255/(max-min) * x);

		const returnValue = "rgba(" + colorStep.toString() + "," + colorStep.toString() + "," + (255-colorStep).toString() + ",1)";
		return returnValue;
		
	}

	function getCalculatedFlowDataSorted() {
		return calculatedFlowData[0].map(x => { return {x: x.x, y: x.z}} );
	}
	var arrowImage = new Image(15, 15);
	arrowImage.src = "/nmt-ees-sharp-outreach/arrow.svg";
	
	function getDatasets() {
		if(calculateFlowVectors) {	
			return [{
				type: 'vector',
				data: calculatedFlowData == null ? null : calculatedFlowData[1].map(x => x.point),
				rotation: calculatedFlowData == null ? null : calculatedFlowData[1].map(x => { return {qx: x.qx/Math.sqrt(Math.pow(x.qx, 2) + Math.pow(x.qz,2)), qz: x.qz/Math.sqrt(Math.pow(x.qx, 2) + Math.pow(x.qz,2))}}),
				label: "Flow Vectors",
				pointStyle: arrowImage,
				backgroundColor: 'rgba(0,0,0,0)'
			},{
				type: 'scatter3D',
				data: calculatedFlowData == null ? null : getCalculatedFlowDataSorted(),
				label: "hfem",
				backgroundColor: 'rgba(0,0,0,0)',
				borderColor: calculatedFlowData == null ? null : calculatedFlowData[0].map(x => determineColor(x.hfem)),
				pointBackgroundColor: calculatedFlowData == null ? null : calculatedFlowData[0].map(x => determineColor(x.hfem))								
			}];
		} else {
			return [{
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
			}];
		}
	}

	return(
		<Paper className={classes.root}>
			<Grid container spacing={3}>
				<Grid item md={8} xs={12} className={classes.graphGrid}>
					<div style={{position: "relative"}}>	
					<Line
					  data={{
							datasets: getDatasets()				
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
									enabled: true,
									callbacks: {
										label: function(tooltipItem, data) 
													{
														var label = data.datasets[tooltipItem.datasetIndex].label || '';
														if (data.datasets[tooltipItem.datasetIndex].type === "scatter3D") {
															return "hfem: " + calculatedFlowData[0][tooltipItem.index].hfem.toString();
														}
														if (data.datasets[tooltipItem.datasetIndex].type === "vector") {
															return "";
														}
														return label + ": " + tooltipItem.y;
														
													},
										title: function(tooltipItem, data) 
													{														
														return "Values"
													}
									}
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