import * as types from '../action_types';
import { googleTranslate } from "../../config/utilities";
import {initialState} from "../reducers/translation_reducer";


export const addLanguages = ()=>{
    return dispatch=>{
        googleTranslate.getSupportedLanguages("en", function(err, languageCodes) {
            dispatch({
                type:types.TRANSLATIONS_ADDING_LANGUAGES,
                payload:languageCodes.map(item=>({id:item.language, name:item.name}))
            }); // use a callback function to setState            
        });  
        dispatch(verifyTranslations())
    }
}

const verifyTranslations=()=>{
    return (dispatch,getState)=>{       
        let language = getState().translation.language;
        if(language !== "en"){
            dispatch(changeTranslations(language))
        }
    }
}

const translateString = (toTranslate,language)=>{    
    return new Promise((resolve, reject)=>{
        googleTranslate.translate(toTranslate, language, function(err, translation) {             
            resolve(translation?.translatedText ?? translation)         
        });     
    });
}

export const changeTranslations = (language) => {
    return async (dispatch) => {
        let cpyTranslations = {};  
        localStorage.language  = language;

        for (const [key,value] of Object.entries(initialState.translations)) {
            cpyTranslations[key]={}
            for (const keyTrans of Object.keys(value)) { 
                cpyTranslations[key][keyTrans] = await translateString(initialState.translations[key][keyTrans],language);
            }                
        }   
        dispatch({
            type: types.TRANSLATIONS_CHANGE_LANG,
            payload: cpyTranslations
        });           
    }
};


