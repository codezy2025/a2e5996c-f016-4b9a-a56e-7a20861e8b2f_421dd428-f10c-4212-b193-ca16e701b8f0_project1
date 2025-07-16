/**
 * 🏗️  DEVELOPMENT GUIDE - Account Operations Controller Types
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking account management system that interfaces with the AccountOperationsController backend. Include: 1) A form for opening new accounts with validation, 2) A form for closing accounts with ownership verification, 3) A list view for displaying user accounts with sorting capabilities, 4) Service functions for API calls, and 5) Type definitions matching the backend models.
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Account Operations Controller>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Account Operations ControllerStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Account Operations ControllerSearchParams = Pick<Account Operations Controller, 'name' | 'status'>
 * - export type Account Operations ControllerUpdateData = Partial<Omit<Account Operations Controller, 'id' | 'createdAt'>>
 */

export interface AccountOperationsController {
  id: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'loan' | 'credit';
  balance: number;
  ownerId: string;
  status: 'active' | 'closed' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountOperationsControllerFormData {
  accountType: 'checking' | 'savings' | 'loan' | 'credit';
  initialDeposit: number;
  ownerId: string;
  accountNumber?: string;
  verificationId?: string;
  closeReason?: string;
}