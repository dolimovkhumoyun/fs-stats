import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

import _ from "lodash";

const Table = ({ columns, data, total, loadImage, regionId }) => {
  if (data !== undefined && !_.isEmpty(data))
    var totalData = data[0].data.length;
  return (
    <React.Fragment>
      {total !== -1 && (
        <p>
          Showing <strong>{totalData}</strong> out of <strong>{total}</strong>
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
          />
        </table>
      </div>
    </React.Fragment>
  );
};

export default Table;
