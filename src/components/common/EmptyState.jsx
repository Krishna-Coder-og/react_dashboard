import { SearchX } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = 'No results found',
  description = 'Try adjusting your search or filters.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <SearchX className="w-6 h-6 text-slate-400" />
      </div>
      <h3 className="text-sm font-medium text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
