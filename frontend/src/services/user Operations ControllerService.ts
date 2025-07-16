/**
 * 🏗️  DEVELOPMENT GUIDE - User Operations Controller Service
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking application's user operations including: 1) Login/Registration forms with validation, 2) Profile management interface, 3) Session timeout handling, 4) Menu navigation matching the workflow diagram, and 5) Error handling displays. Include TypeScript interfaces for the User model and API response types.
 * 
 * 🚀 Enhancement Ideas:
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<User Operations Controller[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{User Operations ControllerStats}>
 * 
 * 🔧 Error Handling:
 * - Create custom error classes
 * - Add request/response logging
 * - Implement exponential backoff for retries
 * 
 * 🚀 Performance:
 * - Add request deduplication
 * - Implement response caching
 * - Consider using React Query for state management
 */

import axios from 'axios';
import { 
    User, 
    CreateUserRequest, 
    UpdateUserRequest 
} from '../types/UserOperationsControllerTypes';

const API_BASE_URL = 'http://localhost:3000/api/users';

export const userOperationsControllerService = {
    getAll: async (): Promise<User[]> => {
        const response = await axios.get<User[]>(API_BASE_URL);
        return response.data;
    },
    create: async (userData: CreateUserRequest): Promise<User> => {
        const response = await axios.post<User>(API_BASE_URL, userData);
        return response.data;
    },
    update: async (id: string, userData: UpdateUserRequest): Promise<User> => {
        const response = await axios.put<User>(`${API_BASE_URL}/${id}`, userData);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};