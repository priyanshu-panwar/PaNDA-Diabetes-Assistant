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
    firstname: "",
    lastname: "",
    age: "",
    sex: "",
    phone: "",
    crno: "",
    bedno: "",
    weight: "",
    is_extreme: "",
    rapid_insulin: "",
    long_acting: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password != password2) {
      this.props.createMessage({
        passwordDoNotMatch: "Passwords do not match",
      });
    } else {
      const newUser = {
        username,
        password,
        email,
      };
      this.props.register(newUser);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" />;
    // }

    const { username, email, password, password2 } = this.state;
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
                  class="form-control"
                  placeholder="First name"
                  name="firstname"
                  onChange={this.onChange}
                  value={firstname}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                  name="lastname"
                  onChange={this.onChange}
                  value={lastname}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col">
                <input
                  type="text"
                  class="form-control"
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
                  class="form-control"
                  placeholder="Phone"
                  name="phone"
                  onChange={this.onChange}
                  value={phone}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  class="form-control"
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
                  class="form-control"
                  placeholder="Weight"
                  name="weight"
                  onChange={this.onChange}
                  value={weight}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Bed No."
                  name="weight"
                  onChange={this.onChange}
                  value={weight}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col">
                <label>Rapid Insulin</label>
                <select className="form-control" id="sel1">
                  <option>NovoRapid</option>
                  <option>Apidra</option>
                  <option>HumalogLispro</option>
                  <option>Regular</option>
                </select>
              </div>
              <div className="col">
                <label>Long Acting Insulin</label>
                <select className="form-control" id="sel1">
                  <option>Lantus</option>
                  <option>Basalog</option>
                  <option>Levemir</option>
                  <option>Glaritus</option>
                  <option>Degludee</option>
                  <option>GenericGlargine</option>
                </select>
              </div>
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
