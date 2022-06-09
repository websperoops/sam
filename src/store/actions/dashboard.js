import {
    FETCH_DASHBOARD_SUCCESS,
    CHANGE_DASHBOARD_STATE,
    FETCH_DASHBOARD_FAIL,
    GET
} from "../constants";

import apiRequest from "../requests";

export const dashboardData = () => async (dispatch) => {
    try {
        dispatch({ type: CHANGE_DASHBOARD_STATE });
        const res = await apiRequest(GET, "dashboard");
        dispatch({ type: FETCH_DASHBOARD_SUCCESS, payload: res.data.response });
    } catch (err) {
        dispatch({ type: FETCH_DASHBOARD_FAIL, payload: err });
    }
};
