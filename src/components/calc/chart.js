import React, {useEffect} from 'react';
import { Line, Chart } from 'react-chartjs-2';



export default function InterfaceGraph(props) {
	function registerScatter3DChart() {
		Chart.defaults.scatter3D = Chart.defaults.scatter;
		var custom = Chart.controllers.scatter.extend({
			draw: function(ease) {
				var meta = this.getMeta();
				if(meta.data.length > 0 ) {

					var ctx = this.chart.chart.ctx;
					ctx.save();
					for(let i = 0; i < meta.data.length - 22; i++) {
						var pt = meta.data[i];
						var nextPt = meta.data[i + 1];

						const startX = pt._view.x;
						const startY = pt._view.y;
						const belowX = nextPt._view.x;
						const belowY = nextPt._view.y;

						const nextX = meta.data[i+21]._view.x;
						const nextY = meta.data[i+21]._view.y;

						const nextBelowX = meta.data[i + 22]._view.x;
						const nextBelowY = meta.data[i + 22]._view.y;

						if(startX > belowX) {
							//We don't need to be drawing backwards
							continue;
						}
						if(startY < belowY) { continue; }

						var grd1 = ctx.createLinearGradient(startX, startY, nextX, nextY);
						grd1.addColorStop(0, pt._view.backgroundColor);
						grd1.addColorStop(1, meta.data[i+21]._view.backgroundColor);

						ctx.fillStyle = grd1;
						ctx.strokeStyle = grd1;
						ctx.lineWidth = -1;
						

						ctx.beginPath();
						ctx.moveTo(startX, startY);

						ctx.lineTo(nextX, nextY);

						ctx.lineTo(nextBelowX, nextBelowY);		
						
						ctx.lineTo(belowX, belowY);	
						

						ctx.lineTo(startX, startY);	
						ctx.stroke();

						ctx.fill();
							
					}
					ctx.restore();
				}
			}
		});

		Chart.controllers.scatter3D = custom;
	}

	function registerVectorChart() {
		Chart.defaults.vector = Chart.defaults.scatter;
		var custom = Chart.controllers.scatter.extend({
			draw: function(ease) {
				var meta = this.getMeta();
				if(meta.data.length > 0 ) {

					var ctx = this.chart.chart.ctx;
					ctx.save();
					for(let i = 0; i < meta.data.length; i++) {
						var pt = meta.data[i];

						const startX = pt._view.x;
						const startY = pt._view.y;

						const qz = pt._view.rotation.qx;
						const qx = pt._view.rotation.qz;

						const magnitude = Math.sqrt(Math.pow(qx, 2) + Math.pow(qz, 2));
						let  angle = Math.atan(qz/qx);
						if(qx > 0) {
							angle = angle - Math.PI;
						}

						const endX = 0;
						const endY = magnitude * 10;

						ctx.beginPath();
						ctx.strokeStyle = 'rgba(0,0,0,1)';						
						ctx.translate(startX, startY);
						ctx.rotate(angle);
						
						ctx.moveTo(0, 0);
						ctx.lineTo(endX, endY);
						ctx.lineTo(endX - 3, endY - 3);
						ctx.moveTo(endX, endY);
						ctx.lineTo(endX + 3, endY - 3);						
						ctx.stroke();

						ctx.rotate(-1 * angle);
						ctx.translate(-1 * startX, -1 * startY);
					}
					ctx.restore();
				}
			}
		});

		Chart.controllers.vector = custom;
	}

	useEffect(() => {
		registerVectorChart();
		registerScatter3DChart();

	}, []);

	return (
			<Line
				data={{
					datasets: props.datasets
					}} 
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