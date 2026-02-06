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
    <Card className="border-slate-100 bg-white/50 backdrop-blur-sm">
      <CardContent className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Overview</h2>
          <div className="mt-2 text-slate-600 leading-relaxed font-medium">
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard
            label="Total Subjects"
            value={subjectsCount}
            icon={<BookOpen className="h-5 w-5 text-slate-400 font-semibold" />}
            isLoading={isLoading}
          />
          <StatCard
            label="Total Classes"
            value={classesCount}
            icon={<Layers className="h-5 w-5 text-slate-400 font-semibold" />}
            isLoading={isLoading}
          />
          <StatCard
            label="Enrolled Students"
            value={enrolledStudentsCount}
            icon={<Users className="h-5 w-5 text-slate-400 font-semibold" />}
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
  <Card className="border-slate-100 bg-white shadow-sm">
    <CardContent className="flex items-center justify-between p-4">
      <div className="space-y-1">
        <p className="text-sm font-bold text-slate-900">{label}</p>
        {isLoading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        )}
      </div>
      {icon}
    </CardContent>
  </Card>
);

export default DepartmentStats;
