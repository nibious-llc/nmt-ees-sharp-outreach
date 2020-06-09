import React, {useEffect} from 'react';
import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { min, max } from 'mathjs';
import { Line } from 'react-chartjs-2';
import ValueSlider from './slider';
import { Paper, Typography, Grid, CircularProgress, Slider, Box } from '@material-ui/core';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'workerize-loader!./sharp_fdm_glover_v2.worker';

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
	iterationSlider: {
		width: '90%'
	}
}));


function generateMarks() {
	const results = new Array(10);
	for(let i = 0; i < 10; i++) {
		results[i] = {
			value: i,
			label: "Iter. " + i
		}
	}
	return results;
}

export default function InterfaceCalculator(props) {
	const worker = Worker();
	const [delx, setDelx] = useState(60);
	const [k, setK] = useState(-11);
	const [Rech, setRech] = useState(0.009);
	const [Qp, setQp] = useState(0.30);
	const [nQp, setnQp] = useState(10);
	const [calculatedZZ, setCalculatedZZ] = useState(null);
	const [calculatedHH, setCalculatedHH] = useState(null);
	const [calculatedX, setCalculatedX] = useState(null);
	const [currentIteration, setCurrentIteration] = useState(9);
	const [sliderValue, setSliderValue] = useState(9);

	const [updatingGraph, setUpdatingGraph] = useState(true);
	const [minY, setMinY] = useState(0);
	const [maxY, setMaxY] = useState(0);
	const [minX, setMinX] = useState(0);
	const [maxX, setMaxX] = useState(0);
	const [errorText, setErrorText] = useState(null);
	const classes = useStyles();


	function handleSliderChange(event, value) {
		event === "delx" && setDelx(value);
		event === "k" && setK(value);
		event === "Rech" && setRech(value);
		event === "Qp" && setQp(value);
		event === "nQp" && setnQp(value);
	};

	function iterationSliderOnChange(event, value) {
		setSliderValue(value);
	}

	function iterationsSliderOnChangeCommited(event, value) {
		setCurrentIteration(value);
	}

	function calcInterface() {
		setUpdatingGraph(true);
		setErrorText(null);
		worker.postMessage([delx, k, Rech, Qp, nQp]);
	}

	function generateGraph(results) {
			const [x, hh, zz] = results;

			// Check for invalid results
			const z = zz[zz.length - 1];
			if(max(z) > -5) {
				setErrorText("Calculated freshwater thickness less than 5 m thickness. Please choose a lower pumping rate or higher permeability.");
				setUpdatingGraph(false);
				return;
			}

			setCalculatedHH(hh);
			setCalculatedZZ(zz);
			setCalculatedX(x);	
			
			setMinY(min(min(zz), min(hh)));
			setMaxY(max(max(zz), max(hh)));
			setMinX(min(x));
			setMaxX(max(x));

			setCurrentIteration(9);
			setUpdatingGraph(false);
	}

	useEffect(() => {
		worker.onmessage = (message) => {
			if(message.data.type === 'results' ) {
				generateGraph(message.data.data);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps,
	}, [worker]);
	
	useEffect(() => {
		calcInterface();
		// eslint-disable-next-line react-hooks/exhaustive-deps,
	}, [delx, k, Rech, Qp, nQp]);

	return(
		<Paper className={classes.root}>
			<Grid container spacing={3}>
				<Grid item md={8} xs={12} className={classes.graphGrid}>
					<div style={{position: "relative"}}>				
					<Line data={{
							labels: calculatedX,
							datasets: [
								{
									data: calculatedZZ == null ? null : calculatedZZ[currentIteration],
									fill: 'bottom',
									label: "Seawater",
									backgroundColor: '#ffab55'
								},
								{
									data: calculatedHH == null ? null : calculatedHH[currentIteration],
									fill: 0,
									label: "Fresh Water",
									backgroundColor: '#72a9e1'
								}
							]
				
							}} title="Freshwater/Saltwater Interface" options={
							{
								scales: {
										yAxes: [{
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
											scaleLabel: {
												display: true,
												labelString: "Distance (m)"
											},
											ticks: {
												suggestedMin: minX,
												suggestedMax: maxX
										}
										}]
								},
								title: {
									display: true,
									test: ''
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
						</Grid>
						}
						<Box alignContent="center">
							<Typography variant="caption">
								Iteration Selection
							</Typography>
							<Slider
								defaultValue={9}
								onChange={iterationSliderOnChange}
								onChangeCommitted={iterationsSliderOnChangeCommited}
								value={sliderValue}
								marks={generateMarks()}
								min={0}
								max={9}
								track={false}
								className={classes.iterationSlider}
							/>
						</Box>
					</div>
				</Grid>
				<Grid item md={4} xs={12}>
					<Typography variant="h1" >
						Controls
					</Typography>

					<ValueSlider
						disabled={updatingGraph}
						title = "delx (m): Controls the grid size"
						min={30}
						valueLabelDisplay="auto"
						max={120}
						value={delx}
						onChange={(event, value) => handleSliderChange("delx", value)}
					/>
					
					<ValueSlider
						disabled={updatingGraph}
						title="k (m^2): Controls the permeability of aquifer"
						min={-14}
						valueLabelDisplay="auto"
						max={-10}
						step={.1}
						value={k}
						onChange={(event, value) => handleSliderChange("k", value)}
					/>

					<ValueSlider
						disabled={updatingGraph}
						title="Rech (m/day): The amount of water replenishing the aquifer"
						min={.001}
						valueLabelDisplay="auto"
						max={.020}
						step={.001}
						value={Rech}
						onChange={(event, value) => handleSliderChange("Rech", value)}
					/>

					<ValueSlider
						disabled={updatingGraph}
						title="Qp (m^3/day/island area): The pumping rate"
						min={.1}
						valueLabelDisplay="auto"
						max={1}
						step={.05}
						value={Qp}
						onChange={(event, value) => handleSliderChange("Qp", value)}
					/>

					<ValueSlider
						disabled={updatingGraph}
						title="nQp: The node where pumping occurs from"
						min={10}
						valueLabelDisplay="auto"
						max={90}
						value={nQp}
						onChange={(event, value) => handleSliderChange("nQp", value)}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
}