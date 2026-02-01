import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useCreateSubject } from '@/hooks/subjects/useSubjects';
import { useDepartments } from '@/hooks/departments/useDepartments';
import { Spinner } from '@/components/ui/spinner';

const subjectSchema = z.object({
  name: z.string().min(2, 'Subject name must be at least 2 characters long'),
  code: z
    .string()
    .min(4, 'Subject code must be at least 4 characters long')
    .max(10, 'Subject code must be at most 10 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  departmentId: z.string().min(1, 'Department is required')
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

interface CreateSubjectFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreateSubjectForm = ({
  onSuccess,
  onCancel
}: CreateSubjectFormProps) => {
  const { data: departments, isPending: isLoadingDepts } = useDepartments();
  const { mutate, isPending } = useCreateSubject();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      departmentId: ''
    }
  });

  const onSubmit = (data: SubjectFormValues) => {
    mutate(
      {
        ...data,
        departmentId: Number(data.departmentId)
      },
      {
        onSuccess: () => {
          onSuccess();
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-2.5">
        <Label
          htmlFor="name"
          className="text-[15px] font-semibold text-slate-700"
        >
          Subject Name
        </Label>
        <Input
          id="name"
          placeholder="e.g. Programming"
          disabled={isPending}
          className="h-11 border border-slate-300 shadow-sm"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-destructive font-medium">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <Label
          htmlFor="code"
          className="text-[15px] font-semibold text-slate-700"
        >
          Code
        </Label>
        <Input
          id="code"
          placeholder="e.g. PROG-101"
          disabled={isPending}
          className="h-11 border border-slate-300 shadow-sm uppercase"
          {...register('code')}
        />
        {errors.code && (
          <p className="text-sm text-destructive font-medium">
            {errors.code.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <Label
          htmlFor="departmentId"
          className="text-[15px] font-semibold text-slate-700"
        >
          Department
        </Label>
        <Controller
          name="departmentId"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isPending || isLoadingDepts}
            >
              <SelectTrigger className="h-11 border border-slate-300 shadow-sm">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments?.map(dept => (
                  <SelectItem key={dept.id} value={dept.id.toString()}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.departmentId && (
          <p className="text-sm text-destructive font-medium">
            {errors.departmentId.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <Label
          htmlFor="description"
          className="text-[15px] font-semibold text-slate-700"
        >
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Enter subject description..."
          disabled={isPending}
          className="min-h-[80px] border border-slate-300 shadow-sm resize-none"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-destructive font-medium">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          className="h-11 px-5 text-base"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-base"
        >
          {isPending ? (
            <Spinner size="sm" className="mr-2 h-4 w-4 p-0 text-white" />
          ) : null}
          {isPending ? 'Creating...' : 'Create Subject'}
        </Button>
      </div>
    </form>
  );
};
