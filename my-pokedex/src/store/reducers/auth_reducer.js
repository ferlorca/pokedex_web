import * as actionTypes from '../actions/action_types';
import { updateObject } from '../utility';

const initialState = {
    token: null,  
    isAuthenticate:null,     
    error: null,
    loading: false,   
    role:null,
    roles:[],
    authRedirectPath: '/'
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        isAuthenticate: action.isAuthenticate,              
        error: null,       
        loading: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authGetRole =(state, action)=>{
    return updateObject( state, {
        role:action.payload
    });
}

const authListRole =(state, action)=>{
    return updateObject( state, { loading: false, error: null, roles: action.payload});
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, isAuthenticate:false, loading: false ,role:null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path, loading: false })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_GET_ROLE : return authGetRole(state, action);
        case actionTypes.AUTH_ALL_ROLES : return authListRole(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;