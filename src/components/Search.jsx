import React, { Component } from "react";
import NavBar from "./common/navBar";
import SearchBar from "./common/searchBar";
// import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import RegionsTable from "./common/regionsTable";
import { Tabs, Button } from "antd";
import _ from "lodash";

import "react-web-tabs/dist/react-web-tabs.css";
import "../css/search.css";

// import MoreBtn from "./common/moreButton";
import io from "socket.io-client";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.min.css";

//  Search Bar
class Search extends Component {
  socket = io("192.168.1.31:8878/api");

  state = {
    request: [],
    options: [],
    selectedOption: "",
    loading: false,
    iconLoading: false
  };
  request = [];

  componentDidMount() {
    const that = this;
    this.socket.once("connect", function() {
      that.request = [];
      this.on("search", function(data) {
        console.log(data);
        that.request.push(data);

        that.setState({ request: that.request });
      });
    });
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
    this.request = [];
  };

  enterLoading = () => {
    this.setState({ loading: true });
  };

  endLoading = () => {
    this.setState({ loading: false });
  };

  render() {
    const { options, request } = this.state;
    const { TabPane } = Tabs;
    return (
      <React.Fragment>
        <NavBar />
        <div className="row">
          <div className="col-md-3 mw-30 rounded-sm searchBar shadow">
            <h1 className="mt-4">Filter</h1>
            <hr />
            <SearchBar callBack={this.callBack} socket={this.socket} />
          </div>
          <div className="col-md-9 mt-4">
            <Tabs defaultActiveKey="1" tabPosition="left">
              {options.map(option => (
                <TabPane tab={option.label} key={option.value}>
                  <div className="mt-4 ml-4  ">
                    <RegionsTable request={request} regionId={option.value} />
                    <div className="col-md-6">
                      <Button
                        type="primary"
                        loading={this.state.loading}
                        onClick={this.enterLoading}
                        block
                      >
                        More ...
                      </Button>
                    </div>
                  </div>
                </TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
