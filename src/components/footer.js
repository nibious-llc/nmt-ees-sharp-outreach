import React from 'react';
import { useTheme, createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { 
	Typography,
	Box
} from '@material-ui/core';


export default function Footer() {

	const theme = useTheme();
	const footerTheme = createMuiTheme({
		...theme,
		palette: {
			text: {
				secondary: "white"
			}
		}
	});

	const useStyles = makeStyles((footerTheme) => ({
		footer: {
			square: true,
			backgroundColor: theme.palette.primary.main,
			marginTop: "calc(5% + 60px)",
			padding: theme.spacing(2),
			bottom: 0,
		}
	}));

	const classes = useStyles();
	return (
		<ThemeProvider theme={footerTheme}>
			<div className={classes.footer}>
				<Box textAlign="left">
					<Typography variant="h5" color='textSecondary'>
						Acknowledgements
					</Typography>
					<Typography color='textSecondary'>
					US National Science Foundation, Frontiers in Earth Sciences, Grant #1925974
					</Typography>
					<Typography variant="h5" color='textSecondary'>
						Authors
					</Typography>
					<Typography color='textSecondary'>
						<sup>1</sup>Owen Parkins and <sup>2</sup>Mark Person, NM Tech
					</Typography>
					<hr/>
					<Typography color='textSecondary'>
						<sup>1</sup> Department of Computer Science, NM Tech
						<br/>
						<sup>2</sup> Hydrology Program Department of Earth and Environmental Sciences, NM Tech
					</Typography>
				</Box>
			</div>
		</ThemeProvider>
	);
}