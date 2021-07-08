import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState} from 'react';
import { Slider, FormGroup, FormLabel, FormControlLabel } from '@material-ui/core';



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


export default function SliderForm(props) {
	const classes = useStyles();
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
		props.onChange(event, value);
	}

	useEffect(() => {
		setValue(props.value);
		// eslint-disable-next-line react-hooks/exhaustive-deps,
	}, [props.value]);

	return (

		<FormGroup>
			<FormLabel className={classes.formLabel}>{props.title}</FormLabel>
			<FormControlLabel
				className={classes.formControlLabel}
				control={<Slider
					disabled={props.disabled}
					min={props.min}
					valueLabelDisplay={props.valueLabelDisplay}
					max={props.max}
					step={props.step}
					value={value}
					track={props.track}
					scale={props.scale}
					marks={props.marks}
					onChange={handleSliderChange}
					onChangeCommitted={handleSliderChangeCommitted}
				/>}
				label={props.showValue ? value : ""}
			/>
		</FormGroup>
	);
}