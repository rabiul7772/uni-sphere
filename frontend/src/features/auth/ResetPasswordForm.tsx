import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams, Link } from 'react-router';
import { useResetPassword } from '@/hooks/auth/useAuth';
import { Spinner } from '@/components/ui/spinner';
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ErrorMessage } from '@/components/ui/error-message';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm password is required')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm = () => {
  const { token } = useParams();
  const { mutate, isPending, isSuccess, error } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = (data: ResetPasswordValues) => {
    if (!token) return;
    mutate({ token, password: data.password });
  };

  if (error)
    return (
      <ErrorMessage
        message={
          error?.message || 'Failed to reset password. Please try again.'
        }
      />
    );

  if (isSuccess) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Password Reset!</h2>
        <p className="text-sm text-slate-600">
          Your password has been successfully reset. You can now log in with
          your new password.
        </p>
        <Button
          asChild
          className="mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 w-full"
        >
          <Link to="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-600 ml-1">
            New Password
          </Label>
          <div className="relative">
            <Input
              type="password"
              placeholder="••••••••"
              className="pl-9 h-10 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all shadow-sm text-sm"
              {...register('password')}
              disabled={isPending}
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          {errors.password && (
            <p className="text-[10px] text-red-500 font-bold ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-600 ml-1">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              type="password"
              placeholder="••••••••"
              className="pl-9 h-10 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all shadow-sm text-sm"
              {...register('confirmPassword')}
              disabled={isPending}
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          {errors.confirmPassword && (
            <p className="text-[10px] text-red-500 font-bold ml-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-100 transition-all mt-2"
        disabled={isPending || !token}
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" className="text-white" />
            <span className="text-sm">Resetting...</span>
          </div>
        ) : (
          <span>Reset Password</span>
        )}
      </Button>

      <div className="text-center mt-4">
        <Link
          to="/login"
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Login
        </Link>
      </div>
    </form>
  );
};
