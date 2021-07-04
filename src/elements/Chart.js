import React, {useEffect} from "react";
import { Chart, ScatterController, LineElement, PointElement, LinearScale, CategoryScale, Title, Legend, Tooltip, Filler } from "chart.js";
import { isMobile } from "react-device-detect";
import VectorChartController from "./VectorChartController";
import Scatter3DController from "./Scatter3DController";

Chart.register(ScatterController, LineElement, PointElement, LinearScale, CategoryScale, Legend, Title, Tooltip, Filler, VectorChartController, Scatter3DController);

export default function NibiousChart(props) {
  const chartObjects = props.chartObjects;
  const [isLandscape, setIsLandscape] = React.useState(window.innerHeight < window.innerWidth);

  let max = 0;
  for (let index in chartObjects.datasets) {
    const dataset = chartObjects.datasets[index]["data"];
    if (dataset != null) {
      max = Math.max(max, ...dataset);
    }
  }

  const shouldAdaptToMobile = isMobile && !isLandscape;

  function setScreenOrientation(event) {
    setIsLandscape(event.target.orientation === 0 ? false : true);
  }

  useEffect(() => {
    window.addEventListener("resize", setScreenOrientation);

    const ctx = document.getElementById(props.id);

    const myChart = new Chart(ctx, {
      type: 'scatter',
      data: {
          datasets: chartObjects.datasets
      },
      options: {
        elements: {
          point: {
            hoverRadius: 15
          }
        },
        responsive: true,
        aspectRatio: shouldAdaptToMobile ? 1 : 2,
          scales: {
              x: {
                  beginAtZero: true,
                  type: 'linear',
                  ticks: {
                    stepSize: 500
                  },
                  scaleLabel: {
                    labelString: "Time [min]",
                    display: true,
                  },
              },
              y: {
                scaleLabel: {
                  labelString: chartObjects.yLabel,
                  display: true,
                },
                ticks: {
                  autoSkip: true
                },
              }
          },
          interaction: {
            mode: 'index'
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                boxHeight: 0,
                filter: function(item, chart) {
                  return !item.text.includes('_');
                }
              },
              onClick: function(e, legendItem) { // need to hide index +1 and index +2 for additional lines
                let index = legendItem.datasetIndex;
                let ci = this.chart;

                let line = ci.getDatasetMeta(index);
                let line1 = ci.getDatasetMeta(index + 1);
                let line2 = ci.getDatasetMeta(index + 2);

                line.hidden = line.hidden === null ? line.visible : !line.hidden;

                if(line1.label !== undefined && line1.label.includes("_")) {
                  line1.hidden = line1.hidden === null ? line1.visible : !line1.hidden;
                }

                if(line2.label !== undefined && line2.label.includes("_")) {
                  line2.hidden = line2.hidden === null ? line2.visible : !line2.hidden;
                }

                ci.update();
              },
            },
            tooltip: {
              enabled: true,
              intersect: true,
              boxHeight: 1,
              borderWidth: 5,
              position: "nearest",
              callbacks: {
                label: function(context) {
                    var label = context.dataset.label || '';
                    
                    if (label) {
                      if(label.includes("_")) {
                        label = label.substring(1)
                      }
                        label += ': ';
                    }
                    if (!isNaN(context.element.y)) {
                        label += context.element.y;
                        console.log(context.element.y)
                    }

                    return label;
                }
              }
            }
          }
        }
      });

    return function cleanup() {
      myChart.destroy()
      window.removeEventListener("resize", setScreenOrientation);
    };
  }, [props.chartObjects, shouldAdaptToMobile]);

  // minHeight: isLandscape ? "100vh" : "100vh", minWidth: isLandscape ? "100%" : "90vw"
  return (
    <div style={{ position: "relative", margin: 'auto', width:"100%"}}>
      <canvas id={props.id} />
    </div>
  );
}
