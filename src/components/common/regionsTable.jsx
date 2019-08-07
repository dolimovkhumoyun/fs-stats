import React, { Component } from "react";
import Table from "./table";
import _ from "lodash";

class RegionsTable extends Component {
  columns = [
    {
      path: "index",
      label: "#",
      content: index => {
        // console.log(index);
        return index;
      }
    },
    { path: "camera", label: "Camera" },
    { path: "the_date", label: "Date" },
    { path: "car_number", label: "Car Number" }
  ];

  render() {
    const { request, regionId, count, loadImage } = this.props;
    var data = [];
    data = _.filter(request, { id: regionId });

    if (count !== undefined) var total = count.count;
    return (
      <Table
        columns={this.columns}
        data={data}
        total={total}
        loadImage={loadImage}
        regionId={regionId}
      />
    );
  }
}

export default RegionsTable;
