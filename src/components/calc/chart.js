import React, {useEffect} from 'react';
import Chart from '../../elements/Chart';


export default function InterfaceGraph(props) {
	
	return (
			<Chart id="interfaceChart" chartObjects={{ "datasets": props.datasets, "yLabel": "Elevation (m)" }}
				title="Freshwater/Saltwater Interface" 
				options={
				{
					scales: {
							yAxes: [{
								type: 'linear',
								position: 'left',
								scaleLabel: {
									display: true,
									labelString: "Elevation (m)"
								},
								ticks: {
										suggestedMin: props.minY, 
										suggestedMax: props.maxY
									}
							}],
							xAxes: [{
								beginAtZero: true,
								type: 'linear',
								position: 'bottom',
								scaleLabel: {
									display: true,
									labelString: "Distance (m)"
								},
								ticks: {
									suggestedMin: props.minX,
									suggestedMax: props.maxX,
									step: props.delx
							}
							}]
					},
					tooltips: {
						enabled: true,
						callbacks: {
							label: function(tooltipItem, data) 
										{
											var label = data.datasets[tooltipItem.datasetIndex].label || '';
											if (data.datasets[tooltipItem.datasetIndex].type === "scatter3D") {
												return "hfem: " + props.datasets[1].data[tooltipItem.index].hfem.toString();
											}
											if (data.datasets[tooltipItem.datasetIndex].type === "vector") {
												return "";
											}
											return label + ": " + tooltipItem.yLabel;
											
										},
							title: function(tooltipItem, data) 
										{														
											return "Values"
										}
						}
					},
					legend: {
						onClick: (e) => e.stopPropagation(),
						labels: {
							usePointStyle: true
						}
					},
					animation: {
						easing: "easeInOutQuint"
					}
			}}/>
	);
}