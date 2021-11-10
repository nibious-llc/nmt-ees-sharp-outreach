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
            hitRadius: 5
          }
        },
        animation: {
          easing: "easeInOutQuint",
          duration: 0
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
                labelString: "Distance (m)",
                display: true,
              },
            },
            y: {
              scaleLabel: {
                labelString: "Elevation (m)",
                display: true,
              },
              ticks: {
                autoSkip: true
              },
            }
          },
          interaction: {
            mode: chartObjects.datasets[0].type === "line" ? "index" : 'point',
            intersect: false,
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                boxHeight: 0,
                usePointStyle: true,
                filter: function(item, chart) {
                  return !item.text.includes('_');
                }
              },
              onClick: (e) => { return; }
            },
            title: {
              text: "Freshwater/Saltwater Interface",
              display: true,
            },
            tooltip: {
              enabled: true,
              intersect: false,
              boxHeight: 1,
              borderWidth: 5,
              position: "nearest",
              usePointStyle: true,
              bodyColor: "#000000",
              backgroundColor: "#F8F8F8",
              titleColor: "#000000",
              filter: function (tooltipItem) {
                if(chartObjects.datasets[0].type === "line") {
                  return true;
                } else {
                  return tooltipItem.datasetIndex === 1;
                }
              },
              callbacks: {
                beforeBody: function(contexts) {

                  // Create bins for context types
                  const uniqueContexts = {}

                  contexts.forEach(context => {
                    if (uniqueContexts[context.dataset.label] === undefined) { //raw.hfem
                      uniqueContexts[context.dataset.label] = context;
                      uniqueContexts[context.dataset.label].average = chartObjects.datasets[0].type === "line" ? context.formattedValue : context.raw.hfem
                      uniqueContexts[context.dataset.label].count = 1;
                    } else {
                      uniqueContexts[context.dataset.label].average += chartObjects.datasets[0].type === "line" ? context.formattedValue : context.raw.hfem
                      uniqueContexts[context.dataset.label].count++;
                    }
                  });

                  // Reduce the length
                  contexts.length = Object.keys(uniqueContexts).length;

                  // Use the original context to keep icons the same
                  Object.keys(uniqueContexts).forEach((contextName, i) => {

                    // Create a real average
                    uniqueContexts[contextName].average = uniqueContexts[contextName].average / uniqueContexts[contextName].count;

                    contexts[i] = uniqueContexts[contextName];

                  });
                },
                label: function(context) {
                    if(context === undefined) {
                      return;
                    }
                    var label = context.dataset.label || '';


                    label += ': ';

                    if (!isNaN(context.average)) {
                        label += context.average;

                    }

                    return label;
                },
                title: function(tooltipItem, data)
                      {
                        return "Values";
                      },
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
