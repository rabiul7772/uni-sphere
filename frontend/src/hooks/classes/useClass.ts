import { useQuery } from '@tanstack/react-query';
import { getClass } from '@/services/classes/apiClasses';

export function useClass(id: string | undefined) {
  const {
    data: classData,
    isPending,
    error,
    refetch
  } = useQuery({
    queryKey: ['class', id],
    queryFn: () => (id ? getClass(id) : Promise.reject('No ID provided')),
    enabled: !!id
  });

  return { classData, isPending, error, refetch };
}
