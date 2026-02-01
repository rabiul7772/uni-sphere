import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSubjects, createSubject } from '@/services/subjects/apiSubjects';
import toast from 'react-hot-toast';

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      toast.success('Subject created successfully');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to create subject');
    }
  });
};
