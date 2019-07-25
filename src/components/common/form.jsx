import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import DateTime from "react-datetime";
import moment from "moment";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleLogin = e => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;
    // console.log(errors);

    this.doSubmit();
  };

  handleChange = e => {
    const { currentTarget: input } = e;

    let data = "";

    data = { ...this.state.data };
    data[input.name] = input.value;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({ data, errors });
  };
  handleStartDateChange = date => {
    date = moment(date).format("YYYY:MM:DD HH:mm:ss");

    this.setState({ startDate: date });
  };
  handleEndDateChange = date => {
    date = moment(date).format("YYYY:MM:DD HH:mm:ss");
    console.log(date);

    this.setState({ endDate: date });
  };

  handleCarNumChange = e => {
    const { currentTarget: input } = e;

    const data = { ...this.state.data };
    const value = input.value.toUpperCase();
    data[input.name] = value;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary ml-3">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        options={options}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, placeholder = "username", funcName, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={funcName}
        error={errors[name]}
        placeholder={placeholder}
      />
    );
  }

  renderDatePicker(name, label, span, funcName) {
    const { startDate, endDate } = this.state;
    let value;
    name === "startDate" ? (value = startDate) : (value = endDate);

    return (
      <React.Fragment>
        <span
          className="input-group-text input-group-prepend"
          id="basic-addon1"
        >
          {span}
        </span>

        <DateTime
          defaultValue={value}
          viewMode="days"
          dateFormat="YYYY:MM:DD"
          timeFormat="HH:mm:ss"
          inputProps={{ name: name, id: name }}
          onChange={funcName}
          closeOnSelect={true}
        />
      </React.Fragment>
    );
  }
}

export default Form;
