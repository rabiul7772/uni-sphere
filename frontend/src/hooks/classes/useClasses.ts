import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getClasses,
  createClass,
  updateClass,
  type ClassesResponse,
  type GetClassesParams
} from '@/services/classes/apiClasses';
import toast from 'react-hot-toast';

export const useClasses = (params: GetClassesParams = {}) => {
  const { page = 1, limit = 10, search = '' } = params;

  const { data, isPending, error } = useQuery<ClassesResponse, Error>({
    queryKey: ['classes', page, limit, search],
    queryFn: () => getClasses({ page, limit, search })
  });

  return { data, isPending, error };
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

export const useUpdateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateClass(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      queryClient.invalidateQueries({ queryKey: ['class', id.toString()] });
      toast.success('Class updated successfully');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update class');
    }
  });
};
