import { useQuery } from '@tanstack/react-query';
import {
  getUser,
  getUsers,
  getTeachersList,
  type UserDetail,
  type TeacherListItem
} from '@/services/users/apiUsers';

export const useUsers = (
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  },
  options?: { keepPreviousData?: boolean }
) => {
  return useQuery<{ data: UserDetail[]; count: number }, Error>({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    placeholderData: options?.keepPreviousData
      ? (previousData: any) => previousData
      : undefined
  });
};

export const useUser = (id: string | number) => {
  return useQuery<UserDetail, Error>({
    queryKey: ['user', String(id)],
    queryFn: () => getUser(String(id)),
    enabled: !!id
  });
};

// Lightweight hook for dropdowns (fetches all teachers with only id and name)
export const useTeachersList = () => {
  return useQuery<TeacherListItem[], Error>({
    queryKey: ['teachers-list'],
    queryFn: getTeachersList
  });
};
