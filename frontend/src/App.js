// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect if logged in)
const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return !token ? children : <Navigate to="/dashboard" replace />;
};

function App() {
    return (
        <Router>
            {/* Toast Notifications */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <Routes>
                {/* Public Routes */}
                <Route 
                    path="/login" 
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    
                    } 
                />
                <Route 
                    path="/register" 
                    element={
                        <PublicRoute>
                            <RegisterPage />
                        </PublicRoute>
                    } 
                />
                <Route path="/contact" element={<ContactPage />} />

                {/* Protected Routes */}
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } 
                />

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* 404 Route */}
                <Route 
                    path="*" 
                    element={
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            height: '100vh',
                            fontSize: '2rem',
                            color: '#333'
                        }}>
                            <h1>404 - Page Not Found</h1>
                        </div>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;