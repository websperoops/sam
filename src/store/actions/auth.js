import { GET, POST, FETCH_USER, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, COUNT_SUCCESS, COUNT_FAIL, TOKEN_FAIL, TOKEN_SUCCESS } from "../constants";

import apiRequest from "../requests";
import { setToken, removeToken, setUser, removeUser } from "../services";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER });
    const res = await apiRequest(POST, "user/login", data);
    const token = res.data.response.token;
    setToken(token);
    setUser(res.data.response.result[0]);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.response.result });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER });
    const res = await apiRequest(GET, "users/getUser");
    const user = res.data.user;
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err });
  }
};

export const logout = () => async (dispatch) => {
  try {
    removeToken();
    removeUser();
    dispatch({ type: LOGOUT_SUCCESS, payload: false });
  } catch (err) {
    dispatch({ type: LOGOUT_FAIL, payload: err });
  }
};

export const getCounts = () => async (dispatch) => {
  try {
    const res = await apiRequest(GET, "users/getCounts");
    dispatch({ type: COUNT_SUCCESS, payload: res.data.counts });
  } catch (err) {
    dispatch({ type: COUNT_FAIL, payload: err });
  }
};


export const checkToken = () => async (dispatch) => {
  try {
    const res = await apiRequest(GET, "checkToken");
    dispatch({ type: TOKEN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: TOKEN_FAIL, payload: err });
    logout();
  }
};
