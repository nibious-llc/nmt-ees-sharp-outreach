import React from 'react';
import Chart from '../../elements/Chart';


export default function InterfaceGraph(props) {
	
	return (
			<Chart id={props.id || "interfaceChart"} chartObjects={{ "datasets": props.datasets, "yLabel": "Elevation (m)" }}/>
	);
}