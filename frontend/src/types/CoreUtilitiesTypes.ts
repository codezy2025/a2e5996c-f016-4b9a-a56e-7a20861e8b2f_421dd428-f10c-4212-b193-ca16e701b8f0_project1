/**
 * 🏗️  DEVELOPMENT GUIDE - Core Utilities Types
 * 
 * 📋 Original Requirements: Create React/TypeScript implementations for the following banking core utilities: 1) Currency formatting, 2) Input validation, 3) Error handling with user-friendly messages, and 4) Activity logging. Include proper TypeScript interfaces and React hooks where applicable.
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<Core Utilities>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum Core UtilitiesStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type Core UtilitiesSearchParams = Pick<Core Utilities, 'name' | 'status'>
 * - export type Core UtilitiesUpdateData = Partial<Omit<Core Utilities, 'id' | 'createdAt'>>
 */

export interface CoreUtilities {
  formatCurrency: (amount: number, currencyCode: string) => string;
  validateInput: (input: string, validationRules: ValidationRule[]) => ValidationResult;
  handleError: (error: unknown) => UserFriendlyError;
  logActivity: (activity: ActivityLog) => void;
}

export interface CoreUtilitiesFormData {
  amount: number;
  currencyCode: string;
  input: string;
  validationRules: ValidationRule[];
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern';
  value?: string | number;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface UserFriendlyError {
  title: string;
  message: string;
  code?: string;
}

export interface ActivityLog {
  timestamp: Date;
  action: string;
  details: Record<string, unknown>;
  userId?: string;
}