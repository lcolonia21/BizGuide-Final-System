import { useState, useEffect } from 'react';
import { reviews } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

interface Review {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user_id: number;
  business_id: number;
  user: {
    id: number;
    email: string;
    full_name: string;
  };
  business: {
    id: number;
    name: string;
  };
}

export function useReviews(businessId?: number) {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      if (!businessId) return;
      try {
        const [reviewsData, ratingData] = await Promise.all([
          reviews.getBusinessReviews(businessId),
          reviews.getBusinessRating(businessId),
        ]);
        setData(reviewsData);
        setAverageRating(ratingData.average_rating);
        setError(null);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [businessId]);

  const createReview = async (reviewData: { rating: number; comment: string; business_id: number }) => {
    try {
      const result = await reviews.create(reviewData);
      setData(prev => [...prev, result]);
      // Update average rating
      if (businessId) {
        const ratingData = await reviews.getBusinessRating(businessId);
        setAverageRating(ratingData.average_rating);
      }
      return result;
    } catch (e) {
      throw e;
    }
  };

  const updateReview = async (id: number, reviewData: Partial<Review>) => {
    try {
      const result = await reviews.update(id, reviewData);
      setData(prev => prev.map(item => item.id === id ? result : item));
      // Update average rating
      if (businessId) {
        const ratingData = await reviews.getBusinessRating(businessId);
        setAverageRating(ratingData.average_rating);
      }
      return result;
    } catch (e) {
      throw e;
    }
  };

  const deleteReview = async (id: number) => {
    try {
      await reviews.delete(id);
      setData(prev => prev.filter(item => item.id !== id));
      // Update average rating
      if (businessId) {
        const ratingData = await reviews.getBusinessRating(businessId);
        setAverageRating(ratingData.average_rating);
      }
    } catch (e) {
      throw e;
    }
  };

  const getUserReviews = async () => {
    if (!user) return [];
    try {
      const result = await reviews.getUserReviews(user.id);
      return result;
    } catch (e) {
      throw e;
    }
  };

  return {
    reviews: data,
    loading,
    error,
    averageRating,
    createReview,
    updateReview,
    deleteReview,
    getUserReviews,
  };
} 