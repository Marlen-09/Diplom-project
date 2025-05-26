"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { X } from "lucide-react";

interface ToastProps {
  title: string;
  description?: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
}

interface ToastWithId extends ToastProps {
  id: string;
}

interface ToastContextType {
  toast: (props: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastWithId[]>([]);
  
  const addToast = (props: ToastProps) => {
    const id = Date.now().toString();
    const newToast = { ...props, id };
    
    setToasts((currentToasts) => [...currentToasts, newToast]);
    
    // Автоматически удаляем тост через указанное время
    setTimeout(() => {
      removeToast(id);
    }, props.duration || 3000);
  };
  
  const removeToast = (id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };
  
  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-md flex items-start max-w-md transform transition-all duration-300 ease-in-out ${
              toast.type === "success" ? "bg-green-50 text-green-800 border-l-4 border-green-500" :
              toast.type === "error" ? "bg-red-50 text-red-800 border-l-4 border-red-500" :
              toast.type === "warning" ? "bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500" :
              "bg-blue-50 text-blue-800 border-l-4 border-blue-500"
            }`}
          >
            <div className="flex-1">
              <h3 className="font-medium">{toast.title}</h3>
              {toast.description && <p className="text-sm mt-1">{toast.description}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-500 hover:text-gray-700 ml-4"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Вспомогательная функция для использования без хука
export const toast = (props: ToastProps) => {
  // Эта функция работает только если ToastProvider уже подключен
  console.log("Toast:", props);
};