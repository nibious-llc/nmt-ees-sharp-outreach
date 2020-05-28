import React, {useEffect} from 'react';
import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { index, min, max } from 'mathjs';
import { Line } from 'react-chartjs-2';
import Slider from './slider';
import { Paper, Typography, Button, Grid, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(2),
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1)
	}
}));

export default function Body(props) {
	const worker = new Worker('./sharp_fdm_glover_v2.js');
	const [delx, setDelx] = useState(60);
	const [k, setK] = useState(-11);
	const [Rech, setRech] = useState(0.009);
	const [Qp, setQp] = useState(0.35);
	const [nQp, setnQp] = useState(10);


	const [data, setData] = useState(null);
	const [minY, setMin] = useState(0);
	const [maxY, setMax] = useState(0);

	const [grid1Item, setGrid1Item] = useState(null);
	const classes = useStyles();


	function handleSliderChange(event, value) {
		event == "delx" && setDelx(value);
		event == "k" && setK(value);
		event == "Rech" && setRech(value);
		event == "Qp" && setQp(value);
		event == "nQp" && setnQp(value);
		setGrid1Item(<CircularProgress/>)
		console.log("Posting Message");
		worker.postMessage([delx, k, Rech, Qp, nQp]);
	};

	const generateGraph = (results) => {
			const [x, h, z] = results;
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
	
			setData(data);
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
					}
			}}/>)
	}

	useEffect(() => {
		worker.onmessage = (e) => {
			generateGraph(e.data);
		}
  }, [worker]);

	return(
		<Paper className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={8}>
					{grid1Item}
				</Grid>
				<Grid item xs={4}>
					<Typography variant="h4" >
						Controls
					</Typography>

					<Slider
						title = "delx: Controls the grid size"
						min={30}
						valueLabelDisplay="auto"
						max={120}
						units="m"
						value={delx}
						onChange={(event, value) => handleSliderChange("delx", value)}
					/>
					
					<Slider
						title="k: Controls the permeability of aquifer"
						min={-14}
						valueLabelDisplay="auto"
						max={-10}
						units="m^2"
						step={.1}
						value={k}
						onChange={(event, value) => handleSliderChange("k", value)}
					/>

					<Slider
						title="Rech: The amount of water replenishing the aquifer"
						min={.001}
						valueLabelDisplay="auto"
						max={.020}
						step={.001}
						units="m/day"
						value={Rech}
						onChange={(event, value) => handleSliderChange("Rech", value)}
					/>

					<Slider
						title="Qp: The pumping rate"
						min={.1}
						valueLabelDisplay="auto"
						max={1}
						step={.05}
						units="m^3/day/m"
						value={Qp}
						onChange={(event, value) => handleSliderChange("Qp", value)}
					/>

					<Slider
						title="nQp: The node where pumping occurs from"
						min={10}
						valueLabelDisplay="auto"
						max={90}
						units=""
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

