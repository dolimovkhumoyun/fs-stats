import React, { Component } from "react";
import NavBar from "./common/navBar";
import SearchBar from "./common/searchBar";
import Table from "./common/table";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import _ from "lodash";

import "react-web-tabs/dist/react-web-tabs.css";
import "../css/search.css";

//  Search Bar
class Search extends Component {
  state = {
    movies: [],
    options: [],
    selectedOption: ""
  };

  handleOptionSelect = option => {
    this.setState({ selectedOption: option });
  };

  callBack = dataFromChild => {
    this.setState({
      options: dataFromChild,
      selectedOption: dataFromChild[0].id + "t"
    });
  };

  render() {
    const { options, selectedOption } = this.state;

    return (
      <React.Fragment>
        <NavBar />
        <div className="row">
          <div className="col-md-2 mw-30 rounded-sm searchBar shadow">
            <SearchBar callBack={this.callBack} />
          </div>
          <div className=" col-md-10 mt-4">
            <Tabs
              defaultTab={selectedOption}
              vertical
              focusable
              onChange={tabId => {
                this.setState({ selectedOption: tabId });
              }}
            >
              <TabList>
                {options.map(option => (
                  <Tab key={option.id} tabFor={option.id + "t"}>
                    {option.name}
                  </Tab>
                ))}
              </TabList>
              {options.map(option => (
                <TabPanel
                  key={option.id}
                  tabId={option.id + "t"}
                  className="mt-4"
                  style={{ height: "60vh", width: "100vw" }}
                >
                  <h5 className="m-4">{option.name}</h5>
                  <Table />
                </TabPanel>
              ))}
            </Tabs>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
