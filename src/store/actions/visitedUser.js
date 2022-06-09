import {
  GET,
  POST,
  SAVING_VISITEDUSER,
  FETCH_VISITEDUSER,
  VISITEDUSERS_SUCCESS,
  CREATE_VISITEDUSER_SUCCESS,
  VISITEDUSERS_FAIL,
  CREATE_VISITEDUSER_FAIL,
  // DELETING_VISITEDUSER,
} from "../constants";

import apiRequest from "../requests";
import { toster } from '../services'

export const visitedUser = (event) => async (dispatch) => {
  try {
    dispatch({ type: SAVING_VISITEDUSER });
    const UserData = await apiRequest(POST, "visiteduser", event);
    toster('success', UserData.data.message);
    dispatch({ type: CREATE_VISITEDUSER_SUCCESS, payload: UserData.data.response });
  } catch (err) {
    toster('error', err.message)
    dispatch({ type: CREATE_VISITEDUSER_FAIL, payload: err });
  }
};

export const getVisitedUser = (pageno, pageperitem) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_VISITEDUSER });
    const eventsEndpoint =
      pageno + 1 && pageperitem
        ? `visiteduser?pageno=${pageno + 1}&pageperitem=${pageperitem}`
        : "visiteduser";
    const res = await apiRequest(GET, eventsEndpoint);
    dispatch({ type: VISITEDUSERS_SUCCESS, payload: res.data.response });
  } catch (err) {
    dispatch({ type: VISITEDUSERS_FAIL, payload: err });
  }
};