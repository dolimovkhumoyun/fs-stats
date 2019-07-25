import React, { Component } from "react";
import NavBar from "./common/navBar";
import SearchBar from "./common/searchBar";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import RegionsTable from "./common/regionsTable";
import _ from "lodash";

import "react-web-tabs/dist/react-web-tabs.css";
import "../css/search.css";
import { getData1 } from "../service/data";
import MoreBtn from "./common/moreButton";
import io from "socket.io-client";

//  Search Bar
class Search extends Component {
  socket = io("192.168.1.31:8878/api");

  state = {
    request: [],
    options: [],
    selectedOption: ""
  };

  componentDidMount() {
    this.socket.once("connect", function() {
      this.on("search", function(data) {
        console.log(data);
      });
    });
    // const request = getData();
    // this.setState({ request });
  }

  handleOptionSelect = option => {
    this.setState({ selectedOption: option });
  };

  callBack = dataFromChild => {
    this.setState({
      options: dataFromChild,
      selectedOption: _.isEmpty(dataFromChild[0])
        ? ""
        : dataFromChild[0].id + "t"
    });
  };

  handleMore(request) {
    console.log("Clicked");
    const updatedReq = getData1();
    const newData = _.union(request, updatedReq);
    // console.log(newData);
    this.setState({ request: newData });
  }

  render() {
    const { options, selectedOption, request } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <div className="row">
          <div className="col-md-4 mw-30 rounded-sm searchBar shadow">
            <h1 className="mt-4">Filter</h1>
            <hr />
            <SearchBar callBack={this.callBack} socket={this.socket} />
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
                  <RegionsTable request={request} />
                  <MoreBtn onClick={() => this.handleMore(request)} />
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
