/**
 * 🏗️  DEVELOPMENT GUIDE - Account Views Service
 * 
 * 📋 Original Requirements: Generate React TSX components for: 1) BankOpenAccountView (account type selection and requirements display), 2) BankCloseAccountView (closure terms and confirmation), 3) BankViewAccountsView (account list rendering with balance formatting). Include TypeScript interfaces for UserBankAccount, BankAccountType, and Currency models. Also generate a service layer for API calls to corresponding controllers.
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
 * - search(query: string): Promise<Account Views[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Account ViewsStats}>
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
import { AccountView, CreateAccountViewDto, UpdateAccountViewDto } from '../types/AccountViewsTypes';

const API_BASE_URL = 'http://localhost:3000/api/account-views';

export const accountViewsService = {
  getAll: async (): Promise<AccountView[]> => {
    const response = await axios.get<AccountView[]>(API_BASE_URL);
    return response.data;
  },

  create: async (createAccountViewDto: CreateAccountViewDto): Promise<AccountView> => {
    const response = await axios.post<AccountView>(API_BASE_URL, createAccountViewDto);
    return response.data;
  },

  update: async (id: string, updateAccountViewDto: UpdateAccountViewDto): Promise<AccountView> => {
    const response = await axios.patch<AccountView>(`${API_BASE_URL}/${id}`, updateAccountViewDto);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
};