// frontend/src/components/common/Input.jsx

import React from 'react';
import './Input.css';

const Input = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    onBlur,
    error,
    touched,
    placeholder,
    required = false,
    disabled = false,
    ...props
}) => {
    const showError = touched && error;
    
    return (
        <div className={`form-group ${showError ? 'has-error' : ''}`}>
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
                className={`form-input ${showError ? 'input-error' : ''}`}
                {...props}
            />
            {showError && (
                <span className="error-message">{error}</span>
            )}
        </div>
    );
};

export default Input;