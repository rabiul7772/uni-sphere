import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { type Department } from '@/services/departments/apiDepartments';
import { useUpdateDepartment } from '@/hooks/departments/useDepartments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const editDepartmentSchema = z.object({
  name: z.string().min(2, 'Department name must be at least 2 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
});

type EditDepartmentFormValues = z.infer<typeof editDepartmentSchema>;

interface EditDepartmentFormProps {
  department: Department;
  onClose: () => void;
}

const EditDepartmentForm = ({
  department,
  onClose
}: EditDepartmentFormProps) => {
  const { mutate, isPending } = useUpdateDepartment(department.id);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditDepartmentFormValues>({
    resolver: zodResolver(editDepartmentSchema),
    defaultValues: {
      name: department.name,
      description: department.description || ''
    }
  });

  const onSubmit = (data: EditDepartmentFormValues) => {
    mutate(data, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="code">Department Code</Label>
        <div className="relative group">
          <Input
            id="code"
            value={department.code}
            readOnly
            className="bg-slate-50 cursor-not-allowed border-red-200 focus-visible:ring-red-500"
          />
          <div className="absolute inset-0 cursor-not-allowed z-10 flex items-center justify-end pr-3 pointer-events-none">
            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100 uppercase">
              LOCKED
            </span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-semibold">
          Department code cannot be changed after creation.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Department Name</Label>
        <Input
          id="name"
          placeholder="e.g. Computer Science"
          disabled={isPending}
          className="rounded-lg border-slate-200"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-destructive font-medium">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter department description..."
          disabled={isPending}
          className="min-h-[120px] rounded-lg border-slate-200 resize-none"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-xs text-destructive font-medium">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="rounded-lg border-slate-200"
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white min-w-[100px]"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  );
};

export default EditDepartmentForm;
