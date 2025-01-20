import React, { useState, useRef } from 'react';
import { Download, Upload, Settings } from 'lucide-react';
import axios from 'axios';
import { User } from './index';
import { exportUsersToExcel } from '../../../utils/excel';
import { processUserFile } from '../../../utils/fileUpload';
import { ProgressBar } from './ProgressBar';
import { UserActions } from './UserActions';
import { DeleteConfirmModal } from './DeleteConfirmationModal';
import ManagePlansModal from './plans/ManagePlansModal';
import { useToast } from '../../../hooks/useToast';
import { Toast } from '@/pages/dashboard/components/Toast';
import { useNavigate } from 'react-router-dom';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onUserDeleted: () => void;
  onUpload: () => void;
}

export default function UserList({ users, onEdit, onUserDeleted, onUpload }: UserListProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isManagePlansOpen, setIsManagePlansOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast, showToast, hideToast } = useToast();
  const navigate = useNavigate();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await processUserFile(file, setUploadProgress);
      onUpload();
      showToast('Users data uploaded successfully!', 'success');
    } catch (error: any) {
      console.error('Error processing file:', error);
      showToast(
        error.response?.data?.message || 
        'Error processing file. This could be due to duplicate phone numbers or invalid file format.',
        'error'
      );
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    const token = localStorage.getItem("adminToken")
    try {
      setIsDeleting(true);
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/delete-user/${userToDelete.userId}`, {
        headers: {"access-key": `bearer ${token}`}
      });
      onUserDeleted();
      showToast('User deleted successfully!', 'success');
    } catch (error: any) {
      console.error('Error deleting user:', error);
      if (error.response?.status === 404) {
        showToast('User not found', 'error');
      } else {
        showToast('Failed to delete user', 'error');
      }
    } finally {
      setIsDeleting(false);
      setUserToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <button
            onClick={() => exportUsersToExcel(users)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Users Data (XLSX)
          </button>
          
          <label className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload Users Data (CSV/XLSX)
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setIsManagePlansOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Manage Plans
          </button>
          <div
          role="button"
          onClick={() => {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("token");
            navigate('/login');
          }}
          className="text-sm relative w-fit rounded-lg p-4 bg-red-500 flex items-center space-x-2 cursor-pointer pointer-events-auto"
        >LogOut</div>
        </div>
      </div>

      {uploading && <ProgressBar progress={uploadProgress} />}

      <div className="overflow-x-auto">
        <table className="w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {users.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.userId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.plan === 'platinum' ? 'bg-purple-500' :
                    user.plan === 'gold' ? 'bg-yellow-500' :
                    user.plan === 'silver' ? 'bg-gray-500' :
                    'bg-red-500'
                  } text-white`}>
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <UserActions
                    user={user}
                    onEdit={onEdit}
                    onDelete={handleDeleteClick}
                    isDeleting={isDeleting && userToDelete?.userId === user.userId}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast?.show && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={hideToast}
        />
      )}

      <DeleteConfirmModal
        user={userToDelete}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setUserToDelete(null)}
        isDeleting={isDeleting}
      />

      <ManagePlansModal
        isOpen={isManagePlansOpen}
        onClose={() => setIsManagePlansOpen(false)}
      />
    </div>
  );
}