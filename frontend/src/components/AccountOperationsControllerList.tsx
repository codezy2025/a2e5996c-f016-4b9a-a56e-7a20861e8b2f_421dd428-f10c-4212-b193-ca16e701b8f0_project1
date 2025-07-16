/**
 * 🏗️  DEVELOPMENT GUIDE - Account Operations Controller List Component
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking account management system that interfaces with the AccountOperationsController backend. Include: 1) A form for opening new accounts with validation, 2) A form for closing accounts with ownership verification, 3) A list view for displaying user accounts with sorting capabilities, 4) Service functions for API calls, and 5) Type definitions matching the backend models.
 * 
 * 🚀 Enhancement Ideas:
 * - Add search/filter functionality
 * - Implement sorting for all columns
 * - Add bulk operations (delete, update status)
 * - Include export functionality (CSV, PDF)
 * - Add infinite scrolling or virtual scrolling
 * - Implement row selection with checkboxes
 * 
 * 💡 Props to Consider Adding:
 * - searchTerm?: string
 * - filters?: Record<string, any>
 * - sortConfig?: { key: string, direction: 'asc' | 'desc' }
 * - isLoading?: boolean
 * - onBulkAction?: (action: string, ids: string[]) => void
 * 
 * 🔧 Libraries to Consider:
 * - @tanstack/react-table for advanced features
 * - react-window for virtualization
 * - fuse.js for fuzzy search
 */

import React from 'react';
import { useTable } from '@tanstack/react-table';
import { AccountOperation, AccountOperationsControllerTypes } from '../types/AccountOperationsControllerTypes';

interface AccountOperationsControllerListProps {
  data: AccountOperation[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const AccountOperationsControllerList: React.FC<AccountOperationsControllerListProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'Account ID',
        accessorKey: 'accountId',
      },
      {
        header: 'Operation Type',
        accessorKey: 'operationType',
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
      },
      {
        header: 'Timestamp',
        accessorKey: 'timestamp',
      },
      {
        header: 'Actions',
        cell: ({ row }: { row: { original: AccountOperation } }) => (
          <div>
            <button onClick={() => onEdit(row.original.id)}>Edit</button>
            <button onClick={() => onDelete(row.original.id)}>Delete</button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const table = useTable({
    data,
    columns,
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : header.renderHeader()}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {cell.renderCell()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AccountOperationsControllerList;