import { ForgotPasswordForm } from '@/features/auth/ForgotPasswordForm';
import { KeyRound } from 'lucide-react';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-12 w-12 bg-indigo-600 rounded-xl mb-3 text-white shadow-lg shadow-indigo-100">
            <KeyRound className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">
            Forgot Password
          </h1>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
