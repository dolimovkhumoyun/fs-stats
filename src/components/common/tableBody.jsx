import React, { Component } from "react";
import _ from "lodash";
import { Empty } from "antd";

class TableBody extends Component {
  renderCell = (item, column, index) => {
    if (column.content) return column.content(index, item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns, loadImage } = this.props;
    // const data1 = data.data;
    var req = [];

    if (data === undefined || data.length === 0) {
    } else {
      if (data[0].data !== -1) req = data[0].data;
    }

    if (req.length > 0) {
      return (
        <tbody className="hello">
          {req.map((item, index) => (
            <tr key={index} onDoubleClick={() => loadImage(item)}>
              {columns.map((column, col_index) => (
                <td key={col_index}>
                  {this.renderCell(item, column, index + 1)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    } else {
      return (
        <tbody>
          <tr
            style={{
              backgroundColor: "white",
              marginTop: "10%"
            }}
          >
            <td style={{ borderTop: "none" }}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              {/* <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                style={{ marginBottom: "10%", marginLeft: "20%" }}
                alt="loading..."
              /> */}
            </td>
          </tr>
        </tbody>
      );
    }
  }
}

export default TableBody;
