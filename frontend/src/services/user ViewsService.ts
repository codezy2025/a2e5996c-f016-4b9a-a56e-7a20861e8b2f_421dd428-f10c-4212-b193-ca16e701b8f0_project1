/**
 * 🏗️  DEVELOPMENT GUIDE - User Views Service
 * 
 * 📋 Original Requirements: Generate React TSX files for a banking application's user views module, including: 1) Login form with validation and error display, 2) Registration form with progress indication, 3) Profile display view, 4) Profile editor with validation. Use TypeScript interfaces for the User model (username, password, firstName, lastName, phoneNumber, address, email). Include responsive design and security considerations like input sanitization and password masking.
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
 * - search(query: string): Promise<User Views[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{User ViewsStats}>
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
import { UserView, CreateUserViewDto, UpdateUserViewDto } from '../types/UserViewsTypes';

const API_BASE_URL = 'http://localhost:3000/api/user-views';

export const userViewsService = {
    getAll: async (): Promise<UserView[]> => {
        const response = await axios.get<UserView[]>(API_BASE_URL);
        return response.data;
    },

    create: async (createUserViewDto: CreateUserViewDto): Promise<UserView> => {
        const response = await axios.post<UserView>(API_BASE_URL, createUserViewDto);
        return response.data;
    },

    update: async (id: string, updateUserViewDto: UpdateUserViewDto): Promise<UserView> => {
        const response = await axios.patch<UserView>(`${API_BASE_URL}/${id}`, updateUserViewDto);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};