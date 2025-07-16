/**
 * 🏗️  DEVELOPMENT GUIDE - Transaction Management Module Form Component
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking transaction system including: 1) A form for deposit/withdrawal/transfer operations with validation, 2) A paginated transaction list, 3) API service layer matching the documented endpoints, 4) Type definitions for transactions and responses, 5) A main page layout combining these components
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
 * - initialData?: Partial<Transaction Management Module> (for edit mode)
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
import { TransactionFormData, TransactionType } from '../types/TransactionManagementModuleTypes';

interface TransactionFormProps {
    onSubmit: (data: TransactionFormData) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TransactionFormData>();

    const handleFormSubmit = (data: TransactionFormData) => {
        onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="transaction-form">
            <div className="form-group">
                <label htmlFor="transactionType">Transaction Type</label>
                <select
                    id="transactionType"
                    {...register('transactionType', { required: 'Transaction type is required' })}
                >
                    <option value="">Select transaction type</option>
                    <option value={TransactionType.DEPOSIT}>Deposit</option>
                    <option value={TransactionType.WITHDRAWAL}>Withdrawal</option>
                    <option value={TransactionType.TRANSFER}>Transfer</option>
                </select>
                {errors.transactionType && <span className="error">{errors.transactionType.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type="number"
                    step="0.01"
                    {...register('amount', {
                        required: 'Amount is required',
                        min: { value: 0.01, message: 'Amount must be greater than 0' }
                    })}
                />
                {errors.amount && <span className="error">{errors.amount.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="accountId">Account ID</label>
                <input
                    id="accountId"
                    type="text"
                    {...register('accountId', { required: 'Account ID is required' })}
                />
                {errors.accountId && <span className="error">{errors.accountId.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="targetAccountId">Target Account ID (for transfers)</label>
                <input
                    id="targetAccountId"
                    type="text"
                    {...register('targetAccountId', {
                        validate: (value, formValues) => 
                            formValues.transactionType !== TransactionType.TRANSFER || 
                            !!value || 
                            'Target account is required for transfers'
                    })}
                />
                {errors.targetAccountId && <span className="error">{errors.targetAccountId.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    type="text"
                    {...register('description', { maxLength: 100 })}
                />
                {errors.description && <span className="error">Description must be less than 100 characters</span>}
            </div>

            <button type="submit" className="submit-button">Submit Transaction</button>
        </form>
    );
};

export default TransactionForm;