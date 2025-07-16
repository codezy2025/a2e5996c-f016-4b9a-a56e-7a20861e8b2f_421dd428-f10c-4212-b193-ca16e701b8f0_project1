/**
 * 🏗️  DEVELOPMENT GUIDE - Bank Account Management Module Types
 * 
 * 📋 Original Requirements: Generate React TSX components for: 1) Account creation form, 2) Account list view, 3) Account details page, 4) Service layer for API calls, and 5) Type definitions matching the backend models
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Bank Account Management Module>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Bank Account Management ModuleStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Bank Account Management ModuleSearchParams = Pick<Bank Account Management Module, 'name' | 'status'>
 * - export type Bank Account Management ModuleUpdateData = Partial<Omit<Bank Account Management Module, 'id' | 'createdAt'>>
 */

export interface BankAccount {
  id: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'business';
  balance: number;
  currency: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'frozen' | 'closed';
  overdraftLimit?: number;
  interestRate?: number;
}

export interface BankAccountFormData {
  accountType: 'checking' | 'savings' | 'business';
  initialDeposit: number;
  currency: string;
  overdraftLimit?: number;
  interestRate?: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  description?: string;
  date: Date;
  recipientAccountId?: string;
}

export interface AccountTransferData {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description?: string;
}