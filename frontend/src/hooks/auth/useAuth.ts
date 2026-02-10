import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  signup,
  login,
  logout,
  checkAuth,
  forgotPassword,
  resetPassword,
  type User
} from '@/services/auth/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export const useUser = () => {
  return useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: checkAuth,
    retry: false,
    staleTime: Infinity
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: user => {
      queryClient.setQueryData(['user'], user);
      toast.success('Account created successfully');
      navigate('/');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to sign up');
    }
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: user => {
      queryClient.setQueryData(['user'], user);
      toast.success('Logged in successfully');
      navigate('/');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Invalid email or password');
    }
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.removeQueries();
      toast.success('Logged out successfully');
      navigate('/login');
    }
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data: any) => {
      toast.success(data.message || 'Password reset link sent to your email');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to send reset link');
    }
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data: any) => {
      toast.success(data.message || 'Password reset successful');
      navigate('/login');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to reset password');
    }
  });
};
