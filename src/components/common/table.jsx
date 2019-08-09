import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

import _ from "lodash";

const Table = ({ columns, data, total, loadImage, regionId, isOn }) => {
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
      <div className="table-responsive">
        <table className="table table-hover table-striped header-fixed  ">
          <TableHeader columns={columns} />
          <TableBody
            data={data}
            columns={columns}
            loadImage={loadImage}
            regionId={regionId}
            isOn={isOn}
          />
        </table>
      </div>
    </React.Fragment>
  );
};

export default Table;
