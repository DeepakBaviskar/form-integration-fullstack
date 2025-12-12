// frontend/src/components/common/Textarea.jsx

import React from 'react';
import './Textarea.css';

const Textarea = ({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    touched,
    placeholder,
    required = false,
    rows = 4,
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
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                rows={rows}
                className={`form-textarea ${showError ? 'textarea-error' : ''}`}
                {...props}
            />
            {showError && (
                <span className="error-message">{error}</span>
            )}
        </div>
    );
};

export default Textarea;