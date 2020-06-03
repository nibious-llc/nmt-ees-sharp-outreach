import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Container, Box} from '@material-ui/core';
import IslandSchematic from '../images/island_schematic.webp';

const useStyles = makeStyles((theme) => ({
	root: {
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
	image: {
		width: '100%'
	},
	text: {
		margin: theme.spacing(2)
	}
}));

export default function Home(props) {

	const classes = useStyles();

	return (
		<Container maxWidth="lg">
			<Paper className={classes.root}>
				<Box textAlign="left">
					<Typography variant="h1">
						About
					</Typography>
					<Typography className={classes.text}>
						Assessing the effects of pumping on island aquifer systems can be carried out
						using a sharp-interface model. In sharp interface theory, we solve for the
						position of the water table and the freshwater-seawater transition zone. 
						Both are surfaces that vary depending on the choice of recharge rate, 
						pumping rate, recharge rate, and island size (here controlled by the nodal
						spacing (&Delta;x). These models are statements of water conservation. 
						That is what is coming in (Recharge across the land surface) must be 
						balanced by what is going out (groundwater pumping and discharge to the 
						ocean). The model is called a distributed parameter model which means 
						that the height of the water table and the saltwater interface can vary 
						in each cell. 
					</Typography>
					<Typography className={classes.text}>
						Initially we will calculate saltwater upconing beneath an island that
						is 6 km wide island by solving two steady-state groundwater flow equations 
						for fresh and saltwater flow. The position of a single pumping well (Q<sub>p</sub>) 
						can be moved  be from the center of the island (node 50) toward the coast 
						line (node 10). You can change many of the variables using a slider bar. 
					</Typography>
				</Box>
				<Container maxWidth="md">
					<img className={classes.image} src={IslandSchematic} alt="A view of the island layout"/>
				</Container>
			</Paper>
		</Container>
	);
}