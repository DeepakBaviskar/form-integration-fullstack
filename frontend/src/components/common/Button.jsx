// frontend/src/components/common/Button.jsx

import React from 'react';
import './Button.css';

const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    loading = false,
    disabled = false,
    onClick,
    ...props
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''}`}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading ? (
                <span className="btn-loading">
                    <span className="spinner"></span>
                    <span>Loading...</span>
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;