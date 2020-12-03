import * as types from '../action_types';
import config from "../../config/config";
import {handleError} from "./common_action";
import { getAllPokemons } from './pokemon_action';

const axios = config.AXIOS;
const route = "/pokedex";

export const getPokedex = () => {
    return dispatch => {
        dispatch(start()); 
        axios.post(`${route}/all`)
        .then((response) => {                  
            dispatch({
                type:types.POKEDEX_GET_ALL,
                payload: response.data
            });          
        }).catch((err) => {
            dispatch(handleError(err,types.POKEDEX_FAIL));
        })
    };     
};


export const getPokemonFilter = (filter) => {
    return dispatch => {
        dispatch({
            type: types.POKEDEX_FILTER_LOADING
        }); 
        dispatch(getAllPokemons(filter,types.POKEDEX_FILTER,types.POKEDEX_FAIL));
    };     
};



export const deletePokemonFromPokedex = (id) => {
    return dispatch => {        
        dispatch({
            type:types.POKEDEX_REMOVE,
            payload: id
        });  
        axios.post(`${route}/remove`,{pokeId:id}).catch((err) => {
            dispatch(handleError(err,types.POKEDEX_FAIL));
        })
    };     
};

export const addPokemonToPokedex = (id) => {
    return dispatch => {
        dispatch(start()); 
        axios.post(`${route}/add`,{pokeId:id})
        .then((response) => {                  
            dispatch({
                type:types.POKEDEX_ADD,
                payload: response.data
            });          
        }).catch((err) => {
            dispatch(handleError(err,types.POKEDEX_FAIL));
        })
    };     
};

export const getUser = () => {
    return dispatch => {       
        axios.post(`${route}/getUser`)
        .then((response) => {                  
            dispatch({
                type:types.POKEDEX_USER,
                payload: response.data
            });          
        }).catch((err) => {
            dispatch(handleError(err,types.POKEDEX_FAIL));
        })
    };     
};

export const start = () => {
    return {
        type: types.POKEDEX_START
    };
};
