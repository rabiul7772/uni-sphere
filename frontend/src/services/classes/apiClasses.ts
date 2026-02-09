import api from '@/lib/axios';

export interface Class {
  id: number;
  name: string;
  bannerUrl: string | null;
  subjectId: number;
  teacherId: number;
  capacity: number;
  status: 'active' | 'inactive';
  description: string;
  createdAt: string;
  updatedAt: string;
  subject?: {
    id: number;
    name: string;
    code: string;
    description: string;
  };
  department?: {
    id: number;
    name: string;
    description: string;
  };
  teacher?: {
    id: number;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
  enrolledStudents?: {
    id: number;
    name: string;
    email: string;
    avatarUrl: string | null;
    enrolledAt: string;
  }[];
}

export interface GetClassesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ClassesResponse {
  data: Class[];
  count: number;
}

export interface ClassResponse {
  success: boolean;
  data: ClassesResponse;
}

export interface SingleClassResponse {
  success: boolean;
  data: Class;
}

export const getClasses = async (
  params: GetClassesParams = {}
): Promise<ClassesResponse> => {
  const response = await api.get<ClassResponse>('/classes', { params });
  return response.data.data;
};

export const getClass = async (id: string | number): Promise<Class> => {
  const response = await api.get<SingleClassResponse>(`/classes/${id}`);
  return response.data.data;
};

export const createClass = async (data: any): Promise<Class> => {
  const response = await api.post<{ success: boolean; data: Class }>(
    '/classes',
    data
  );
  return response.data.data;
};

export const updateClass = async (id: number, data: any): Promise<Class> => {
  const response = await api.put<{ success: boolean; data: Class }>(
    `/classes/${id}`,
    data
  );
  return response.data.data;
};
