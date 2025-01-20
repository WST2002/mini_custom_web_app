import { useState } from 'react';
import { User } from './index';
import { X, Loader2 } from 'lucide-react';

type EditUserModalProps = {
  user: User;
  onClose: () => void;
  onUpdate: (userId: number, updates: Partial<User>) => Promise<void>;
};

export default function EditUserModal({ user, onClose, onUpdate }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    number: user.number,
    plan: user.plan,
    password: user.password,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      await onUpdate(user.userId, formData);
      onClose();
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Edit User</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white disabled:opacity-50"
            disabled={isUpdating}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-800 text-white rounded px-4 py-2 disabled:opacity-50"
              disabled={isUpdating}
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Phone</label>
            <input
              type="text"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value, password: e.target.value })}
              className="w-full bg-gray-800 text-white rounded px-4 py-2 disabled:opacity-50"
              disabled={isUpdating}
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Plan</label>
            <select
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value as User['plan'] })}
              className="w-full bg-gray-800 text-white rounded px-4 py-2 disabled:opacity-50"
              disabled={isUpdating}
            >
              <option value="free">Free</option>
              <option value="no">No Plan</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white disabled:opacity-50"
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}