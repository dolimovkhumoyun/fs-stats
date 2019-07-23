import React, { Component } from "react";
import Table from "./table";

class RegionsTable extends Component {
  columns = [
    { path: "_id", label: "#" },
    { path: "camera", label: "Camera" },
    { path: "date", label: "Date" },
    { path: "carNumber", label: "Car Number" }
  ];

  render() {
    const { request } = this.props;

    return <Table columns={this.columns} data={request} />;
  }
}

export default RegionsTable;
