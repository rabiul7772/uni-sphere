import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getSubject,
  getSubjects,
  createSubject as createSubjectApi,
  updateSubject as updateSubjectApi,
  type Subject,
  type NewSubject
} from '@/services/subjects/apiSubjects';
import { toast } from 'react-hot-toast';

export const useSubjects = () => {
  return useQuery<Subject[], Error>({
    queryKey: ['subjects'],
    queryFn: getSubjects
  });
};

export const useSubject = (id: string | number) => {
  return useQuery<Subject, Error>({
    queryKey: ['subject', String(id)],
    queryFn: () => getSubject(String(id)),
    enabled: !!id
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newSubject: NewSubject) => createSubjectApi(newSubject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      toast.success('Subject created successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create subject');
    }
  });
};

export const useUpdateSubject = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<NewSubject>) =>
      updateSubjectApi(String(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      queryClient.invalidateQueries({ queryKey: ['subject', String(id)] });
      toast.success('Subject updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update subject');
    }
  });
};
