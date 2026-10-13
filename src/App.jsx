import { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import OverviewPage from './pages/OverviewPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CustomersPage from './pages/CustomersPage';
import SettingsPage from './pages/SettingsPage';

const PAGES = {
  overview: OverviewPage,
  analytics: AnalyticsPage,
  customers: CustomersPage,
  settings: SettingsPage,
};

/**
 * Placeholder page for sections that don't have a dedicated page.
 */
function PlaceholderPage({ pageId }) {
  const labels = {
    orders: 'Orders',
    products: 'Products',
    reports: 'Reports',
    help: 'Help & Support',
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
        <span className="text-xl font-bold text-slate-400">
          {(labels[pageId] || pageId)[0]?.toUpperCase()}
        </span>
      </div>
      <h2 className="text-lg font-semibold text-slate-900 mb-2">
        {labels[pageId] || pageId}
      </h2>
      <p className="text-sm text-slate-500 max-w-md">
        This section is currently being developed.
      </p>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('overview');

  const PageComponent = PAGES[activePage];

  return (
    <AppLayout activePage={activePage} onNavigate={setActivePage}>
      {PageComponent ? (
        <PageComponent />
      ) : (
        <PlaceholderPage pageId={activePage} />
      )}
    </AppLayout>
  );
}
