import { combineReducers } from "redux";

import authReducer from "./auth";
import userReducer from "./user";
import eventReducer from "./events";
import notificationReducer from "./notification";
import visitedUserReducer from "./visitedUser"
import dashboardReducer from "./dashboard";

export default combineReducers({ authReducer, userReducer, eventReducer, notificationReducer,visitedUserReducer,dashboardReducer });