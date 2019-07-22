import React, { Component } from "react";

class TableHeader extends Component {
  state = {};
  render() {
    return (
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
