import React, { createContext, useCallback, useContext, useState } from "react";

// Small confirmations ("Logged in", "Review posted") shown under the header.
// Form errors are shown inline in the form instead.
// The default value is a no-op, so components still work without the provider (e.g. in tests).
const ToastContext = createContext(() => {});

const ToastProvider = ({ children }) => {
      const [toasts, setToasts] = useState([]);

      const notify = useCallback((message, variant = 'success') => {
            const id = `${Date.now()}-${Math.random()}`;
            setToasts((list) => [...list, { id, message, variant }]);
            setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 4000);
      }, []);

      return (
            <ToastContext.Provider value={notify}>
                  {children}
                  <div className="toast-stack" role="status" aria-live="polite">
                        {toasts.map((t) => (
                              <div key={t.id} className={`app-toast app-toast--${t.variant}`}>{t.message}</div>
                        ))}
                  </div>
            </ToastContext.Provider>
      );
};

const useNotify = () => useContext(ToastContext);

export { ToastProvider, useNotify };
