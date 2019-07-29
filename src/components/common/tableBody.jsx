import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column, index) => {
    if (column.content) return column.content(index, item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    // const data1 = data.data;
    var req = [];

    if (data === undefined || data.length === 0) {
    } else {
      if (data[0].data !== -1) req = data[0].data;
    }

    return (
      <tbody>
        {req.map((item, index) => (
          <tr key={index}>
            {columns.map((column, col_index) => (
              <td key={col_index}>
                {this.renderCell(item, column, index + 1)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
