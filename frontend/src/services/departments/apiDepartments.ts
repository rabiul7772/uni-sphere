import api from '@/lib/axios';

import type {
  Department,
  DepartmentSummary,
  NewDepartment
} from '@/types/department';
export type { Department, DepartmentSummary, NewDepartment };

import type { ApiResponse } from '@/types/api';

export interface GetDepartmentsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface DepartmentsResponse {
  data: DepartmentSummary[];
  count: number;
}

export const getDepartments = async (
  params?: GetDepartmentsParams
): Promise<DepartmentsResponse> => {
  const response = await api.get<ApiResponse<DepartmentsResponse>>(
    '/departments',
    {
      params
    }
  );
  return response.data.data;
};

export const getDepartment = async (id: string): Promise<Department> => {
  const response = await api.get<ApiResponse<Department>>(`/departments/${id}`);
  return response.data.data;
};

export const createDepartment = async (
  department: NewDepartment
): Promise<Department> => {
  const response = await api.post<ApiResponse<Department>>(
    '/departments',
    department
  );
  return response.data.data;
};

export const updateDepartment = async (
  id: string,
  department: Partial<Department>
): Promise<Department> => {
  const response = await api.patch<ApiResponse<Department>>(
    `/departments/${id}`,
    department
  );
  return response.data.data;
};

// Lightweight type for dropdowns (only id and name)
export interface DepartmentListItem {
  id: string;
  name: string;
}

// Fetch all departments for dropdowns (no pagination)
export const getDepartmentsList = async (): Promise<DepartmentListItem[]> => {
  const response = await api.get<ApiResponse<DepartmentsResponse>>(
    '/departments',
    { params: { limit: 1000 } }
  );
  return response.data.data.data.map(dept => ({
    id: dept.id,
    name: dept.name
  }));
};
