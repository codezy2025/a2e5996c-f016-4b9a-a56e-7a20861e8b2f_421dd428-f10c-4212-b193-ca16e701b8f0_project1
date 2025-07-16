/**
 * 🏗️  DEVELOPMENT GUIDE - UserManagement Form Component
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking User Management module including: 1) Registration form with fields for username, password, first/last name, phone, address, email with validation 2) Login form with username/password 3) Profile view/edit component 4) Type definitions matching the Java User model 5) API service layer for register/login/profile operations
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
 * - initialData?: Partial<UserManagement> (for edit mode)
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
import { User, UserFormData } from '../types/UserManagementTypes';

interface UserManagementFormProps {
  onSubmit: (data: UserFormData) => void;
  user?: User;
  isEdit?: boolean;
}

const UserManagementForm: React.FC<UserManagementFormProps> = ({ onSubmit, user, isEdit = false }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    defaultValues: user || {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      email: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          {...register('username', { required: 'Username is required' })}
          disabled={isEdit}
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      {!isEdit && (
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
      )}

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
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          {...register('phone', { 
            required: 'Phone is required',
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: 'Invalid phone number'
            }
          })}
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <span>{errors.address.message}</span>}
      </div>

      <button type="submit">{isEdit ? 'Update Profile' : 'Register'}</button>
    </form>
  );
};

export default UserManagementForm;