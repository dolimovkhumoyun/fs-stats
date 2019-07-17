import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group col-md-12">
      <label htmlFor={name}>{label}</label>
      <input name={name} id={name} className="form-control" {...rest} />
      {error && (
        <div className="alert alert-danger col-md-12 mt-2">{error}</div>
      )}
    </div>
  );
};

export default Input;
