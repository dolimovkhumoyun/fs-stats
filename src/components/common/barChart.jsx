import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

import "../../index.css";
class BarChart extends Component {
  state = {
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July"
      ],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [0, 10, 5, 2, 20, 30, 45]
        }
      ]
    }
  };
  render() {
    // const { data } = this.props;
    const { data } = this.state;
    return (
      <div className="bar-container">
        <Bar data={data} />
      </div>
    );
  }
}

export default BarChart;
