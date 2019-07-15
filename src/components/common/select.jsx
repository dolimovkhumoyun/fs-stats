import React from "react";

const Select = ({ name, label, value, error, options, ...rest }) => {
  return (
    <div className="input-field col-md-2 s12">
      <select name={name} id={name} {...rest} multiple>
        {options.map(option => (
          <option key={option._id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <label htmlFor={name}>{name}</label>
      {/* {error && <div className="alert alert-danger mt-2">{error}</div>} */}
    </div>
  );
};

export default Select;
