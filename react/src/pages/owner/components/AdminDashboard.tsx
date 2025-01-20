import { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import EditUserModal from './EditUserModal';

// Types
export interface User {
  userId: number;
  name: string;
  number: string;
  plan: 'free' | 'no' | 'silver' | 'gold' | 'platinum';
  planUpdatedAt: string;
  password: string;
}

// API Functions
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchUsers = async () => {
  const token = localStorage.getItem("adminToken")
  const response = await axios.get(`${API_BASE_URL}/users`, {
    headers: {'access-key': `bearer ${token}`}
  });
  return response.data;
};

const updateUser = async (userId: number, updates: Partial<User>) => {
  const token = localStorage.getItem("adminToken")
  const response = await axios.put(`${API_BASE_URL}/user/${userId}`, updates, {
    headers: {'access-key': `bearer ${token}`}
  });
  return response.data;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId: number, updates: Partial<User>) => {
    try {
      await updateUser(userId, updates);
      await loadUsers();
      setEditingUser(null);
    } catch (err) {
      setError('Failed to update user');
    }
  };

  if (loading) return <div className="text-white text-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Admin Dashboard
      </h1>
      <UserList users={users} onEdit={setEditingUser} onUserDeleted={loadUsers} onUpload={loadUsers} />
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
}