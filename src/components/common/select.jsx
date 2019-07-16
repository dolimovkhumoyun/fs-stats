import React from "react";

const Select = ({ name, label, value, error, options, ...rest }) => {
  return (
    <div className="form-group col-md-4">
      <label htmlFor={name}>{label} </label>
      <select name={name} id={name} {...rest} className="form-control" multiple>
        <option value={null} defaultValue>
          Please select option
        </option>
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>

      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Select;
