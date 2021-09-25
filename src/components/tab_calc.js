import React, {useEffect} from 'react';
import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { min, max } from 'mathjs';
import { Paper, Typography, Grid, CircularProgress} from '@material-ui/core';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SharpInterfaceWorker from 'workerize-loader!../calc_interface/sharp_fdm_glover_v2.worker';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FlowWorker from 'workerize-loader!../calc_flow/calc_flow';
import Controls from './calc/controls';
import InterfaceGraph from './calc/chart';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(2),
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
	graphGrid: {
		positon: "relative"
	},
	updatingText: {
		color: "white"
	},
	updatingOverlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'black',
		opacity: '75%',
		borderRadius: '15px'
	},
	errorOverlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'red',
		opacity: '75%',
		borderRadius: '15px'
	}
}));

const calcSharpInterfaceUpdatingText = "Calculating Sharp Interface..."
const calcFlowVectorsUpdatingText = "Calculating Flow Vectors..."

export default function InterfaceCalculator(props) {
	const [sharpInterfaceWorker, setSharpInterfaceWorker] = useState(null);
	const [flowWorker, setFlowWorker] = useState(null);
	const [delx, setDelx] = useState(60);
	const [k, setK] = useState(-11);
	const [Rech, setRechBase] = useState(5e-3);
	const [rechIndex, setRechIndex] = useState(2);
	const [Qp, setQp] = useState(0.2);
	const [nQp, setnQp] = useState(50);
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

	const rechValues = [
		{
			value: 0,
			label: "1e-3"
		},
		{
			value: 1,
			label: "2e-3"
		},
		{
			value: 2,
			label: "5e-3"
		},
		{
			value: 3,
			label: "2e-2"
		},
		{
			value: 4,
			label: "3e-2"
		},
		{
			value: 5,
			label: "4e-2"
		},
		{
			value: 6,
			label: "5e-2"
		}
	]

	function setRech(value) {
		setRechBase(parseFloat(rechValues[value].label));
		setRechIndex(value);
	}

	function handleSwitchOnChange(event) {
		setCalculateFlowVectors(event.target.checked);
		// If it hasn't been calculated, calculate it right now
		if(calculatedFlowData === null && event.target.checked) {
			calcFlowVectors(delx, calculatedData.map(x => x.h), calculatedData.map(x => x.z))
		}
	}

	useEffect(() => {

		const siw = SharpInterfaceWorker();
		setSharpInterfaceWorker(siw);
		const fw = FlowWorker();
		setFlowWorker(fw);

		// Cleanup Function
		return function () {
			siw.terminate();
			fw.terminate();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps,
	}, []);

	function updateHFEMHeadNodes(hfemElements) {

		let count = 0;
		// Only touch the top nodes
		for(let i = 20; i < hfemElements.length; i = i + 21) {
			hfemElements[i].z = calculatedData[count++].h;

		}
		return hfemElements;
	}

	function calcFlowVectors(delx, h, z) {
		flowWorker.onmessage= (message) => {
			if(message.data.type === 'results' ) {
				const results = message.data.data;

				results[0] = updateHFEMHeadNodes(results[0]);
				results[1] = results[1].filter(function(d, i) { return (i) % 7 === 0; });
				console.log("hfem length: " + results[0].length)
				console.log("flow length: " +results[1].length)
				setCalculatedFlowData(results);
				setUpdatingGraph(false);
			}
		}
		flowWorker.postMessage([delx, h, z]);
		setUpdatingGraph(true);
		setUpdatingGraphText(calcFlowVectorsUpdatingText);
	}

	function calcInterface() {
		setUpdatingGraph(true);
		setUpdatingGraphText(calcSharpInterfaceUpdatingText);
		setErrorText(null);
		console.log([delx, k, Rech, Qp * delx, nQp]);
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
			console.log(max(x));
			console.log(min(x));
			console.log(min(min(z), min(h)));
			console.log(max(max(z), max(h)));
			console.log(delx);
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

		// Round to the tenth. Limit the amount of colors that the computer has to render
		const colorStep = Math.ceil(255/(max-min) * Math.round(x * 10)/10);

		const returnValue = "rgba(" + colorStep.toString() + "," + colorStep.toString() + "," + (255-colorStep).toString() + ",1)";
		return returnValue;

	}

	function getCalculatedFlowDataSorted() {
		return calculatedFlowData[0].map(x => { return {x: x.x, y: x.z, hfem: x.hfem}} );
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
				pointStyle: arrowImage
			}, {
				type: 'scatter3D',
				data: calculatedFlowData == null ? null : getCalculatedFlowDataSorted(),
				label: "hfem",
				backgroundColor: 'rgba(0,0,0,0)',
				borderColor: calculatedFlowData == null ? null : calculatedFlowData[0].map(x => determineColor(x.hfem)),
				pointBackgroundColor: calculatedFlowData == null ? null : calculatedFlowData[0].map(x => determineColor(x.hfem)),
			}];
		} else {
			return [{
				type: 'line',
				data: calculatedData == null ? null : calculatedData.map(e => ({ x : e.x, y: e.z})),
				fill: 'start',
				label: "Seawater",
				borderColor: '#ffab55',
				backgroundColor: '#ffab55'
			},
			{
				type: 'line',
				data: calculatedData == null ? null : calculatedData.map(e => ({ x : e.x, y: e.h})),
				fill: '-1',
				label: "Fresh Water",
				borderColor: '#72a9e1',
				backgroundColor: '#72a9e1'
			}];
		}
	}

	function getOverlays() {
		if(errorText) {
			return (
			<Grid container justify="center"  alignItems="center" className={classes.errorOverlay}>
				<Typography><b>{errorText}</b></Typography>
			</Grid>
			);
		}
		if(updatingGraph) {
			return (
				<Grid container justify="center"  alignItems="center" className={classes.updatingOverlay}>
					<CircularProgress/>
					<Typography className={classes.updatingText}>{updatingGraphText}</Typography>
				</Grid>
			);
		}
	}

	return(
		<Paper className={classes.root}>
			<Grid container spacing={3}>
				<Grid item md={8} xs={12} className={classes.graphGrid}>
					<div style={{position: "relative"}}>
						<InterfaceGraph
							datasets = {getDatasets()}
							minY = {minY}
							maxY = {maxY}
							delx = {delx}
							minX = {minX}
							maxX = {maxX}
						/>
						{getOverlays()}
					</div>
				</Grid>
				<Controls
					updatingGraph={updatingGraph}
					delx = {delx}
					setDelx = {setDelx}

					k = {k}
					setK = {setK}

					Rech = {rechIndex}
					setRech = {setRech}
					rechValues={rechValues}

					Qp = {Qp}
					setQp = {setQp}

					nQp = {nQp}
					setnQp = {setnQp}

					calculateFlowVectors = {calculateFlowVectors}
					handleSwitchOnChange = {handleSwitchOnChange}
				/>
			</Grid>
		</Paper>
	);
}