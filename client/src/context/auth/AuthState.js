import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loadinh: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User - check which user is logged in

    // Register User - user sign up

    // Login User - get token and logs in the user

    // Logout User - logs out the user and destroy the token

    // Clear Errors - clear any errors in the state


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                loading: state.loading,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                error: state.error,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;