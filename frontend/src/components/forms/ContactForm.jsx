// frontend/src/components/forms/ContactForm.jsx

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useForm from '../../hooks/useForm';
import { contactAPI } from '../../services/api';
import { validateForm, validators, hasErrors } from '../../utils/validation';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import Alert from '../common/Alert';
import './Forms.css';

const ContactForm = () => {
    const [apiError, setApiError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Validation rules
    const validationRules = {
        name: [validators.required, validators.minLength(2), validators.maxLength(100)],
        email: [validators.email],
        subject: [validators.required, validators.minLength(5), validators.maxLength(200)],
        message: [validators.required, validators.minLength(10), validators.maxLength(2000)]
    };

    // Form submission handler
    const handleContactSubmit = async (values) => {
        // Validate form
        const formErrors = validateForm(values, validationRules);
        
        if (hasErrors(formErrors)) {
            setFormErrors(formErrors);
            return;
        }

        setApiError('');
        setSuccessMessage('');
        setIsSubmitting(true);

        try {
            const response = await contactAPI.submit(values);

            if (response.data.success) {
                setSuccessMessage(response.data.message);
                toast.success('Message sent successfully!');
                resetForm();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.';
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
        setIsSubmitting,
        resetForm
    } = useForm(
        { name: '', email: '', subject: '', message: '' },
        handleContactSubmit
    );

    return (
        <div className="form-container">
            <div className="form-card form-card-wide">
                <div className="form-header">
                    <h2>Get in Touch</h2>
                    <p>Have a question or feedback? We'd love to hear from you.</p>
                </div>

                {successMessage && (
                    <Alert 
                        type="success" 
                        message={successMessage} 
                        onClose={() => setSuccessMessage('')}
                    />
                )}

                {apiError && (
                    <Alert 
                        type="error" 
                        message={apiError} 
                        onClose={() => setApiError('')}
                    />
                )}

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-row">
                        <Input
                            label="Your Name"
                            name="name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.name}
                            touched={touched.name}
                            placeholder="John Doe"
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
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <Input
                        label="Subject"
                        name="subject"
                        type="text"
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.subject}
                        touched={touched.subject}
                        placeholder="What's this about?"
                        required
                    />

                    <Textarea
                        label="Message"
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.message}
                        touched={touched.message}
                        placeholder="Tell us more..."
                        rows={6}
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        fullWidth
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        Send Message
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;