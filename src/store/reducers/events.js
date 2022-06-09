import {
  SAVING_EVENT,
  FETCH_EVENTS,
  EVENTS_SUCCESS,
  EVENT_SUCCESS,
  EVENTS_FAIL,
  EVENT_FAIL,
  DELETING_EVENT,
  UPLOAD_IMAGE_SUCCESS,
} from "../constants";

const initialState = {
  loading: false,
  error: null,
  savingEvent: false,
  all: [],
  event: [],
  events: [],
  imgURI: "",
  imageLoading:false,
  deletingEvent: false,
};

const eventReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETING_EVENT:
      return {
        ...state,
        loading: true,
        deletingEvent: true,
      };

    case FETCH_EVENTS:
      return {
        ...state,
        loading: true,
      };

    case SAVING_EVENT:
      return {
        ...state,
        imageLoading:true,
        savingEvent: true,
        loading: true,
      };

    case EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        savingEvent: false,
        imageLoading:false,
        all: payload,
        events: payload,
        deletingEvent: false,
      };

    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        imageLoading:false,
        savingEvent: false,
        loading: false,
        imgURI: payload
      };

    case EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        event:payload,
        savingEvent: false,
        deletingEvent: false,
      };

    case EVENTS_FAIL:
      return {
        ...state,
        loading: false,
        savingEvent: false,
        imageLoading:false,
        error: payload,
      };

    case EVENT_FAIL:
      return {
        ...state,
        loading: false,
        savingEvent: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default eventReducer;
