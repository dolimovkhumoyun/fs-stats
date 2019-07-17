import React from "react";

const Table = () => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Camera</th>
          <th scope="col">Date</th>
          <th scope="col">Car Number</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>
            <button className="btn btn-success">Batafsil</button>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>
            <button className="btn btn-success">Batafsil</button>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
          <td>
            <button className="btn btn-success">Batafsil</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
