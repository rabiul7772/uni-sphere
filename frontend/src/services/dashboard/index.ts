import api from '@/lib/axios';

export const getDashboardStats = async () => {
  const { data } = await api.get('/dashboard/stats');
  return data.data;
};

export const getRecentClasses = async () => {
  const { data } = await api.get('/dashboard/recent-classes');
  return data.data;
};

export const getChartData = async () => {
  const { data } = await api.get('/dashboard/charts');
  return data.data;
};
