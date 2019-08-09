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
    { path: "camera", label: "Камера" },
    { path: "the_date", label: "Сана" },
    { path: "car_number", label: "Автоулов рақaми" }
  ];

  render() {
    const { request, regionId, count, loadImage, isOn } = this.props;
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
        isOn={isOn}
      />
    );
  }
}

export default RegionsTable;
