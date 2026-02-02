import api from '@/lib/axios';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'teacher';
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  success: boolean;
  data: User[];
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<UserResponse>('/users');
  return response.data.data;
};
