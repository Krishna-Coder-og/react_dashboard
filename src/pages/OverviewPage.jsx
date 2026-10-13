import { useState, useCallback } from 'react';
import PageHeader from '../components/dashboard/PageHeader';
import StatsGrid from '../components/dashboard/StatsGrid';
import RevenueChart from '../components/dashboard/RevenueChart';
import TableToolbar from '../components/dashboard/TableToolbar';
import RecentOrdersTable from '../components/dashboard/RecentOrdersTable';
import Pagination from '../components/dashboard/Pagination';
import Toast from '../components/common/Toast';
import { useOrders } from '../hooks/useOrders';
import { exportOrdersCsv } from '../utils/exportCsv';

export default function OverviewPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [toast, setToast] = useState(null);

  const {
    orders,
    allFilteredOrders,
    totalCount,
    filteredCount,
    search,
    handleSearch,
    statusFilter,
    handleStatusFilter,
    hasActiveFilters,
    clearFilters,
    sortConfig,
    handleSort,
    currentPage,
    totalPages,
    pageSize,
    pageSizeOptions,
    handlePageChange,
    handlePageSizeChange,
  } = useOrders();

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleExport = useCallback(() => {
    const result = exportOrdersCsv(allFilteredOrders);
    if (result.success) {
      showToast(`Exported ${result.count} orders to CSV`);
    } else {
      showToast('Failed to export orders', 'error');
    }
  }, [allFilteredOrders, showToast]);

  return (
    <div className="space-y-6">
      <PageHeader
        selectedRange={dateRange}
        onRangeChange={setDateRange}
        onExport={handleExport}
      />

      <StatsGrid />

      <RevenueChart />

      {/* Orders section */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Recent Orders</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            A list of recent orders across all products
          </p>
        </div>

        <TableToolbar
          search={search}
          onSearch={handleSearch}
          statusFilter={statusFilter}
          onStatusFilter={handleStatusFilter}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
          filteredCount={filteredCount}
          totalCount={totalCount}
        />

        <RecentOrdersTable
          orders={orders}
          sortConfig={sortConfig}
          onSort={handleSort}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
          onToast={showToast}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          filteredCount={filteredCount}
        />
      </div>

      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
