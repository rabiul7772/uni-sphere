import api from '@/lib/axios';

export interface EnrollmentDetails {
  id: number;
  class: {
    id: number;
    name: string;
    description: string;
  };
  subject: {
    name: string;
  };
  department: {
    name: string;
  };
  teacher: {
    name: string;
    email: string;
  };
}

export interface EnrollmentResponse {
  success: boolean;
  data: EnrollmentDetails;
}

export const enrollInClass = async (data: {
  studentId: number;
  classId: number;
}): Promise<EnrollmentDetails> => {
  const response = await api.post<EnrollmentResponse>('/enrollments', data);
  return response.data.data;
};
