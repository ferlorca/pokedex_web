import * as actionTypes from '../action_types';
import { updateObject } from '../utility';

export const initialState = {   
    types: [],
    pokemons: [],
    myPokedex: [],
    max:5,
    error:null,
    loading:false,
    baseLoading:[],
    typeLoading:false,  
    pokemonTranslation : "english",
    totalpages:null,
    filter:{
        page:0,
        type:[]
    }       
};

const getTypes = (state, action) => {
    return updateObject(state, { 
        types: action.payload.types,
        typeLoading:false
    });
};

const getAll = (state, action) => {
    let baseLoading =[];
    for (const iterator of action.payload.pokemons) {
        baseLoading.push({id: iterator.id, loading: false})
    }
    return updateObject(state, { 
        pokemons: action.payload.pokemons,
        filter : action.payload.filter ?? state.filter,
        baseLoading,
        totalpages: action.payload.totalpages,
        loading:false
    });
};


const typesLoading = (state, action) => {
    return updateObject(state, { 
        typeLoading: true       
     });
};

const baseLoading = (state, action) => {
    let auxArray = [...state.baseLoading];
    let index= auxArray.findIndex(item=>item.id === action.payload);
    auxArray[index] = true;
    return updateObject(state, { 
        baseLoading: auxArray       
    });
};

const getbase = (state, action) => {
    let cpyArray = [...state.pokemons]
    let cpyBase = [...state.baseLoading]
    let indexpokemon = cpyArray.findIndex(item=>item.id === action.payload.pokemon.id);
    cpyArray[indexpokemon]=action.payload.pokemon;
    cpyBase[action.payload.pokemon.id] = false;
    return updateObject(state, { 
        pokemons: cpyArray ,
        baseLoading: cpyBase         
     });
};

const loading = (state, action) => {
    return updateObject(state, { 
        loading: true       
     });
};

const changeFilter = (state, action) => {
    return updateObject(state, { 
        filter: action.payload       
     });
};


const handleError = (state, action) => {
    return updateObject( state, {
        error: action.payload.error,
        loading: false,
        typeLoading:false
    });
};

const changeTranslation = (state, action) => {
    return updateObject( state, {
        pokemonTranslation: action.payload,
    });
};

const reducer = ( state = {...initialState}, action ) => {
    switch ( action.type ) {        
        case actionTypes.POKEMON_TYPES_ALL: return getTypes(state, action);        
        case actionTypes.POKEMON_TYPES_START: return typesLoading(state, action);
        case actionTypes.POKEMON_BASE_START: return baseLoading(state, action);
        case actionTypes.POKEMON_GET_BASE:return getbase(state, action);
        case actionTypes.POKEMON_START: return loading(state, action);
        case actionTypes.POKEMON_FAIL: return handleError(state, action);
        case actionTypes.POKEMON_FILTER: return changeFilter(state, action);
        case actionTypes.POKEMON_GET_ALL: return getAll(state, action);
        case actionTypes.POKEMON_CHANGE_TRANSLATIONS: return changeTranslation(state, action);        

        default:
            return state;
    }
};

export default reducer;

