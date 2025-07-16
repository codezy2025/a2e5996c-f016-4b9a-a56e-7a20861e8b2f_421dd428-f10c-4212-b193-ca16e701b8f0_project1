/**
 * 🏗️  DEVELOPMENT GUIDE - User Operations Controller List Component
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking application's user operations including: 1) Login/Registration forms with validation, 2) Profile management interface, 3) Session timeout handling, 4) Menu navigation matching the workflow diagram, and 5) Error handling displays. Include TypeScript interfaces for the User model and API response types.
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
import { UserOperation, UserOperationsControllerProps } from '../types/User Operations ControllerTypes';

const UserOperationsControllerList: React.FC<UserOperationsControllerProps> = ({ 
  data, 
  onEdit, 
  onDelete 
}) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'Operation',
        accessorKey: 'operation',
      },
      {
        header: 'Status',
        accessorKey: 'status',
      },
      {
        header: 'Timestamp',
        accessorKey: 'timestamp',
      },
      {
        header: 'Actions',
        cell: ({ row }: { row: { original: UserOperation } }) => (
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(row.original)}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(row.original.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
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
    <div className="p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOperationsControllerList;