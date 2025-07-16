/**
 * 🏗️  DEVELOPMENT GUIDE - User Operations Controller Form Component
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking application's user operations including: 1) Login/Registration forms with validation, 2) Profile management interface, 3) Session timeout handling, 4) Menu navigation matching the workflow diagram, and 5) Error handling displays. Include TypeScript interfaces for the User model and API response types.
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
 * - initialData?: Partial<User Operations Controller> (for edit mode)
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
import { UserOperationsControllerFormData, UserOperationsControllerSubmitHandler } from '../types/UserOperationsControllerTypes';

interface UserOperationsControllerFormProps {
  onSubmit: UserOperationsControllerSubmitHandler;
}

const UserOperationsControllerForm: React.FC<UserOperationsControllerFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserOperationsControllerFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          {...register('firstName', { required: 'First name is required' })}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          {...register('lastName', { required: 'Last name is required' })}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserOperationsControllerForm;