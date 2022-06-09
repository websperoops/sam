import {
  FETCH_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  COUNT_SUCCESS,
  COUNT_FAIL,
  TOKEN_FAIL,
  TOKEN_SUCCESS
} from "../constants";

const initialState = {
  loading: false,
  isAuth: false,
  user: null,
  error: null,
  counts: {},
};

const authReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USER:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: payload
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: false,
        error: payload,
      };

    case TOKEN_FAIL:
      return {
        ...state,
        isAuth:false
      };

    case TOKEN_SUCCESS:
      return {
        ...state,
        isAuth: true
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuth: false,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        error: payload,
      };

    case COUNT_SUCCESS:
      return {
        ...state,
        counts: payload,
      };

    case COUNT_FAIL:
      return {
        ...state,
        counts: null,
      };

    default:
      return state;
  }
};

export default authReducer;
