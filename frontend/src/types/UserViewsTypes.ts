/**
 * 🏗️  DEVELOPMENT GUIDE - User Views Types
 * 
 * 📋 Original Requirements: Generate React TSX files for a banking application's user views module, including: 1) Login form with validation and error display, 2) Registration form with progress indication, 3) Profile display view, 4) Profile editor with validation. Use TypeScript interfaces for the User model (username, password, firstName, lastName, phoneNumber, address, email). Include responsive design and security considerations like input sanitization and password masking.
 * 
 * 🚀 Enhancement Ideas:
 * - Add validation schemas using Zod or Yup
 * - Create utility types for API responses (ApiResponse<User Views>)
 * - Add enums for status fields or categories
 * - Consider adding computed fields or getters
 * - Add types for search/filter parameters
 * 
 * 💡 Example Extensions:
 * - export enum User ViewsStatus { ACTIVE = 'active', INACTIVE = 'inactive' }
 * - export type User ViewsSearchParams = Pick<User Views, 'name' | 'status'>
 * - export type User ViewsUpdateData = Partial<Omit<User Views, 'id' | 'createdAt'>>
 */

export interface UserViews {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    email: string;
}

export interface UserViewsFormData {
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    email: string;
}