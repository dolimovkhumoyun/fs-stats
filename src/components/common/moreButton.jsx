import React from "react";

const MoreBtn = ({ onClick }) => {
  return (
    <button className="btn btn-default" onClick={() => onClick()}>
      More...
    </button>
  );
};

export default MoreBtn;
