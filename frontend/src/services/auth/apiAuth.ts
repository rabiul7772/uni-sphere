import api from '@/lib/axios';

import type { ApiResponse } from '@/types/api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'teacher';
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type AuthResponse = ApiResponse<User>;
export type MessageResponse = ApiResponse<void>; // or appropriate type if data is null/void

export const signup = async (data: any): Promise<User> => {
  const response = await api.post<AuthResponse>('/auth/signup', data);
  return response.data.data;
};

export const login = async (data: any): Promise<User> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkAuth = async (): Promise<User> => {
  const response = await api.get<AuthResponse>('/auth/check-auth');
  return response.data.data;
};

export const forgotPassword = async (data: {
  email: string;
}): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>(
    '/auth/forgot-password',
    data
  );
  return response.data;
};

export const resetPassword = async (data: {
  token: string;
  password: any;
}): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>(
    '/auth/reset-password',
    data
  );
  return response.data;
};
