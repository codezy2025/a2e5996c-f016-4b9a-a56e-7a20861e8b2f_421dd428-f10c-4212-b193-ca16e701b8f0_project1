/**
 * 🏗️  DEVELOPMENT GUIDE - Account Views Form Component
 * 
 * 📋 Original Requirements: Generate React TSX components for: 1) BankOpenAccountView (account type selection and requirements display), 2) BankCloseAccountView (closure terms and confirmation), 3) BankViewAccountsView (account list rendering with balance formatting). Include TypeScript interfaces for UserBankAccount, BankAccountType, and Currency models. Also generate a service layer for API calls to corresponding controllers.
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
 * - initialData?: Partial<Account Views> (for edit mode)
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
import { UserBankAccount, BankAccountType, Currency } from '../types/AccountViewsTypes';

interface AccountViewsFormProps {
  onSubmit: (data: any) => void;
  viewType: 'open' | 'close' | 'view';
  accounts?: UserBankAccount[];
  accountTypes?: BankAccountType[];
}

const AccountViewsForm: React.FC<AccountViewsFormProps> = ({ 
  onSubmit, 
  viewType, 
  accounts = [], 
  accountTypes = [] 
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const renderOpenAccountView = () => (
    <div>
      <h2>Open New Account</h2>
      <select {...register('accountType', { required: true })}>
        <option value="">Select Account Type</option>
        {accountTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name} - Min. Deposit: {type.minimumDeposit}
          </option>
        ))}
      </select>
      {errors.accountType && <span>This field is required</span>}

      <div>
        <h3>Requirements:</h3>
        <ul>
          {accountTypes[0]?.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderCloseAccountView = () => (
    <div>
      <h2>Close Account</h2>
      <select {...register('accountToClose', { required: true })}>
        <option value="">Select Account</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.accountNumber} - {account.balance} {account.currency}
          </option>
        ))}
      </select>
      {errors.accountToClose && <span>This field is required</span>}

      <div>
        <h3>Closure Terms:</h3>
        <p>Closing an account may result in fees. Any remaining balance will be transferred.</p>
      </div>

      <label>
        <input type="checkbox" {...register('confirmClosure', { required: true })} />
        I confirm I want to close this account
      </label>
      {errors.confirmClosure && <span>Confirmation is required</span>}
    </div>
  );

  const renderViewAccountsView = () => (
    <div>
      <h2>Your Accounts</h2>
      <table>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Type</th>
            <th>Balance</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.accountNumber}</td>
              <td>{account.type}</td>
              <td>{account.balance.toLocaleString()}</td>
              <td>{account.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {viewType === 'open' && renderOpenAccountView()}
      {viewType === 'close' && renderCloseAccountView()}
      {viewType === 'view' && renderViewAccountsView()}

      {viewType !== 'view' && (
        <button type="submit">
          {viewType === 'open' ? 'Open Account' : 'Close Account'}
        </button>
      )}
    </form>
  );
};

export default AccountViewsForm;