import React, { Component } from "react";
import NavBar from "./common/navBar";
import SearchBar from "./common/searchBar";
import "react-toastify/dist/ReactToastify.min.css";
import MoreButton from "./common/moreButton";
import RegionsTable from "./common/regionsTable";
import _ from "lodash";
import "../css/search.css";

import { Tabs, Button, Tag, Badge } from "antd";
import "antd/dist/antd.css";

import io from "socket.io-client";

//  Search Bar
class Search extends Component {
  socket = io("192.168.1.31:8878/api");

  state = {
    data: {
      direction: [],
      posts: [],
      type: "",
      carNumber: "",
      startDate: "",
      endDate: ""
    },
    request: [],
    count: [],
    selectedOption: "",
    loading: false,
    iconLoading: false
  };

  componentDidMount() {
    const that = this;
    var count = [];
    this.socket.once("connect", function() {
      that.request = [];

      this.on("search", function(data) {
        const index = _.findIndex(that.request, { id: data.id });
        if (index !== -1) {
          if (!_.isEmpty(data.data)) {
            data.data.map(d => {
              that.request[index].data.push(d);
            });
          }
        } else {
          that.request.push(data);
        }

        that.setState({ request: that.request, loading: false });
      });
      this.on("count", function(data) {
        const indexCount = _.findIndex(count, { id: data.id });
        if (indexCount !== -1) {
          count[indexCount].count = data.count;
        } else {
          count.push(data);
          // console.log(count);
        }
        that.setState({ count });
      });
    });
  }

  handleOptionSelect = option => {
    this.setState({ selectedOption: option });
  };

  callBack = (direction, posts, startDate, endDate, type, carNumber) => {
    this.setState({
      data: { direction, posts, startDate, endDate, type, carNumber }
    });
    this.request = [];
  };

  enterLoading = region => {
    const { carNumber, type, startDate, endDate } = this.state.data;
    const regionData = _.filter(this.state.request, function(o) {
      return o.id === region;
    });
    const offset = regionData[0].data.length;
    const posts = _.filter(this.state.data.posts, function(o) {
      return o.id == region;
    });
    const postsIp = _.map(posts, "value");

    var data = {
      direction: [region],
      offset: offset,
      posts: postsIp,
      carNumber,
      type,
      startDate,
      endDate
    };
    this.socket.emit("search", data);

    this.setState({ loading: true });
  };

  endLoading = () => {
    this.setState({ loading: false });
  };

  renderTabName = option => {
    const temp = _.find(this.state.count, { id: option.value });
    if (temp !== undefined) {
      return <div>{option.label}</div>;
    }
  };

  handlingConnectionless = option => {
    const temp = _.find(this.state.count, { id: option });
    if (temp !== undefined) {
      if (temp.count !== -1) return false;
      else return true;
    }
  };

  render() {
    const { data, request, count } = this.state;
    const { direction } = data;
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
          <div className="col-md-9 ">
            <Tabs defaultActiveKey="1" tabPosition="left" size="large">
              {direction.map(option => (
                <TabPane
                  tab={option.label}
                  key={option.value}
                  disabled={this.handlingConnectionless(option.value)}
                >
                  <div className="mt-4 ml-4  ">
                    <RegionsTable
                      request={request}
                      regionId={option.value}
                      count={count[_.findIndex(count, { id: option.value })]}
                    />
                    <div className="mt-4">
                      <Button
                        type="primary"
                        loading={this.state.loading}
                        onClick={() => this.enterLoading(option.value)}
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
