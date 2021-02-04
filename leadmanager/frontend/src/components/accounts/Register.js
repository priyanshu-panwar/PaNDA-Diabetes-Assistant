import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    age: "",
    sex: "",
    phone: "",
    crno: "",
    bedno: "",
    weight: "",
    is_extreme: false,
    rapid_insulin: "",
    long_acting: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      email,
      password,
      password2,
      first_name,
      last_name,
      age,
      sex,
      phone,
      crno,
      bedno,
      weight,
      rapid_insulin,
      long_acting,
      is_extreme,
    } = this.state;
    if (password != password2) {
      this.props.createMessage({
        passwordDoNotMatch: "Passwords do not match",
      });
    } else {
      const newUser = {
        username,
        password,
        email,
        first_name,
        last_name,
        age,
        sex,
        phone,
        crno,
        bedno,
        weight,
        rapid_insulin,
        long_acting,
        is_extreme,
      };
      this.props.register(newUser);
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.sex);
  };

  render() {
    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" />;
    // }

    const {
      username,
      email,
      password,
      password2,
      first_name,
      last_name,
      age,
      sex,
      phone,
      crno,
      bedno,
      weight,
      rapid_insulin,
      long_acting,
      is_extreme,
    } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Add A Patient</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="username"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={password}
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  placeholder="Confirm Password"
                  onChange={this.onChange}
                  value={password2}
                />
              </div>
            </div>
            <hr></hr>
            <div className="row form-group">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  name="first_name"
                  onChange={this.onChange}
                  value={first_name}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  name="last_name"
                  onChange={this.onChange}
                  value={last_name}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Age"
                  name="age"
                  onChange={this.onChange}
                  value={age}
                />
              </div>
              <div className="col">
                <select
                  className="form-control"
                  value={sex}
                  onChange={this.onChange}
                  name="sex"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  name="phone"
                  onChange={this.onChange}
                  value={phone}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="CR No."
                  name="crno"
                  onChange={this.onChange}
                  value={crno}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Weight"
                  name="weight"
                  onChange={this.onChange}
                  value={weight}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bed No."
                  name="bedno"
                  onChange={this.onChange}
                  value={bedno}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col">
                <label>Rapid Insulin</label>
                <select
                  className="form-control"
                  id="sel1"
                  name="rapid_insulin"
                  value={rapid_insulin}
                  onChange={this.onChange}
                >
                  <option value="NovoRapid">NovoRapid</option>
                  <option>Apidra</option>
                  <option>HumalogLispro</option>
                  <option>Regular</option>
                </select>
              </div>
              <div className="col">
                <label>Long Acting Insulin</label>
                <select
                  className="form-control"
                  name="long_acting"
                  value={long_acting}
                  onChange={this.onChange}
                >
                  <option value="Lantus">Lantus</option>
                  <option>Basalog</option>
                  <option>Levemir</option>
                  <option>Glaritus</option>
                  <option>Degludee</option>
                  <option>GenericGlargine</option>
                </select>
              </div>
            </div>
            <div className="form-check form-group">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                name="is_extreme"
                onChange={this.onChange}
                value={is_extreme}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                7 Point Patient
              </label>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Add Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps, { register, createMessage })(Register);
