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
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { logout } from '@/services/auth/apiAuth';
import { useNavigate } from 'react-router';

const enrollmentSchema = z.object({
  classId: z.string().min(1, 'Please select a class')
});

type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;

interface EnrollmentFormProps {
  onSuccess: (details: EnrollmentDetails) => void;
}

export const EnrollmentForm = ({ onSuccess }: EnrollmentFormProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: currentUser } = useUser();
  const { data: classesData, isPending: classesLoading } = useClasses({
    limit: 1000
  });

  const classes = classesData?.data || [];
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

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.removeQueries();
      toast.success('Logged out successfully');
      navigate('/signup');
    } catch {
      toast.error('Logout failed. Please try again.');
    }
  };

  if (currentUser && currentUser.role !== 'student') {
    return (
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden max-w-2xl mx-auto p-8 text-center py-12">
        <h2 className="text-xl font-bold text-foreground mb-2">
          Student Access Only
        </h2>
        <p className="text-muted-foreground">
          Enrollment is only available for students. Please sign up as a student
          to enroll in a class.
        </p>

        <Button
          variant="outline"
          className="mt-6 cursor-pointer font-bold text-primary hover:bg-primary/10 border-primary/40 h-11 px-8 rounded-xl shadow-sm transition-all"
          onClick={handleLogout}
        >
          Signup as a Student
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-slate-300 dark:border-border shadow-sm overflow-hidden max-w-2xl mx-auto">
      <div className="px-8 py-6 border-b border-border bg-muted/30">
        <h2 className="text-xl font-bold text-foreground">
          Enrollment Details
        </h2>
        <p className="text-sm text-slate-700 dark:text-foreground mt-1">
          Complete your class enrollment by selecting a class below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-2.5">
            <Label className="text-sm font-semibold text-slate-800 dark:text-foreground ml-1">
              Select Class <span className="text-destructive">*</span>
            </Label>
            <Controller
              name="classId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isEnrolling || classesLoading}
                >
                  <SelectTrigger className="h-14 rounded-xl border-slate-400 dark:border-border bg-muted/20 focus:bg-card focus:ring-2 focus:ring-primary/20 transition-all shadow-xs px-4 py-6">
                    <SelectValue placeholder="Select a class..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border shadow-md">
                    {classes?.map((cls: any) => (
                      <SelectItem
                        key={cls.id}
                        value={cls.id.toString()}
                        className="rounded-lg focus:bg-primary/10 focus:text-primary cursor-pointer"
                      >
                        <div className="flex flex-col py-0.5">
                          <span className="font-semibold">{cls.name}</span>
                          <span className="text-xs text-slate-600 dark:text-muted-foreground">
                            {cls.subject?.name} • {cls.teacher?.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.classId && (
              <p className="text-xs text-destructive font-medium ml-1">
                {errors.classId.message}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <Label className="text-sm font-semibold text-slate-800 dark:text-foreground ml-1">
              Student Information
            </Label>
            <div className="relative">
              <Input
                value={currentUser?.email || ''}
                readOnly
                disabled
                className="h-12 rounded-xl border-slate-400 dark:border-border bg-muted/10 text-foreground shadow-xs opacity-100 cursor-not-allowed pl-4"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-foreground/50">
                Verified Account
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <Button
            type="submit"
            disabled={isEnrolling || classesLoading}
            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none"
          >
            {isEnrolling ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" className="text-primary-foreground" />
                <span>Enrolling Student...</span>
              </div>
            ) : (
              'Confirm Enrollment'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="h-12 px-6 rounded-xl border-border font-semibold hover:bg-muted"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
