import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Dashboard from "./Dashboard";
import Doctor from "./Doctor";

export class LoginType extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isDoctor } = this.props.auth;

    const doctorPage = <Doctor />;

    const patientPage = <Dashboard />;

    return <div>{isDoctor ? doctorPage : patientPage}</div>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(LoginType);
