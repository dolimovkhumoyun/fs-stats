import React, { Component } from "react";

class BarChart extends Component {
  state = {};
  render() {
    // const { data } = this.props;
    const { data } = this.state;
    return <Bar data={data} />;
  }
}

export default BarChart;
