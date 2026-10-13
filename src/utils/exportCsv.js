/**
 * CSV export utility for the Nexa Dashboard.
 * Generates a valid CSV from an array of objects and triggers a download.
 */

/**
 * Escape a value for CSV: wrap in quotes if it contains commas, quotes, or newlines.
 */
function escapeCsvValue(value) {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Convert an array of objects to a CSV string.
 * @param {Array<Object>} data - The data rows.
 * @param {Array<{key: string, header: string}>} columns - Column definitions.
 * @returns {string} The CSV content.
 */
export function generateCsv(data, columns) {
  const headerRow = columns.map((col) => escapeCsvValue(col.header)).join(',');
  const dataRows = data.map((row) =>
    columns.map((col) => escapeCsvValue(row[col.key])).join(',')
  );
  return [headerRow, ...dataRows].join('\n');
}

/**
 * Download a CSV string as a file.
 * @param {string} csvContent - The CSV content string.
 * @param {string} filename - The download filename.
 */
export function downloadCsv(csvContent, filename = 'export.csv') {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export order data to CSV.
 * @param {Array} orders - The orders to export.
 * @returns {{ success: boolean, count: number }}
 */
export function exportOrdersCsv(orders) {
  const columns = [
    { key: 'id', header: 'Order ID' },
    { key: 'customer', header: 'Customer' },
    { key: 'email', header: 'Email' },
    { key: 'product', header: 'Product' },
    { key: 'date', header: 'Date' },
    { key: 'amount', header: 'Amount' },
    { key: 'status', header: 'Status' },
  ];

  try {
    const csv = generateCsv(orders, columns);
    const date = new Date().toISOString().split('T')[0];
    downloadCsv(csv, `nexa-orders-${date}.csv`);
    return { success: true, count: orders.length };
  } catch {
    return { success: false, count: 0 };
  }
}
