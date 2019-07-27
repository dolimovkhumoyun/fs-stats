import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import Select from "react-select";
// import { RadioGroup, RadioButton } from "react-radio-buttons";
import { DatePicker, Input, Icon, Radio } from "antd";
import { toast, ToastContainer } from "react-toastify";

import moment from "moment";
import _ from "lodash";
import "antd/dist/antd.css";

class SearchBar extends Form {
  state = {
    data: { direction: [], posts: [], type: "all", carNumber: "60A770AA" },
    startDate: moment()
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss"),
    endDate: moment()
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss"),
    errors: {},
    optionsRegion: [],
    optionsPosts: []
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
    var { direction } = data;
    this.props.callBack(direction);

    direction = _.map(direction, "value");
    let post = {};
    post = { ...this.state.data };
    post.startDate = startDate;
    post.endDate = endDate;
    post.direction = direction;
    // console.log(post.direction);
    socket.emit("search", post);
  };

  handleChange = selectedOptions => {
    const dirs = _.map(selectedOptions, "value");
    const { posts, carNumber, type } = this.state.data;
    const direction = selectedOptions;

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
              defaultValue="all"
              size="large"
              onChange={this.handleRadioButtonChange}
            >
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="wanted">Wanted</Radio.Button>
              <Radio.Button value="notwanted">Not Wanted</Radio.Button>
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
              onOk={this.onOk}
            />
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
              // className=""
              clearable={false}
              required={true}
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
