import axios from "axios";
import { returnErrors, createMessage } from "./messages";

import {
  USER_LOADED,
  AUTH_ERROR,
  USER_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  ALL_USER_FAILURE,
  ALL_USER_SUCCESS,
  ALL_USER_LOADING,
  GET_PATIENT_FAILURE,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_LEADS,
  GET_ALL_LEADS,
} from "./types";

// GET SINGLE PATIENT(USER)
export const loadPatient = (pk) => (dispatch, getState) => {
  const url = `/api/auth/user/${pk}`;
  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_PATIENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_PATIENT_FAILURE,
      });
    });
};

// GET ALL LEADS
export const getAllLeads = () => (dispatch, getState) => {
  const url = `/api/leads/all`;
  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ALL_LEADS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_PATIENT_FAILURE,
      });
    });
};

// GET LEADS OF A PATIENT
export const getPatientLeads = (id) => (dispatch, getState) => {
  axios
    .get(`/api/leads/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_PATIENT_LEADS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET ALL PATIENTS(USERS)
export const loadAllUsers = () => (dispatch, getState) => {
  // dispatch({ type: ALL_USER_LOADING });

  axios
    .get("/api/auth/allusers", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ALL_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ALL_USER_FAILURE,
      });
    });
};

// CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// LOGIN
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then((res) => {
      // console.log(res.data.user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
        doctor: res.data.user.is_superuser,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER
export const register =
  ({
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
    is_extreme,
    rapid_insulin,
    long_acting,
  }) =>
  (dispatch, getState) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({
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
      is_extreme,
      rapid_insulin,
      long_acting,
    });

    axios
      .post("/api/auth/register", body, tokenConfig(getState))
      .then((res) => {
        dispatch(createMessage({ addLead: "Patient Added!" }));
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(createMessage({ addLead: "Patient Not Added!" }));
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

// LOGOUT
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout/", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // if token add it to headers
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
