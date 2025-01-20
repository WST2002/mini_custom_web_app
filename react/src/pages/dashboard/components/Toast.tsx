import { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { ToastProps } from '../types/toast';

export function Toast({ 
  message, 
  duration = 3000, 
  variant = 'success',
  onClose 
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: 'text-green-500',
      Icon: CheckCircle
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: 'text-red-500',
      Icon: XCircle
    }
  }[variant];

  const { bg, text, icon, Icon } = styles;

  return (
    <div className="fixed bottom-4 right-4 animate-[slideIn_0.3s_ease-out] z-10">
      <div className={`flex items-center gap-2 ${bg} ${text} px-4 py-3 rounded-lg shadow-lg`}>
        <Icon className={`w-5 h-5 ${icon}`} />
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}