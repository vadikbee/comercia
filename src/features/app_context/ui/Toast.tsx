import { useEffect } from "react";
import type ToastData from "../ToastData";
import "./Toast.css"; // Сейчас создадим

export default function Toast({ data, onClose }: { data: ToastData, onClose: () => void }) {
  
  useEffect(() => {
    // Автоматически скрываем через 3 секунды (или сколько указано в data.timeout)
    const timer = setTimeout(() => {
      onClose();
    }, data.timeout || 3000);

    return () => clearTimeout(timer);
  }, [data, onClose]);

  return (
    <div className="toaster">
      <div className="toast-text">
        {data.message}
      </div>
    </div>
  );
}