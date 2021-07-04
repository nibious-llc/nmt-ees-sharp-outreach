import React from 'react';
import InterfaceCalculator from './tab_calc.js';
import HomeTab from './tab_home';
import EquationTab from './tab_equations';
import { 
	Tabs, 
	Tab
} from '@material-ui/core';
import ActivityQuestions from './activity_questions';
import Footer from './footer.js';


export default function Body(props) {
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
					<Tab label="Calculator"/>
					<Tab label="Equations"/>
			</Tabs>
			<div hidden={tabValue !== 0}>
				<HomeTab/>
			</div>
			<div hidden={tabValue !== 1}>
				<InterfaceCalculator OnUpdateData={storeCalculatedData}/>
				<ActivityQuestions/>
			</div>
			<div hidden={tabValue !== 2}>
				<EquationTab data={calculatedData}/>
			</div>
			<Footer/>
		</div>
	);
}