import { getDashboardStats } from '@/services/dashboard';
import { useQuery } from '@tanstack/react-query';

const useDashboardStats = () => {
  const { data: stats, isPending: isStatsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats
  });

  return {
    stats,
    isStatsLoading
  };
};

export default useDashboardStats;
