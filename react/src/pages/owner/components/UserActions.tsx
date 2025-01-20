import { Edit2, Trash2, Loader2 } from 'lucide-react';
import { User } from './index';

interface UserActionsProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  isDeleting: boolean;
}

export const UserActions = ({ user, onEdit, onDelete, isDeleting }: UserActionsProps) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onEdit(user)}
        className="text-blue-400 hover:text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Edit user"
        disabled={isDeleting}
      >
        <Edit2 className="w-5 h-5" />
      </button>
      <button
        onClick={() => onDelete(user)}
        className="text-red-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete user"
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Trash2 className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};