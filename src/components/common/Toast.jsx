import { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => onClose?.(), 200);
  }, [onClose]);

  useEffect(() => {
    timerRef.current = setTimeout(dismiss, duration);
    return () => clearTimeout(timerRef.current);
  }, [dismiss, duration]);

  const bgColor = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-red-600' : 'bg-slate-700';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        fixed bottom-6 right-6 z-[100] flex items-center gap-2
        px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium
        transition-all duration-200
        ${bgColor}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
    >
      {type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
      <span>{message}</span>
      <button
        onClick={dismiss}
        className="ml-2 p-0.5 rounded hover:bg-white/20 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
