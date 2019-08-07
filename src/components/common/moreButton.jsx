import React from "react";

const MoreButton = ({ onClick, classes, label }) => {
  return (
    <button className={classes} onClick={onClick}>
      {label}
    </button>
  );
};

export default MoreButton;
