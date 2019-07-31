import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import Select from "react-select";
import { DatePicker, Input, Icon, Radio } from "antd";
import { toast, ToastContainer } from "react-toastify";

import moment from "moment";
import _ from "lodash";
import "antd/dist/antd.css";
import MoreButton from "./moreButton";

class SearchBar extends Form {
  state = {
    data: { direction: [], posts: [], type: "all", carNumber: "60A770AA" },
    startDate: moment()
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss"),
    endDate: moment()
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss"),
    optionsRegion: [],
    optionsPosts: [],
    errors: {}
  };

  schema = {
    direction: Joi.required().label("Direction"),
    posts: Joi.required().label("Posts"),
    type: Joi.required().label("Type"),
    carNumber: Joi.string()
      .regex(/^[A-Za-z*_%\d]+$/g)
      .required()
      .label("Car Number")
  };

  getOptions() {
    this.props.socket.emit("regions", {});
    const interval = 6 * 60 * 1000; // 6 minutes
    setInterval(() => {
      this.props.socket.emit("regions", {});
    }, interval);
  }

  componentDidMount() {
    const { socket } = this.props;
    var that = this; // For using this inside other functions
    socket.once("connect", function(data) {
      that.getOptions();
      this.on("regions", data => {
        var options = data.data;
        options.map(option => {
          if (option.hasOwnProperty("isoffline")) {
            option.isDisabled = option.isoffline;
            delete option.isoffline;
          }
        });

        options = [{ value: "-1", label: "All" }, ...options];
        that.setState({ optionsRegion: options });
      });
      this.on("err", function(data) {
        console.log(data);
      });
    });
  }

  doSubmit = async () => {
    const { socket } = this.props;
    const { data, startDate, endDate } = this.state;
    var { carNumber, direction, posts, type } = data;
    this.props.callBack(direction, posts, startDate, endDate, type, carNumber);
    direction = _.map(direction, "value");
    var ips = _.map(posts, "value");

    let post = {};
    post = { ...this.state.data };
    post.startDate = startDate;
    post.endDate = endDate;
    post.direction = direction;
    post.posts = ips;
    socket.emit("search", post);
  };

  handleChange = selectedOptions => {
    const dirs = _.map(selectedOptions, "value");
    const { posts, carNumber, type } = this.state.data;
    const { optionsRegion } = this.state;
    var direction = selectedOptions;
    const indexOfAll = _.findIndex(selectedOptions, { value: "-1" });
    if (dirs[indexOfAll]) {
      direction = optionsRegion;

      direction = _.filter(direction, function(o) {
        return o.value > 0 && !o.isDisabled;
      });
    }

    this.setState({
      data: { direction: direction, posts, carNumber, type }
    });
    if (direction === null) {
      this.setState({ optionsPosts: [] });
      return;
    }

    this.props.socket.emit("posts", dirs);
    const that = this;
    this.props.socket.once("posts", function(data) {
      const optionsPosts = data.data;
      optionsPosts.map(option => {
        if (option.hasOwnProperty("isoffline")) {
          option.isDisabled = option.isoffline;
          delete option.isoffline;
        }
      });

      that.setState({ optionsPosts });
    });
  };

  handlePostsSelect = selectedOptions => {
    const { direction, carNumber, type } = this.state.data;
    const posts = selectedOptions;
    this.setState({
      data: { direction, posts, carNumber, type }
    });
  };

  // Handles all changes on click of Filter buttons
  handleRadioButtonChange = e => {
    const { direction, posts, carNumber } = this.state.data;
    const { value } = e.target;
    this.setState({ data: { type: value, direction, posts, carNumber } });
  };

  // Event fired when Date Range has been selected
  onOk = range => {
    const startDate = moment(range[0]).format("YYYY-MM-DD HH:mm:ss");
    const endDate = moment(range[1]).format("YYYY-MM-DD HH:mm:ss");
    let diff = moment(endDate).diff(moment(startDate));
    diff = moment.duration(diff).asDays();
    if (diff >= 30) {
      toast.error(
        "You are seraching data for 1 Month.    It may take some time longer!!"
      );
    }

    this.setState({ startDate, endDate });
  };

  handleInputChange = e => {
    const { currentTarget: input } = e;
    const data = { ...this.state.data };
    data[input.name] = input.value.toUpperCase();

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({ data, errors });
  };

  render() {
    const { optionsRegion, optionsPosts, startDate, endDate } = this.state;
    const { carNumber } = this.state.data;

    const { RangePicker } = DatePicker;

    return (
      <div>
        <ToastContainer position="top-center" />
        <form onSubmit={this.handleSubmit} className="mt-4">
          <div className="form-group col-md-12">
            <Radio.Group
              defaultValue="-1"
              size="large"
              onChange={this.handleRadioButtonChange}
            >
              <Radio.Button value="-1">All</Radio.Button>
              <Radio.Button value="1">Wanted</Radio.Button>
              <Radio.Button value="0">Not Wanted</Radio.Button>
            </Radio.Group>
          </div>
          <div className="form-group ">
            <label htmlFor="" className="col-md-12">
              <strong> Date and Time: </strong>
            </label>
            <br />
            <RangePicker
              showTime={{ format: "HH:mm:ss" }}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={["Start Time", "End Time"]}
              size="large"
              style={{ width: 500 }}
              className="col-md-12"
              defaultValue={[moment(startDate), moment(endDate)]}
              name={["startDate", "endDate"]}
              onChange={this.validateRange}
              onOk={this.onOk}
            />
            {this.error && (
              <div className="alert alert-danger col-md-12 mt-2">
                {this.error}
              </div>
            )}
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="">
              <strong> Car Number: </strong>
            </label>
            <Input
              addonAfter={<Icon type="setting" onClick={this.IconClick} />}
              placeholder="60A770AA"
              size="large"
              allowClear={true}
              name="carNumber"
              value={carNumber}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor={"regions"}>
              <strong>Regions: </strong>
            </label>
            <Select
              options={optionsRegion}
              onChange={this.handleChange}
              isMulti
              closeMenuOnSelect={false}
              inputProps={{ id: "fieldId" }}
              clearable={false}
              required={true}
              components={{ MoreButton }}
              value={this.state.data.direction}
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor={"regions"} className="mt-2">
              <strong>Posts: </strong>
            </label>
            <Select
              options={optionsPosts}
              onChange={this.handlePostsSelect}
              isMulti
              closeMenuOnSelect={false}
              inputProps={{ id: "fieldId" }}
            />
          </div>
          {this.renderButton("submit")}
        </form>

        <div>
          <br />
        </div>
      </div>
    );
  }
}

export default SearchBar;
