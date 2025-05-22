import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string, username: string) => {
    const response = await api.post('/auth/register', { email, password, username });
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Business API
export const businesses = {
  getAll: async () => {
    const response = await api.get('/businesses');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/businesses/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/businesses', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/businesses/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/businesses/${id}`);
  },
};

// Reviews API
export const reviews = {
  getAll: async (businessId?: number) => {
    const url = businessId ? `/reviews?business_id=${businessId}` : '/reviews';
    const response = await api.get(url);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/reviews', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/reviews/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/reviews/${id}`);
  },
  getAverageRating: async (businessId: number) => {
    const response = await api.get(`/businesses/${businessId}/average-rating`);
    return response.data;
  },
};

export default api; 