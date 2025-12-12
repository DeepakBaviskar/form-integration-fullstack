// frontend/src/components/forms/RegisterForm.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useForm from '../../hooks/useForm';
import { authAPI } from '../../services/api';
import { validateForm, validators, hasErrors } from '../../utils/validation';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';
import './Forms.css';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');

    // Form submission handler
    const handleRegister = async (values) => {
        // Validation rules (with dynamic password match)
        const validationRules = {
            name: [validators.required, validators.minLength(2), validators.maxLength(50)],
            email: [validators.email],
            password: [validators.required, validators.minLength(6)],
            confirmPassword: [validators.required, validators.passwordMatch(values.password)]
        };

        // Validate form
        const formErrors = validateForm(values, validationRules);
        
        if (hasErrors(formErrors)) {
            setFormErrors(formErrors);
            return;
        }

        setApiError('');
        setIsSubmitting(true);

        try {
            const response = await authAPI.register({
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword
            });

            if (response.data.success) {
                // Store token and user data
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data));

                // Show success message
                toast.success('Registration successful! Welcome aboard.');

                // Redirect to dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            setApiError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFormErrors,
        setIsSubmitting
    } = useForm(
        { name: '', email: '', password: '', confirmPassword: '' },
        handleRegister
    );

    return (
        <div className="form-container">
            <div className="form-card">
                <div className="form-header">
                    <h2>Create Account</h2>
                    <p>Join us today and get started</p>
                </div>

                {apiError && (
                    <Alert 
                        type="error" 
                        message={apiError} 
                        onClose={() => setApiError('')}
                    />
                )}

                <form onSubmit={handleSubmit} className="form">
                    <Input
                        label="Full Name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name}
                        touched={touched.name}
                        placeholder="Enter your full name"
                        required
                    />

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email}
                        touched={touched.email}
                        placeholder="Enter your email"
                        required
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.password}
                        touched={touched.password}
                        placeholder="Create a password (min 6 characters)"
                        required
                    />

                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.confirmPassword}
                        touched={touched.confirmPassword}
                        placeholder="Confirm your password"
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        Create Account
                    </Button>

                    <div className="form-footer">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login">Sign in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;