import axios from 'axios';
import { Room, Customer, Booking, ApiResponse } from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  // Remove timeout to avoid WebContainer issues
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const roomsApi = {
  getAll: (): Promise<ApiResponse<Room[]>> => 
    api.get('/rooms').then(res => res.data),
  
  getById: (id: string): Promise<ApiResponse<Room>> => 
    api.get(`/rooms/${id}`).then(res => res.data),
  
  create: (room: Omit<Room, 'id'>): Promise<ApiResponse<Room>> => 
    api.post('/rooms', room).then(res => res.data),
  
  update: (id: string, room: Partial<Room>): Promise<ApiResponse<Room>> => 
    api.put(`/rooms/${id}`, room).then(res => res.data),
  
  delete: (id: string): Promise<ApiResponse<void>> => 
    api.delete(`/rooms/${id}`).then(res => res.data),
};

export const customersApi = {
  getAll: (): Promise<ApiResponse<Customer[]>> => 
    api.get('/customers').then(res => res.data),
  
  getById: (id: string): Promise<ApiResponse<Customer>> => 
    api.get(`/customers/${id}`).then(res => res.data),
  
  create: (customer: Omit<Customer, 'id' | 'bookingHistory'>): Promise<ApiResponse<Customer>> => 
    api.post('/customers', customer).then(res => res.data),
  
  update: (id: string, customer: Partial<Customer>): Promise<ApiResponse<Customer>> => 
    api.put(`/customers/${id}`, customer).then(res => res.data),
};

export const bookingsApi = {
  getAll: (): Promise<ApiResponse<Booking[]>> => 
    api.get('/bookings').then(res => res.data),
  
  getById: (id: string): Promise<ApiResponse<Booking>> => 
    api.get(`/bookings/${id}`).then(res => res.data),
  
  create: (booking: Omit<Booking, 'id' | 'createdAt'>): Promise<ApiResponse<Booking>> => 
    api.post('/bookings', booking).then(res => res.data),
  
  update: (id: string, booking: Partial<Booking>): Promise<ApiResponse<Booking>> => 
    api.put(`/bookings/${id}`, booking).then(res => res.data),
  
  cancel: (id: string): Promise<ApiResponse<void>> => 
    api.patch(`/bookings/${id}/cancel`).then(res => res.data),
};

export default api;
