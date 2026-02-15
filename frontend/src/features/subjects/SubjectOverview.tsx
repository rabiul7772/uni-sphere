import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Subject } from '@/services/subjects/apiSubjects';

interface SubjectOverviewProps {
  subject?: Subject;
  isLoading?: boolean;
}

const SubjectOverview = ({
  subject,
  isLoading = false
}: SubjectOverviewProps) => {
  if (isLoading) {
    return (
      <Card className="section-card">
        <CardHeader className="section-card-header">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-20" />
        </CardHeader>
        <CardContent className="section-card-content space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (!subject) return null;

  return (
    <Card className="section-card">
      <CardHeader className="section-card-header">
        <CardTitle className="section-card-title">Subject Overview</CardTitle>
        <span className="section-card-badge">{subject.code}</span>
      </CardHeader>
      <CardContent className="section-card-content">
        <p className="section-card-description">
          {subject.description || 'No description available for this subject.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default SubjectOverview;
