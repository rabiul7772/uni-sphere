import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getClasses,
  createClass,
  type Class
} from '@/services/classes/apiClasses';
import toast from 'react-hot-toast';

export const useClasses = () => {
  const {
    data: classes,
    isPending,
    error
  } = useQuery<Class[], Error>({
    queryKey: ['classes'],
    queryFn: getClasses
  });

  return { classes, isPending, error };
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      toast.success('Class created successfully');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to create class');
    }
  });
};
