// frontend/src/pages/DashboardPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import './DashboardPage.css';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="dashboard">
            <div className="dashboard-card">
                <h1>Welcome, {user.name}! 🎉</h1>
                <p>You have successfully logged in.</p>
                <div className="user-info">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>User ID:</strong> {user._id}</p>
                </div>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default DashboardPage;