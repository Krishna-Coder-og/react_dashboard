import { Search, X, Filter } from 'lucide-react';
import Button from '../common/Button';
import { ORDER_STATUSES } from '../../data/orders';

export default function TableToolbar({
  search,
  onSearch,
  statusFilter,
  onStatusFilter,
  hasActiveFilters,
  onClearFilters,
  filteredCount,
  totalCount,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
            transition-colors"
          aria-label="Search orders by ID, customer, or product"
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilter(e.target.value)}
            className="text-sm rounded-lg border border-slate-200 bg-white text-slate-700 px-2.5 py-2
              focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
              transition-colors cursor-pointer"
            aria-label="Filter by status"
          >
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status === 'All' ? 'All statuses' : status}
              </option>
            ))}
          </select>
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear filters
          </Button>
        )}

        {/* Results count */}
        <span className="text-xs text-slate-500 ml-auto sm:ml-0">
          {filteredCount === totalCount
            ? `${totalCount} orders`
            : `${filteredCount} of ${totalCount} orders`}
        </span>
      </div>
    </div>
  );
}
