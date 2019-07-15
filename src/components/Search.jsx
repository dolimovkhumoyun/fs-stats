import React, { Component } from "react";
import NavBar from "./common/navBar";
import SearchBar from "./common/searchBar";
import DatatablePage from "./common/table";

class Search extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container-fluid">
          <SearchBar />
          <DatatablePage />
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
