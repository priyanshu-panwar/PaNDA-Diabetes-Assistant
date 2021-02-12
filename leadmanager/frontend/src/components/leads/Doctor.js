import React, { Component, Fragment } from "react";
import Register from "../accounts/Register";
import AllUsers from "./AllUsers";

export default class Doctor extends Component {
  render() {
    return (
      <Fragment>
        <br />
        <img
          height="80"
          width="80"
          src={"/static/frontend/doctor.png"}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
        />
        <h2 style={{ textAlign: "center" }}>
          <strong>DocDesk 1.0</strong>
        </h2>
      </Fragment>
    );
  }
}
