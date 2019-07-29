import React, { Component } from "react";
import Table from "./table";
import _ from "lodash";
import MoreButton from "./moreButton";

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
    { path: "car_number", label: "Car Number" },
    {
      path: "more",
      label: "More",
      content: (index, item) => {
        return (
          <MoreButton
            classes="btn btn-success btn-sm col-md-8"
            label="Info"
            onClick={() => this.onClick(item)}
          />
        );
      }
    }
  ];

  onClick = item => {
    console.log(item.event_id);
  };

  render() {
    const { request, regionId } = this.props;
    var data = [];
    data = _.filter(request, { id: regionId });

    return <Table columns={this.columns} data={data} />;
  }
}

export default RegionsTable;
