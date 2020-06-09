import React, {useEffect} from 'react';
import { useState} from 'react';
import Slider from '@material-ui/core/Slider';
import { Grid, Typography } from '@material-ui/core';


export default function SliderWithText(props) {

	const [value, setValue] = useState(props.value);


	function setValueAndValidate(value) {
		if(value < props.min) {
			return;
		} else if(value > props.max) {
			return;
		}
		setValue(value);
	}

	function handleSliderChange(event, value) {
		setValueAndValidate(value);
	}
	function handleSliderChangeCommitted(event, value) {
		setValueAndValidate(value);
		props.onChange(null, value);
	}

	useEffect(() => {
		setValue(props.value);
		// eslint-disable-next-line react-hooks/exhaustive-deps,
	}, [props.value]);

	return (
		<Grid container justify="flex-start" alignItems="flex-start">
			<Typography>
					{props.title}
			</Typography>
			<Grid container spacing={2} direction="row"  alignItems="center" >
				<Grid item xs={10} >
					<Slider
						disabled={props.disabled}
						min={props.min}
						valueLabelDisplay={props.valueLabelDisplay}
						max={props.max}
						step={props.step}
						value={value}
						marks
						onChange={handleSliderChange}
						onChangeCommitted={handleSliderChangeCommitted}
					/>
				</Grid>
				<Grid item xs={2}>
					<Typography variant="body1" align="left">
					{value}	
					</Typography>
				</Grid>
				
			</Grid>

		</Grid>
	);
}