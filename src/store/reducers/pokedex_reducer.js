import * as actionTypes from '../action_types';
import { updateObject } from '../utility';

export const initialState = { 
    user: null,
    pokedex:[],
    pokemons:[],
    error:null,
    loading:false,
    loadingPokemons:false,
    remainingPokemon:0,
    filter:{
        page:0,
        amountPerPage:-1,
        name:{
            language:"english"
        }
    }         
};

const getAll = (state, action) => {
    let auxcount = state.remainingPokemon;
    return updateObject(state, { 
        pokedex: action.payload.pokedex,      
        remainingPokemon: auxcount-action.payload.pokedex.length,
        loading:false
    });
};

const getUser = (state, action) => {
    return updateObject(state, { 
     user: action.payload,    
     remainingPokemon: action.payload.maxPokemon,
     loading:false
 });
};

const loading = (state, action) => {
    return updateObject(state, { 
        loading: true       
     });
};

const addPokemon = (state, action) => {
    let auxcount = state.remainingPokemon;
    return updateObject(state, {
        pokedex: state.pokedex.concat(action.payload.pokemon),
        remainingPokemon: auxcount-1,
        loading: false
    });
};

const removePokemon = (state, action) => {
    let duplicate =state.pokedex.filter(item => item.id !== action.payload );
    let auxcount = state.remainingPokemon;
    return updateObject(state, {
        pokedex: duplicate,
        remainingPokemon: auxcount+1,
        loading: false
    });
};

const getPokemonsByFilter = (state, action) => {    
    return updateObject(state, { 
        pokemons: action.payload.pokemons,
        filter : action.payload.filter ?? state.filter,       
        loadingPokemons: false,
    });
};

const startloadingPokemons = (state, action) => {    
    return updateObject(state, { 
        loadingPokemons : true
    });
};

const handleError = (state, action) => {
    return updateObject( state, {
        error: action.payload.error,
        loading: false,
    });
};


const reducer = ( state = {...initialState}, action ) => {
    switch ( action.type ) {        
        case actionTypes.POKEDEX_START: return loading(state, action);
        case actionTypes.POKEDEX_FAIL: return handleError(state, action);
        case actionTypes.POKEDEX_GET_ALL: return getAll(state, action); 
        case actionTypes.POKEDEX_FILTER: return getPokemonsByFilter(state, action);
        case actionTypes.POKEDEX_FILTER_LOADING: return startloadingPokemons(state, action);
        case actionTypes.POKEDEX_ADD: return addPokemon(state, action); 
        case actionTypes.POKEDEX_REMOVE: return removePokemon(state, action); 
        case actionTypes.POKEDEX_USER: return getUser(state, action); 
        default:
            return state;
    }
};

export default reducer;

