import React, { Component, Fragment } from "react";
import Register from "../accounts/Register";

export default class Doctor extends Component {
  render() {
    return (
      <Fragment>
        <br />
        <h2>DocDesk 1.0</h2>
        <hr></hr>
        <Register />
      </Fragment>
    );
  }
}
