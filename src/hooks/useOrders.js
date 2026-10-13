import { useState, useMemo, useCallback } from 'react';
import { orders as allOrders } from '../data/orders';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20];
const DEFAULT_PAGE_SIZE = 10;

/**
 * Custom hook for managing orders with search, filter, sort, and pagination.
 */
export function useOrders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // Filter and search
  const filteredOrders = useMemo(() => {
    let result = [...allOrders];

    // Apply search
    const trimmedSearch = search.trim().toLowerCase();
    if (trimmedSearch) {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(trimmedSearch) ||
          order.customer.toLowerCase().includes(trimmedSearch) ||
          order.product.toLowerCase().includes(trimmedSearch)
      );
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter((order) => order.status === statusFilter);
    }

    return result;
  }, [search, statusFilter]);

  // Sort
  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders];
    const { key, direction } = sortConfig;

    sorted.sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];

      // Handle null/undefined
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      // Numeric comparison for amount
      if (key === 'amount') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      // Date comparison
      if (key === 'date') {
        const dateA = new Date(aVal);
        const dateB = new Date(bVal);
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // String comparison
      const strA = String(aVal).toLowerCase();
      const strB = String(bVal).toLowerCase();
      if (strA < strB) return direction === 'asc' ? -1 : 1;
      if (strA > strB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredOrders, sortConfig]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedOrders = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return sortedOrders.slice(start, start + pageSize);
  }, [sortedOrders, safePage, pageSize]);

  // Reset page when filters change
  const handleSearch = useCallback((value) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleStatusFilter = useCallback((status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages]
  );

  const handlePageSizeChange = useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setSearch('');
    setStatusFilter('All');
    setCurrentPage(1);
  }, []);

  const hasActiveFilters = search.trim() !== '' || statusFilter !== 'All';

  return {
    // Data
    orders: paginatedOrders,
    allFilteredOrders: sortedOrders,
    totalCount: allOrders.length,
    filteredCount: sortedOrders.length,

    // Search
    search,
    handleSearch,

    // Filter
    statusFilter,
    handleStatusFilter,
    hasActiveFilters,
    clearFilters,

    // Sort
    sortConfig,
    handleSort,

    // Pagination
    currentPage: safePage,
    totalPages,
    pageSize,
    pageSizeOptions: ITEMS_PER_PAGE_OPTIONS,
    handlePageChange,
    handlePageSizeChange,
  };
}
