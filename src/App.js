import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashborad";
import Search from "./components/Search";

import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/search" component={Search} />
          <Route path="/" component={Login} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
