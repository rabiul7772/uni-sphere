import api from '@/lib/axios';

import type { Subject, NewSubject } from '@/types/subject';
export type { Subject, NewSubject };

import type { ApiResponse } from '@/types/api';

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

// Lightweight type for dropdowns (only id and name)
export interface SubjectListItem {
  id: string;
  name: string;
}

// Fetch all subjects for dropdowns (no pagination)
export const getSubjectsList = async (): Promise<SubjectListItem[]> => {
  const response = await api.get<ApiResponse<SubjectsResponse>>('/subjects', {
    params: { limit: 1000 }
  });
  return response.data.data.data.map(subj => ({
    id: subj.id,
    name: subj.name
  }));
};
