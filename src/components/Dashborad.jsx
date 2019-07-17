import React, { Component } from "react";
import NavBar from "./common/navBar";
import { Bar } from "react-chartjs-2";

class Dashboard extends Component {
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
    const { data } = this.state;

    return (
      <React.Fragment>
        <div className="container-fluid">
          <NavBar />
          <Bar
            data={data}
            width={300}
            height={50}
            options={{ maintainAspectRatio: true }}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
