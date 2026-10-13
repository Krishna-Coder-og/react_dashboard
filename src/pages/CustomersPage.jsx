import { Users, Construction } from 'lucide-react';

export default function CustomersPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-5">
        <Users className="w-7 h-7 text-violet-600" />
      </div>
      <h2 className="text-lg font-semibold text-slate-900 mb-2">Customers</h2>
      <p className="text-sm text-slate-500 max-w-md">
        Manage your customer database, view customer profiles, and track
        engagement metrics from this section.
      </p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
        <Construction className="w-3.5 h-3.5" />
        Coming soon
      </div>
    </div>
  );
}
