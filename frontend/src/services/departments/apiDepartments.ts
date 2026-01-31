import api from '@/lib/axios';

export interface Department {
  id: string; // Assuming UUID or similar
  code: string;
  name: string;
  description: string | null;
  subjects?: Array<{ id: string; name: string }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get<ApiResponse<Department[]>>('/departments');
  return response.data.data;
};

export const createDepartment = async (
  department: Department
): Promise<Department> => {
  const response = await api.post<ApiResponse<Department>>(
    '/departments',
    department
  );
  return response.data.data;
};
