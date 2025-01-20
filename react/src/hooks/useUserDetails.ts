import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Website {
  businessName: string;
  status: string;
  params: string;
  createdAt: string;
}

interface UserDetails {
  name: string;
  number: string;
  websites: Array<Website>;
  userId?: string;
}

export function useUserDetails() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await fetch(`${import.meta.env.VITE_BASE_URL}/get-id`, {
          headers: { "access-key": `Bearer ${token}` }
        });
        if (!resp.ok) throw new Error('Failed to fetch user ID');
        const dataUser = await resp.json();
        const userId = dataUser.userId;

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user-details/${userId}`, {
          headers: { "access-key": `bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch user details');
        const data = await response.json();

        setUserDetails({ ...data, userId });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user details');
        localStorage.removeItem("token");
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const updateUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch(`${import.meta.env.VITE_BASE_URL}/get-id`, {
        headers: { "access-key": `Bearer ${token}` }
      });
      if (!resp.ok) throw new Error('Failed to fetch user ID');
      const dataUser = await resp.json();
      const userId = dataUser.userId;

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user-details/${userId}`, {
        headers: { "access-key": `bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch user details');
      const data = await response.json();

      setUserDetails({ ...data, userId });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user details');
      localStorage.removeItem("token");
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return { userDetails, loading, error, updateUserDetails };
}
