import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  type Department,
  getDepartment,
  getDepartments,
  createDepartment as createDepartmentApi,
  updateDepartment as updateDepartmentApi,
  type DepartmentsResponse,
  type GetDepartmentsParams
} from '@/services/departments/apiDepartments';
import toast from 'react-hot-toast';

export const useDepartments = (params?: GetDepartmentsParams) => {
  const { page, limit, search } = params || {};

  return useQuery<DepartmentsResponse, Error>({
    queryKey: ['departments', page, limit, search],
    queryFn: () => getDepartments(params)
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
