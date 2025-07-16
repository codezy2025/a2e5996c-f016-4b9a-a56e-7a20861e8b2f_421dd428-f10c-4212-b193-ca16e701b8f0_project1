/**
 * 🏗️  DEVELOPMENT GUIDE - UserManagement Page Component
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking User Management module including: 1) Registration form with fields for username, password, first/last name, phone, address, email with validation 2) Login form with username/password 3) Profile view/edit component 4) Type definitions matching the Java User model 5) API service layer for register/login/profile operations
 * 
 * 🚀 Enhancement Ideas:
 * - Add URL-based filtering and search
 * - Implement breadcrumb navigation
 * - Add export/import functionality
 * - Include real-time updates (WebSocket/SSE)
 * - Add keyboard shortcuts for common actions
 * - Implement undo/redo functionality
 * 
 * 💡 State Management Improvements:
 * - Use useReducer for complex state logic
 * - Add optimistic updates for better UX
 * - Implement proper error boundaries
 * - Add loading skeletons instead of spinners
 * 
 * 🔧 User Experience:
 * - Add confirmation dialogs for destructive actions
 * - Implement toast notifications for feedback
 * - Add drag-and-drop for reordering
 * - Include accessibility features (ARIA labels)
 * 
 * 📱 Responsive Design:
 * - Add mobile-specific components
 * - Implement swipe actions for mobile
 * - Consider drawer/modal layouts for small screens
 */

import React, { useState, useEffect } from 'react';
import UserManagementForm from '../components/UserManagementForm';
import UserManagementList from '../components/UserManagementList';
import userManagementService from '../services/userManagementService';
import { User, UserFormData } from '../types/UserManagementTypes';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userManagementService.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: UserFormData) => {
    try {
      setLoading(true);
      await userManagementService.createUser(formData);
      await fetchUsers();
      setError(null);
    } catch (err) {
      setError('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, formData: UserFormData) => {
    try {
      setLoading(true);
      await userManagementService.updateUser(id, formData);
      await fetchUsers();
      setSelectedUser(null);
      setError(null);
    } catch (err) {
      setError('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await userManagementService.deleteUser(id);
      await fetchUsers();
      setError(null);
    } catch (err) {
      setError('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <h1>User Management</h1>
      {error && <div className="error">{error}</div>}
      <UserManagementForm
        onSubmit={selectedUser ? (formData) => handleUpdate(selectedUser.id, formData) : handleCreate}
        initialData={selectedUser}
        onCancel={() => setSelectedUser(null)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <UserManagementList
          users={users}
          onEdit={handleSelectUser}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UserManagementPage;