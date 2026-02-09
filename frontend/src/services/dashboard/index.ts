import api from '@/lib/axios';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// Define these based on your actual API response shapes
export interface DashboardStats {
  totalDepartments: number;
  totalSubjects: number;
  totalTeachers: number;
  totalStudents: number;
  totalEnrollments: number;
  totalClasses: number;
}

export interface RecentClass {
  id: number;
  name: string;
  bannerUrl: string | null;
  status: string;
  createdAt: string;
  teacher?: {
    name: string;
    avatarUrl: string | null;
  };
  subject?: {
    name: string;
  };
}

export interface ChartData {
  enrollmentDistribution: { name: string; value: number }[];
  subjectsPerDept: { name: string; subjectCount: number }[];
  enrollmentsPerSubject: { name: string; enrollmentCount: number }[];
  classesPerSubject: { name: string; classCount: number }[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } =
    await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
  return data.data;
};

export const getRecentClasses = async (): Promise<RecentClass[]> => {
  const { data } = await api.get<ApiResponse<RecentClass[]>>(
    '/dashboard/recent-classes'
  );
  return data.data;
};

export const getChartData = async (): Promise<ChartData> => {
  const { data } = await api.get<ApiResponse<ChartData>>('/dashboard/charts');
  return data.data;
};
