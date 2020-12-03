import config from "../../config/config";
import * as actionTypes from '../action_types';
import { handleError } from "./common_action";
import { getPokedex, getUser } from "./pokedex_action";

const axios = config.AXIOS;


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export async function authSuccess(data) {
    return (dispatch) => {
        try {
            dispatch({
                type: actionTypes.AUTH_SUCCESS,
                payload: {
                    token: data.token
                }
            });

            dispatch(getUser());
            dispatch(getPokedex());

            
        } catch (err) {
            handleError(err, actionTypes.AUTH_FAIL)
        }
    }

};

export const logout = () => {
    return dispatch => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
            dispatch({
                type: actionTypes.AUTH_LOGOUT
            });
        }
        catch (err) {
            dispatch(handleError(err, actionTypes.AUTH_FAIL));
        };
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        let route = "signin";
        if (isSignup) {
            route = "signup"
        }
        axios.post(`/${route}`, { email, password })
            .then((response) => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }).catch((err) => {
                dispatch(handleError(err, actionTypes.AUTH_FAIL));
            })
    };
};


export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload: path
    };
};


export const authCheckState = () => {
    return dispatch => {
        dispatch(authStart());
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess({ token }));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};