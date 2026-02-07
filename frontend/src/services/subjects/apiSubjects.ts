import api from '@/lib/axios';

export interface Subject {
  id: string;
  code: string;
  name: string;
  description: string;
  departmentId: string;
  department: {
    id: string;
    name: string;
    code: string;
  };
  classes: Array<{
    id: string;
    name: string;
    status: 'active' | 'inactive';
    teacher: {
      id: string;
      fullName: string;
      email: string;
      avatarUrl?: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface NewSubject {
  name: string;
  code: string;
  description: string;
  departmentId: number | string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface GetSubjectsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface SubjectsResponse {
  data: Subject[];
  count: number;
}

export const getSubjects = async (
  params?: GetSubjectsParams
): Promise<SubjectsResponse> => {
  const response = await api.get<ApiResponse<SubjectsResponse>>('/subjects', {
    params
  });
  return response.data.data;
};

export const createSubject = async (subject: NewSubject): Promise<Subject> => {
  const response = await api.post<ApiResponse<Subject>>('/subjects', subject);
  return response.data.data;
};

export const getSubject = async (id: string): Promise<Subject> => {
  const response = await api.get<ApiResponse<Subject>>(`/subjects/${id}`);
  return response.data.data;
};

export const updateSubject = async (
  id: string,
  subject: Partial<NewSubject>
): Promise<Subject> => {
  const response = await api.patch<ApiResponse<Subject>>(
    `/subjects/${id}`,
    subject
  );
  return response.data.data;
};
