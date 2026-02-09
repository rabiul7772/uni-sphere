import { getRecentClasses } from '@/services/dashboard';
import { useQuery } from '@tanstack/react-query';

const useRecentClasses = () => {
  const { data: recentClasses = [], isPending: isClassesLoading } = useQuery({
    queryKey: ['recent-classes'],
    queryFn: getRecentClasses
  });

  return {
    recentClasses,
    isClassesLoading
  };
};

export default useRecentClasses;
