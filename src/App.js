import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Dashboard from "./components/Dashborad";
import Search from "./components/Search";

import io from "socket.io-client";
// import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  socket = io("192.168.1.31:8878/api");

  state = {};

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/dashboard"
            component={props => <Dashboard {...props} socket={this.socket} />}
          />
          <Route
            path="/search"
            component={props => <Search {...props} socket={this.socket} />}
          />
          <Route
            path="/"
            component={props => <Login {...props} socket={this.socket} />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
