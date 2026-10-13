import { useState, useRef, useEffect } from 'react';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Eye,
  Copy,
  Download,
} from 'lucide-react';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { formatCurrency, formatDate, getInitials } from '../../utils/formatters';

const SORTABLE_COLUMNS = ['customer', 'date', 'amount'];

function SortIcon({ columnKey, sortConfig }) {
  if (sortConfig.key !== columnKey) {
    return <ArrowUpDown className="w-3.5 h-3.5 text-slate-300" />;
  }
  return sortConfig.direction === 'asc' ? (
    <ArrowUp className="w-3.5 h-3.5 text-indigo-600" />
  ) : (
    <ArrowDown className="w-3.5 h-3.5 text-indigo-600" />
  );
}

function RowActions({ order, onToast }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(order.id).then(() => {
      onToast?.(`Copied ${order.id} to clipboard`);
    }).catch(() => {
      onToast?.(`Order ID: ${order.id}`, 'error');
    });
    setOpen(false);
  }

  function handleExportRow() {
    const text = `Order: ${order.id}\nCustomer: ${order.customer}\nProduct: ${order.product}\nDate: ${order.date}\nAmount: $${order.amount}\nStatus: ${order.status}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onToast?.(`Downloaded ${order.id} details`);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        aria-label={`Actions for order ${order.id}`}
        aria-expanded={open}
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-30">
          <button
            onClick={() => {
              onToast?.(`Viewing details for ${order.id}`);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            View details
          </button>
          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            Copy order ID
          </button>
          <button
            onClick={handleExportRow}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            Download details
          </button>
        </div>
      )}
    </div>
  );
}

export default function RecentOrdersTable({
  orders,
  sortConfig,
  onSort,
  hasActiveFilters,
  onClearFilters,
  onToast,
}) {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="No matching orders"
        description="Try adjusting your search or filter criteria to find what you're looking for."
        actionLabel={hasActiveFilters ? 'Clear all filters' : undefined}
        onAction={hasActiveFilters ? onClearFilters : undefined}
      />
    );
  }

  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3 pr-4">
              Order
            </th>
            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3 pr-4">
              <button
                onClick={() => onSort('customer')}
                className="inline-flex items-center gap-1 hover:text-slate-700 transition-colors"
                aria-label="Sort by customer"
              >
                Customer
                <SortIcon columnKey="customer" sortConfig={sortConfig} />
              </button>
            </th>
            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3 pr-4 hidden md:table-cell">
              Product
            </th>
            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3 pr-4">
              <button
                onClick={() => onSort('date')}
                className="inline-flex items-center gap-1 hover:text-slate-700 transition-colors"
                aria-label="Sort by date"
              >
                Date
                <SortIcon columnKey="date" sortConfig={sortConfig} />
              </button>
            </th>
            <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider pb-3 pr-4">
              <button
                onClick={() => onSort('amount')}
                className="inline-flex items-center gap-1 hover:text-slate-700 transition-colors ml-auto"
                aria-label="Sort by amount"
              >
                Amount
                <SortIcon columnKey="amount" sortConfig={sortConfig} />
              </button>
            </th>
            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3 pr-4">
              Status
            </th>
            <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider pb-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
            >
              <td className="py-3 pr-4">
                <span className="text-sm font-medium text-slate-900">
                  {order.id}
                </span>
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-[10px] font-semibold shrink-0">
                    {getInitials(order.customer)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {order.customer}
                    </p>
                    <p className="text-xs text-slate-500 truncate hidden sm:block">
                      {order.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4 hidden md:table-cell">
                <span className="text-sm text-slate-600">{order.product}</span>
              </td>
              <td className="py-3 pr-4">
                <span className="text-sm text-slate-600 whitespace-nowrap">
                  {formatDate(order.date)}
                </span>
              </td>
              <td className="py-3 pr-4 text-right">
                <span className="text-sm font-medium text-slate-900 whitespace-nowrap">
                  {formatCurrency(order.amount)}
                </span>
              </td>
              <td className="py-3 pr-4">
                <Badge status={order.status} />
              </td>
              <td className="py-3 text-right">
                <RowActions order={order} onToast={onToast} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
