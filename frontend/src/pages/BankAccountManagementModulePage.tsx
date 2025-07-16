/**
 * 🏗️  DEVELOPMENT GUIDE - Bank Account Management Module Page Component
 * 
 * 📋 Original Requirements: Generate React TSX components for: 1) Account creation form, 2) Account list view, 3) Account details page, 4) Service layer for API calls, and 5) Type definitions matching the backend models
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
import { BankAccountManagementModuleForm } from '../components/BankAccountManagementModuleForm';
import { BankAccountManagementModuleList } from '../components/BankAccountManagementModuleList';
import { BankAccountManagementModuleService } from '../services/BankAccountManagementModuleService';
import { BankAccount, BankAccountCreateRequest, BankAccountUpdateRequest } from '../types/BankAccountManagementModuleTypes';

export const BankAccountManagementModulePage: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBankAccount, setSelectedBankAccount] = useState<BankAccount | null>(null);

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const fetchBankAccounts = async () => {
    setLoading(true);
    try {
      const data = await BankAccountManagementModuleService.getAllBankAccounts();
      setBankAccounts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bank accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (request: BankAccountCreateRequest) => {
    setLoading(true);
    try {
      await BankAccountManagementModuleService.createBankAccount(request);
      await fetchBankAccounts();
      setError(null);
    } catch (err) {
      setError('Failed to create bank account');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, request: BankAccountUpdateRequest) => {
    setLoading(true);
    try {
      await BankAccountManagementModuleService.updateBankAccount(id, request);
      await fetchBankAccounts();
      setSelectedBankAccount(null);
      setError(null);
    } catch (err) {
      setError('Failed to update bank account');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await BankAccountManagementModuleService.deleteBankAccount(id);
      await fetchBankAccounts();
      setError(null);
    } catch (err) {
      setError('Failed to delete bank account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Bank Account Management</h1>
      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}
      
      <BankAccountManagementModuleForm
        onSubmit={selectedBankAccount ? (data) => handleUpdate(selectedBankAccount.id, data) : handleCreate}
        onCancel={() => setSelectedBankAccount(null)}
        initialData={selectedBankAccount}
      />
      
      <BankAccountManagementModuleList
        bankAccounts={bankAccounts}
        onEdit={setSelectedBankAccount}
        onDelete={handleDelete}
      />
    </div>
  );
};