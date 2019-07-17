import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import "../css/login.css";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    const { username, password } = this.state.data;

    if (username === "admin" && password === "admin")
      this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="container wrapper box-shadow ">
        <form onSubmit={this.handleLogin} className="form-signin">
          <h1>Login Form</h1>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("submit")}
        </form>
      </div>
    );
  }
}

export default Login;
