import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  type Department,
  getDepartment,
  getDepartments,
  createDepartment as createDepartmentApi,
  updateDepartment as updateDepartmentApi
} from '@/services/departments/apiDepartments';
import toast from 'react-hot-toast';

export const useDepartments = () => {
  return useQuery<Department[], Error>({
    queryKey: ['departments'],
    queryFn: getDepartments
  });
};

export const useDepartment = (id: string | number) => {
  return useQuery<Department, Error>({
    queryKey: ['department', String(id)],
    queryFn: () => getDepartment(String(id))
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

export const useUpdateDepartment = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Department>) =>
      updateDepartmentApi(String(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      queryClient.invalidateQueries({ queryKey: ['department', String(id)] });
      toast.success('Department updated successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to update department'
      );
    }
  });
};
