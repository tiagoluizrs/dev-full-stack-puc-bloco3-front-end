import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './pages/auth/Login';
import './style.css';
import { ToastProvider } from './hooks/ToastContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Habit from './pages/Habit';
import { AuthProvider, useAuth } from './hooks/AuthContext';
import React from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#28d219ff',
        }
    }
});

function PrivateRoute({ children, isAuthenticated }) {
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function PublicRoute({ children, isAuthenticated }) {
    return !isAuthenticated ? children : <Navigate to="/" />;
}

const App = () => {
    const { isAuthenticated, login } = useAuth();

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <ToastProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={
                                <PublicRoute isAuthenticated={isAuthenticated}>
                                    <Login login={login} />
                                </PublicRoute>
                            } />
                            <Route path="/register" element={
                                <PublicRoute isAuthenticated={isAuthenticated}>
                                    <Register />
                                </PublicRoute>
                            } />
                            <Route path="/" element={
                                <PrivateRoute isAuthenticated={isAuthenticated}>
                                    <Home />
                                </PrivateRoute>
                            } />
                            <Route path="/habit" element={
                                <PrivateRoute isAuthenticated={isAuthenticated}>
                                    <Habit />
                                </PrivateRoute>
                            } />
                            <Route path="/habit/:id" element={
                                <PrivateRoute isAuthenticated={isAuthenticated}>
                                    <Habit />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </BrowserRouter>
                </ToastProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;