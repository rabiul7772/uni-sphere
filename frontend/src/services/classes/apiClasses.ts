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
    name: string;
    code: string;
  };
  teacher?: {
    name: string;
    avatarUrl: string | null;
  };
}

export interface ClassResponse {
  success: boolean;
  data: Class[];
}

export const getClasses = async (): Promise<Class[]> => {
  const response = await api.get<ClassResponse>('/classes');
  return response.data.data;
};

export const createClass = async (data: any): Promise<Class> => {
  const response = await api.post<{ success: boolean; data: Class }>(
    '/classes',
    data
  );
  return response.data.data;
};
