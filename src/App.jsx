import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './pages/auth/Login';
import './style.css';
import { ToastProvider } from './hooks/ToastContext';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Habits from './pages/Habits';
import Habit from './pages/Habit';
import { AuthProvider, useAuth } from './hooks/AuthContext';
import React from 'react';
import { AppBar, Toolbar, Button, Fab, Box } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: { main: '#19d285' }, // verde do logo
        secondary: { main: '#ffcc00' }, // amarelo do logo
        background: { default: '#f5f5f5' }, // cor de fundo do logo
        // ...outras cores
    }
});

function PrivateRoute({ children, isAuthenticated, logout }) {
    const navigate = useNavigate();

    return isAuthenticated ? (
        <Box sx={{ position: 'fixed', width: '100%', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Button color="inherit" onClick={() => navigate('/')}>Dashboard</Button>
                        <Button color="inherit" onClick={() => navigate('/habits')}>Habits</Button>
                    </Box>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ mt: 2 }}>
                {children}
            </Box>
        </Box>
    ) : <Navigate to="/login" />;
}

function PublicRoute({ children, isAuthenticated }) {
    return !isAuthenticated ? children : <Navigate to="/" />;
}

const App = () => {
    const { isAuthenticated, login, logout } = useAuth();

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
                                <PrivateRoute isAuthenticated={isAuthenticated} logout={logout}>
                                    <Home />
                                </PrivateRoute>
                            } />
                            <Route path="/habits" element={
                                <PrivateRoute isAuthenticated={isAuthenticated} logout={logout}>
                                    <Habits />
                                </PrivateRoute>
                            } />
                            <Route path="/habit" element={
                                <PrivateRoute isAuthenticated={isAuthenticated} logout={logout}>
                                    <Habit />
                                </PrivateRoute>
                            } />
                            <Route path="/habit/:id" element={
                                <PrivateRoute isAuthenticated={isAuthenticated} logout={logout}>
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