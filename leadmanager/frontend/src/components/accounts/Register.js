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
      this.setState({
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
      });
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
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
          <h2 className="text-center">
            <img height="64" width="64" src={"/static/frontend/patient.svg"} />
            &nbsp; Add A Patient
          </h2>
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
                  value={this.state.selectValue}
                  onChange={this.onChange}
                  name="sex"
                >
                  <option value="---">SELECT GENDER</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
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
                  value={this.state.selectValue}
                  onChange={this.onChange}
                >
                  <option value="---">SELECT RAPID INSULIN</option>
                  <option value="NR">NovoRapid</option>
                  <option value="A">Apidra</option>
                  <option value="HL">HumalogLispro</option>
                  <option value="R">Regular</option>
                </select>
              </div>
              <div className="col">
                <label>Long Acting Insulin</label>
                <select
                  className="form-control"
                  name="long_acting"
                  value={this.state.selectValue}
                  onChange={this.onChange}
                >
                  <option value="---">SELECT LONG ACTING</option>
                  <option value="L">Lantus</option>
                  <option value="B">Basalog</option>
                  <option value="Le">Levemir</option>
                  <option value="G">Glaritus</option>
                  <option value="D">Degludee</option>
                  <option value="GG">GenericGlargine</option>
                </select>
              </div>
            </div>
            <div className="form-check form-group">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                name="is_extreme"
                onChange={this.handleInputChange}
                checked={this.state.is_extreme}
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
