/**
 * 🏗️  DEVELOPMENT GUIDE - Account Views Types
 * 
 * 📋 Original Requirements: Generate React TSX components for: 1) BankOpenAccountView (account type selection and requirements display), 2) BankCloseAccountView (closure terms and confirmation), 3) BankViewAccountsView (account list rendering with balance formatting). Include TypeScript interfaces for UserBankAccount, BankAccountType, and Currency models. Also generate a service layer for API calls to corresponding controllers.
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Account Views>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Account ViewsStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Account ViewsSearchParams = Pick<Account Views, 'name' | 'status'>
 * - export type Account ViewsUpdateData = Partial<Omit<Account Views, 'id' | 'createdAt'>>
 */

export interface AccountViews {
  id: string;
  accountType: BankAccountType;
  currency: Currency;
  balance: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountViewsFormData {
  accountType: string;
  currency: string;
  initialDeposit?: number;
  termsAccepted: boolean;
  closureReason?: string;
  transferAccountId?: string;
}