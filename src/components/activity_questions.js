import React from 'react';
import { 
	makeStyles 
} from '@material-ui/core/styles';
import {
	List, 
	ListItem, 
	Paper, 
	Typography, 
	Box
} from '@material-ui/core';


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

export default function ActivityQuestions() {
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<Box textAlign="left">
				<Typography variant="h1">
					Activity Questions
				</Typography>
				<List>
					<ListItem>
						1. Vary the pumping well position (Iwell) from nodes 41, 61, and
						81, How does the position of the pumping well effect the water 
						table and interface position? 
					</ListItem>
					<ListItem>
						2. How does hydraulic conductivity and the recharge rate influence 
						saturated thickness?
					</ListItem>
					<ListItem>
						3. How many iterations does it takes to converge (Iter variable). 
						How many iterations does it take to achieve convergence? Plot h and 
						z for each iteration for the model run where Qp is at node 51 to
						demonstrate convergence.
					</ListItem>
					<ListItem>
						4. For Iwell = 41, vary the pumping rate (Qp) between 0.15, 0.165, 
						and 0.17? How does the interface respond to changes in pumping rates?
					</ListItem>
				</List>
			</Box>
		</Paper>
	);
}	