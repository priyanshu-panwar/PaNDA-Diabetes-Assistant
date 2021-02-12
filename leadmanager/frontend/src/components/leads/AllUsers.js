import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadAllUsers } from "../../actions/auth";

import { getLeads, deleteLead } from "../../actions/leads";

import { rapid, longacting } from "./constants";
import { Link } from "react-router-dom";

export class AllUsers extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    user: PropTypes.object,
    loadAllUsers: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadAllUsers();
    this.props.getLeads();
  }

  render() {
    return (
      <Fragment>
        <br />
        <h3>
          <img height="64" width="64" src={"/static/frontend/patient.png"} />
          &nbsp; <strong>All Patients</strong>
        </h3>
        <br />
        <h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>username</th>
                <th>Long Acting</th>
                <th>Rapid Insulin</th>
                <th>Extreme</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link to={"/patient/" + user.id}>{user.username}</Link>
                  </td>
                  <td>{longacting[user.long_acting]}</td>
                  <td>{rapid[user.rapid_insulin]}</td>
                  <td>
                    {user.is_extreme ? (
                      <img
                        width="25"
                        height="25"
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTExLjk5OSA1MTEuOTk5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTEuOTk5IDUxMS45OTk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiNFNTAwMjc7IiBkPSJNNTAxLjQ0OSwzNjguOTE0TDMyMC41NjYsNjYuMjA3QzMwNi43NTEsNDMuMzg0LDI4Mi43MjgsMjkuNTY5LDI1NiwyOS41NjkNCglzLTUwLjc1MiwxMy44MTUtNjQuNTY3LDM2LjYzOEwxMC41NSwzNjguOTE0Yy0xMy44MTIsMjMuNzI1LTE0LjExMyw1MS45NTQtMC41OTksNzUuNjc4YzEzLjUxMywyMy43MjMsMzcuODM2LDM3LjgzOCw2NS4xNjUsMzcuODM4DQoJaDM2MS43NjZjMjcuMzI5LDAsNTEuNjUzLTE0LjExNSw2NS4xNjUtMzcuODM4QzUxNS41NjMsNDIwLjg2OCw1MTUuMjYyLDM5Mi42MzksNTAxLjQ0OSwzNjguOTE0eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0MxMDAxRjsiIGQ9Ik01MDIuMDQ5LDQ0NC41OTJjLTEzLjUxMywyMy43MjMtMzcuODM2LDM3LjgzOC02NS4xNjUsMzcuODM4SDI1NlYyOS41Nw0KCWMyNi43MjcsMCw1MC43NTIsMTMuODE1LDY0LjU2NywzNi42MzhMNTAxLjQ1LDM2OC45MTVDNTE1LjI2MiwzOTIuNjM5LDUxNS41NjMsNDIwLjg2OCw1MDIuMDQ5LDQ0NC41OTJ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkQwMDNBOyIgZD0iTTc1LjEwOSw0NTIuNGMtMTYuNjI4LDAtMzAuODUxLTguMjctMzkuMDYzLTIyLjY2OWMtOC4yMTEtMTQuNDE0LTguMDY1LTMxLjA4NywwLjQ2OS00NS43Mg0KCUwyMTcuMjMsODEuNTQ5YzguMjctMTMuNjY2LDIyLjgxNi0yMS45NTEsMzguNzY5LTIxLjk1MXMzMC41LDguMjg0LDM4Ljg4NywyMi4xNTdsMTgwLjc0NSwzMDIuNDkNCgljOC4zODgsMTQuNCw4LjUzNCwzMS4wNzIsMC4zMjIsNDUuNDg1Yy04LjIxMSwxNC40LTIyLjQzNSwyMi42NjktMzkuMDYzLDIyLjY2OUg3NS4xMDlWNDUyLjR6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRTUwMDI3OyIgZD0iTTQzNi44OTEsNDUyLjRjMTYuNjI4LDAsMzAuODUxLTguMjcsMzkuMDYzLTIyLjY2OWM4LjIxMS0xNC40MTQsOC4wNjUtMzEuMDg3LTAuMzIyLTQ1LjQ4NQ0KCUwyOTQuODg2LDgxLjc1NGMtOC4zODgtMTMuODcxLTIyLjkzMy0yMi4xNTctMzguODg3LTIyLjE1N1Y0NTIuNEg0MzYuODkxeiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0UxRTRGQjsiIGQ9Ik0yODYuMDMsMTUyLjA5NXYxMjAuMTIyYzAsMTYuNTE3LTEzLjUxNCwzMC4wMy0zMC4wMywzMC4wM3MtMzAuMDMxLTEzLjUxNC0zMC4wMzEtMzAuMDNWMTUyLjA5NQ0KCWMwLTE2LjUxNywxMy41MTQtMzAuMDMxLDMwLjAzMS0zMC4wMzFTMjg2LjAzLDEzNS41NzgsMjg2LjAzLDE1Mi4wOTV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQzVDOUY3OyIgZD0iTTI4Ni4wMywxNTIuMDk1djEyMC4xMjJjMCwxNi41MTctMTMuNTE0LDMwLjAzLTMwLjAzLDMwLjAzVjEyMi4wNjQNCglDMjcyLjUxNiwxMjIuMDY0LDI4Ni4wMywxMzUuNTc4LDI4Ni4wMywxNTIuMDk1eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0UxRTRGQjsiIGQ9Ik0yNTYsMzMyLjI3OGMtMjQuOTI2LDAtNDUuMDQ2LDIwLjExOS00NS4wNDYsNDUuMDQ2YzAsMjQuOTI0LDIwLjExOSw0NS4wNDYsNDUuMDQ2LDQ1LjA0Ng0KCXM0NS4wNDYtMjAuMTIxLDQ1LjA0Ni00NS4wNDZDMzAxLjA0NiwzNTIuMzk4LDI4MC45MjUsMzMyLjI3OCwyNTYsMzMyLjI3OHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNDNUM5Rjc7IiBkPSJNMzAxLjA0NiwzNzcuMzIzYzAsMjQuOTI0LTIwLjExOSw0NS4wNDYtNDUuMDQ2LDQ1LjA0NnYtOTAuMDkxDQoJQzI4MC45MjUsMzMyLjI3OCwzMDEuMDQ2LDM1Mi4zOTgsMzAxLjA0NiwzNzcuMzIzeiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="
                      />
                    ) : (
                      "No"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </h5>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.auth.users,
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadAllUsers, getLeads })(AllUsers);
