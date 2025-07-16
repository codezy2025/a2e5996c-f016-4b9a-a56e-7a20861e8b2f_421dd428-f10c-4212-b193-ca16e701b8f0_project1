/**
 * 🏗️  DEVELOPMENT GUIDE - Bank Account Management Module Service
 * 
 * 📋 Original Requirements: Generate React TSX components for: 1) Account creation form, 2) Account list view, 3) Account details page, 4) Service layer for API calls, and 5) Type definitions matching the backend models
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
 * - search(query: string): Promise<Bank Account Management Module[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Bank Account Management ModuleStats}>
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
import { BankAccount, CreateBankAccountDto, UpdateBankAccountDto } from '../types/BankAccountManagementModuleTypes';

const API_BASE_URL = 'http://localhost:3000/api/bank-accounts';

export const bankAccountManagementModuleService = {
  getAll: async (): Promise<BankAccount[]> => {
    const response = await axios.get<BankAccount[]>(API_BASE_URL);
    return response.data;
  },

  create: async (createBankAccountDto: CreateBankAccountDto): Promise<BankAccount> => {
    const response = await axios.post<BankAccount>(API_BASE_URL, createBankAccountDto);
    return response.data;
  },

  update: async (id: string, updateBankAccountDto: UpdateBankAccountDto): Promise<BankAccount> => {
    const response = await axios.patch<BankAccount>(`${API_BASE_URL}/${id}`, updateBankAccountDto);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
};