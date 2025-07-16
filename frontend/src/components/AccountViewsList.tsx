/**
 * 🏗️  DEVELOPMENT GUIDE - Account Views List Component
 * 
 * 📋 Original Requirements: Generate React TSX components for: 1) BankOpenAccountView (account type selection and requirements display), 2) BankCloseAccountView (closure terms and confirmation), 3) BankViewAccountsView (account list rendering with balance formatting). Include TypeScript interfaces for UserBankAccount, BankAccountType, and Currency models. Also generate a service layer for API calls to corresponding controllers.
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
import { UserBankAccount, BankAccountType, Currency } from '../types/AccountViewsTypes';

interface AccountViewsListProps {
  data: UserBankAccount[];
  onEdit: (account: UserBankAccount) => void;
  onDelete: (accountId: string) => void;
}

const AccountViewsList: React.FC<AccountViewsListProps> = ({ data, onEdit, onDelete }) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'Account Number',
        accessorKey: 'accountNumber',
      },
      {
        header: 'Type',
        accessorKey: 'type',
        cell: (info: any) => info.getValue().name,
      },
      {
        header: 'Balance',
        accessorKey: 'balance',
        cell: (info: any) => `${info.getValue().amount} ${info.getValue().currency}`,
      },
      {
        header: 'Actions',
        cell: (info: any) => (
          <div>
            <button onClick={() => onEdit(info.row.original)}>Edit</button>
            <button onClick={() => onDelete(info.row.original.id)}>Delete</button>
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
                {header.isPlaceholder ? null : header.renderHeader()}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{cell.renderCell()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AccountViewsList;