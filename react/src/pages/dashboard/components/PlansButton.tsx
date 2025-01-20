import { CreditCard } from 'lucide-react';

type PlansButtonProps = {
  onClick: () => void;
};

export default function PlansButton({ onClick }: PlansButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
    >
      <CreditCard className="w-5 h-5" />
      <span>View Plans</span>
    </button>
  );
}