import {
  SYNC_REPORT,
  GENERATE_REPORT,
  FETCH_REPORT,
  REPORT_SUCCESS,
  REPORT_FAIL,
  FILTERING,
  FILTER_REPORT,
  CLEAR_FILTER,
  DELETING_REPORT,
  GENERATE_REPORT_BY_KEYWORD
} from "../constants";

const initialState = {
  loading: false,
  error: null,
  all: [],
  reports: [],
  generatingReport: false,
  syncing: false,
  filtering: false,
  deletingReport: false,
  generatingReportByKeyword: false
};

const reportReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GENERATE_REPORT_BY_KEYWORD:
      return {
        ...state,
        generatingReportByKeyword: payload,
      }

    case DELETING_REPORT:
      return {
        ...state,
        deletingReport: true
      }

    case FILTERING:
      return {
        ...state,
        filtering: true,
      };

    case FILTER_REPORT:
      return {
        ...state,
        filtering: false,
        reports: payload,
      };

    case CLEAR_FILTER:
      return {
        ...state,
        reports: state.all,
      };

    case SYNC_REPORT:
      return {
        ...state,
        syncing: true,
      };

    case GENERATE_REPORT:
      return {
        ...state,
        generatingReport: true,
      };

    case FETCH_REPORT:
      return {
        ...state,
        loading: true,
      };

    case REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        all: payload,
        reports: payload,
        generatingReport: false,
        syncing: false,
        filtering: false,
        deletingReport: false,
        generatingReportByKeyword: false
      };

    case REPORT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default reportReducer;
