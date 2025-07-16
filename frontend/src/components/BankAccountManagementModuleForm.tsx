/**
 * 🏗️  DEVELOPMENT GUIDE - Bank Account Management Module Form Component
 * 
 * 📋 Original Requirements: Generate React TSX components for: 1) Account creation form, 2) Account list view, 3) Account details page, 4) Service layer for API calls, and 5) Type definitions matching the backend models
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
 * - initialData?: Partial<Bank Account Management Module> (for edit mode)
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
import { BankAccount, BankAccountFormData } from '../types/BankAccountManagementModuleTypes';

interface BankAccountManagementModuleFormProps {
  onSubmit: (data: BankAccountFormData) => void;
  defaultValues?: BankAccount;
}

const BankAccountManagementModuleForm: React.FC<BankAccountManagementModuleFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BankAccountFormData>({
    defaultValues: defaultValues || {
      accountNumber: '',
      accountType: '',
      balance: 0,
      currency: '',
      ownerName: '',
      ownerId: '',
      branchCode: '',
      status: 'active'
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="accountNumber">Account Number</label>
        <input
          id="accountNumber"
          {...register('accountNumber', { required: 'Account number is required' })}
        />
        {errors.accountNumber && <span>{errors.accountNumber.message}</span>}
      </div>

      <div>
        <label htmlFor="accountType">Account Type</label>
        <select
          id="accountType"
          {...register('accountType', { required: 'Account type is required' })}
        >
          <option value="">Select account type</option>
          <option value="savings">Savings</option>
          <option value="checking">Checking</option>
          <option value="credit">Credit</option>
        </select>
        {errors.accountType && <span>{errors.accountType.message}</span>}
      </div>

      <div>
        <label htmlFor="balance">Balance</label>
        <input
          id="balance"
          type="number"
          {...register('balance', { required: 'Balance is required', min: 0 })}
        />
        {errors.balance && <span>{errors.balance.message}</span>}
      </div>

      <div>
        <label htmlFor="currency">Currency</label>
        <input
          id="currency"
          {...register('currency', { required: 'Currency is required' })}
        />
        {errors.currency && <span>{errors.currency.message}</span>}
      </div>

      <div>
        <label htmlFor="ownerName">Owner Name</label>
        <input
          id="ownerName"
          {...register('ownerName', { required: 'Owner name is required' })}
        />
        {errors.ownerName && <span>{errors.ownerName.message}</span>}
      </div>

      <div>
        <label htmlFor="ownerId">Owner ID</label>
        <input
          id="ownerId"
          {...register('ownerId', { required: 'Owner ID is required' })}
        />
        {errors.ownerId && <span>{errors.ownerId.message}</span>}
      </div>

      <div>
        <label htmlFor="branchCode">Branch Code</label>
        <input
          id="branchCode"
          {...register('branchCode', { required: 'Branch code is required' })}
        />
        {errors.branchCode && <span>{errors.branchCode.message}</span>}
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          {...register('status')}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BankAccountManagementModuleForm;