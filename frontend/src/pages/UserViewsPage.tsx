/**
 * 🏗️  DEVELOPMENT GUIDE - User Views Page Component
 * 
 * 📋 Original Requirements: Generate React TSX files for a banking application's user views module, including: 1) Login form with validation and error display, 2) Registration form with progress indication, 3) Profile display view, 4) Profile editor with validation. Use TypeScript interfaces for the User model (username, password, firstName, lastName, phoneNumber, address, email). Include responsive design and security considerations like input sanitization and password masking.
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
import { UserViewsForm } from '../components/UserViewsForm';
import { UserViewsList } from '../components/UserViewsList';
import { UserViewsService } from '../services/UserViewsService';
import { UserView, UserViewCreate, UserViewUpdate } from '../types/UserViewsTypes';

export const UserViewsPage: React.FC = () => {
  const [views, setViews] = useState<UserView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingView, setEditingView] = useState<UserView | null>(null);

  useEffect(() => {
    fetchViews();
  }, []);

  const fetchViews = async () => {
    try {
      setLoading(true);
      const data = await UserViewsService.getAll();
      setViews(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch views');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (viewData: UserViewCreate) => {
    try {
      const newView = await UserViewsService.create(viewData);
      setViews([...views, newView]);
    } catch (err) {
      setError('Failed to create view');
    }
  };

  const handleUpdate = async (id: string, viewData: UserViewUpdate) => {
    try {
      const updatedView = await UserViewsService.update(id, viewData);
      setViews(views.map(view => view.id === id ? updatedView : view));
      setEditingView(null);
    } catch (err) {
      setError('Failed to update view');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await UserViewsService.delete(id);
      setViews(views.filter(view => view.id !== id));
    } catch (err) {
      setError('Failed to delete view');
    }
  };

  const handleEdit = (view: UserView) => {
    setEditingView(view);
  };

  return (
    <div>
      <h1>User Views</h1>
      {error && <div className="error">{error}</div>}
      <UserViewsForm 
        onSubmit={editingView ? (data) => handleUpdate(editingView.id, data) : handleCreate}
        initialData={editingView}
        onCancel={() => setEditingView(null)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <UserViewsList 
          views={views} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};