import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ToastContext, type Toast, type ToastVariant } from '../hooks/useToast';
import { AlertTriangleMiniIcon, CheckIcon, InfoIcon, XIcon } from './ui/icons';

// --- Defaults ------------------------------------------------------------

const AUTO_DISMISS_MS = 3200;
const MAX_TOASTS = 4;

// --- Provider -----------------------------------------------------------

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Clean up all pending timers when the provider unmounts (e.g. HMR).
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (message: string, variant: ToastVariant = 'info') => {
      const id = crypto.randomUUID();
      setToasts((current) => {
        const next = [...current, { id, message, variant }];
        // If we exceed the cap, evict the oldest and clear its pending
        // auto-dismiss timer so it doesn't fire on a now-removed toast.
        if (next.length > MAX_TOASTS) {
          const evicted = next.slice(0, next.length - MAX_TOASTS);
          for (const t of evicted) {
            const timer = timersRef.current.get(t.id);
            if (timer) {
              clearTimeout(timer);
              timersRef.current.delete(t.id);
            }
          }
        }
        return next.slice(-MAX_TOASTS);
      });
      const timer = setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
      timersRef.current.set(id, timer);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// --- Viewport ------------------------------------------------------------

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-4 inset-x-0 z-[100] flex flex-col items-center gap-2 px-4 pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

// --- Item ----------------------------------------------------------------

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const palette = getPalette(toast.variant);

  return (
    <div
      role="status"
      className={`pointer-events-auto toast-enter max-w-sm w-full flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl ${palette.bg} ${palette.border}`}
      onClick={() => onDismiss(toast.id)}
    >
      <span
        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${palette.iconWrap}`}
      >
        {getIcon(toast.variant)}
      </span>
      <span className="flex-1 text-sm font-medium text-white drop-shadow">{toast.message}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDismiss(toast.id);
        }}
        className="flex-shrink-0 text-white/40 hover:text-white/90 transition-colors"
        aria-label="Dismiss notification"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

// --- Helpers -------------------------------------------------------------

function getPalette(variant: ToastVariant) {
  switch (variant) {
    case 'success':
      return {
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-400/40',
        iconWrap: 'bg-emerald-400/30 text-emerald-100',
      };
    case 'error':
      return {
        bg: 'bg-rose-500/20',
        border: 'border-rose-400/40',
        iconWrap: 'bg-rose-400/30 text-rose-100',
      };
    default:
      return {
        bg: 'bg-white/10',
        border: 'border-white/20',
        iconWrap: 'bg-white/15 text-white/80',
      };
  }
}

function getIcon(variant: ToastVariant) {
  if (variant === 'success') {
    return <CheckIcon className="w-3.5 h-3.5" strokeWidth={3} />;
  }
  if (variant === 'error') {
    return <AlertTriangleMiniIcon className="w-3.5 h-3.5" strokeWidth={3} />;
  }
  return <InfoIcon className="w-3.5 h-3.5" strokeWidth={3} />;
}
