/**
 * 🏗️  DEVELOPMENT GUIDE - User Operations Controller Types
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking application's user operations including: 1) Login/Registration forms with validation, 2) Profile management interface, 3) Session timeout handling, 4) Menu navigation matching the workflow diagram, and 5) Error handling displays. Include TypeScript interfaces for the User model and API response types.
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<User Operations Controller>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum User Operations ControllerStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type User Operations ControllerSearchParams = Pick<User Operations Controller, 'name' | 'status'>
 * - export type User Operations ControllerUpdateData = Partial<Omit<User Operations Controller, 'id' | 'createdAt'>>
 */

export interface UserOperationsController {
  login: (credentials: { username: string; password: string }) => Promise<ApiResponse>;
  register: (userData: UserOperationsControllerFormData) => Promise<ApiResponse>;
  updateProfile: (profileData: Partial<UserOperationsControllerFormData>) => Promise<ApiResponse>;
  logout: () => Promise<void>;
  checkSession: () => Promise<{ active: boolean; remainingTime?: number }>;
  handleError: (error: unknown) => void;
}

export interface UserOperationsControllerFormData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
}