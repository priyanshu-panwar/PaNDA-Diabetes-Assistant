import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getLeads, deleteLead } from "../../actions/leads";

export class Leads extends Component {
  getMyDate = () => {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var today = new Date();

    // console.log(today.toLocaleDateString("en-US")); // 9/17/2016
    // console.log(today.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016
    // console.log(today.toLocaleDateString("hi-IN", options)); // शनिवार, 17 सितंबर 2016
    var today_date = today.toLocaleDateString("en-US", options);
    return today_date;
  };

  getTime = (timeGiven) => {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date();
    var day = days[d.getDay()];
    // console.log(typeof timeGiven);
    let j = timeGiven.toString();
    // console.log(j);
    // console.log(j.slice(0, 2));
    // console.log(j.slice(3, 5));
    var hr = j.slice(0, 2);
    var min = j.slice(3, 5);
    // console.log(hr);
    // console.log(min);
    if (min < 10) {
      min = "0" + min;
    }
    var ampm = "am";
    if (hr > 12) {
      hr -= 12;
      ampm = "pm";
    }
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    // var x = document.getElementById("time");
    var x = hr + ":" + min + " " + ampm;
    // console.log(x);
    return x;
  };

  static propTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getLeads();
  }

  render() {
    return (
      <Fragment>
        <h2>Daily Tracker - {this.getMyDate()}</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              {/* <th>Date</th> */}
              <th>Time</th>
              <th>Sugar Level</th>
              <th>Dose Taken</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.leads.map((lead) => (
              <tr key={lead.id}>
                {/* <td>{lead.takenAtDate}</td> */}
                <td>{this.getTime(lead.takenAtTime)}</td>

                <td>{lead.sugarLevel}</td>
                <td>{lead.dose}</td>
                <td>
                  <button
                    onClick={this.props.deleteLead.bind(this, lead.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  leads: state.leads.leads,
});

export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
