import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="mt-2">
        <strong>{label} :</strong>
      </label>
      <div className="input-group mb-3 ">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
        </div>
        <input name={name} id={name} className="form-control" {...rest} />
        {error && (
          <div className="alert alert-danger col-md-12 mt-2">{error}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
