import api from '@/lib/axios';

export interface Department {
  id: string;
  code: string;
  name: string;
  description: string | null;
  subjects?: Array<{
    id: string;
    name: string;
    code: string;
    description: string;
    classes: Array<{
      id: string;
      name: string;
      status: string;
      teacher: {
        id: string;
        fullName: string;
        email: string;
        avatar?: string;
        role: string;
      };
      subject: {
        id: string;
        name: string;
        code: string;
      };
      enrollments: Array<{
        id: string;
        student: {
          id: string;
          fullName: string;
          email: string;
          avatar?: string;
          role: string;
        };
      }>;
    }>;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface GetDepartmentsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface DepartmentsResponse {
  data: Department[];
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
  department: Department
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
