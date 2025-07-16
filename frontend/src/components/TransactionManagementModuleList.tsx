/**
 * 🏗️  DEVELOPMENT GUIDE - Transaction Management Module List Component
 * 
 * 📋 Original Requirements: Generate React TSX components for a banking transaction system including: 1) A form for deposit/withdrawal/transfer operations with validation, 2) A paginated transaction list, 3) API service layer matching the documented endpoints, 4) Type definitions for transactions and responses, 5) A main page layout combining these components
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
import { Transaction, TransactionResponse } from '../types/TransactionManagementModuleTypes';

interface TransactionManagementModuleListProps {
  data: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionManagementModuleList: React.FC<TransactionManagementModuleListProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Type',
        accessorKey: 'type',
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
      },
      {
        header: 'Account',
        accessorKey: 'accountNumber',
      },
      {
        header: 'Date',
        accessorKey: 'date',
      },
      {
        header: 'Actions',
        cell: ({ row }: { row: { original: Transaction } }) => (
          <div>
            <button onClick={() => onEdit(row.original)}>Edit</button>
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
                {header.renderHeader()}
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

export default TransactionManagementModuleList;