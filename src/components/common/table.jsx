import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data }) => {
  return (
    <table class="table table-hover">
      <caption>List of users</caption>
      <TableHeader />
      <TableBody />
    </table>
  );
};

export default Table;
