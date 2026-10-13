import { useState, useEffect, useRef, useCallback } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingCart,
  Package,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  X,
  ChevronRight,
} from 'lucide-react';
import { NAV_ITEMS, NAV_BOTTOM_ITEMS, USER_PROFILE } from '../../data/dashboardData';
import { getInitials } from '../../utils/formatters';

const ICON_MAP = {
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingCart,
  Package,
  FileText,
  Settings,
  HelpCircle,
};

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  const sidebarRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function handleNavClick(id) {
    onNavigate(id);
    onClose();
  }

  const renderNavItem = (item) => {
    const Icon = ICON_MAP[item.icon];
    const isActive = activePage === item.id;

    return (
      <button
        key={item.id}
        onClick={() => handleNavClick(item.id)}
        className={`
          w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
          transition-colors duration-150 text-left
          ${
            isActive
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }
        `}
        aria-current={isActive ? 'page' : undefined}
      >
        {Icon && (
          <Icon
            className={`w-5 h-5 shrink-0 ${
              isActive ? 'text-indigo-600' : 'text-slate-400'
            }`}
          />
        )}
        <span>{item.label}</span>
        {isActive && (
          <ChevronRight className="w-4 h-4 ml-auto text-indigo-400" />
        )}
      </button>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full" ref={sidebarRef}>
      {/* Brand */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-lg font-semibold text-slate-900 tracking-tight">
            Nexa
          </span>
        </div>
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Main navigation">
        <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>
        {NAV_ITEMS.map(renderNavItem)}

        <div className="pt-6">
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Support
          </p>
          {NAV_BOTTOM_ITEMS.map(renderNavItem)}
        </div>
      </nav>

      {/* User section */}
      <div className="border-t border-slate-100 p-3">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-semibold">
            {getInitials(USER_PROFILE.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {USER_PROFILE.name}
            </p>
            <p className="text-xs text-slate-500 truncate">{USER_PROFILE.email}</p>
          </div>
          <LogOut className="w-4 h-4 text-slate-400 shrink-0" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-slate-200 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          lg:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Mobile navigation"
      >
        {sidebarContent}
      </aside>
    </>
  );
}
