import * as actionTypes from '../action_types';
import { updateObject } from '../utility';

export const initialState = {   
    types: [],
    pokemons: [],
    myPokedex: [],
    max:5,
    error:null,
    typeLoading:false,  
    filter:{
        page:1,
        type:[]
    }       
};

const getTypes = (state, action) => {
    return updateObject(state, { 
        types: action.payload,
        typeLoading:false
    });
};

const typesLoading = (state, action) => {
    return updateObject(state, { 
        typeLoading: true       
     });
};

const handleError = (state, action) => {
    return updateObject( state, {
        error: action.payload.error,
        loading: false,
        typeLoading:false
    });
};


const reducer = ( state = {...initialState}, action ) => {
    switch ( action.type ) {        
        case actionTypes.POKEMON_TYPES_ALL: return getTypes(state, action);        
        case actionTypes.POKEMON_TYPES_START: return typesLoading(state, action);
        case actionTypes.POKEMON_FAIL: return handleError(state, action);

        default:
            return state;
    }
};

export default reducer;

