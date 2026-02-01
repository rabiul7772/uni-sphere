import { LoginForm } from '@/features/auth/LoginForm';
import { UserCircle } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-12 w-12 bg-indigo-600 rounded-xl mb-3 text-white shadow-lg shadow-indigo-100">
            <UserCircle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">
            Welcome Back
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Log in to your UniSphere account to continue
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
