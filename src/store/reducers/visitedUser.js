import {
  SAVING_VISITEDUSER,
  FETCH_VISITEDUSER,
  VISITEDUSERS_SUCCESS,
  VISITEDUSER_SUCCESS,
  VISITEDUSERS_FAIL,
  VISITEDUSER_FAIL,
  DELETING_VISITEDUSER,
  CREATE_VISITEDUSER_SUCCESS,
  CREATE_VISITEDUSER_FAIL
} from "../constants";

const initialState = {
  loading: false,
  error: null,
  savingVisitedUser: false,
  all: [],
  visitedUser: [],
  visitedUsers: [],
  deletingVisitedUser: false,
};

const visitedUserReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETING_VISITEDUSER:
      return {
        ...state,
        deletingVisitedUser: true,
      };

    case FETCH_VISITEDUSER:
      return {
        ...state,
        loading: true,
      };

    case SAVING_VISITEDUSER:
      return {
        ...state,
        savingVisitedUser: true,
        loading: true,
      };

    case VISITEDUSERS_SUCCESS:
      return {
        ...state,
        loading: false,
        savingVisitedUser: false,
        all: payload,
        visitedUsers: payload,
        visitedUserEvent: false,
      };

    case CREATE_VISITEDUSER_SUCCESS:
      return {
        ...state,
        savingVisitedUser: false,
        all: payload
      };

    case CREATE_VISITEDUSER_FAIL:
      return {
        ...state,
        savingVisitedUser: false,
        all: payload
      };

    case VISITEDUSER_SUCCESS:
      return {
        ...state,
        event: payload,
        loading: false,
        savingVisitedUser: false,
        deletingVisitedUser: false,
      };

    case VISITEDUSERS_FAIL:
      return {
        ...state,
        loading: false,
        savingVisitedUser: false,
        error: payload,
      };

    case VISITEDUSER_FAIL:
      return {
        ...state,
        loading: false,
        savingVisitedUser: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default visitedUserReducer;
