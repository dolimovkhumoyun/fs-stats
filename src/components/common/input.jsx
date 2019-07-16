import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group col-md-4">
      <label htmlFor={name}>{name}</label>
      <input
        {...rest}
        name={label}
        id={name}
        className="form-control"
        placeholder={name}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
