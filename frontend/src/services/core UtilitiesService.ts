/**
 * 🏗️  DEVELOPMENT GUIDE - Core Utilities Service
 * 
 * 📋 Original Requirements: Create React/TypeScript implementations for the following banking core utilities: 1) Currency formatting, 2) Input validation, 3) Error handling with user-friendly messages, and 4) Activity logging. Include proper TypeScript interfaces and React hooks where applicable.
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
 * - search(query: string): Promise<Core Utilities[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Core UtilitiesStats}>
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
import { CoreUtility, CreateCoreUtilityDto, UpdateCoreUtilityDto } from '../types/CoreUtilitiesTypes';

const API_BASE_URL = 'http://localhost:3000/api/core-utilities';

export const coreUtilitiesService = {
  async getAll(): Promise<CoreUtility[]> {
    const response = await axios.get<CoreUtility[]>(API_BASE_URL);
    return response.data;
  },

  async create(createDto: CreateCoreUtilityDto): Promise<CoreUtility> {
    const response = await axios.post<CoreUtility>(API_BASE_URL, createDto);
    return response.data;
  },

  async update(id: string, updateDto: UpdateCoreUtilityDto): Promise<CoreUtility> {
    const response = await axios.patch<CoreUtility>(`${API_BASE_URL}/${id}`, updateDto);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
};