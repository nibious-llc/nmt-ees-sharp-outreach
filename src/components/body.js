import React, {useEffect} from 'react';
import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { min, max } from 'mathjs';
import { Line } from 'react-chartjs-2';
import Fade from '@material-ui/core/Fade';
import Slider from './slider';
import { Paper, Typography, Grid, CircularProgress } from '@material-ui/core';
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
	}
}));

export default function Body(props) {
	const worker = Worker();
	const [delx, setDelx] = useState(60);
	const [k, setK] = useState(-11);
	const [Rech, setRech] = useState(0.009);
	const [Qp, setQp] = useState(0.30);
	const [nQp, setnQp] = useState(10);

	const [updatingGraph, setUpdatingGraph] = useState(true);
	const [minY, setMin] = useState(0);
	const [maxY, setMax] = useState(0);
	const [errorText, setErrorText] = useState(null);
	const [grid1Item, setGrid1Item] = useState(null);
	const classes = useStyles();


	function handleSliderChange(event, value) {
		event == "delx" && setDelx(value);
		event == "k" && setK(value);
		event == "Rech" && setRech(value);
		event == "Qp" && setQp(value);
		event == "nQp" && setnQp(value);
	};

	function calcInterface() {
		setUpdatingGraph(true);
		setErrorText(null);
		worker.postMessage([delx, k, Rech, Qp, nQp]);
	}

	function generateGraph(results) {
			const [x, h, z] = results;

			if(max(z) > -5) {
				setErrorText("Calculated freshwater thickness less than 5 m thickness. Please choose a lower pumping rate or higher permeability.");
				setUpdatingGraph(false);
				return;
			}

			let data = {
				labels: x,
				datasets: [
				]
			};
		
			data.datasets.push({
				data: z,
				fill: 'bottom',
				label: "Seawater-Freshwater Interface",
				backgroundColor: '#ffab55'
			});
		
			data.datasets.push({
				data: h,
				fill: 0,
				label: "Water Table",
				backgroundColor: '#72a9e1'
			});
	
			setMin(min([min(h), min(z)]) - 20);
			setMax(max([max(h), max(z)]) + 20);
			setGrid1Item(<Line data={data} title="Something" options={
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
									suggestedMin: min(data.labels), 
									suggestedMax: max(data.labels)
							}
							}]
					},
					title: {
						display: true,
						test: ''
					},
					legend: {
						onClick: (e) => e.stopPropagation()
					}
			}}/>)
			setUpdatingGraph(false);
	}

	useEffect(() => {
		worker.onmessage = (message) => {
			if(message.data.type === 'results' ) {
				generateGraph(message.data.data);
			}
		}
	}, [worker]);
	
	useEffect(() => {
		calcInterface();
	}, [delx, k, Rech, Qp, nQp]);

	return(
		<Paper className={classes.root}>
			<Grid container spacing={3}>
				<Grid item md={8} xs={12} className={classes.graphGrid}>
					<div style={{position: "relative"}}>
						{grid1Item}
						<Fade in={errorText}>
							<Grid container justify="center"  alignItems="center" style={{position: "absolute", top:0, bottom:0, left:0, right:0, backgroundColor: 'red', opacity: '75%', borderRadius: '15px'}}>
							<Typography><b>{errorText}</b></Typography>
							</Grid>
						</Fade>						
						<Fade in={updatingGraph}>
							<Grid container justify="center"  alignItems="center" style={{position: "absolute", top:0, bottom:0, left:0, right:0, backgroundColor: 'black', opacity: '75%', borderRadius: '15px'}}>
								<CircularProgress/>
							</Grid>
						</Fade>
					</div>
				</Grid>
				<Grid item md={4} xs={12}>
					<Typography variant="h4" >
						Controls
					</Typography>

					<Slider
						disabled={updatingGraph}
						title = "delx (m): Controls the grid size"
						min={30}
						valueLabelDisplay="auto"
						max={120}
						value={delx}
						onChange={(event, value) => handleSliderChange("delx", value)}
					/>
					
					<Slider
						disabled={updatingGraph}
						title="k (m^2): Controls the permeability of aquifer"
						min={-14}
						valueLabelDisplay="auto"
						max={-10}
						step={.1}
						value={k}
						onChange={(event, value) => handleSliderChange("k", value)}
					/>

					<Slider
						disabled={updatingGraph}
						title="Rech (m/day): The amount of water replenishing the aquifer"
						min={.001}
						valueLabelDisplay="auto"
						max={.020}
						step={.001}
						value={Rech}
						onChange={(event, value) => handleSliderChange("Rech", value)}
					/>

					<Slider
						disabled={updatingGraph}
						title="Qp (m^3/day/island area): The pumping rate"
						min={.1}
						valueLabelDisplay="auto"
						max={1}
						step={.05}
						value={Qp}
						onChange={(event, value) => handleSliderChange("Qp", value)}
					/>

					<Slider
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

/**
 * Calculate the Sharp Interface with given inputs
 * @param {double} delx m: controls size of grid; perhaps vary between 30m to 120m
 * @param {double} k permeability (m^2): controls permeability of aquifer, higher perm leads to lower water table perhaps constrain between 10^-10 to10^-14 m2
 * @param {double} Rech m/day: contrains amount of water replenishing the aquifer; recharge can't be zero 
 * @param {double} Qp Pumping rate (m^3/day/island length) The higher Qp, the lower the water table falls around the pumpming node nQp. If pumping rate is set too high, the code blows up. 
 * @param {int} nQp node where pumping occurs from. Shoud be constrated to be between nodes 10-90

export default function SharpInterface(delx=60, k = 1.0e-11, Rech = 0.009, Qp = 0.35, nQp = 10) { */

