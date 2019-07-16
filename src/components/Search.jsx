import React, { Component } from "react";
import NavBar from "./common/navBar";
import SearchBar from "./common/searchBar";
import Table from "./common/table";

class Search extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />

        <div className="row">
          <div className="col-md-4">
            <SearchBar />
          </div>

          <div className="col-md-8">
            <Table />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
