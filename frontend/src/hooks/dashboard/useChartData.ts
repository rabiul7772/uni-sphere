import { getChartData } from '@/services/dashboard';
import { useQuery } from '@tanstack/react-query';

const useChartData = () => {
  const { data: chartData, isPending: isChartsLoading } = useQuery({
    queryKey: ['dashboard-charts'],
    queryFn: getChartData
  });

  return {
    chartData,
    isChartsLoading
  };
};

export default useChartData;
