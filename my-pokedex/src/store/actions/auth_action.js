import config,{firebaseAuth} from "../../config/config";
import * as actionTypes from './../action_types';
import {handleError} from "./common_action";
import {getProfileUser} from "./user_action";

const axios = config.AXIOS;


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export async function authSuccess(user){
    //o inicie o cree el usuario
    try {
        let token= await user.getIdToken();
        let data = {
            name: user.displayName,
            email: user.email,
            id: user.uid
        }      

        return dispatch => {           
            localStorage.token = token;
            dispatch(authGetRole());
            dispatch(getProfileUser(data));
            dispatch({
                type: actionTypes.AUTH_SUCCESS,
                isAuthenticate : user ? true : false,
                idToken: token,    
            });
        }        
    } catch (err) {
        handleError(err,actionTypes.AUTH_FAIL)
    }  
};

export const logout =  () => {
    return async dispatch => {
        try{
            localStorage.removeItem('token');
            await firebaseAuth.signOut()        
            dispatch({
                type: actionTypes.AUTH_LOGOUT
            });
            dispatch({
                type: actionTypes.MEAL_RESET
            });
            dispatch({
                type: actionTypes.USER_RESET
            });
        }
        catch(err) {
            dispatch(handleError(err,actionTypes.AUTH_FAIL));
        };   
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        if (!isSignup) {
            firebaseAuth.createUserWithEmailAndPassword(email,password).catch(function(err) {          
                dispatch(handleError(err,actionTypes.AUTH_FAIL));            
            });
        }else
            firebaseAuth.signInWithEmailAndPassword(email,password).catch(function(err) {          
                dispatch(handleError(err,actionTypes.AUTH_FAIL));            
            });
        
    };
};

export const listAllRoles = () =>{
    return dispatch => {
        axios.get("/auth/roles")
        .then(response => {
            dispatch({
                type: actionTypes.AUTH_ALL_ROLES,
                payload: response.data.roles
            });
        })
        .catch(err => {
            dispatch(handleError(err,actionTypes.AUTH_FAIL));
        });
    };
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authGetRole = () => {
    return (dispatch) => {
        axios.get("/role")
        .then(response => {
            dispatch(authRoleSuccess(response.data.role));
        })
        .catch((err) => {
            handleError(err,actionTypes.AUTH_FAIL)
        });
    };
}

const authRoleSuccess = (role)=>{
    return {
        type: actionTypes.AUTH_GET_ROLE,
        payload: role,
    }; 
}