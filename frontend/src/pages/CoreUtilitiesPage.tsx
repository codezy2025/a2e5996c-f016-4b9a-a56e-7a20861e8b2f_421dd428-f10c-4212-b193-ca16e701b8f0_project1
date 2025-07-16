/**
 * 🏗️  DEVELOPMENT GUIDE - Core Utilities Page Component
 * 
 * 📋 Original Requirements: Create React/TypeScript implementations for the following banking core utilities: 1) Currency formatting, 2) Input validation, 3) Error handling with user-friendly messages, and 4) Activity logging. Include proper TypeScript interfaces and React hooks where applicable.
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
import { CoreUtilitiesForm } from '../components/CoreUtilitiesForm';
import { CoreUtilitiesList } from '../components/CoreUtilitiesList';
import { UtilitiesService } from '../services/UtilitiesService';
import { CoreUtility } from '../types/CoreUtilitiesTypes';

export const UtilitiesPage: React.FC = () => {
  const [utilities, setUtilities] = useState<CoreUtility[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUtility, setCurrentUtility] = useState<CoreUtility | null>(null);

  useEffect(() => {
    fetchUtilities();
  }, []);

  const fetchUtilities = async () => {
    try {
      setLoading(true);
      const data = await UtilitiesService.getAll();
      setUtilities(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch utilities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (utility: CoreUtility) => {
    try {
      setLoading(true);
      await UtilitiesService.create(utility);
      await fetchUtilities();
    } catch (err) {
      setError('Failed to create utility');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (utility: CoreUtility) => {
    try {
      setLoading(true);
      await UtilitiesService.update(utility.id, utility);
      await fetchUtilities();
      setCurrentUtility(null);
    } catch (err) {
      setError('Failed to update utility');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await UtilitiesService.delete(id);
      await fetchUtilities();
    } catch (err) {
      setError('Failed to delete utility');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (utility: CoreUtility) => {
    setCurrentUtility(utility);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <CoreUtilitiesForm
        onSubmit={currentUtility ? handleUpdate : handleCreate}
        initialData={currentUtility}
      />
      <CoreUtilitiesList
        utilities={utilities}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};