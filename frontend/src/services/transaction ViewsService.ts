/**
 * 🏗️  DEVELOPMENT GUIDE - Transaction Views Service
 * 
 * 📋 Original Requirements: Generate React TSX files for the Transaction Views module including: 1) DepositForm component with deposit form and confirmation display, 2) WithdrawalForm component with limit info display and amount processing, 3) TransferForm component with recipient field and verification, 4) TransactionHistory component with paginated transaction display and load more functionality. Also include necessary types for Transaction data and services for API calls.
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
 * - search(query: string): Promise<Transaction Views[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Transaction ViewsStats}>
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
import { TransactionView, TransactionViewCreate, TransactionViewUpdate } from '../types/TransactionViewsTypes';

const API_BASE_URL = 'http://localhost:3000/api/transaction-views';

export const transactionViewsService = {
  getAll: async (): Promise<TransactionView[]> => {
    const response = await axios.get<TransactionView[]>(API_BASE_URL);
    return response.data;
  },

  create: async (data: TransactionViewCreate): Promise<TransactionView> => {
    const response = await axios.post<TransactionView>(API_BASE_URL, data);
    return response.data;
  },

  update: async (id: string, data: TransactionViewUpdate): Promise<TransactionView> => {
    const response = await axios.put<TransactionView>(`${API_BASE_URL}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
};