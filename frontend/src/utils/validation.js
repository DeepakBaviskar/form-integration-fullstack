// frontend/src/utils/validation.js

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation rules
export const validators = {
    required: (value) => {
        if (!value || value.trim() === '') {
            return 'This field is required';
        }
        return '';
    },

    email: (value) => {
        if (!value) return 'Email is required';
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return '';
    },

    minLength: (min) => (value) => {
        if (!value) return 'This field is required';
        if (value.length < min) {
            return `Must be at least ${min} characters`;
        }
        return '';
    },

    maxLength: (max) => (value) => {
        if (value && value.length > max) {
            return `Must be less than ${max} characters`;
        }
        return '';
    },

    passwordMatch: (password) => (confirmPassword) => {
        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
        return '';
    }
};

// Validate entire form
export const validateForm = (values, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach((field) => {
        const fieldRules = rules[field];
        const value = values[field];
        
        for (let rule of fieldRules) {
            const error = rule(value, values);
            if (error) {
                errors[field] = error;
                break; // Stop at first error
            }
        }
    });
    
    return errors;
};

// Check if form has any errors
export const hasErrors = (errors) => {
    return Object.keys(errors).some(key => errors[key]);
};