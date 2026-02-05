import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useClasses } from '@/hooks/classes/useClasses';
import { useUser } from '@/hooks/auth/useAuth';
import { useEnrollInClass } from '@/hooks/enrollments/useEnrollments';
import { Spinner } from '@/components/ui/spinner';
import type { EnrollmentDetails } from '@/services/enrollments/apiEnrollments';

const enrollmentSchema = z.object({
  classId: z.string().min(1, 'Please select a class')
});

type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;

interface EnrollmentFormProps {
  onSuccess: (details: EnrollmentDetails) => void;
}

export const EnrollmentForm = ({ onSuccess }: EnrollmentFormProps) => {
  const { data: currentUser } = useUser();
  const { classes, isPending: classesLoading } = useClasses();
  const { mutate: enroll, isPending: isEnrolling } = useEnrollInClass();

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      classId: ''
    }
  });

  const onSubmit = (data: EnrollmentFormValues) => {
    if (!currentUser) return;
    enroll(
      {
        studentId: currentUser.id,
        classId: parseInt(data.classId)
      },
      {
        onSuccess: details => onSuccess(details)
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-2xl mx-auto">
      <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-900">Enrollment Form</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-700">Class *</Label>
          <Controller
            name="classId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isEnrolling || classesLoading}
              >
                <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes?.map((cls: any) => (
                    <SelectItem key={cls.id} value={cls.id.toString()}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.classId && (
            <p className="text-xs text-red-500 font-medium ml-1">
              {errors.classId.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-700">Student</Label>
          <Input
            value={currentUser?.email || ''}
            readOnly
            disabled
            className="h-11 rounded-xl border-slate-200 bg-slate-100 text-slate-600 shadow-sm"
          />
        </div>

        <Button
          type="submit"
          disabled={isEnrolling || classesLoading}
          className="h-11 bg-emerald-400 hover:bg-emerald-500 text-emerald-950 font-bold px-8 rounded-xl transition-all shadow-lg shadow-emerald-100 disabled:opacity-50 disabled:shadow-none"
        >
          {isEnrolling ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" className="text-emerald-950" />
              <span>Enrolling...</span>
            </div>
          ) : (
            'Enroll'
          )}
        </Button>
      </form>
    </div>
  );
};
