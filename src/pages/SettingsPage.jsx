import { Settings, Construction } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
        <Settings className="w-7 h-7 text-slate-600" />
      </div>
      <h2 className="text-lg font-semibold text-slate-900 mb-2">Settings</h2>
      <p className="text-sm text-slate-500 max-w-md">
        Configure your account preferences, notifications, integrations,
        and team settings from this section.
      </p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
        <Construction className="w-3.5 h-3.5" />
        Coming soon
      </div>
    </div>
  );
}
