import React, { createContext, useContext, useState, useEffect } from 'react';
import Auth from "../services/Authentication";

const USER_KEY = 'user';

function getStoredUser() {
    const userData = localStorage.getItem(USER_KEY);
    if (!userData) return null;
    try {
        return JSON.parse(userData);
    } catch {
        return null;
    }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getStoredUser());
    const [isAuthenticated, setIsAuthenticated] = useState(!!getStoredUser());

    useEffect(() => {
        setIsAuthenticated(!!user);
    }, [user]);

    const login = (data) => {
        localStorage.setItem(USER_KEY, JSON.stringify(data));
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem(USER_KEY);
        setUser(null);
    };

    useEffect(() => {
        setUser(getStoredUser());
        validateToken();
    }, []);

    const validateToken = async () => {
        const storedUser = getStoredUser();
        if (!storedUser || !storedUser.token) return false;
        try {
            return await Auth.tokenIsValid(storedUser.token);
        } catch {
            return false;
        }

    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, validateToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
