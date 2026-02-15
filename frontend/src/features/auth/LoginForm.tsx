import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';
import { useLogin } from '@/hooks/auth/useAuth';
import { Spinner } from '@/components/ui/spinner';
import { Mail, Lock, LogIn } from 'lucide-react';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginSchema = z.object({
  email: z
    .email('Invalid email format')
    .regex(emailRegex, 'Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'rabiulakand@gmail.com',
      password: '11223344'
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-3">
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

        <div className="space-y-1">
          <div className="flex items-center justify-between ml-1">
            <Label className="text-sm font-bold text-slate-800 dark:text-muted-foreground">
              Password
            </Label>
            <Link
              to="/forgot-password"
              className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="••••••••"
              className="pl-9 h-10 rounded-xl border-border bg-muted/50 focus:bg-card focus:border-primary focus:ring-primary transition-all shadow-sm text-sm"
              {...register('password')}
              disabled={isPending}
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          {errors.password && (
            <p className="text-[10px] text-red-500 font-bold ml-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base shadow-lg shadow-primary/20 transition-all mt-2"
        disabled={isPending}
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" className="text-primary-foreground" />
            <span className="text-sm">Logging In...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            <span>Log In</span>
          </div>
        )}
      </Button>

      <div className="text-center mt-4">
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-primary font-bold hover:text-primary/80 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};
