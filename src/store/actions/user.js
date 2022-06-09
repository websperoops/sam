import {
  GET,
  POST,
  FETCH_USERS,
  USERS_SUCCESS,
  USERS_FAIL,
  CREATING_USER,
  CREATE_USER,
  USER_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL
} from "../constants";

import apiRequest from "../requests";

export const getUsers = (data) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USERS });
    const res = await apiRequest(GET, "users", data);
    dispatch({ type: USERS_SUCCESS, payload: res.data.users });
  } catch (err) {
    dispatch({ type: USERS_FAIL, payload: err });
  }
};

export const createUser = (data) => async (dispatch) => {
  try {
    await apiRequest(POST, "user/create", data);
    dispatch({ type: CREATING_USER });
    setTimeout(() => {
      dispatch({ type: CREATE_USER });
    }, 1000)
  } catch (err) {
    dispatch({ type: USER_FAIL, payload: err });
  }
};

export const changePassword = (data) => async (dispatch) => {
  try {
    await apiRequest(POST, "users/changePassword", data);
    dispatch({ type: CHANGE_PASSWORD_SUCCESS });
  } catch (err) {
    dispatch({ type: CHANGE_PASSWORD_FAIL, payload: err });
  }
};