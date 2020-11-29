import {combineReducers} from "redux";
import auth from "./auth_reducer";
import notification from "./notifications_reducer";


const rootReducer = combineReducers({
    auth,
    notification
});

export default rootReducer;