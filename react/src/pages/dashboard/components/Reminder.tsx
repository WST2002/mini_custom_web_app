import { BellRing } from 'lucide-react';

interface ReminderProps {
  message: string;
}

export function Reminder({ message }: ReminderProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-yellow-100 border-l-4 border-yellow-500 animate-[slideIn_0.3s_ease-out]">
      <BellRing className="w-6 h-6 text-yellow-500 animate-[ring_2s_ease-in-out_infinite]" />
      <p className="text-yellow-700 font-medium">{message}</p>
    </div>
  );
}