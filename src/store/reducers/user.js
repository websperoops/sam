import {
  FETCH_USERS,
  USERS_SUCCESS,
  USERS_FAIL,
  CREATING_USER,
  CREATE_USER,
  USER_FAIL,
  GET_USERS_DOMAIN_SUCCESS,
  FETCH_USER_DOMAINS,
  GET_USER_DOMAINS_BY_ID_SUCCESS,
  CLEAR_USER_DOMAINS_BY_ID,
  USER_DOMAINS_ACCESS_SUCCESS
} from "../constants";

const initialState = {
  loading: false,
  error: null,
  users: [],
  creatingUser: false,
  usersDomain: [],
  fetchUserDomains: true,
  userDomainsById: null,
};

const userReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USERS:
      return {
        ...state,
        loading: true,
      };

    case USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        creatingUser: false,
        users: payload,
      };

    case USERS_FAIL:
    case USER_FAIL:
      return {
        ...state,
        loading: false,
        creatingUser: false,
        error: payload,
      };

    case CREATING_USER:
      return {
        ...state,
        creatingUser: true,
      };

    case CREATE_USER:
      return {
        ...state,
        creatingUser: false,
      };
      
    case GET_USERS_DOMAIN_SUCCESS:
    case USER_DOMAINS_ACCESS_SUCCESS:
      return {
        ...state,
        usersDomain: payload,
      };

    case FETCH_USER_DOMAINS:
      return {
        ...state,
        fetchUserDomains: true,
      };
      
    case GET_USER_DOMAINS_BY_ID_SUCCESS:
      return {
        ...state,
        userDomainsById: payload,
        fetchUserDomains: false,
      };

    case CLEAR_USER_DOMAINS_BY_ID:
      return {
        ...state,
        userDomainsById: null,
        fetchUserDomains: false
      }

    default:
      return state;
  }
};

export default userReducer;
