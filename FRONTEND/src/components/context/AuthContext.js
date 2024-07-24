// AuthContext.js

import React, { createContext, useContext, useEffect, useReducer } from "react";

// Initial state
const initialState = {
    user:
        localStorage.getItem("user") !== undefined
            ? JSON.parse(localStorage.getItem("user"))
            : null,
    loading: false,
    error: null,
};

// Actions
// const SET_USER = 'SET_USER';
// const LOGOUT = 'LOGOUT';

// Create a context
export const AuthContext = createContext(initialState);

// Reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return { user: null, loading: true, error: null };
        case "LOGIN_SUCCESS":
            return { user: action.payload, loading: false, error: null };
        case "LOGIN_FAILURE":
            return { user: null, loading: false, error: action.payload };
        case "REGISTER_SUCCESS":
            return { user: null, loading: false, error: null };
        case "LOGOUT":
            return { user: null, loading: false, error: null };
        default:
            return state;
    }
};

// Create a provider component
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Actions
    //   const login = (userData) => {
    //     dispatch({ type: SET_USER, payload: userData });
    //   };

    //   const logout = () => {
    //     dispatch({ type: LOGOUT });
    //   };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook for using the AuthContext
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };
