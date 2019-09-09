import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import Select from "react-select";
import { DatePicker, Input, Icon, Radio, Button, Tooltip } from "antd";
import { toast, ToastContainer } from "react-toastify";

import moment from "moment";
import _ from "lodash";
import "antd/dist/antd.css";
import MoreButton from "./moreButton";
import "moment/locale/uz";

class SearchBar extends Form {
  state = {
    data: { direction: [], posts: [], type: "all", carNumber: "" },
    startDate: moment()
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss"),
    endDate: moment()
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss"),
    optionsRegion: [],
    optionsPosts: [],
    errors: {},
    isDisabled: true,
    TooltipVisibility: false
  };

  schema = {
    direction: Joi.required().label("Direction"),
    posts: Joi.required().label("Posts"),
    type: Joi.required().label("Type"),
    carNumber: Joi.label("Car Number")
    // .regex(/^[A-Za-z*_%\d]+$/g)
  };

  getOptions() {
    const token = localStorage.getItem("token");
    this.props.socket.emit("regions", { token });
    const interval = 60 * 60 * 1000; // 6 minutes
    setInterval(() => {
      this.props.socket.emit("regions", { token });
    }, interval);
  }

  componentDidMount() {
    var that = this; // For using this inside other functions

    // this.props.socket.on("connect", function(data) {
    that.getOptions();
    that.props.socket.on("regions", data => {
      var options = data.data;
      options.map(option => {
        if (option.hasOwnProperty("isoffline")) {
          option.isDisabled = option.isoffline;
          delete option.isoffline;
        }
        return true;
      });

      options = [{ value: "-1", label: "Жами" }, ...options];
      that.setState({ optionsRegion: options });

      //
      let regions = _.map(data.data, "value");
      let token = localStorage.getItem("token");
      that.props.socket.emit("posts", { regions, token });
    });
    // });
  }

  doSubmit = async () => {
    const token = localStorage.getItem("token");
    const { socket } = this.props;
    const { data, startDate, endDate } = this.state;
    var { carNumber, direction, posts, type } = data;
    var spr = _.sortedUniq(_.map(posts, "id"));
    let isOn = true;
    let count = "";

    this.props.callBack(
      direction,
      posts,
      startDate,
      endDate,
      type,
      carNumber,
      spr,
      isOn,
      count
    );
    direction = _.map(direction, "value");
    var ips = _.map(posts, "value");

    let post = {};
    post = { ...this.state.data };
    post.startDate = startDate;
    post.endDate = endDate;
    post.direction = direction;
    post.posts = ips;
    post.spr = spr; // selected Posts of Regions
    post.token = token;
    socket.emit("search", post);

    this.setState({ isDisabled: true });
  };

  handleRegionsChange = selectedOptions => {
    if (_.isEmpty(selectedOptions)) {
      this.setState({ optionsPosts: selectedOptions, isDisabled: true });
    } else if (!_.isEmpty(selectedOptions) && _.isEmpty(this.state.startDate))
      this.setState({ isDisabled: true });
    else if (_.isEmpty(this.state.startDate)) {
      this.setState({ isDisabled: true });
    } else this.setState({ isDisabled: false });

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
    const regions = _.map(direction, "value");
    const token = localStorage.getItem("token");
    let data = { regions, token };
    // regions["token"] = localStorage.getItem("token");
    this.props.socket.emit("posts", data);

    const that = this;
    this.props.socket.once("posts", function(data) {
      const optionsPosts = data.data;
      optionsPosts.map(option => {
        if (option.hasOwnProperty("isoffline")) {
          option.isDisabled = option.isoffline;
          delete option.isoffline;
        }
        return true;
      });

      that.setState({ optionsPosts });
    });
  };

  handlePostsSelect = selectedOptions => {
    const { startDate } = this.state;
    const { direction, carNumber, type } = this.state.data;
    const posts = selectedOptions;
    let isDisabled = true;
    if (!_.isEmpty(direction) && type && startDate) {
      console.log("Hello");
      isDisabled = false;
    }

    this.setState({
      data: { direction, posts, carNumber, type },
      isDisabled
    });
  };

  // Handles all changes on click of Filter buttons
  handleRadioButtonChange = e => {
    const { direction, posts, carNumber } = this.state.data;
    const { value } = e.target;

    let isDisabled = true;
    console.log(direction);
    if (direction.length !== 0 && this.state.startDate) isDisabled = false;
    this.setState({
      data: { type: value, direction, posts, carNumber },
      isDisabled
    });
  };

  handleRangeChange = range => {
    if (_.isEmpty(range))
      this.setState({ startDate: null, endDate: null, isDisabled: true });
    else if (!_.isEmpty(this.state.data.direction))
      this.setState({ isDisabled: false });
  };

  // Event fired when Date Range has been selected
  onOk = range => {
    const startDate = moment(range[0]).format("YYYY-MM-DD HH:mm:ss");
    const endDate = moment(range[1]).format("YYYY-MM-DD HH:mm:ss");
    let diff = moment(endDate).diff(moment(startDate));
    diff = moment.duration(diff).asDays();
    if (diff >= 30) {
      toast.error(
        "Сиз 1 ойдан кўп болган малумотни қидирмоқдасиз.  Бу кўп вақт олиши мумкин!"
      );
    }

    this.setState({ startDate, endDate });
  };

  handleInputChange = e => {
    const { currentTarget: input } = e;
    const data = { ...this.state.data };
    data[input.name] = input.value.toUpperCase();

    if (data[input.name] && !/^[A-Za-z*_%0-9\s]+$/g.test(data[input.name])) {
      this.setState({ TooltipVisibility: true });
      return true;
    }
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    let isDisabled = true;
    if (this.state.data.direction.length !== 0 && this.state.startDate)
      isDisabled = false;

    this.setState({ data, errors, isDisabled, TooltipVisibility: false });
  };

  render() {
    const {
      optionsRegion,
      optionsPosts,
      startDate,
      endDate,
      isDisabled
    } = this.state;
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
              name="radio"
            >
              <Radio.Button value="-1">Жами</Radio.Button>
              <Radio.Button value="1">Қидирувда</Radio.Button>
              <Radio.Button value="0">Қидирувда эмас</Radio.Button>
            </Radio.Group>
          </div>
          <div className="form-group ">
            <label htmlFor="" className="col-md-12">
              <strong> Сана ва вақт: </strong>
            </label>
            <br />
            <RangePicker
              showTime={{ format: "HH:mm:ss" }}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={["Дан", "Гача"]}
              size="large"
              style={{ width: 500 }}
              className="col-md-12"
              defaultValue={[moment(startDate), moment(endDate)]}
              name={["startDate", "endDate"]}
              onChange={this.handleRangeChange}
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
              <strong> Автомобил ДРБ: </strong>
            </label>
            <Input
              addonAfter={
                <Tooltip
                  placement="topLeft"
                  title="Автомобил ДРБси ёки  *, % ва _  қабул қилиши мумкин"
                  visible={this.state.TooltipVisibility}
                >
                  <Icon type="info-circle" theme="twoTone" />
                </Tooltip>
              }
              placeholder="Автомобил ДРБ"
              size="large"
              allowClear={true}
              name="carNumber"
              value={carNumber}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor={"regions"}>
              <strong>Вилоятлар: </strong>
            </label>
            <Select
              placeholder="Танламоқ"
              options={optionsRegion}
              onChange={this.handleRegionsChange}
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
              <strong>ЙПХ масканлари: </strong>
            </label>
            <Select
              placeholder="Танламоқ"
              options={optionsPosts}
              onChange={this.handlePostsSelect}
              isMulti
              closeMenuOnSelect={false}
              inputProps={{ id: "fieldId" }}
            />
          </div>
          <div className="col-md-4">
            <Button
              type="primary"
              htmlType="submit"
              disabled={isDisabled}
              loading={this.props.isOn}
            >
              Излаш
            </Button>
          </div>
          {/* {this.renderButton("submit")} */}
        </form>

        <div>
          <br />
        </div>
      </div>
    );
  }
}

export default SearchBar;
