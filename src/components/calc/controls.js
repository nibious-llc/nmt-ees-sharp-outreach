import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Switch, FormGroup, FormControlLabel } from '@material-ui/core';
import SliderForm from '../SliderForm';
import SliderFormK from './SliderFormK';

const useStyles = makeStyles((theme) => ({
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


export default function Controls(props) {
	const classes = useStyles();
	return (
		<Grid item md={4} xs={12}>
			<Typography variant="h1" >
				Controls
			</Typography>
				<FormGroup>
					<SliderForm
						disabled={props.updatingGraph}
						title="delx (m): Controls the grid size"
						min={30}
						valueLabelDisplay="auto"
						max={120}
						value={props.delx}
						onChange={(event, value) => props.setDelx(value)}
					/>

					<SliderFormK
						disabled={props.updatingGraph}
						title="k (m^2): Controls the permeability of aquifer"
						min={-14}
						valueLabelDisplay="auto"
						max={-10}
						step={.1}
						value={props.k}
						onChange={(event, value) => props.setK(value)}
					/>


					<SliderForm
						title="Rech (m/day): The amount of water replenishing the aquifer"
						disabled={props.updatingGraph}
						min={.001}
						valueLabelDisplay="auto"
						max={.020}
						step={.001}
						value={props.Rech}
						onChange={(event, value) => props.setRech(value)}
					/>

					<SliderForm
						title="Qp (m^3/day/island area): The pumping rate"
						disabled={props.updatingGraph}
						min={.1}
						valueLabelDisplay="auto"
						max={1}
						step={.05}
						value={props.Qp}
						onChange={(event, value) =>  props.setQp(value)}
					/>

					<SliderForm
						title="nQp: The node where pumping occurs from"
						disabled={props.updatingGraph}
						min={10}
						valueLabelDisplay="auto"
						max={90}
						value={props.nQp}
						marks
						onChange={(event, value) => props.setnQp(value)}
					/>

					<FormControlLabel
						className={classes.formControlLabel}
						disabled={props.updatingGraph}
						control={
							<Switch
								color='primary'
								checked={props.calculateFlowVectors}
								onChange={props.handleSwitchOnChange}
							/>
						}
						label="Calculate Flow Vectors"
					/>
			</FormGroup>
		</Grid>
	);
}