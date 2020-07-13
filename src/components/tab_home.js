import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Container, Box} from '@material-ui/core';
import IslandSchematic from '../images/island_schematic.webp';
import CapeCodPopulation from '../images/cape_cod_population.png';
import WaterTableElevationCapeCod from '../images/waterTableElevationCapeCod.jpg'
import CapeCodModel from '../images/capeCodModel.jpg';
import MathJax from 'react-mathjax';

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
			<MathJax.Provider>
				<Box textAlign="left">
				<Typography variant="h1">
						Introduction
					</Typography>
					<Typography className={classes.text}>
						People are drawn to the sea. Today, nearly all coast communities around the
						world have seen large population increases. There are currently 20 coastal
						megacities each with populations exceeding 8 million people. Even rural areas
						have seen profound increases in population over the past century. On Cape Cod,
						for example, the local population increased by 600% between 1900 and 1990
						(Figure 1). During summer months, coastal populations increase dramatically due
						to tourism.
					</Typography>

					<Container maxWidth="md">
						<Box textAlign="center" alignItems="center">
							<img className={classes.image} src={CapeCodPopulation} alt="Cape Cod Population"/>
							<Typography variant="caption">
								<b>Figure 1.</b> <i>Population growth on Cape Cod (source: US Census data).</i>
							</Typography>
						</Box>
					</Container>

					<Typography variant="h2">
						Water Usage
					</Typography>
					<Typography className={classes.text}>
						Each person in the USA consumes on average about 200 gallons of water per day.
						Water demand on Cape Cod has risen from about 2 billion million gallons per year
						to over 15 billion gallons per year between 1900 and 1990 (Masterson, 2004).
						Water demand is often satisfied by pumping of groundwater hosted in shallow
						aquifers. Aquifers are porous, permeable sediments whose pore spaces are filled
						with freshwater. The upper surface of shallow aquifers is referred to as the
						water table. In coastal regions, the freshwater lens of the water table aquifer
						literally floats on top of seawater much the same way ice bergs flow in the
						ocean. Because of the density differences between freshwater (1000 <MathJax.Node inline formula={'kg/m^3'}/> and
						seawater <MathJax.Node inline formula={'kg/m^3'}/>) for every meter of water table height above sea level there
						are 40 meters of freshwater. The transition between freshwater and seawater is
						referred to as the saltwater-freshwater interface. The interface represents to
						bottom of the shallow water table aquifers. The US EPA indicated that the USA
						drinking water standard for total dissolved solids of groundwater is 500 <MathJax.Node inline formula={'mg/l'}/>.
						Since seawater has a concentration of 35,000 <MathJax.Node inline formula={'mg/l'}/>, just a little seawater that
						intrudes a pumping well renders the well useless as a water supply.
					</Typography>

					<Typography className={classes.text}>
						On Cape Cod the water table has parabolic geometry with maximum water levels
						occurring in the center of the island. On Cape Cod, the maximum water table
						elevation is only about 16 feet (~ 5 <MathJax.Node inline formula={'m'}/>; Figure 2) above sea level. Groundwater
						flows from higher to lower water table elevations much the same way a marble
						will roll downhill. The French hydrogeologist Henry Darcy developed a flow law
						that states that the flux of groundwater is directly proportional to the water
						table gradient. We refer to this relationship as Darcy Law:
					</Typography>

					<MathJax.Node formula={'Q = -KA\\frac{\\Delta h}{\\Delta x}'}/>

					<Typography className={classes.text}>
						where Q is the flux of groundwater (<MathJax.Node inline formula={'m^3/day'}/>), <MathJax.Node inline formula={'A'}/> is the cross-sectional area of
						the aquifer normal to the coastline, <MathJax.Node inline formula={'K'}/> is the hydraulic conductivity which is a
						measure of how transmissive the aquifer is, and <MathJax.Node inline formula={'\\frac{h}{x}'}/> is the water table slope
						taken from the shoreline to the center of the island.
					</Typography>

					<Typography className={classes.text}>
						Groundwater pumping typically represents only a small fraction of the total
						water that replenishes the aquifer due to precipitation (referred to here are
						recharge).  In the case of Cape Cod, pumping represents about 1% of the
						recharge to the island. However, if localized pumping is intense, water table
						levels in the aquifers can drop to below sea level around the well which can
						result in seawater intrusion. On Cape Cod, this has occurred at pumping wells
						near the Town of Truro (Figure 3). The region of water table decline around a
						pumping well is referred to as the cone of depression. The extent of the cone of
						depression is determined by the amount of groundwater withdraws, the
						permeability of the aquifer, the amount of aquifer recharge, and the distance
						from the coastline. Due to isostacy, as the water table falls towards sea level,
						the saltwater responds by rising. This principle was first described by
						Archimedes.
					</Typography>

					<Typography className={classes.text}>
						In this on-line module, you will be able to study the factors that control the
						water table height and saltwater-freshwater interface using a mathematical
						model.
					</Typography>

					<Container maxWidth="md">
						<Box textAlign="center" alignItems="center">
							<img className={classes.image} src={WaterTableElevationCapeCod} alt="Cape Cod Water Table"/>
							<Typography variant="caption">
								<b>Figure 2.</b> <i>Water table elevation (black contour lines) across Cape Cod (from Masterson, 2004).</i>
							</Typography>
						</Box>
					</Container>

						<br/>
						<br/>
						<br/>

					<Container maxWidth="md">
						<Box textAlign="center" alignItems="center">
							<img className={classes.image} src={CapeCodModel} alt="Cape Cod Water Computer Model"/>
							<Typography variant="caption">
								<b>Figure 3.</b> <i>Computer model estimates of water table height and salinity conditions in the water table aquifer beneath Cape Cod (from Masterson, 2004). See Figure 2 for the location of these cross sections.</i>
							</Typography>
						</Box>
					</Container>

					<Typography variant="h1">
						Sharp Interface Calculations
					</Typography>
					<Typography className={classes.text}>
						Assessing the effects of pumping on island aquifer systems can be carried out
						using a sharp-interface model. In sharp interface theory, we solve for the
						position of the water table and the freshwater-seawater transition zone (See EQUATIONS tab).
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

					<Container maxWidth="md">
						<Box textAlign="center" alignItems="center">
						<img className={classes.image} src={IslandSchematic} alt="A view of the island layout"/>
							<Typography variant="caption">
								<b>Figure 4.</b> <i>A view of the island layout</i>
							</Typography>
						</Box>
					</Container>

					<Typography variant="h2">References</Typography>
					<Typography>
					Masterson, J.P., 2004. Simulated interaction between freshwater and saltwater and effects of ground-water pumping and sea-level change, Lower Cape Cod aquifer system, Massachusetts (Vol. 4, No. 4). DIANE Publishing.
					</Typography>
				</Box>
			</MathJax.Provider>
			</Paper>
		</Container>
	);
}