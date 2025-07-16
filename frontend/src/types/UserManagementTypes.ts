/**
 * 🏗️  DEVELOPMENT GUIDE - UserManagement Types
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking User Management module including: 1) Registration form with fields for username, password, first/last name, phone, address, email with validation 2) Login form with username/password 3) Profile view/edit component 4) Type definitions matching the Java User model 5) API service layer for register/login/profile operations
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<UserManagement>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum UserManagementStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type UserManagementSearchParams = Pick<UserManagement, 'name' | 'status'>
 * - export type UserManagementUpdateData = Partial<Omit<UserManagement, 'id' | 'createdAt'>>
 */

export interface UserManagement {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserManagementFormData {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
}