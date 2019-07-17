import React, { Component } from "react";
import NavBar from "./common/navBar";
import SearchBar from "./common/searchBar";
import Table from "./common/table";

import "../css/search.css";

class Search extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />

        <div className="row">
          <div className="col-md-2 mw-30 rounded-sm searchBar shadow">
            <SearchBar />
          </div>

          <div className="container col-md-7 ">
            <h5 className="mt-4">Andijon - 30 </h5>
            <Table />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
