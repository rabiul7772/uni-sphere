import api from '@/lib/axios';
import type { UserDetail } from '@/types/auth'; // Import from new location
import type { ApiResponse } from '@/types/api'; // Import from new location

export type { UserDetail, ApiResponse }; // Re-export for compatibility

export const getUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}): Promise<{ data: UserDetail[]; count: number }> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.role && params.role !== 'all')
    queryParams.append('role', params.role);

  // Define the backend response shape including count
  interface UsersResponse extends ApiResponse<UserDetail[]> {
    count: number;
  }

  const response = await api.get<UsersResponse>(
    `/users?${queryParams.toString()}`
  );

  return {
    data: response.data.data,
    count: response.data.count
  };
};

export const getUser = async (id: string): Promise<UserDetail> => {
  const response = await api.get<ApiResponse<UserDetail>>(`/users/${id}`);
  return response.data.data;
};

// Lightweight type for dropdowns (only id and name)
export interface TeacherListItem {
  id: number;
  name: string;
}

// Fetch all teachers for dropdowns (no pagination)
export const getTeachersList = async (): Promise<TeacherListItem[]> => {
  interface UsersResponse extends ApiResponse<UserDetail[]> {
    count: number;
  }

  const response = await api.get<UsersResponse>('/users', {
    params: { limit: 1000, role: 'teacher' }
  });

  return response.data.data.map(user => ({
    id: user.id,
    name: user.name
  }));
};
