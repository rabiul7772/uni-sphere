import { BookOpen, Layers, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

import { Skeleton } from '@/components/ui/skeleton';

interface DepartmentStatsProps {
  description?: string | null;
  subjectsCount?: number;
  classesCount?: number;
  enrolledStudentsCount?: number;
  isLoading?: boolean;
}

const DepartmentStats = ({
  description,
  subjectsCount = 0,
  classesCount = 0,
  enrolledStudentsCount = 0,
  isLoading = false
}: DepartmentStatsProps) => {
  return (
    <Card className="section-card">
      <CardContent className="p-6 space-y-6">
        <div>
          <h2 className="section-card-title">Overview</h2>
          <div className="mt-2 section-card-description">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ) : (
              description || 'No description available for this department.'
            )}
          </div>
        </div>

        <div className="detail-grid-3">
          <StatCard
            label="Total Subjects"
            value={subjectsCount}
            icon={<BookOpen className="stat-card-icon" />}
            isLoading={isLoading}
          />
          <StatCard
            label="Total Classes"
            value={classesCount}
            icon={<Layers className="stat-card-icon" />}
            isLoading={isLoading}
          />
          <StatCard
            label="Total Enrollments"
            value={enrolledStudentsCount}
            icon={<Users className="stat-card-icon" />}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const StatCard = ({
  label,
  value,
  icon,
  isLoading
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  isLoading?: boolean;
}) => (
  <Card className="stat-card">
    <CardContent className="stat-card-content">
      <div className="space-y-1">
        <p className="stat-card-label">{label}</p>
        {isLoading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <p className="stat-card-value">{value}</p>
        )}
      </div>
      {icon}
    </CardContent>
  </Card>
);

export default DepartmentStats;
