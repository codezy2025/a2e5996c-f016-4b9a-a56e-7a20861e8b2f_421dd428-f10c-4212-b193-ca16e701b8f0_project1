/**
 * 🏗️  DEVELOPMENT GUIDE - UserManagement Service
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking User Management module including: 1) Registration form with fields for username, password, first/last name, phone, address, email with validation 2) Login form with username/password 3) Profile view/edit component 4) Type definitions matching the Java User model 5) API service layer for register/login/profile operations
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
 * - search(query: string): Promise<UserManagement[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{UserManagementStats}>
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
import { User, CreateUserDto, UpdateUserDto } from '../types/UserManagementTypes';

const API_BASE_URL = 'http://localhost:3000/api/users';

const getAll = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(API_BASE_URL);
    return response.data;
};

const create = async (userData: CreateUserDto): Promise<User> => {
    const response = await axios.post<User>(API_BASE_URL, userData);
    return response.data;
};

const update = async (id: string, userData: UpdateUserDto): Promise<User> => {
    const response = await axios.put<User>(`${API_BASE_URL}/${id}`, userData);
    return response.data;
};

const deleteUser = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};

export const userManagementService = {
    getAll,
    create,
    update,
    delete: deleteUser
};