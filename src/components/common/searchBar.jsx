import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./form";

// Import Materialize
import M from "materialize-css";

class SearchBar extends Form {
  state = {
    data: { direction: [] },
    errors: {},
    options: [
      { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
      { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" }
    ]
  };

  schema = {
    direction: Joi.string()
      .required()
      .label("Direction")
  };

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    const { options } = this.state;
    return <div>{this.renderSelect("direction", "Direction", options)}</div>;
  }
}

export default SearchBar;
