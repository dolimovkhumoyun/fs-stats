import React, { Component } from "react";
import Joi from "joi-browser";
import "react-datepicker/dist/react-datepicker.css";
import Form from "./form";
import {
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption
} from "mdbreact";

class SearchBar extends Form {
  state = {
    data: { username: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username")
  };

  doSubmit = () => {
    const { username, password } = this.state.data;

    if (username === "admin" && password === "admin")
      this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div className="col-md-2 float-left m-4">
        <h2>Search</h2>
        {this.renderInput("username", "Username")}
      </div>
    );
  }
}

export default SearchBar;
