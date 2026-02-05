import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollInClass } from '@/services/enrollments/apiEnrollments';
import toast from 'react-hot-toast';

export const useEnrollInClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollInClass,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      queryClient.invalidateQueries({
        queryKey: ['class', String(variables.classId)]
      });
      // toast.success('Enrolled successfully!'); // Will handle success UI instead
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to enroll in class');
    }
  });
};
