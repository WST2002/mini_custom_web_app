export type ToastVariant = 'success' | 'error';

export interface ToastState {
  show: boolean;
  message: string;
  variant: ToastVariant;
}

export interface ToastProps {
  message: string;
  duration?: number;
  variant?: ToastVariant;
  onClose: () => void;
}