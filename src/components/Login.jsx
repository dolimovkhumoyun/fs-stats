import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { Form as AntdForm, Icon, Input, Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
// import _ from "lodash";

import io from "socket.io-client";

import "antd/dist/antd.css";
import "../css/login.css";

class Login extends Form {
  socket = io("101.4.0.254:8878/api"); //101.4.0.254:8878/api   192.168.1.31:8878/api

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
    let that = this;
    const loginData = { username, password };

    this.socket.emit("login", loginData);

    this.socket.on("login", function(data) {
      if (data.success) {
        localStorage.setItem("token", data.token);
        that.props.history.push({
          pathname: "/search",
          token: data.token
        });
      } else {
        toast.error("Your credentials are wrong");
      }
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container wrapper box-shadow ">
        <ToastContainer position="top-center" />
        <form onSubmit={this.handleLogin} className="form-signin">
          <h1>Login Form</h1>
          <hr />
          <AntdForm.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              size="large"
              name="username"
              autoComplete="username"
              onChange={this.handleChange}
            />
            {errors.username && (
              <div className="alert alert-danger col-md-12 mt-2">
                {errors.username}
              </div>
            )}
          </AntdForm.Item>
          <AntdForm.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              size="large"
              name="password"
              autoComplete="new-password"
              onChange={this.handleChange}
            />
            {errors.password && (
              <div className="alert alert-danger col-md-12 mt-2">
                {errors.password}
              </div>
            )}
          </AntdForm.Item>
          <AntdForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </AntdForm.Item>
        </form>
      </div>
    );
  }
}

export default Login;
