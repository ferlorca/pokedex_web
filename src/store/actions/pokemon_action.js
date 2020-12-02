import * as types from '../action_types';
import config from "../../config/config";
import {handleError} from "./common_action";

const axios = config.AXIOS;
const route = "/pokemon";

export const getTypes = () => {
    return dispatch => {
        dispatch(start());      
        axios.post(`${route}/types`,{})
        .then((response) => {                  
            dispatch({
                type:types.POKEMON_TYPES_ALL,
                payload: response.data
            });          
        }).catch((err) => {
            dispatch(handleError(err,types.POKEMON_FAIL));
        })
    };
};

export const start = () => {
    return {
        type: types.POKEMON_TYPES_START
    };
};
