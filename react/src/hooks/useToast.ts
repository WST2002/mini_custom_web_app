import { useState } from 'react';
import { ToastState } from '@/pages/dashboard/types/toast';

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, variant: ToastState['variant']) => {
    setToast({
      show: true,
      message,
      variant,
    });
  };

  const hideToast = () => setToast(null);

  return {
    toast,
    showToast,
    hideToast,
  };
}