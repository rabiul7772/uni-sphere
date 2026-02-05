import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSubjects } from '@/hooks/subjects/useSubjects';
import { useUsers } from '@/hooks/users/useUsers';
import { useCreateClass, useUpdateClass } from '@/hooks/classes/useClasses';
import { uploadImage } from '@/services/auth/apiCloudinary';
import toast from 'react-hot-toast';

import { BannerUpload } from './BannerUpload';
import { ClassBasicFields } from './ClassBasicFields';
import { ClassDetailsFields } from './ClassDetailsFields';
import { ClassFormActions } from './ClassFormActions';

const classSchema = z.object({
  name: z.string().min(2, 'Class name must be at least 2 characters'),
  subjectId: z.string().min(1, 'Please select a subject'),
  teacherId: z.string().min(1, 'Please select a teacher'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  status: z.enum(['active', 'inactive']),
  description: z.string().min(10, 'Description must be at least 10 characters')
});

type ClassFormValues = z.infer<typeof classSchema>;

interface CreateClassFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: any;
}

export const CreateClassForm = ({
  onSuccess,
  onCancel,
  initialData
}: CreateClassFormProps) => {
  const isEditing = !!initialData;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.bannerUrl || null
  );
  const [isUploading, setIsUploading] = useState(false);

  const { data: subjects, isPending: subjectsLoading } = useSubjects();
  const { data: users, isPending: usersLoading } = useUsers();
  const { mutate: createClass, isPending: isCreating } = useCreateClass();
  const { mutate: updateClass, isPending: isUpdating } = useUpdateClass();

  const teachers = users?.data?.filter(
    (u: any) => u.role === 'teacher' || u.role === 'admin'
  );

  const methods = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: isEditing
      ? {
          name: initialData.name,
          subjectId:
            initialData.subjectId?.toString() ||
            initialData.subject?.id?.toString() ||
            '',
          teacherId:
            initialData.teacherId?.toString() ||
            initialData.teacher?.id?.toString() ||
            '',
          capacity: initialData.capacity,
          status: initialData.status,
          description: initialData.description
        }
      : {
          name: '',
          subjectId: '',
          teacherId: '',
          capacity: 30,
          status: 'active',
          description: ''
        }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ClassFormValues) => {
    try {
      // Validate that banner image is provided
      if (!imageFile && !initialData?.bannerUrl) {
        toast.error('Please upload a banner image');
        return;
      }

      let bannerUrl = initialData?.bannerUrl || '';
      if (imageFile) {
        setIsUploading(true);
        bannerUrl = await uploadImage(imageFile);
        setIsUploading(false);
      }

      const payload = {
        ...data,
        subjectId: parseInt(data.subjectId),
        teacherId: parseInt(data.teacherId),
        bannerUrl
      };

      if (isEditing) {
        updateClass(
          { id: initialData.id, data: payload },
          { onSuccess: () => onSuccess() }
        );
      } else {
        createClass(payload, { onSuccess: () => onSuccess() });
      }
    } catch (error) {
      setIsUploading(false);
      toast.error('Failed to upload banner image');
    }
  };

  const isLoading =
    subjectsLoading || usersLoading || isCreating || isUpdating || isUploading;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <BannerUpload
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          isLoading={isLoading}
        />

        <ClassBasicFields
          isLoading={isLoading}
          isEditing={isEditing}
          subjects={subjects}
          teachers={teachers}
        />

        <ClassDetailsFields isLoading={isLoading} />

        <ClassFormActions
          isLoading={isLoading}
          isUploading={isUploading}
          isEditing={isEditing}
          onCancel={onCancel}
        />
      </form>
    </FormProvider>
  );
};
