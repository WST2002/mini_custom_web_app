import { AlertTriangle } from 'lucide-react';

interface WarningProps {
  message: string;
}

export function Warning({ message }: WarningProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-red-100 border-l-4 border-red-500 animate-[slideIn_0.3s_ease-out]">
      <AlertTriangle className="w-6 h-6 text-red-500 animate-[bounce_1s_ease-in-out_infinite]" />
      <p className="text-red-700 font-medium">{message}</p>
    </div>
  );
}