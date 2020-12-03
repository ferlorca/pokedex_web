import * as actionTypes from '../action_types';
import { updateObject } from '../utility';

export const initialState = {   
    languageCodes: [],
    language: localStorage.language ?  localStorage.language : "en",
    translations:{
        header:{
            pokemon:"Pokemons",
            myPokedex:"My Pokedex",
            logout:"Logout",
            more:"more",
            translate:"Translate"
        },
        pokedex:{
            title:"My pokedex",     
            add:"Add pokemons!",           
            remove:"Remove",         
            needToAddPokemons:"Add some pokemons to your pokedex !",  
            remaning: "Remaining pokemons to my pokedex",
            errorRemaning: "Can not allowed to add more pokemons"
        },
        pokemon: {
            title:"Pokemons",
            subtitle:"Catch them all!",
            searchlabel:"Select at least 1 type",
            searchByName:"Search by name",
            name:"Name",
            type:"Types",
            base:"Base",
            attack:"Attack",
            defense:"Defense",
            hp:"HP",
            spAttack:"SP. Attack",
            spDefense:"SP. Defense",
            speed:"Speed",
            actions:"Actions",                  
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

