import React, { Component } from "react";
import Table from "./table";
import _ from "lodash";

class RegionsTable extends Component {
  columns = [
    { path: "id", label: "#" },
    { path: "camera", label: "Camera" },
    { path: "the_date", label: "Date" },
    { path: "car_number", label: "Car Number" }
  ];

  render() {
    const { request, regionId } = this.props;
    var data = [];
    data = _.filter(request, { id: regionId });

    return <Table columns={this.columns} data={data} />;
  }
}

export default RegionsTable;
