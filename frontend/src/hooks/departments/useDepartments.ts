import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  type Department,
  getDepartments,
  createDepartment as createDepartmentApi
} from '@/services/departments/apiDepartments';
import toast from 'react-hot-toast';

export const useDepartments = () => {
  return useQuery<Department[], Error>({
    queryKey: ['departments'],
    queryFn: getDepartments
  });
};

export const createDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast.success('Department created successfully');
    },
    onError: () => {
      toast.error('Failed to create department');
    }
  });
};
