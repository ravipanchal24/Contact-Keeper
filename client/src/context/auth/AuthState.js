import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from './../../utils/setAuthToken';

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
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User - check which user is logged in
    const loadUser = async (token) => {
        try {
            setAuthToken(token) // pass the token from local storage to setAuthToken so that it can be passed into headers {x-auth-token}
            const res = await axios.get('/api/auth'); // checks the token & see if its the valid user. 
            /* But since this is a private route, so we need to load token first from default headers (setAuthTken.js file) */
            dispatch({ type: USER_LOADED, payload: res?.data }) // res.data contains actual user data once user is verified by above API call
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    // Register User - user sign up
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        // make a post request to register user API
        try {
            const res = await axios.post('/api/users', formData, config); // we have defined 'https://localhost:5000' in proxy so no need to append it here
            // res will hold the token return by the API
            dispatch({ type: REGISTER_SUCCESS, payload: res?.data }); // if api hit is successful then this will be called
            loadUser(res?.data?.token);

        } catch (err) {
            dispatch({ type: REGISTER_FAIL, payload: err.response?.data?.msg });
        }
    }

    // Login User - get token and logs in the user
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        // make a post request to register user API
        try {
            const res = await axios.post('/api/auth', formData, config); // we have defined 'https://localhost:5000' in proxy so no need to append it here
            // res will hold the token return by the API
            dispatch({ type: LOGIN_SUCCESS, payload: res?.data }); // if api hit is successful then this will be called
            loadUser(res?.data?.token);

        } catch (err) {
            dispatch({ type: LOGIN_FAIL, payload: err.response?.data?.msg });
            console.log(state.error);
        }
    }

    // Logout User - logs out the user and destroy the token
    const logout = () => {

    }

    // Clear Errors - clear any errors in the state that backend sends
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS })
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                loading: state.loading,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;