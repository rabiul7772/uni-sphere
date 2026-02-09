import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getSubject,
  getSubjects,
  getSubjectsList,
  createSubject as createSubjectApi,
  updateSubject as updateSubjectApi,
  type Subject,
  type NewSubject,
  type SubjectsResponse,
  type SubjectListItem,
  type GetSubjectsParams
} from '@/services/subjects/apiSubjects';
import { toast } from 'react-hot-toast';

export const useSubjects = (params?: GetSubjectsParams) => {
  const { page, limit, search } = params || {};

  return useQuery<SubjectsResponse, Error>({
    queryKey: ['subjects', page, limit, search],
    queryFn: () => getSubjects(params)
  });
};

export const useSubject = (id: string | number) => {
  return useQuery<Subject, Error>({
    queryKey: ['subject', String(id)],
    queryFn: () => getSubject(String(id)),
    enabled: !!id
  });
};

// Lightweight hook for dropdowns (fetches all subjects with only id and name)
export const useSubjectsList = () => {
  return useQuery<SubjectListItem[], Error>({
    queryKey: ['subjects-list'],
    queryFn: getSubjectsList
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
