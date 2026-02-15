import api from '@/lib/axios';

import type { Class } from '@/types/class';
export type { Class };

export interface GetClassesParams {
  page?: number;
  limit?: number;
  search?: string;
}

import type { ApiResponse } from '@/types/api';

export interface ClassesResponse {
  data: Class[];
  count: number;
}

export type ClassResponse = ApiResponse<ClassesResponse>;
export type SingleClassResponse = ApiResponse<Class>;

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
