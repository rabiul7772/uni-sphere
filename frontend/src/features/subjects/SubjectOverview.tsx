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
      <Card className="border-slate-100 shadow-sm transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-20" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (!subject) return null;

  return (
    <Card className="border-slate-100 shadow-sm transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold text-slate-900">
          Subject Overview
        </CardTitle>
        <span className="text-sm font-semibold text-slate-400">
          {subject.code}
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-slate-600">
          {subject.description || 'No description available for this subject.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default SubjectOverview;
