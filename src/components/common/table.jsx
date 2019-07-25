import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data }) => {
  return (
    <div className="table-fixed">
      <table className="table table-hover ">
        <caption>List of users</caption>
        <TableHeader columns={columns} />
        <TableBody data={data} columns={columns} />
      </table>
    </div>
  );
};

export default Table;
