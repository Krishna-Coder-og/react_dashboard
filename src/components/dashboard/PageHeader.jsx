import { useState } from 'react';
import { Calendar, Download } from 'lucide-react';
import Button from '../common/Button';
import { DATE_RANGES } from '../../data/dashboardData';

export default function PageHeader({ selectedRange, onRangeChange, onExport }) {
  const [rangeOpen, setRangeOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Welcome back, Sarah
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Here's what's happening with your business today.
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Date range selector */}
        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            icon={Calendar}
            onClick={() => setRangeOpen(!rangeOpen)}
            aria-expanded={rangeOpen}
            aria-haspopup="listbox"
          >
            <span className="hidden xs:inline">
              {DATE_RANGES.find((r) => r.id === selectedRange)?.label || 'Last 30 days'}
            </span>
            <span className="xs:hidden">
              {DATE_RANGES.find((r) => r.id === selectedRange)?.label || '30d'}
            </span>
          </Button>

          {rangeOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setRangeOpen(false)}
                aria-hidden="true"
              />
              <div
                className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20"
                role="listbox"
                aria-label="Select date range"
              >
                {DATE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    role="option"
                    aria-selected={selectedRange === range.id}
                    onClick={() => {
                      onRangeChange(range.id);
                      setRangeOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
                      selectedRange === range.id
                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Export button */}
        <Button variant="primary" size="sm" icon={Download} onClick={onExport}>
          Export
        </Button>
      </div>
    </div>
  );
}
