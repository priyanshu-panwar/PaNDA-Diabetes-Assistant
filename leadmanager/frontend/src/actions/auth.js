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
} from "./types";

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
export const register = ({
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
}) => (dispatch, getState) => {
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
