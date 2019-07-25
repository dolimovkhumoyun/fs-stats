import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import Select from "react-select";
import { RadioGroup, RadioButton } from "react-radio-buttons";

import moment from "moment";
import _ from "lodash";

class SearchBar extends Form {
  state = {
    data: { direction: [], posts: [], carNumber: "" },
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
    var { direction, carNumber } = data;
    this.props.callBack(direction);

    direction = _.map(direction, "id");
    let post = {};
    post.direction = direction;
    post.startDate = startDate;
    post.endDate = endDate;
    post.carNumber = carNumber;

    socket.emit("search", post);
  };

  handleChange = selectedOptions => {
    const dirs = _.map(selectedOptions, "value");
    const { posts } = this.state.data;
    const direction = selectedOptions;

    this.setState({
      data: { direction: direction, posts: posts, carNumber: "" }
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
    const { direction } = this.state.data;
    const posts = selectedOptions;
    this.setState({
      data: { direction: direction, posts: posts, carNumber: "" }
    });
  };

  onChange = selected => {
    console.log(selected);
  };

  render() {
    const { optionsRegion, optionsPosts } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="mt-4">
          <label htmlFor={"regions"}>
            <strong>Regions: </strong>
          </label>
          <Select
            options={optionsRegion}
            onChange={this.handleChange}
            isMulti
            closeMenuOnSelect={false}
            inputProps={{ id: "fieldId" }}
            className=""
            clearable={false}
            required={true}
          />

          <label htmlFor={"regions"} className="mt-2">
            <strong>Posts: </strong>
          </label>
          <Select
            options={optionsPosts}
            onChange={this.handlePostsSelect}
            isMulti
            closeMenuOnSelect={false}
            inputProps={{ id: "fieldId" }}
            className=""
          />

          <label htmlFor="" className="mt-2">
            <strong> Date and Time: </strong>
          </label>
          <div className="input-group ">
            {this.renderDatePicker(
              "startDate",
              "Start Date : ",
              "from",
              this.handleStartDateChange
            )}

            {this.renderDatePicker(
              "endDate",
              "End Date : ",
              "to",
              this.handleEndDateChange
            )}
          </div>
          <div className="mt-3">
            <RadioGroup onChange={this.onChange} horizontal>
              <RadioButton
                value="all"
                iconSize={20}
                rootColor={"gray"}
                pointColor={"blue"}
              >
                All
              </RadioButton>
              <RadioButton
                value="wanted"
                iconSize={20}
                rootColor={"gray"}
                pointColor={"blue"}
              >
                Wanted
              </RadioButton>
              <RadioButton
                value="melon"
                iconSize={20}
                rootColor={"gray"}
                pointColor={"blue"}
              >
                Not Wanted
              </RadioButton>
              {/* <ReversedRadioButton value="melon">Melon</ReversedRadioButton> */}
            </RadioGroup>
          </div>
          {this.renderInput(
            "carNumber",
            "Car Number",
            "60A001AA",
            this.handleCarNumChange
          )}

          {this.renderButton("submit")}
        </form>
      </div>
    );
  }
}

export default SearchBar;
