import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import "../css/login.css";
import { toast, ToastContainer } from "react-toastify";

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
    else {
      toast.error("Your credentials are wrong");
    }
  };

  render() {
    return (
      <div className="container wrapper box-shadow ">
        <ToastContainer position="top-center" />
        <form onSubmit={this.handleLogin} className="form-signin">
          <h1>Login Form</h1>

          {this.renderInput(
            "username",
            "Username",
            "username",
            this.handleChange
          )}
          {this.renderInput(
            "password",
            "Password",
            "password",
            this.handleChange,
            "password"
          )}
          {this.renderButton("submit")}
        </form>
      </div>
    );
  }
}

export default Login;
