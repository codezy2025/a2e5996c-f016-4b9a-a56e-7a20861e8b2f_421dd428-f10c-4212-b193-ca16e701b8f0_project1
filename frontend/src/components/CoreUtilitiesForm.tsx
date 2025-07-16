/**
 * 🏗️  DEVELOPMENT GUIDE - Core Utilities Form Component
 * 
 * 📋 Original Requirements: Create React/TypeScript implementations for the following banking core utilities: 1) Currency formatting, 2) Input validation, 3) Error handling with user-friendly messages, and 4) Activity logging. Include proper TypeScript interfaces and React hooks where applicable.
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
 * - initialData?: Partial<Core Utilities> (for edit mode)
 * - onCancel?: () => void
 * - isLoading?: boolean
 * - validationSchema?: ZodSchema
 * 
 * 🔧 Libraries to Consider:
 * - @hookform/resolvers for validation
 * - react-hook-form-devtools for debugging
 */

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CoreUtilitiesFormData, CoreUtilitiesFormProps } from '../types/CoreUtilitiesTypes';

const CoreUtilitiesForm: React.FC<CoreUtilitiesFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CoreUtilitiesFormData>();

  const submitHandler: SubmitHandler<CoreUtilitiesFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          {...register('amount', {
            required: 'Amount is required',
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: 'Invalid currency format'
            }
          })}
        />
        {errors.amount && <span>{errors.amount.message}</span>}
      </div>

      <div>
        <label htmlFor="accountNumber">Account Number</label>
        <input
          id="accountNumber"
          type="text"
          {...register('accountNumber', {
            required: 'Account number is required',
            minLength: {
              value: 8,
              message: 'Account number must be at least 8 characters'
            },
            maxLength: {
              value: 12,
              message: 'Account number cannot exceed 12 characters'
            }
          })}
        />
        {errors.accountNumber && <span>{errors.accountNumber.message}</span>}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          {...register('description', {
            required: 'Description is required',
            maxLength: {
              value: 100,
              message: 'Description cannot exceed 100 characters'
            }
          })}
        />
        {errors.description && <span>{errors.description.message}</span>}
      </div>

      <div>
        <label htmlFor="logActivity">Log Activity</label>
        <input
          id="logActivity"
          type="checkbox"
          {...register('logActivity')}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CoreUtilitiesForm;