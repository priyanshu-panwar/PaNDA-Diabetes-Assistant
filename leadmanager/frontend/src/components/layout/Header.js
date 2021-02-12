import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  render() {
    const { isAuthenticated, isDoctor, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.username}` : ""}</strong>
        </span>
        <li className="nav-item">
          <button
            onClick={this.props.logout}
            className="nav-link btn btn-info btn-sm text-light"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const docLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-4">
          <h5 style={{ color: "black" }}>
            <strong>{user ? `Welcome ${user.username}` : ""}</strong>
          </h5>
        </span>
        <li className="nav-item mr-4">
          <Link to="/register" className="nav-link">
            <h5>
              <strong style={{ color: "black" }}>Add Patient</strong>
            </h5>
          </Link>
        </li>
        <li className="nav-item mr-4">
          <Link to="/allpatients" className="nav-link">
            <h5>
              <strong style={{ color: "black" }}>All Patients</strong>
            </h5>
          </Link>
        </li>
        <li className="nav-item mr-3">
          <button
            onClick={this.props.logout}
            className="nav-link btn  text-light"
            style={{ backgroundColor: "#425c42" }}
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        {/* <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#90a390" }}
      >
        <div className="container">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a className="navbar-brand" href="#">
                <img height="64" width="64" src={"/static/frontend/logo.png"} />
                <strong>PaNDA</strong> <small>delta 1.0</small>
              </a>
            </div>
          </div>
          {isAuthenticated ? (isDoctor ? docLinks : authLinks) : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
