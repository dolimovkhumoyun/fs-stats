import React from "react";

const Select = ({ name, label, value, error, options, ...rest }) => {
  return (
    <div className="form-group col-md-12">
      <label htmlFor={name}>
        <strong>{label} :</strong>
      </label>
      <select
        name={name}
        id={name}
        {...rest}
        className="form-control multiselect mb-2"
        multiple
      >
        <option value="-1" key="0" defaultValue>
          All
        </option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>

      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Select;
