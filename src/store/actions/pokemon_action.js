import * as types from '../action_types';
import config from "../../config/config";
import {handleError} from "./common_action";

const axios = config.AXIOS;
const route = "/pokemon";

export const getTypes = () => {
    return dispatch => {
        dispatch(startTypes());      
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


export const verifyTranslationPokemonName = (language) => {
    let pokemonLanguage;
    switch (language) {
        case "fr":
            pokemonLanguage="french"
            break; 
        case "ja":
            pokemonLanguage="japanese"
            break;  
        case "zh-TW":
        case "zh-CN":
            pokemonLanguage="chinese"
            break;                 
        default:
            pokemonLanguage="english"
            break;
    }
    return{
        type: types.POKEMON_CHANGE_TRANSLATIONS,
        payload:pokemonLanguage
    }
};


export const addFilter = (filter) => {
    return dispatch => {
        dispatch(startPokemons()); 
        axios.post(`${route}/all`,{filter})
        .then((response) => {                  
            dispatch({
                type:types.POKEMON_GET_ALL,
                payload: response.data
            });          
        }).catch((err) => {
            dispatch(handleError(err,types.POKEMON_FAIL));
        })
    };     
};


export const getBase = (id) => {
    return (dispatch) => {        
        dispatch(startBase()); 
        
        axios.post(`${route}/get`,{id})
        .then((response) => {                  
            dispatch({
                type:types.POKEMON_GET_BASE,
                payload: response.data
            });          
        }).catch((err) => {
            dispatch(handleError(err,types.POKEMON_FAIL));
        })
    };     
};


export const nextPage = (filter) => {
    return dispatch => {
        filter.page ++;
        dispatch(startPokemons());      
        axios.post(`${route}/all`,{filter})
        .then((response) => {                  
            dispatch({
                type:types.POKEMON_GET_ALL,
                payload: response.data
            });          
        }).catch((err) => {
            dispatch(handleError(err,types.POKEMON_FAIL));
        })
    };     
};

export const startTypes = () => {
    return {
        type: types.POKEMON_TYPES_START
    };
};
export const startPokemons = () => {
    return {
        type: types.POKEMON_START
    };
};
export const startBase = () => {
    return {
        type: types.POKEMON_BASE_START
    };
};
