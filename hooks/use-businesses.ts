import { useState, useEffect } from 'react';
import { businesses } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

interface Business {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  category: string;
  created_at: string;
  owner_id: number;
  owner: {
    id: number;
    email: string;
    full_name: string;
  };
}

export function useBusinesses(category?: string) {
  const [data, setData] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const result = await businesses.getAll({ category });
        setData(result);
        setError(null);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [category]);

  const createBusiness = async (businessData: Omit<Business, 'id' | 'created_at' | 'owner_id' | 'owner'>) => {
    try {
      const result = await businesses.create(businessData);
      setData(prev => [...prev, result]);
      return result;
    } catch (e) {
      throw e;
    }
  };

  const updateBusiness = async (id: number, businessData: Partial<Business>) => {
    try {
      const result = await businesses.update(id, businessData);
      setData(prev => prev.map(item => item.id === id ? result : item));
      return result;
    } catch (e) {
      throw e;
    }
  };

  const deleteBusiness = async (id: number) => {
    try {
      await businesses.delete(id);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      throw e;
    }
  };

  const getUserBusinesses = async () => {
    if (!user) return [];
    try {
      const result = await businesses.getAll({ owner_id: user.id });
      return result;
    } catch (e) {
      throw e;
    }
  };

  return {
    businesses: data,
    loading,
    error,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    getUserBusinesses,
  };
} 