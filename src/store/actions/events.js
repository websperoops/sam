import {
  GET,
  POST,
  PATCH,
  DELETE,
  SAVING_EVENT,
  FETCH_EVENTS,
  EVENTS_SUCCESS,
  EVENT_SUCCESS,
  EVENTS_FAIL,
  EVENT_FAIL,
  DELETING_EVENT,
  UPLOAD_IMAGE_SUCCESS,

} from "../constants";

import apiRequest from "../requests";

//Actions
import { logout } from "./auth";

const BASE_URL = process.env.REACT_APP_API;

export const insertEvent = (event) => async (dispatch) => {
  try {
    dispatch({ type: SAVING_EVENT });

    await apiRequest(POST, "event/create", event.eventdetails);
    dispatch({ type: EVENT_SUCCESS });
    dispatch(getEvents(event.page, event.rowsPerPage));
  } catch (err) {
    dispatch({ type: EVENT_FAIL, payload: err });
  }
};

export const uploadEventImage = (image) => async (dispatch) => {
  try {
    dispatch({type:SAVING_EVENT});
    const headers = {"Content-Type": "multipart/form-data"};
    var formData = new FormData();
    formData.append("image", image);
    const uploadedFile = await apiRequest(POST, `event/upload`, formData, headers );
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: `${BASE_URL}/${uploadedFile.data.filepath}` });
  } catch (err) {
    dispatch({ type: EVENT_FAIL, payload: err });
  }
};

export const updateEvent = (event) => async (dispatch) => {
  try {
    dispatch({ type: SAVING_EVENT });
    await apiRequest(
      PATCH,
      `event/${event.eventdetails._id}`,
      event.eventdetails
    );
    dispatch({ type: EVENT_SUCCESS });
    dispatch(getEvents(event.page, event.rowsPerPage));
  } catch (err) {
    dispatch({ type: EVENT_FAIL, payload: err });
  }
};

export const getEvents = (pageno, pageperitem) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_EVENTS });
    const eventsEndpoint =
      pageno + 1 && pageperitem
        ? `event?pageno=${pageno + 1}&pageperitem=${pageperitem}`
        : "event";
    const res = await apiRequest(GET, eventsEndpoint);
    if (res.message === "Token expire") {
      dispatch({ type: EVENTS_FAIL, payload: res.message });
      dispatch(logout());
    } else {
      dispatch({ type: EVENTS_SUCCESS, payload: res.data.response });
    }
  } catch (err) {
    dispatch({ type: EVENTS_FAIL, payload: err });
  }
};

export const getEventById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_EVENTS });
    const res = await apiRequest(GET, `event/${id}`);
    dispatch({ type: EVENT_SUCCESS, payload: res.data.response });
  } catch (err) {
    dispatch({ type: EVENTS_FAIL, payload: err });
  }
};

export const deleteEvent = (event_id, page, rowsPerPage) => async (dispatch) => {
  try {
    dispatch({ type: DELETING_EVENT });
    await apiRequest(DELETE, `event/${event_id}`);

    dispatch(getEvents(page, rowsPerPage));
  } catch (err) {
    dispatch({ type: EVENTS_FAIL, payload: err });
  }
};

