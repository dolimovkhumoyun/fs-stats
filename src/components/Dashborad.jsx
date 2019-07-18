import React, { Component } from "react";
import NavBar from "./common/navBar";
// import { Bar } from "react-chartjs-2";
import BarChart from "./common/barChart";

class Dashboard extends Component {
  state = {};
  render() {
    const { data } = this.state;

    return (
      <React.Fragment>
        <NavBar />
        <BarChart data={data} options={{ maintainAspectRatio: true }} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
