import { LoginForm } from '@/features/auth/LoginForm';
import { UserCircle } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-3xl shadow-xl shadow-primary/5 p-6 border border-border">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-12 w-12 bg-primary rounded-xl mb-3 text-primary-foreground shadow-lg shadow-primary/20">
            <UserCircle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            Welcome Back
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-2">
            Log in to your UniSphere account to continue
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
