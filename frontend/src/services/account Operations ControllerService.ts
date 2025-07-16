/**
 * 🏗️  DEVELOPMENT GUIDE - Account Operations Controller Service
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking account management system that interfaces with the AccountOperationsController backend. Include: 1) A form for opening new accounts with validation, 2) A form for closing accounts with ownership verification, 3) A list view for displaying user accounts with sorting capabilities, 4) Service functions for API calls, and 5) Type definitions matching the backend models.
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
 * - search(query: string): Promise<Account Operations Controller[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Account Operations ControllerStats}>
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
    AccountOperation, 
    CreateAccountOperationDto, 
    UpdateAccountOperationDto 
} from '../types/AccountOperationsControllerTypes';

const API_BASE_URL = 'http://localhost:3000/api/account-operations';

export const accountOperationsControllerService = {
    getAll: async (): Promise<AccountOperation[]> => {
        const response = await axios.get<AccountOperation[]>(API_BASE_URL);
        return response.data;
    },

    create: async (data: CreateAccountOperationDto): Promise<AccountOperation> => {
        const response = await axios.post<AccountOperation>(API_BASE_URL, data);
        return response.data;
    },

    update: async (id: string, data: UpdateAccountOperationDto): Promise<AccountOperation> => {
        const response = await axios.put<AccountOperation>(`${API_BASE_URL}/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};