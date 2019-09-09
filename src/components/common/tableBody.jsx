import React, { Component } from "react";
import _ from "lodash";
import { Empty, Spin } from "antd";

class TableBody extends Component {
  renderCell = (item, column, index) => {
    if (column.content) return column.content(index, item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns, loadImage, regionId, isOn } = this.props;
    // const data1 = data.data;
    var req = [];
    // console.log(posts);
    if (data === undefined || data.length === 0) {
    } else {
      if (data[0].data !== -1) req = data[0].data;
    }
    if (req.length > 0) {
      return (
        <tbody className={"hello_" + regionId}>
          {isOn && (
            <div className="spinner">
              <Spin size="large" />
            </div>
          )}
          {req.map((item, index) => (
            <tr key={index} onDoubleClick={() => loadImage(item)}>
              <th scope="row" style={{ width: "10%" }}>
                {index + 1}
              </th>
              {columns.map((column, col_index) => (
                <td key={col_index}>
                  {this.renderCell(item, column, index + 1)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    } else if ((data[0] !== undefined && req.length === 0) || req === -1) {
      return (
        <tbody>
          <tr
            style={{
              backgroundColor: "white",
              marginTop: "10%"
            }}
          >
            <td style={{ borderTop: "none" }}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Маълумот топилмади"
              />
            </td>
          </tr>
        </tbody>
      );
    } else if (data[0] === undefined) {
      return (
        <tbody>
          <tr
            style={{
              backgroundColor: "white",
              marginTop: "10%"
            }}
          >
            <td style={{ borderTop: "none" }}>
              <div className="spinner">
                <Spin size="large" />
              </div>
            </td>
          </tr>
        </tbody>
      );
    }
  }
}

export default TableBody;
