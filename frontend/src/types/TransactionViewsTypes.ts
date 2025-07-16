/**
 * 🏗️  DEVELOPMENT GUIDE - Transaction Views Types
 * 
 * 📋 Original Requirements: Generate React TSX files for the Transaction Views module including: 1) DepositForm component with deposit form and confirmation display, 2) WithdrawalForm component with limit info display and amount processing, 3) TransferForm component with recipient field and verification, 4) TransactionHistory component with paginated transaction display and load more functionality. Also include necessary types for Transaction data and services for API calls.
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Transaction Views>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Transaction ViewsStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Transaction ViewsSearchParams = Pick<Transaction Views, 'name' | 'status'>
 * - export type Transaction ViewsUpdateData = Partial<Omit<Transaction Views, 'id' | 'createdAt'>>
 */

export interface TransactionViews {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  recipient?: string;
  sender?: string;
  reference?: string;
  fee?: number;
}

export interface TransactionViewsFormData {
  amount: number;
  currency: string;
  recipient?: string;
  notes?: string;
  verificationCode?: string;
  accountNumber?: string;
  routingNumber?: string;
  limit?: number;
  transactionType: 'deposit' | 'withdrawal' | 'transfer';
}