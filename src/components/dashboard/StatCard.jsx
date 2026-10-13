import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { formatStatValue, calcPercentChange } from '../../utils/formatters';

const ICON_MAP = {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
};

const ICON_COLORS = {
  DollarSign: 'bg-indigo-50 text-indigo-600',
  ShoppingCart: 'bg-blue-50 text-blue-600',
  Users: 'bg-violet-50 text-violet-600',
  TrendingUp: 'bg-emerald-50 text-emerald-600',
};

export default function StatCard({ stat }) {
  const Icon = ICON_MAP[stat.icon];
  const percentChange = calcPercentChange(stat.value, stat.previousValue);
  const isPositive = percentChange >= 0;
  const colorClass = ICON_COLORS[stat.icon] || 'bg-slate-50 text-slate-600';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 tracking-tight">
            {formatStatValue(stat.value, stat.format)}
          </p>
        </div>
        <div className={`p-2.5 rounded-lg ${colorClass}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-medium ${
            isPositive ? 'text-emerald-600' : 'text-red-600'
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5" />
          )}
          {Math.abs(percentChange).toFixed(1)}%
        </span>
        <span className="text-xs text-slate-400">{stat.description}</span>
      </div>
    </div>
  );
}
