import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateSubject } from '@/hooks/subjects/useSubjects';
import { type Subject } from '@/services/subjects/apiSubjects';
import { Spinner } from '@/components/ui/spinner';

const subjectSchema = z.object({
  name: z.string().min(2, 'Subject name must be at least 2 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

interface EditSubjectFormProps {
  subject: Subject;
  onSuccess: () => void;
  onCancel: () => void;
}

export const EditSubjectForm = ({
  subject,
  onSuccess,
  onCancel
}: EditSubjectFormProps) => {
  const { mutate, isPending } = useUpdateSubject(subject.id);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: subject.name,
      description: subject.description
    }
  });

  const onSubmit = (data: SubjectFormValues) => {
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
          htmlFor="code"
          className="text-[15px] font-semibold text-slate-700"
        >
          Subject Code
        </Label>
        <div className="relative group">
          <Input
            id="code"
            value={subject.code}
            readOnly
            className="h-11 border border-red-200 shadow-sm bg-slate-50 cursor-not-allowed focus-visible:ring-red-500"
          />
          <div className="absolute inset-0 cursor-not-allowed z-10 flex items-center justify-end pr-3 pointer-events-none">
            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100 uppercase">
              LOCKED
            </span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400">
          Subject code cannot be changed after creation.
        </p>
      </div>

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
          htmlFor="description"
          className="text-[15px] font-semibold text-slate-700"
        >
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Enter subject description..."
          disabled={isPending}
          className="min-h-[100px] border border-slate-300 shadow-sm resize-none"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-destructive font-medium">
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
          className="h-11 px-5 text-base"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-base min-w-[140px]"
        >
          {isPending ? (
            <Spinner size="sm" className="mr-2 h-4 w-4 p-0 text-white" />
          ) : null}
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};

export default EditSubjectForm;
