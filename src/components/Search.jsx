import React, { Component } from "react";
import NavBar from "./common/navBar";
import SearchBar from "./common/searchBar";
import RegionsTable from "./common/regionsTable";
import _ from "lodash";
import { toast } from "react-toastify";

import "../css/search.css";
import "react-toastify/dist/ReactToastify.min.css";

import animateScrollTo from "animated-scroll-to";

import { Tabs, Button, Badge } from "antd";
import "antd/dist/antd.css";

import io from "socket.io-client";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import numeral from "numeral";

//  Search Bar
class Search extends Component {
  // socket;
  socket = io("101.4.0.254:8878/api"); //101.4.0.254:8878/api

  state = {
    data: {
      direction: [],
      posts: [],
      type: "",
      carNumber: "",
      startDate: "",
      endDate: "",
      spr: "",
      img: ""
    },
    request: [],
    count: [],
    selectedOption: "",
    loading: false,
    iconLoading: false,
    visible: false,
    isOn: false
  };

  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
      return false;
    }

    // const token = localStorage.getItem("token");
    const that = this;
    var count = [];
    this.socket.once("connect", function() {
      that.request = [];

      that.socket.on("search", function(data) {
        that.setState({ isOn: false });
        // console.log(data);
        const index = _.findIndex(that.request, { id: data.id });
        if (index !== -1) {
          if (!_.isEmpty(data.data)) {
            data.data.map(d => {
              return that.request[index].data.push(d);
            });
          }
        } else {
          that.request.push(data);
        }

        that.setState({
          request: that.request,
          loading: false,
          loadingSearchButton: false
        });
        let tableBody = document.getElementsByClassName(
          "hello_" + that.state.selectedOption
        );

        if (tableBody[0] !== undefined) {
          const options = {
            speed: 6500,
            element: document.querySelector(
              ".hello_" + that.state.selectedOption
            ),
            offset: tableBody[0].scrollHeight - tableBody[0].scrollTop
          };

          animateScrollTo(tableBody[0].scrollHeight, options);
        }
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

    this.socket.on("err", function(data) {
      // console.log(data);
      if (data.status === 401) {
        localStorage.removeItem("token");
        that.props.history.push("/");
        toast.info("Сизнинг сессиянгиз тугади.  Қайтадан киринг!");
      }
    });
  }

  handleTabClick = option => {
    console.log(option);
    this.setState({ selectedOption: option });
  };

  handleOptionSelect = option => {
    this.setState({ selectedOption: option });
  };

  callBack = (
    direction,
    posts,
    startDate,
    endDate,
    type,
    carNumber,
    spr,
    isOn,
    count
  ) => {
    this.setState({
      data: { direction, posts, startDate, endDate, type, carNumber, spr },
      selectedOption: direction[0].value,
      isOn,
      count
    });
    this.request = [];
  };

  enterLoading = region => {
    const { carNumber, type, startDate, endDate, spr } = this.state.data;
    const regionData = _.filter(this.state.request, function(o) {
      return o.id === region;
    });
    const offset = regionData[0].data.length;
    const posts = _.filter(this.state.data.posts, function(o) {
      return o.id === region;
    });
    const postsIp = _.map(posts, "value");

    var data = {
      direction: [region],
      offset: offset,
      posts: postsIp,
      carNumber,
      type,
      startDate,
      endDate,
      spr,
      token: localStorage.getItem("token")
    };
    this.socket.emit("search", data);

    this.setState({ loading: true });
  };

  endLoading = () => {
    this.setState({ loading: false });
  };

  renderTabName = option => {
    const temp = _.find(this.state.count, { id: option.value });

    if (temp !== undefined && temp.count !== -1) {
      var string = numeral(temp.count).format("0,0");

      return "  |  " + string;
    } else {
      return "";
    }
  };

  handlingConnectionless = option => {
    const temp = _.find(this.state.count, { id: option });
    if (temp !== undefined) {
      if (temp.count !== -1) return false;
      else return true;
    }
  };

  handlingMoreDisabled = option => {
    const { request } = this.state;
    const temp = request[_.findIndex(request, { id: option.value })];
    if (temp !== undefined) {
      if (temp.data.length === 0) return true;
      else return false;
    } else return true;

    // const temp = _.isEmpty(_.find(req));
  };

  loadImage = item => {
    const oldImg = this.state.img;

    var that = this;
    let data = {
      event_id: item.event_id,
      ip: item.ip,
      the_date: item.the_date,
      token: localStorage.getItem("token")
    };
    this.socket.emit("loadImage", data);
    this.socket.once("image", function(data) {
      if (oldImg !== undefined && oldImg.event_id === data.event_id) {
        that.setState({ visible: true });
      } else {
        if (data.data[0].car_photo === null) {
          console.log("photo null");
          toast.error("Расм топилмади");
          return false;
        }
        const img = "data:image/jpeg;base64," + data.data[0].car_photo;
        data.data[0].car_photo = img;
        that.setState({ img: data, visible: true });
      }
    });
  };

  CheckSearchBar() {
    console.log("Hello");
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    const { data, request, count, visible, isOn } = this.state;
    // const { socket } = this.props;
    const { direction } = data;
    const { TabPane } = Tabs;

    return (
      <React.Fragment>
        <div className="">
          <NavBar />
          <div className="row">
            <div className="col-md-3 mw-30 rounded-sm searchBar shadow">
              <h1 className="mt-4">Филтрлаш</h1>
              <hr />
              <SearchBar
                callBack={this.callBack}
                socket={this.socket}
                check={this.CheckSearchBar}
                token={this.token}
                isOn={isOn}
              />
            </div>
            <div className="col-md mt-4">
              <Tabs
                defaultActiveKey="1"
                tabPosition="left"
                size="large"
                onChange={this.handleTabClick}
              >
                {direction.map(option => (
                  // <Badge count={99}></Badge>
                  <TabPane
                    tab={option.label + this.renderTabName(option)}
                    key={option.value}
                    disabled={this.handlingConnectionless(option.value)}
                    onClick={() => this.handleTabClick(option)}
                    className="tabs"
                  >
                    <div className="mt-4   ">
                      <div className="">
                        <RegionsTable
                          request={request}
                          regionId={option.value}
                          count={
                            count[_.findIndex(count, { id: option.value })]
                          }
                          loadImage={this.loadImage}
                          isOn={this.state.isOn}
                        />
                        <Button
                          type="primary"
                          loading={this.state.loading}
                          onClick={() => this.enterLoading(option.value)}
                          disabled={this.handlingMoreDisabled(option)}
                          block
                        >
                          Кўпроқ юкланг
                        </Button>
                      </div>
                    </div>
                  </TabPane>
                ))}
              </Tabs>
            </div>
          </div>

          {visible && (
            <Lightbox
              mainSrc={this.state.img.data[0].car_photo}
              onCloseRequest={() => this.setState({ visible: false })}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
