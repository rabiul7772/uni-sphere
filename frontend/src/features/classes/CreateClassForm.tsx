import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useSubjects } from '@/hooks/subjects/useSubjects';
import { useUsers } from '@/hooks/users/useUsers';
import { useCreateClass } from '@/hooks/classes/useClasses';
import { uploadImage } from '@/services/auth/apiCloudinary';
import { Spinner } from '@/components/ui/spinner';
import { UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';

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
}

export const CreateClassForm = ({
  onSuccess,
  onCancel
}: CreateClassFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: subjects, isPending: subjectsLoading } = useSubjects();
  const { users, isPending: usersLoading } = useUsers();
  const { mutate: createClass, isPending: isCreating } = useCreateClass();

  const teachers = users?.filter(
    u => u.role === 'teacher' || u.role === 'admin'
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
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
      let bannerUrl = '';
      if (imageFile) {
        setIsUploading(true);
        bannerUrl = await uploadImage(imageFile);
        setIsUploading(false);
      }

      createClass(
        {
          ...data,
          subjectId: parseInt(data.subjectId),
          teacherId: parseInt(data.teacherId),
          bannerUrl
        },
        {
          onSuccess: () => onSuccess()
        }
      );
    } catch (error) {
      setIsUploading(false);
      toast.error('Failed to upload banner image');
    }
  };

  const isLoading =
    subjectsLoading || usersLoading || isCreating || isUploading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Banner Upload */}
      <div className="space-y-2">
        <Label className="text-xs font-bold text-slate-700">
          Banner Image *
        </Label>
        <div className="relative">
          <label
            htmlFor="banner-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all overflow-hidden group"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="p-3 bg-white rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-sm font-bold text-slate-900">
                  <span className="text-orange-600">Click to upload photo</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            )}
            <input
              id="banner-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isLoading}
            />
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-700">
            Class Name *
          </Label>
          <Input
            placeholder="Introduction to Biology - Section A"
            className="h-10 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm"
            {...register('name')}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-xs text-red-500 font-medium ml-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Subject *
            </Label>
            <Controller
              name="subjectId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects?.map((s: any) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.subjectId && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.subjectId.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Teacher *
            </Label>
            <Controller
              name="teacherId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm">
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers?.map(t => (
                      <SelectItem key={t.id} value={t.id.toString()}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.teacherId && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.teacherId.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Capacity *
            </Label>
            <Input
              type="number"
              placeholder="30"
              className="h-10 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm"
              {...register('capacity', { valueAsNumber: true })}
              disabled={isLoading}
            />
            {errors.capacity && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.capacity.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Status *</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-700">
            Description *
          </Label>
          <Textarea
            placeholder="Brief description about the class"
            className="min-h-[80px] rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm resize-none"
            {...register('description')}
            disabled={isLoading}
          />
          {errors.description && (
            <p className="text-xs text-red-500 font-medium ml-1">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 h-11 rounded-xl font-bold border-slate-200"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-[2] h-11 bg-emerald-400 hover:bg-emerald-500 text-emerald-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-100"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" className="text-emerald-950" />
              <span>
                {isUploading ? 'Uploading Banner...' : 'Creating Class...'}
              </span>
            </div>
          ) : (
            'Create Class'
          )}
        </Button>
      </div>
    </form>
  );
};
