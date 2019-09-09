import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

import _ from "lodash";

class Table extends Component {
  render() {
    const {
      columns,
      data,
      total,
      loadImage,
      regionId,
      isOn,
      posts
    } = this.props;

    if (data !== undefined && !_.isEmpty(data))
      var totalData = data[0].data.length;

    return (
      <React.Fragment>
        {total !== -1 && total !== undefined && (
          <p>
            Намойиш этилаябди <strong>{totalData} </strong>та ёзув{" "}
            <strong>{total}</strong> тадан.
          </p>
        )}
        <div className="table-responsive" id="table-responsive">
          <table
            className="table table-hover table-striped header-fixed"
            id={`table_${regionId}`}
          >
            <TableHeader columns={columns} />
            <TableBody
              data={data}
              columns={columns}
              posts={posts}
              loadImage={loadImage}
              regionId={regionId}
              isOn={isOn}
              ref={el => (this.componentRef = el)}
            />
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Table;

// const Table = ({ columns, data, total, loadImage, regionId, isOn }) => {

//   return (

//   );
// };

// export default Table;
