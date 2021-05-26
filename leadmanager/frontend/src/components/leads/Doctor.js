import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import { getAllLeads } from "../../actions/auth";

export class Doctor extends Component {
  static propTypes = {
    getAllLeads: PropTypes.func.isRequired,
    allleads: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getAllLeads();
    setInterval(() => {
      this.props.getAllLeads();
    }, 60000);
  }

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
        <br />
        <br />
        <h4 style={{ textAlign: "center" }}>
          <strong>Latest Info</strong>
        </h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Time</th>
              <th>Sugar Level</th>
              <th>Dose Taken</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.allleads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <Link to={"/patient/" + lead.patient}>
                    {lead.patient_name}
                  </Link>
                </td>
                <td>
                  <Moment format="MMMM Do YYYY">{lead.takenAtDate}</Moment>
                  &nbsp;
                  {lead.takenAtTime}
                </td>
                <td>{lead.sugarLevel}</td>
                <td>{lead.dose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  allleads: state.auth.allleads,
});

export default connect(mapStateToProps, { getAllLeads })(Doctor);
