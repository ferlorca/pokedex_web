import {combineReducers} from "redux";
import auth from "./auth_reducer";
import notification from "./notifications_reducer";
import translation from "./translation_reducer";


const rootReducer = combineReducers({
    auth,
    notification,
    translation
});

export default rootReducer;