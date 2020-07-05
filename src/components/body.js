import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InterfaceCalculator from './tab_calc.js';
import HomeTab from './tab_home';
import EquationTab from './tab_equations';
import { Tabs, Tab, Typography, Paper, Box, List, ListItem } from '@material-ui/core';

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
	const classes = useStyles();
	const [tabValue, setTabValue] = React.useState(1);
	const [calculatedData, setCalculatedData] = React.useState(null);

	function handleTabOnChange(event, newValue) {
		setTabValue(newValue);
	}

	function storeCalculatedData(data) {
		setCalculatedData(data);
	}

	return (
		<div>
			<Tabs 
				value={tabValue}
				onChange={handleTabOnChange}
				indicatorColor="primary"
				textColor="primary"
				centered>
					<Tab label="Seawater Intrusion"/>
					<Tab label="Exercises"/>
					<Tab label="Equations"/>
			</Tabs>
			<div hidden={tabValue !== 0}>
				<HomeTab/>
			</div>
			<div hidden={tabValue !== 1}>
				<InterfaceCalculator OnUpdateData={storeCalculatedData}/>
				<Paper className={classes.root}>
					<Box textAlign="left">
						<Typography variant="h1">
							Activity Questions
						</Typography>
						<List>
							<ListItem>1. Vary the pumping well position (Iwell) from nodes 41, 61, and 81, How does the position of the pumping well effect the water table and interface position? </ListItem>
							<ListItem>2. How does hydraulic conductivity and the recharge rate influence saturated thickness?</ListItem>
							<ListItem>3. How many iterations does it takes to converge (Iter variable). How many iterations does it take to achieve convergence? Plot h and z for each iteration for the model run where Qp is at node 51 to demonstrate convergence.</ListItem>
							<ListItem>4. For Iwell = 41, vary the pumping rate (Qp) between 0.15, 0.165, and 0.17? How does the interface respond to changes in pumping rates?</ListItem>
						</List>
					</Box>
				</Paper>
			</div>
			<div hidden={tabValue !== 2}>
				<EquationTab data={calculatedData}/>
			</div>
		</div>
	);
}