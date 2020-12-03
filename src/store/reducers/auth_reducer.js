import * as actionTypes from '../action_types';
import { updateObject } from '../utility';

const initialState = {
    token: null,  
    isAuthenticate:null,     
    error: null,
    loading: false,       
    authRedirectPath: '/',
    role: "Se debe buscar",
    email: "Se debe buscar"   
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.payload.token,        
        isAuthenticate: true,              
        error: null,       
        loading: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.payload.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, isAuthenticate:false, loading: false });    
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.payload, loading: false })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;