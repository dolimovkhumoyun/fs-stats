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
          fill: false,
          data: [0, 10, 5, 2, 20, 30, 45]
        }
      ]
    },
    {
      datasets: [
        {
          backgroundColor: ["rgb(255,0,0)", "rgb(255,255,0)", "rgb(0,0,255)"],
          borderColor: "rgba(255, 255, 255, 0.5)",
          data: [10, 20, 30]
        }
      ],
      labels: ["Red", "Yellow", "Blue"]
    }
  ];
  state = {
    charts: [
      { id: 1, type: "bar", data: this.data[0] },
      { id: 2, type: "line", data: this.data[0] },
      { id: 3, type: "pie", data: this.data[1] },
      { id: 4, type: "bar", data: this.data[0] },
      { id: 5, type: "line", data: this.data[0] },
      { id: 6, type: "pie", data: this.data[1] }
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
        <div className="row">
          {charts.map(chart => (
            <div key={chart.id} className="card-deck col-md-4 ">
              <div className="card shadow m-3 ml-4  ">
                <div className="card-body  ">
                  {/* <div className="bar-container"> */}
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
                    <Pie data={this.data[1]} />
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
