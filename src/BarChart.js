import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class BarChart extends Component {
  //This could be updated to use hooks
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      values: [],
      bgColor: []
    };
  }

  async componentDidMount() {
    //Fetching and converting to JSON
    const res = await fetch("http://localhost:5000/data");
    const json = await res.json();

    //Used for parsing the JSON data before setting the state
    const xlabels = [];
    const values = [];
    const bgColor = [];

    //Parsing the JSON data to separate arrays for ChartJS
    json.map(item => {
      xlabels.push(item.label);
      values.push(item.value);
      bgColor.push(item.color);
      return null;
    });

    //Setting the state
    this.setState({
      labels: xlabels,
      values: values,
      bgColor: bgColor
    });
  }

  render() {
    //Creating a data object for ChartJS to render
    const data = {
      labels: this.state.labels,
      datasets: [
        {
          backgroundColor: this.state.bgColor,
          width: 15.0,
          borderColor: "#797b86",
          borderWidth: 0.5,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.values,
          label: "something"
        }
      ]
    };

    //Controls the styling of the chart
    const options = {
      //Changing to true ignore the height and width values set in the Bar component
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Counts"
            }
          }
        ],

        //Font direction can be changed here but long titles don't allow the use of completely horizontal text.
        //Find formatting options for multi-line labels. Or parse each label in a function adding a new line if the
        //label is over a certain length
        xAxes: [
          {
            //Width of each bar in pixels or use 'flex' to compute the value that puts the bars side by side
            barThickness: "flex",
            scaleLabel: {
              display: true,
              labelString: "Call Type"
            }
          }
        ]
      },
      //The legend isn't necessary when all bars are labeled
      legend: {
        display: false
      }
    };

    return (
      <div>
        <h2>Call Type Report</h2>
        <Bar data={data} width={100} height={400} options={options} />
      </div>
    );
  }
}
