import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/users/apiUsers';
import type { User } from '@/services/users/apiUsers';

export const useUsers = () => {
  const {
    data: users,
    isPending,
    error
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: getUsers
  });

  return { users, isPending, error };
};
