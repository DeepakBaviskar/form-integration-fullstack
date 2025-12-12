// frontend/src/components/forms/LoginForm.jsx

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

const LoginForm = () => {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');

    // Validation rules
    const validationRules = {
        email: [validators.email],
        password: [validators.required, validators.minLength(6)]
    };

    // Form submission handler
    const handleLogin = async (values) => {
        // Validate form
        const formErrors = validateForm(values, validationRules);
        
        if (hasErrors(formErrors)) {
            setFormErrors(formErrors);
            return;
        }

        setApiError('');
        setIsSubmitting(true);

        try {
            const response = await authAPI.login({
                email: values.email,
                password: values.password
            });

            if (response.data.success) {
                // Store token and user data
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data));

                // Show success message
                toast.success('Login successful! Welcome back.');

                // Redirect to dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
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
    } = useForm({ email: '', password: '' }, handleLogin);

    return (
        <div className="form-container">
            <div className="form-card">
                <div className="form-header">
                    <h2>Welcome Back</h2>
                    <p>Please sign in to your account</p>
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
                        placeholder="Enter your password"
                        required
                    />

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input type="checkbox" name="remember" />
                            <span>Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="forgot-link">
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        Sign In
                    </Button>

                    <div className="form-footer">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register">Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;