import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import DateTime from "react-datetime";

import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class SearchBar extends Form {
  state = {
    data: { direction: [], carNumber: "" },
    date: new Date(),
    errors: {},
    options: [
      { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
      { _id: "5b21ca3eeb7f6fbccd47181564", name: "Comedy" },
      { _id: "5b21ca3eeb7f6fbccd4718209", name: "Thriller" }
    ]
  };

  schema = {
    direction: Joi.required().label("Direction"),
    carNumber: Joi.string()
      .min(3)
      .max(10)
      .required()
      .label("Car Number")
  };

  doSubmit = () => {
    alert("Submitted");
  };

  handleChange = date => {
    date = moment(date).format("YYYY:MM:DD");

    this.setState({ date: date });
    console.log(this.state.date);
  };

  render() {
    const { options } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect("direction", "Direction", options)}
          {/* <lable>Please choose date</lable> */}
          <DateTime
            className="col-md-6"
            name="date"
            onChange={this.handleChange}
          />
          {this.renderInput("carNumber", "Car Number")}
          {this.renderButton("submit")}
        </form>
      </div>
    );
  }
}

export default SearchBar;
