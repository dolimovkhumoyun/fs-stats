import React, { Component } from "react";
import NavBar from "./common/navBar";
import SearchBar from "./common/searchBar";
import Table from "./common/table";

import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import "../css/search.css";
// import ListTabs from "./common/tab";

class Search extends Component {
  state = {
    movies: [],
    options: [
      { id: 1, name: "Andijon" },
      { id: 2, name: "Toshkent" },
      { id: 3, name: "Farg'ona" },
      { id: 4, name: "Namangan" },
      { id: 5, name: "Samarqand" }
    ],
    selectedOption: null
  };

  handleOptionSelect = option => {
    this.setState({ selectedOption: option });
  };
  /* <ListTabs
                  data={options}
                  onItemSelect={this.handleOptionSelect}
                  selectedItem={this.state.selectedOption}
                /> */
  render() {
    const { options } = this.state;

    return (
      <React.Fragment>
        <NavBar />

        <div className="row">
          <div className="col-md-2 mw-30 rounded-sm searchBar shadow">
            <SearchBar />
          </div>

          <div className=" col-md-10 mt-4">
            <Tabs defaultTab={options[0].id + "t"} vertical>
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
