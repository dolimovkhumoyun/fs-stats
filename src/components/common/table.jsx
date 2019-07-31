import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import _ from "lodash";

const Table = ({ columns, data, total }) => {
  if (data !== undefined && !_.isEmpty(data))
    var totalData = data[0].data.length;
  return (
    <React.Fragment>
      <p>
        Showing <strong>{totalData}</strong> out of <strong>{total}</strong>
      </p>
      <div className="tableFixHead">
        <table className="table table-hover ">
          <TableHeader columns={columns} />
          <TableBody data={data} columns={columns} />
        </table>
      </div>
    </React.Fragment>
  );
};

export default Table;
