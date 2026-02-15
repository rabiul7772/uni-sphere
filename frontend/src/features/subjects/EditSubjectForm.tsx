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
      <div className="space-y-1.5">
        <Label
          htmlFor="code"
          className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
        >
          Subject Code
        </Label>
        <div className="relative group">
          <Input
            id="code"
            value={subject.code}
            readOnly
            className="h-10 rounded-xl border-red-100 bg-red-50/30 cursor-not-allowed focus-visible:ring-red-500 shadow-sm font-semibold text-red-900"
          />
          <div className="absolute inset-0 cursor-not-allowed z-10 flex items-center justify-end pr-3 pointer-events-none">
            <span className="text-[10px] font-bold text-red-500 bg-white px-2 py-0.5 rounded-lg border border-red-100 shadow-sm uppercase">
              LOCKED
            </span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-semibold ml-1">
          Subject code cannot be changed after creation.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="name"
          className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
        >
          Subject Name *
        </Label>
        <Input
          id="name"
          placeholder="e.g. Programming"
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
          htmlFor="description"
          className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
        >
          Description *
        </Label>
        <Textarea
          id="description"
          placeholder="Enter subject description..."
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
          className="h-10 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/10 transition-all min-w-[140px]"
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
