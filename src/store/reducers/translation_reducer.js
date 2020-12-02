import * as actionTypes from '../action_types';
import { updateObject } from '../utility';

export const initialState = {   
    languageCodes: [],
    language: localStorage.language ?  localStorage.language : "en",
    translations:{
        header:{
            home:"Pokemons",
            myPokedex:"My Pokedex",
            logout:"Logout",
            more:"more",
            translate:"Translate"
        },
        myPokedex:{
            title:"My pokemons",            
        },
        home: {
            title:"Pokemons",
            subtitle:"Catch them all!",
            filter:"Filters",
            add:"Add to my pokedex",           
            remove:"Remove from my pokedex",            
        },
        login: {
            signup:"Sign up",
            signin:"Log in",
            email:"Email",
            password:"Password"
        },
        utils:{
            accept:"Accept",
            cancel:"Cancel",
            close:"Close",
            add:"Add",
            remove:"Remove",
        }    
    },   
};

const change = (state, action) => {
    return updateObject(state, { 
        translations: {...action.payload}       
     });
};

const addAll = (state, action) => {
    return updateObject(state, { 
        languageCodes: action.payload       
     });
};


const reducer = ( state = {...initialState}, action ) => {
    switch ( action.type ) {        
        case actionTypes.TRANSLATIONS_CHANGE_LANG: return change(state, action);        
        case actionTypes.TRANSLATIONS_ADDING_LANGUAGES: return addAll(state, action);
        default:
            return state;
    }
};

export default reducer;

