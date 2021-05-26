import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ALL_USER_FAILURE,
  ALL_USER_SUCCESS,
  ALL_USER_LOADING,
  GET_PATIENT_FAILURE,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_LEADS,
  GET_ALL_LEADS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  isDoctor: false,
  user: null,
  users: [],
  patient: [],
  patleads: [],
  allleads: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_PATIENT_LEADS:
      return {
        ...state,
        patleads: action.payload,
      };
    case GET_ALL_LEADS:
      return {
        ...state,
        allleads: action.payload,
      };
    case GET_PATIENT_SUCCESS:
      return {
        ...state,
        patient: action.payload,
      };
    case GET_PATIENT_FAILURE:
      return {
        ...state,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        isDoctor: action.payload.is_superuser,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isDoctor: action.doctor,
      };
    case REGISTER_FAIL:
      return {
        ...state,
      };
    case AUTH_ERROR:
    case ALL_USER_FAILURE:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isDoctor: false,
      };
    default:
      return state;
  }
}
