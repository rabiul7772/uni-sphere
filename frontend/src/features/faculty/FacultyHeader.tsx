import { useNavigate } from 'react-router';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton, SkeletonList } from '@/components/ui/skeleton';
import type { UserDetail } from '@/services/users/apiUsers';

interface FacultyHeaderProps {
  user?: UserDetail;
  isLoading?: boolean;
}

const FacultyHeader = ({ user, isLoading = false }: FacultyHeaderProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <SkeletonList count={4} className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <Home
          className="h-4 w-4 cursor-pointer hover:text-slate-900"
          onClick={() => navigate('/')}
        />
        <ChevronRight className="h-4 w-4" />
        <span
          className="cursor-pointer hover:text-slate-900"
          onClick={() => navigate('/faculty')}
        >
          Faculty
        </span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-900">Show</span>
      </nav>

      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-slate-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default FacultyHeader;
