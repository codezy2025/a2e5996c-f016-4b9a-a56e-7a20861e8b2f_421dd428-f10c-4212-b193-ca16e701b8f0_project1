/**
 * 🏗️  DEVELOPMENT GUIDE - Transaction Management Module Service
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking transaction system including: 1) A form for deposit/withdrawal/transfer operations with validation, 2) A paginated transaction list, 3) API service layer matching the documented endpoints, 4) Type definitions for transactions and responses, 5) A main page layout combining these components
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
 * - search(query: string): Promise<Transaction Management Module[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Transaction Management ModuleStats}>
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
import { Transaction, CreateTransactionDto, UpdateTransactionDto } from '../types/TransactionManagementModuleTypes';

const API_BASE_URL = 'http://localhost:3000/api/transactions';

export const transactionManagementModuleService = {
  getAll: async (): Promise<Transaction[]> => {
    const response = await axios.get<Transaction[]>(API_BASE_URL);
    return response.data;
  },

  create: async (createTransactionDto: CreateTransactionDto): Promise<Transaction> => {
    const response = await axios.post<Transaction>(API_BASE_URL, createTransactionDto);
    return response.data;
  },

  update: async (id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> => {
    const response = await axios.patch<Transaction>(`${API_BASE_URL}/${id}`, updateTransactionDto);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
};