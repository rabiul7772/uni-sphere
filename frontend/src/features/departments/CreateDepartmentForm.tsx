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
      <div className="space-y-1.5">
        <Label
          htmlFor="name"
          className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
        >
          Department Name *
        </Label>
        <Input
          id="name"
          placeholder="e.g. Computer Science"
          disabled={isPending}
          className="h-10 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-[11px] text-destructive font-medium ml-1 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="code"
          className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
        >
          Department Code *
        </Label>
        <Input
          id="code"
          placeholder="e.g. DEPT-CS"
          disabled={isPending}
          className="h-10 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm uppercase"
          {...register('code')}
        />
        {errors.code && (
          <p className="text-[11px] text-destructive font-medium ml-1 mt-1">
            {errors.code.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="description"
          className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
        >
          Description *
        </Label>
        <Textarea
          id="description"
          placeholder="Enter department description..."
          disabled={isPending}
          className="min-h-[100px] rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm resize-none"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-[11px] text-destructive font-medium ml-1 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          className="h-10 px-5 font-bold rounded-xl border-slate-200"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="h-10 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/10 transition-all min-w-[120px]"
        >
          {isPending ? (
            <Spinner size="sm" className="mr-2 h-4 w-4 p-0 text-white" />
          ) : null}
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};
