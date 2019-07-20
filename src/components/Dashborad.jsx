import React, { Component } from "react";
import NavBar from "./common/navBar";
// import { Bar } from "react-chartjs-2";
// import BarChart from "./common/barChart";
import { Bar, Line, Pie } from "react-chartjs-2";

import "../index.css";

class Dashboard extends Component {
  data = [
    {
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
  ];
  state = {
    charts: [
      { id: 1, type: "bar", data: this.data[0] },
      { id: 2, type: "line", data: this.data[0] },
      { id: 3, type: "pie", data: this.data[0] }
    ]
  };

  componentDidMount() {
    // console.log(this.data[0]);
  }

  render() {
    const { charts } = this.state;
    console.log(this.state);
    return (
      <React.Fragment>
        <NavBar />
        <div className="card-deck">
          {charts.map(chart => (
            <div key={chart.id} className="card shadow m-2">
              <div className="card-body ">
                <div className="bar-container">
                  {chart.type && chart.type === "bar" ? (
                    <Bar data={this.data[0]} />
                  ) : (
                    ""
                  )}
                  {chart.type && chart.type === "line" ? (
                    <Line data={this.data[0]} />
                  ) : (
                    ""
                  )}
                  {chart.type && chart.type === "pie" ? (
                    <Pie data={this.data[0]} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
