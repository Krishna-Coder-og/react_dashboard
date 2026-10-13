import { BarChart3, Construction } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
        <BarChart3 className="w-7 h-7 text-indigo-600" />
      </div>
      <h2 className="text-lg font-semibold text-slate-900 mb-2">Analytics</h2>
      <p className="text-sm text-slate-500 max-w-md">
        Detailed analytics and performance insights will be available here.
        This section provides in-depth data visualizations and trend analysis.
      </p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
        <Construction className="w-3.5 h-3.5" />
        Coming soon
      </div>
    </div>
  );
}
