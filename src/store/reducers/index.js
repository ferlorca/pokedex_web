import {combineReducers} from "redux";
import auth from "./auth_reducer";
import notification from "./notifications_reducer";
import translation from "./translation_reducer";
import pokemon from "./pokemon_reducer";


const rootReducer = combineReducers({
    auth,
    notification,
    translation,
    pokemon
});

export default rootReducer;