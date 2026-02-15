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
      <div className="detail-header">
        <div className="detail-breadcrumb">
          <SkeletonList count={4} className="h-4 w-4" />
        </div>
        <div className="detail-title-group">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="detail-header">
      <nav className="detail-breadcrumb">
        <Home
          className="h-4 w-4 detail-breadcrumb-link"
          onClick={() => navigate('/')}
        />
        <ChevronRight className="h-4 w-4" />
        <span
          className="detail-breadcrumb-link"
          onClick={() => navigate('/faculty')}
        >
          Faculty
        </span>
        <ChevronRight className="h-4 w-4" />
        <span className="detail-breadcrumb-current">Show</span>
      </nav>

      <div className="detail-title-row">
        <div className="detail-title-group">
          <Button
            variant="ghost"
            size="icon"
            className="detail-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </Button>
          <h1 className="detail-title">{user.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default FacultyHeader;
