# React Dashboard — Technical Assessment Submission

A responsive SaaS dashboard built with React, Vite, Tailwind CSS, Lucide React, and Recharts. This project was developed as a technical evaluation to demonstrate frontend architecture, component reusability, responsive design, and state management.

- **Live Demo**: [https://react-dashboard-psi-ten.vercel.app/](https://react-dashboard-psi-ten.vercel.app/)
- **Repository**: [https://github.com/Krishna-Coder-og/react_dashboard](https://github.com/Krishna-Coder-og/react_dashboard)

---

## Overview

The application is an analytics and operations dashboard named **Nexa Dashboard**. It provides an overview of business performance metrics, an interactive revenue trend visualization, and a customer order management table with client-side search, filtering, multi-column sorting, pagination, and CSV data export.

All metrics, records, and notifications are powered by realistic static sample data. No external backend, database, or paid APIs are required.

---

## Key Features

- **Responsive Navigation**: Persistent desktop sidebar (`lg+`) and an accessible mobile off-canvas drawer (`<lg`) with backdrop overlay, scroll lock, and `Escape` key dismissal.
- **Top Header**: Active route indicator, search shortcut indicator, notification popover with unread counter, and an interactive user profile dropdown.
- **KPI Statistic Cards**: Four primary business metrics (Total Revenue, Total Orders, Total Customers, Conversion Rate) displaying formatted numbers, trend percentages, and visual indicators.
- **Revenue Analytics Chart**: Responsive 12-month area chart built with Recharts featuring custom tooltips and gradient styling.
- **Data Table**:
  - 20 realistic sample orders with customer avatars, dates, amounts, and color-coded status badges.
  - Real-time client-side search matching Order ID, Customer name, and Product.
  - Status filtering with support for combined search and filter queries.
  - Multi-column sorting (Customer, Date, Amount) in ascending and descending order.
  - Client-side pagination with selectable page sizes (5, 10, 20 rows per page).
  - Row action menus with options to copy Order ID to clipboard and download record details.
  - Empty-state handling with a one-click filter reset.
- **Data Export**: RFC 4180-compliant CSV export utility that generates and downloads a CSV file respecting active search and filter conditions, complete with toast notification feedback.

---

## Tech Stack

- **Framework**: React 19 (Functional components, React Hooks)
- **Tooling**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Charts**: Recharts 3
- **Typography**: Inter (Google Fonts)

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd upwork
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local Vite development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173/`.

### Production Build

Create an optimized production bundle:

```bash
npm run build
```

To locally preview the production build:

```bash
npm run preview
```

---

## Project Structure

```text
src/
├── components/
│   ├── common/           # Reusable UI primitives (Button, Badge, Toast, EmptyState)
│   ├── dashboard/        # Dashboard widgets (StatsGrid, RevenueChart, RecentOrdersTable, etc.)
│   └── layout/           # Application layout (AppLayout, Sidebar, Header)
├── data/
│   ├── dashboardData.js  # Navigation, KPI statistics, chart data, notifications
│   └── orders.js         # Sample order records and status constants
├── hooks/
│   └── useOrders.js      # Custom hook managing search, filter, sort, and pagination
├── pages/
│   ├── OverviewPage.jsx  # Main dashboard overview view
│   ├── AnalyticsPage.jsx # Analytics view placeholder
│   ├── CustomersPage.jsx # Customers view placeholder
│   └── SettingsPage.jsx  # Settings view placeholder
├── utils/
│   ├── exportCsv.js      # CSV generation and download helper
│   └── formatters.js     # Currency, number, date, and name initial formatters
├── App.jsx               # Root application component with view routing
├── index.css             # Tailwind CSS entry point
└── main.jsx              # DOM entry point
```

---

## Deployment

The project is structured for immediate static deployment. Pre-configured routing files are included:
- `vercel.json` for Vercel SPA routing.
- `netlify.toml` for Netlify build commands and redirects.

### Deploying to Vercel
1. Import the repository into the Vercel dashboard.
2. Vercel automatically detects the Vite preset:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**.

### Deploying to Netlify
1. Import the repository into the Netlify dashboard.
2. The included `netlify.toml` automatically applies the build command and publish directory.
3. Click **Deploy**.
#
