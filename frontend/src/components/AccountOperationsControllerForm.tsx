/**
 * 🏗️  DEVELOPMENT GUIDE - Account Operations Controller Form Component
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking account management system that interfaces with the AccountOperationsController backend. Include: 1) A form for opening new accounts with validation, 2) A form for closing accounts with ownership verification, 3) A list view for displaying user accounts with sorting capabilities, 4) Service functions for API calls, and 5) Type definitions matching the backend models.
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
 * - initialData?: Partial<Account Operations Controller> (for edit mode)
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
import { AccountOperationsControllerTypes } from '../types/AccountOperationsControllerTypes';

interface AccountOperationsControllerFormProps {
  onSubmit: SubmitHandler<AccountOperationsControllerTypes.AccountFormData>;
}

const AccountOperationsControllerForm: React.FC<AccountOperationsControllerFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AccountOperationsControllerTypes.AccountFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="accountType">Account Type</label>
        <select
          id="accountType"
          {...register('accountType', { required: 'Account type is required' })}
        >
          <option value="">Select account type</option>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>
        {errors.accountType && <span>{errors.accountType.message}</span>}
      </div>

      <div>
        <label htmlFor="initialDeposit">Initial Deposit</label>
        <input
          id="initialDeposit"
          type="number"
          {...register('initialDeposit', { 
            required: 'Initial deposit is required',
            min: { value: 0, message: 'Amount must be positive' }
          })}
        />
        {errors.initialDeposit && <span>{errors.initialDeposit.message}</span>}
      </div>

      <div>
        <label htmlFor="accountNumber">Account Number (for closing)</label>
        <input
          id="accountNumber"
          type="text"
          {...register('accountNumber')}
        />
      </div>

      <div>
        <label htmlFor="verificationId">Verification ID (for closing)</label>
        <input
          id="verificationId"
          type="text"
          {...register('verificationId')}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AccountOperationsControllerForm;