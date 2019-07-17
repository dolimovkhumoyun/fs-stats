import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import moment from "moment";
import axios from "axios";

// import http from "../../service/httpService";

class SearchBar extends Form {
  state = {
    data: { direction: [], carNumber: "" },
    startDate: moment()
      .startOf("day")
      .format("YYYY:MM:DD HH:mm:ss"),
    endDate: moment()
      .endOf("day")
      .format("YYYY:MM:DD HH:mm:ss"),
    errors: {},
    options: []
  };

  async componentDidMount() {
    const response = await axios.get(
      "http://192.168.1.31/fs_stat_back/API/regions"
    );

    const options = response.data;
    this.setState({ options });
  }

  schema = {
    direction: Joi.required().label("Direction"),

    carNumber: Joi.string()
      .regex(/^[A-Za-z*_%\d]+$/g)
      .required()
      .label("Car Number")
  };

  doSubmit = async () => {
    const { data, startDate, endDate } = this.state;
    const { direction, carNumber } = data;

    let post = {};
    post.direction = direction;
    post.startDate = startDate;
    post.endDate = endDate;
    post.carNumber = carNumber;
    const response = await axios.post(
      "http://192.168.1.31/fs_stat_back/API/search",
      post
    );
    console.log(response.data);
  };

  render() {
    const { options } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="mt-4">
          {this.renderSelect("direction", "Direction", options)}
          {this.renderDatePicker(
            "startDate",
            "Start Date: ",
            this.handleStartDateChange
          )}
          {this.renderDatePicker(
            "endDate",
            "End Date: ",
            this.handleEndDateChange
          )}
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
