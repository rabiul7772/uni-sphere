import { Navigate, Outlet } from 'react-router';
import { useUser } from '@/hooks/auth/useAuth';
import { Spinner } from '@/components/ui/spinner';

const ProtectedRoute = () => {
  const { data: user, isPending, error } = useUser();

  if (isPending) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
