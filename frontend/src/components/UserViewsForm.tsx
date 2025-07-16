/**
 * 🏗️  DEVELOPMENT GUIDE - User Views Form Component
 * 
 * 📋 Original Requirements: Generate React TSX files for a banking application's user views module, including: 1) Login form with validation and error display, 2) Registration form with progress indication, 3) Profile display view, 4) Profile editor with validation. Use TypeScript interfaces for the User model (username, password, firstName, lastName, phoneNumber, address, email). Include responsive design and security considerations like input sanitization and password masking.
 * 
 * 🚀 Enhancement Ideas:
 * - Add form validation with Zod/Yup schema
 * - Implement auto-save functionality
 * - Add file upload capabilities if needed
 * - Include conditional fields based on other inputs
 * - Add form steps/wizard for complex forms
 * - Implement real-time validation feedback
 * 
 * 💡 Props to Consider Adding:
 * - initialData?: Partial<User Views> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { User, UserViewsFormProps } from '../types/UserViewsTypes';

const UserViewsForm: React.FC<UserViewsFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<User>({
    mode: 'onChange',
  });

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-views-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 4,
              message: 'Username must be at least 4 characters',
            },
            maxLength: {
              value: 20,
              message: 'Username must not exceed 20 characters',
            },
          })}
        />
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 'Password must contain uppercase, lowercase, number, and special character',
            },
          })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            validate: (value) => value === password || 'Passwords do not match',
          })}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          {...register('firstName', {
            required: 'First name is required',
          })}
        />
        {errors.firstName && <span className="error">{errors.firstName.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          {...register('lastName', {
            required: 'Last name is required',
          })}
        />
        {errors.lastName && <span className="error">{errors.lastName.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          type="tel"
          {...register('phoneNumber', {
            required: 'Phone number is required',
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
              message: 'Invalid phone number',
            },
          })}
        />
        {errors.phoneNumber && <span className="error">{errors.phoneNumber.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          {...register('address', {
            required: 'Address is required',
          })}
        />
        {errors.address && <span className="error">{errors.address.message}</span>}
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default UserViewsForm;