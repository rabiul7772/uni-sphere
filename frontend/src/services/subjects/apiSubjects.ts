import api from '@/lib/axios';
import { type ApiResponse } from '../departments/apiDepartments';

export interface Subject {
  id: number;
  departmentId: number;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  department?: {
    id: number;
    name: string;
    code: string;
  };
}

export type NewSubject = {
  name: string;
  code: string;
  description: string;
  departmentId: number;
};

export const getSubjects = async (): Promise<Subject[]> => {
  const response = await api.get<ApiResponse<Subject[]>>('/subjects');
  return response.data.data;
};

export const createSubject = async (subject: NewSubject): Promise<Subject> => {
  const response = await api.post<ApiResponse<Subject>>('/subjects', subject);
  return response.data.data;
};
