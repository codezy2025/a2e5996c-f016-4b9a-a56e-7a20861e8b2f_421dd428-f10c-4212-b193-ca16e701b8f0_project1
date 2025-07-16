/**
 * 🏗️  DEVELOPMENT GUIDE - Transaction Management Module Types
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking transaction system including: 1) A form for deposit/withdrawal/transfer operations with validation, 2) A paginated transaction list, 3) API service layer matching the documented endpoints, 4) Type definitions for transactions and responses, 5) A main page layout combining these components
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Transaction Management Module>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Transaction Management ModuleStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Transaction Management ModuleSearchParams = Pick<Transaction Management Module, 'name' | 'status'>
 * - export type Transaction Management ModuleUpdateData = Partial<Omit<Transaction Management Module, 'id' | 'createdAt'>>
 */

export interface TransactionManagementModule {
  id: string;
  accountId: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  currency: string;
  recipientAccountId?: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  description?: string;
}

export interface TransactionManagementModuleFormData {
  operationType: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  currency: string;
  recipientAccountId?: string;
  description?: string;
}