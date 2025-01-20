import { Plus } from 'lucide-react';

interface CreateWebsiteButtonProps {
  onClick: () => void;
}

export default function CreateWebsiteButton({ onClick }: CreateWebsiteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
    >
      <Plus size={20} />
      Create New Website
    </button>
  );
}