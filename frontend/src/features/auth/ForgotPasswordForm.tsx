import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';
import { useForgotPassword } from '@/hooks/auth/useAuth';
import { Spinner } from '@/components/ui/spinner';
import { Mail, ArrowLeft } from 'lucide-react';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const forgotPasswordSchema = z.object({
  email: z
    .email('Invalid email format')
    .min(1, 'Email is required')
    .regex(emailRegex, 'Please enter a valid email address')
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const { mutate, isPending, isSuccess } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Check your email</h2>
        <p className="text-sm text-slate-600 dark:text-muted-foreground font-medium">
          We have sent a password reset link to your email address.
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-4 rounded-xl border-border hover:bg-muted"
        >
          <Link to="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label className="text-sm font-bold text-slate-800 dark:text-muted-foreground ml-1">
          Email Address
        </Label>
        <div className="relative">
          <Input
            placeholder="name@example.com"
            className="pl-9 h-10 rounded-xl border-border bg-muted/50 focus:bg-card focus:border-primary focus:ring-primary transition-all shadow-sm text-sm"
            {...register('email')}
            disabled={isPending}
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        {errors.email && (
          <p className="text-[10px] text-red-500 font-bold ml-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base shadow-lg shadow-primary/20 transition-all mt-2"
        disabled={isPending}
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" className="text-primary-foreground" />
            <span className="text-sm">Sending...</span>
          </div>
        ) : (
          <span>Send Reset Link</span>
        )}
      </Button>

      <div className="text-center mt-4">
        <Link
          to="/login"
          className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Login
        </Link>
      </div>
    </form>
  );
};
