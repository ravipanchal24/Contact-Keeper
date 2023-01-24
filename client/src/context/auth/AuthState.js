import React, { useReducer } from 'react';
import axios from 'axios';
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
    const loadUser = () => {

    }

    // Register User - user sign up
    const register = async (formData) => {
        const config = {
            header: {
                'Content-type': 'application/json'
            }
        }

        // make a post request to register user API
        try {
            const res = await axios.post('/api/users', formData, config); // we have defined 'https://localhost:5000' in proxy so no need to append it here
            // res will hold the token return by the API
            console.log(res);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data }); // if api hit is successful then this will be called

        } catch (err) {
            console.log(err);
            dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
        }
    }

    // Login User - get token and logs in the user
    const login = () => {

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