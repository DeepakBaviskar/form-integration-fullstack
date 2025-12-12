// frontend/src/services/api.js

import axios from 'axios';

// Create axios instance with base configuration
const API = axios.create({
    baseURL: 'https://form-integration-fullstack.vercel.app' || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor (runs before every request)
API.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        // If token exists, add it to headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (runs after every response)
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'Something went wrong';
        
        // If unauthorized (401), clear token and redirect to login
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Could redirect to login here
        }
        
        return Promise.reject(error);
    }
);

// Auth API calls
export const authAPI = {
    register: (userData) => API.post('/auth/register', userData),
    login: (credentials) => API.post('/auth/login', credentials)
};

// Contact API calls
export const contactAPI = {
    submit: (formData) => API.post('/contact', formData),
    getAll: () => API.get('/contact')
};

export default API;