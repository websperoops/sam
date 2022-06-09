import { SHOW_NOTIFICATION_SUCCESS } from "../constants";

const initialState = {
    notification: {

        message: "",
        description: ""
    }
}

const notificationReducer = (state = initialState, action = {}) => {
    const { payload, type } = action;

    switch(type) {
        case SHOW_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notification: payload
            }
        default:
            return state
    }

}

export default notificationReducer;