/**
 * Dashboard static data for the Nexa Dashboard SaaS application.
 * All values are sample data for demonstration purposes.
 */

export const STATS = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: 284520,
    previousValue: 251340,
    format: 'currency',
    icon: 'DollarSign',
    description: 'Last 30 days',
  },
  {
    id: 'orders',
    label: 'Total Orders',
    value: 1847,
    previousValue: 1654,
    format: 'number',
    icon: 'ShoppingCart',
    description: 'Last 30 days',
  },
  {
    id: 'customers',
    label: 'Total Customers',
    value: 12493,
    previousValue: 11802,
    format: 'number',
    icon: 'Users',
    description: 'Active accounts',
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: 3.24,
    previousValue: 2.87,
    format: 'percentage',
    icon: 'TrendingUp',
    description: 'Visitor to customer',
  },
];

export const REVENUE_CHART_DATA = [
  { month: 'Jan', revenue: 18200, orders: 142 },
  { month: 'Feb', revenue: 21400, orders: 168 },
  { month: 'Mar', revenue: 19800, orders: 155 },
  { month: 'Apr', revenue: 24600, orders: 192 },
  { month: 'May', revenue: 28100, orders: 219 },
  { month: 'Jun', revenue: 25300, orders: 198 },
  { month: 'Jul', revenue: 31200, orders: 244 },
  { month: 'Aug', revenue: 29700, orders: 232 },
  { month: 'Sep', revenue: 33400, orders: 261 },
  { month: 'Oct', revenue: 35800, orders: 280 },
  { month: 'Nov', revenue: 32100, orders: 251 },
  { month: 'Dec', revenue: 38900, orders: 304 },
];

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
  { id: 'customers', label: 'Customers', icon: 'Users' },
  { id: 'orders', label: 'Orders', icon: 'ShoppingCart' },
  { id: 'products', label: 'Products', icon: 'Package' },
  { id: 'reports', label: 'Reports', icon: 'FileText' },
];

export const NAV_BOTTOM_ITEMS = [
  { id: 'settings', label: 'Settings', icon: 'Settings' },
  { id: 'help', label: 'Help & Support', icon: 'HelpCircle' },
];

export const USER_PROFILE = {
  name: 'Sarah Mitchell',
  email: 'sarah.mitchell@nexa.io',
  role: 'Admin',
  avatar: null,
};

export const NOTIFICATIONS = [
  {
    id: 1,
    title: 'New order received',
    description: 'Order #ORD-1260 from James Wilson for $249.00',
    time: '5 min ago',
    read: false,
  },
  {
    id: 2,
    title: 'Payment confirmed',
    description: 'Payment for order #ORD-1258 has been confirmed',
    time: '23 min ago',
    read: false,
  },
  {
    id: 3,
    title: 'Customer feedback',
    description: 'New 5-star review from Emily Chen',
    time: '1 hour ago',
    read: true,
  },
  {
    id: 4,
    title: 'Low stock alert',
    description: 'Premium Plan licenses are running low (3 remaining)',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 5,
    title: 'Monthly report ready',
    description: 'September 2026 analytics report is available',
    time: '5 hours ago',
    read: true,
  },
];

export const DATE_RANGES = [
  { id: 'today', label: 'Today' },
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: '90d', label: 'Last 90 days' },
  { id: '12m', label: 'Last 12 months' },
];
