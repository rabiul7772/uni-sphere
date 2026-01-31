import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createDepartment } from '@/hooks/departments/useDepartments';
import { Spinner } from '@/components/ui/spinner';

const departmentSchema = z.object({
  name: z.string().min(2, 'Department name must be at least 2 characters long'),
  code: z
    .string()
    .min(4, 'Department code must be at least 4 characters long')
    .max(10, 'Department code must be at most 10 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

interface CreateDepartmentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreateDepartmentForm = ({
  onSuccess,
  onCancel
}: CreateDepartmentFormProps) => {
  const { mutate, isPending } = createDepartment();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema)
  });

  const onSubmit = (data: DepartmentFormValues) => {
    mutate(data, {
      onSuccess: () => {
        onSuccess();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-2.5">
        <Label
          htmlFor="name"
          className="text-[15px] font-semibold text-slate-700"
        >
          Department Name
        </Label>
        <Input
          id="name"
          placeholder="e.g. Computer Science"
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
          placeholder="e.g. CS"
          disabled={isPending}
          className="h-11 border border-slate-300 shadow-sm"
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
          htmlFor="description"
          className="text-[15px] font-semibold text-slate-700"
        >
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Enter department description..."
          disabled={isPending}
          className="min-h-[50px] border border-slate-300 shadow-sm"
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
          {isPending ? 'Creating...' : 'Create Department'}
        </Button>
      </div>
    </form>
  );
};
