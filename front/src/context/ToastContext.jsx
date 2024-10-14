import { createContext, useContext, useState } from 'react';
import ToastNotification from '../components/ToastNotification/ToastNotification';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {

    const [toasts, setToasts] = useState([]);

    const addToast = (toast) => {
        setToasts([...toasts, { id: Date.now(), ...toast }]);
    };

    const removeToast = (id) => {
        setToasts(toasts.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>

            {children}

            <div className="toast-container">
                {toasts.map((toast) => (
                    <ToastNotification
                        key={toast.id}
                        type={toast.type}
                        title={toast.title}
                        message={toast.message}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};
