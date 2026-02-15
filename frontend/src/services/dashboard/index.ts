import api from '@/lib/axios';

import type { ApiResponse } from '@/types/api';

import type { DashboardStats, RecentClass, ChartData } from '@/types/dashboard';
export type { DashboardStats, RecentClass, ChartData };

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
