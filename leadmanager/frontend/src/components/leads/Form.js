import React, { Component, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead } from "../../actions/leads";
import Clock from "./Clock";

export class form extends Component {
  state = {
    sugarLevel: "",
    dose: "",
  };

  static propTypes = {
    addLead: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { sugarLevel, dose } = this.state;
    const lead = { sugarLevel, dose };
    this.props.addLead(lead);
    this.setState({
      sugarLevel: "",
      dose: "",
    });
  };

  render() {
    const { sugarLevel, dose } = this.state;
    return (
      <div className="card card-body mt-4 mb-4 bg-light">
        <h2 className="card-title">PaNDA Dose Tracker</h2>
        <Clock />
        <hr></hr>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Sugar Level</label>
            <input
              className="form-control"
              name="sugarLevel"
              type="text"
              onChange={this.onChange}
              value={sugarLevel}
            />
          </div>
          <div className="form-group">
            <label>Dose Taken</label>
            <input
              className="form-control"
              name="dose"
              type="text"
              onChange={this.onChange}
              value={dose}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">I took this Dose</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addLead })(form);
