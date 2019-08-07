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
  // socket = io("192.168.1.31:8878/api"); //101.4.0.254:8878/api

  // constructor() {
  //   super();
  //   this.socket.on("connection", function(data) {
  //     console.log("hello");
  //   });
  // }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/dashboard"
            component={props => <Dashboard {...props} />}
          />
          <Route path="/search" component={props => <Search {...props} />} />
          <Route path="/" component={props => <Login {...props} />} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
