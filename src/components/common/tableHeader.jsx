import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          <th scope="col" style={{ width: "10%" }}>
            #
          </th>
          {columns.map(column => (
            <th key={column.path} scope="col">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
