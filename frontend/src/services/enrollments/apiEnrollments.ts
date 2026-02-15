import api from '@/lib/axios';

import type { EnrollmentDetails } from '@/types/enrollment';
export type { EnrollmentDetails };

import type { ApiResponse } from '@/types/api';

export type EnrollmentResponse = ApiResponse<EnrollmentDetails>;

export const enrollInClass = async (data: {
  studentId: number;
  classId: number;
}): Promise<EnrollmentDetails> => {
  const response = await api.post<EnrollmentResponse>('/enrollments', data);
  return response.data.data;
};
