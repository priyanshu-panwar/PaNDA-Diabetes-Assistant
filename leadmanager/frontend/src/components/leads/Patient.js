import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

import { loadPatient, getPatientLeads } from "../../actions/auth";
import { rapid, longacting } from "./constants";

export class Patient extends Component {
  static propTypes = {
    patient: PropTypes.array.isRequired,
    loadPatient: PropTypes.func.isRequired,
    getPatientLeads: PropTypes.func.isRequired,
    patleads: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const pk = this.props.match.params.pk;
    this.props.loadPatient(pk);
    this.props.getPatientLeads(pk);
  }

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

  onSubmit = (e) => {};

  onChange = (e) => {};

  handleDropdownChange = (e) => {};

  handleInputChange = (event) => {};

  render() {
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
      <Fragment>
        <div>
          <br />
          <img
            height="80"
            width="80"
            src={"/static/frontend/getpatient.png"}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          />
          <h2 style={{ textAlign: "center" }}>
            <strong>Patient Portal</strong>
          </h2>
          <div className="row">
            <div className="col-md-4">
              {this.props.patient.map((user) => (
                <div key={user.id} className="card card-body mt-5">
                  <h2 className="text-center">
                    <strong>
                      {user.first_name} {user.last_name}
                    </strong>
                  </h2>
                  <h4>
                    Weight : <strong>{user.weight} kg</strong>
                  </h4>
                  <h4>
                    Age :{" "}
                    <strong>
                      {user.age} kg / {user.sex}
                    </strong>
                  </h4>
                  <h4>
                    Contact :{" "}
                    <strong>
                      {user.email} | {user.phone}
                    </strong>
                  </h4>
                  <hr />
                  <form onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="col form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={"CR No. = " + user.crno}
                          name="crno"
                          onChange={this.onChange}
                          value={crno}
                        />
                      </div>
                      <div className="col form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={"Bed No. = " + user.bedno}
                          name="bedno"
                          onChange={this.onChange}
                          value={bedno}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>
                        <h4>
                          Rapid Insulin :{" "}
                          <strong>{rapid[user.rapid_insulin]}</strong>
                        </h4>
                      </label>
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
                    <div className="form-group">
                      <label>
                        <h4>
                          Long Acting Insulin :{" "}
                          <strong>{longacting[user.long_acting]}</strong>
                        </h4>
                      </label>
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
                    <div className="form-check form-group">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="is_extreme"
                        onChange={this.handleInputChange}
                        checked={user.is_extreme}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        7 Point Patient
                      </label>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              ))}
            </div>
            <div className="col-md-8">
              <div className="card card-body mt-5">
                <h3>
                  <strong>Today's Activity</strong>
                </h3>
                <hr />
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Sugar Level</th>
                      <th>Dose</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.patleads.map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <Moment format="MMMM Do YYYY">
                            {lead.takenAtDate}
                          </Moment>
                          &nbsp;
                          {lead.takenAtTime}
                        </td>
                        <td>{lead.sugarLevel}</td>
                        <td>{lead.dose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  patient: state.auth.patient,
  patleads: state.auth.patleads,
});

export default connect(mapStateToProps, { loadPatient, getPatientLeads })(
  Patient
);
