import React from 'react';
import { Check, AlertTriangle, Info, X } from 'lucide-react';
import { useVisitors } from '../../context/VisitorContext.jsx';

export const ToastContainer = () => {
  const { toasts, removeToast } = useVisitors();

  if (toasts.length === 0) return null;

  return (
    <div aria-live="polite" aria-atomic="true" className="toast-container">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const typeClass = isSuccess ? 'success' : isError ? 'error' : 'info';

        return (
          <div key={toast.id} role="status" className={`toast ${typeClass}`}>
            <div className="toast-icon-wrapper">
              <div className="toast-icon-box">
                {isSuccess && <Check size={16} color="#111111" strokeWidth={3} />}
                {isError && <AlertTriangle size={16} color="var(--yellow)" strokeWidth={3} />}
                {!isSuccess && !isError && <Info size={16} color="#111111" strokeWidth={3} />}
              </div>
            </div>

            <div className="toast-body">
              <p className="toast-title">{toast.title}</p>
              {toast.message && (
                <p className="toast-message">{toast.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              className="toast-close-btn"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
