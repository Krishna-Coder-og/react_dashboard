# Nexa Dashboard — Modern SaaS Analytics Platform

A high-performance, responsive SaaS administration dashboard built with **React**, **Vite**, **Tailwind CSS v4**, **Lucide React**, and **Recharts**.

Designed with a modern commercial SaaS aesthetic: minimalist layout, refined typography, subtle borders and shadows, fluid responsiveness across all screen sizes, and rich client-side interactivity.

---

## 🚀 Features

- **Responsive Navigation**:
  - Persistent, fixed sidebar on desktop viewports (`lg+`).
  - Animated off-canvas drawer navigation on mobile/tablet viewports (`<lg`).
  - Accessible backdrop overlay, auto-closing on link selection, backdrop click, or pressing `Escape`.
  - Body scroll lock while mobile navigation drawer is active.
- **Top Header & Global Controls**:
  - Context-aware page title reflecting active section.
  - Interactive notification bell with unread badge counter and popover menu.
  - User profile avatar dropdown with account management options and sign-out action.
  - Keyboard search hint shortcut (`⌘K`).
- **Interactive KPI Statistic Cards**:
  - Four key metric cards: **Total Revenue**, **Total Orders**, **Total Customers**, and **Conversion Rate**.
  - Formatted metrics (USD currency, locale numbers, percentages).
  - Positive/negative trend indicators with percentage comparisons against previous periods.
- **Revenue Overview Chart**:
  - Smooth area chart built with **Recharts** displaying 12-month revenue progression.
  - Responsive container adapting fluidly to parent grid resizes.
  - Custom branded hover tooltips displaying formatted values and order counts.
- **Advanced Data Table (Recent Orders)**:
  - 20 realistic sample order records.
  - **Instant Client-Side Search**: Case-insensitive filtering across Order ID, Customer name, and Product name.
  - **Status Filter**: Dynamic filtering by status (`All`, `Completed`, `Pending`, `Processing`, `Cancelled`, `Refunded`).
  - **Multi-Column Sorting**: Sort ascending and descending by Customer, Date, or Amount.
  - **Pagination Controls**: Configurable page sizes (5, 10, 20 items per page), page number buttons, previous/next controls, and dynamic range counters.
  - **Row Action Menu**: Interactive kebab menu per row with options to copy Order ID to clipboard and download plaintext order details.
  - **Empty States**: Clear messaging when search or filters return no results, including a one-click "Clear all filters" action.
- **Data Export (CSV)**:
  - Generates RFC 4180-compliant CSV files respecting currently active filters and search terms.
  - Correctly escapes quotes, commas, and line breaks.
  - Provides instant feedback via auto-dismissing toast notifications.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) (Functional components, React Hooks)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Visualization**: [Recharts 3](https://recharts.org/)
- **Fonts**: Inter via Google Fonts

---

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later

---

## 📦 Installation & Quickstart

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd nexa-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-optimized static assets will be output to the `dist/` folder.

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```text
nexa-dashboard/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── common/         # Generic reusable UI primitives
│   │   │   ├── Badge.jsx          # Color-coded status badges
│   │   │   ├── Button.jsx         # Styled button with variants and icons
│   │   │   ├── EmptyState.jsx     # Zero-data feedback placeholder
│   │   │   └── Toast.jsx          # Auto-dismissing status notifications
│   │   ├── dashboard/      # Domain-specific dashboard widgets
│   │   │   ├── PageHeader.jsx     # Welcome banner, date range selector & export
│   │   │   ├── Pagination.jsx     # Table page controls & page size selector
│   │   │   ├── RecentOrdersTable.jsx # Orders table with sorting & row actions
│   │   │   ├── RevenueChart.jsx   # Area chart data visualization
│   │   │   ├── StatCard.jsx       # Individual metric card
│   │   │   ├── StatsGrid.jsx      # Responsive 4-column metric grid
│   │   │   └── TableToolbar.jsx   # Search input & status filter dropdown
│   │   └── layout/         # Application shell layout
│   │       ├── AppLayout.jsx      # Responsive container coordinating layout
│   │       ├── Header.jsx         # Top navbar with notifications & profile
│   │       └── Sidebar.jsx        # Desktop sidebar & mobile drawer navigation
│   ├── data/               # Static sample datasets
│   │   ├── dashboardData.js       # KPI metrics, chart figures, navigation items
│   │   └── orders.js              # 20 realistic sample order records
│   ├── hooks/              # Custom React hooks
│   │   └── useOrders.js           # Search, filter, sort & pagination state
│   ├── pages/              # View pages
│   │   ├── AnalyticsPage.jsx      # Analytics view
│   │   ├── CustomersPage.jsx      # Customers view
│   │   ├── OverviewPage.jsx       # Main dashboard overview
│   │   └── SettingsPage.jsx       # Settings view
│   ├── utils/              # Utility helpers
│   │   ├── exportCsv.js           # Escaped RFC 4180 CSV export generator
│   │   └── formatters.js          # Currency, date, percentage & name initial helpers
│   ├── App.jsx             # Root component with client-side view router
│   ├── index.css           # Tailwind CSS imports & global baseline styling
│   └── main.jsx            # Application entry point
├── index.html              # HTML template with metadata & Google Fonts
├── netlify.toml            # Netlify deployment & SPA redirect configuration
├── package.json            # Scripts & project dependencies
├── vercel.json             # Vercel deployment & SPA rewrite configuration
├── vite.config.js          # Vite build configuration
└── README.md               # Project documentation
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel

#### Option 1: Via Vercel Web Dashboard (Recommended)
1. Push your code to a GitHub / GitLab / Bitbucket repository.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** → **"Project"**.
4. Import your repository.
5. Vercel automatically detects **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**. Vercel will build and assign a live production URL.

#### Option 2: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
# Follow prompts; for production deployment:
vercel --prod
```

---

### Deploy to Netlify

#### Option 1: Via Netlify Web Dashboard
1. Push your code to GitHub.
2. Log into [netlify.com](https://netlify.com).
3. Click **"Add new site"** → **"Import an existing project"**.
4. Connect your Git provider and select the repository.
5. The included `netlify.toml` automatically configures:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Redirects**: `/*` to `/index.html` (Status 200)
6. Click **Deploy site**.

#### Option 2: Via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## ℹ️ Notice on Data

All data shown in this dashboard (revenue figures, order histories, customer profiles, and notifications) is **static sample data** bundled locally inside `src/data/` for portfolio and client demonstration purposes. No external network requests, databases, or paid APIs are required.
