import {
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_FAIL,
    CHANGE_DASHBOARD_STATE
} from "../constants";

const initialState = {
    loading: false,
    dashboard: null,
    error:null
};

const dashboardReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_DASHBOARD_SUCCESS:
            return {
                ...state,
                dashboard: payload,
                loading: false
            };
        case FETCH_DASHBOARD_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CHANGE_DASHBOARD_STATE:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};

export default dashboardReducer;
