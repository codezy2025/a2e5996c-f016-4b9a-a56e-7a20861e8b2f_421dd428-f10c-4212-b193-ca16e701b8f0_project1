/**
 * 🏗️  DEVELOPMENT GUIDE - Account Views Page Component
 * 
 * 📋 Original Requirements: Generate React TSX components for: 1) BankOpenAccountView (account type selection and requirements display), 2) BankCloseAccountView (closure terms and confirmation), 3) BankViewAccountsView (account list rendering with balance formatting). Include TypeScript interfaces for UserBankAccount, BankAccountType, and Currency models. Also generate a service layer for API calls to corresponding controllers.
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
import { ViewsForm } from '../components/Account/ViewsForm';
import { ViewsList } from '../components/Account/ViewsList';
import { ViewsService } from '../services/Account/ViewsService';
import { AccountView, CreateAccountView, UpdateAccountView } from '../types/AccountViewsTypes';

const ViewsPage: React.FC = () => {
  const [views, setViews] = useState<AccountView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingView, setEditingView] = useState<AccountView | null>(null);

  useEffect(() => {
    fetchViews();
  }, []);

  const fetchViews = async () => {
    try {
      setLoading(true);
      const data = await ViewsService.getAll();
      setViews(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch views');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (viewData: CreateAccountView) => {
    try {
      setLoading(true);
      const newView = await ViewsService.create(viewData);
      setViews([...views, newView]);
      setError(null);
    } catch (err) {
      setError('Failed to create view');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, viewData: UpdateAccountView) => {
    try {
      setLoading(true);
      const updatedView = await ViewsService.update(id, viewData);
      setViews(views.map(view => view.id === id ? updatedView : view));
      setEditingView(null);
      setError(null);
    } catch (err) {
      setError('Failed to update view');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await ViewsService.delete(id);
      setViews(views.filter(view => view.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete view');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Account Views</h1>
      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}
      <ViewsForm 
        onSubmit={editingView ? (data) => handleUpdate(editingView.id, data) : handleCreate}
        initialData={editingView}
        onCancel={() => setEditingView(null)}
      />
      <ViewsList 
        views={views}
        onEdit={setEditingView}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ViewsPage;