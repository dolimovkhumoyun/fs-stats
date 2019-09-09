import React, { Component } from "react";
import Table from "./table";
import _ from "lodash";

class RegionsTable extends Component {
  columns = [
    { path: "postName", label: "ЙПХ масканлари" },
    { path: "camera", label: "Йўналиш" },
    { path: "the_date", label: "Сана ва вакт" },
    { path: "car_number", label: "Давлат ДРБ" }
  ];

  render() {
    const { request, regionId, count, loadImage, isOn, posts } = this.props;
    var data = [];
    data = _.filter(request, { id: regionId });

    if (count !== undefined) var total = count.count;
    return (
      <React.Fragment>
        <Table
          columns={this.columns}
          data={data}
          posts={posts}
          total={total}
          loadImage={loadImage}
          regionId={regionId}
          isOn={isOn}
        />
      </React.Fragment>
    );
  }
}

export default RegionsTable;
