const STATUS_STYLES = {
  Completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Processing: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  Cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
  Refunded: 'bg-slate-50 text-slate-600 ring-slate-500/20',
};

export default function Badge({ status }) {
  const styles = STATUS_STYLES[status] || STATUS_STYLES.Pending;

  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium
        ring-1 ring-inset whitespace-nowrap
        ${styles}
      `}
    >
      {status}
    </span>
  );
}
