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
        filter.page = 1;
        dispatch(startPokemons()); 
        dispatch(getAllPokemons(filter,types.POKEMON_GET_ALL,types.POKEMON_FAIL));
    };     
};


export const getAllPokemons = (filter, typeOk, typeFail)=> {
    return dispatch => {
        axios.post(`${route}/all`,{filter})
        .then((response) => {                  
            dispatch({
                type:typeOk,
                payload: response.data
            });          
        }).catch((err) => {
            dispatch(handleError(err,typeFail));
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
        dispatch(startPokemons()); 
        dispatch(getAllPokemons(filter,types.POKEMON_NEXT_PAGE,types.POKEMON_FAIL));
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
