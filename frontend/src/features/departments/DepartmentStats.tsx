import { BookOpen, Layers, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DepartmentStatsProps {
  description: string | null;
  subjectsCount: number;
  classesCount: number;
  enrolledStudentsCount: number;
}

const DepartmentStats = ({
  description,
  subjectsCount,
  classesCount,
  enrolledStudentsCount
}: DepartmentStatsProps) => {
  return (
    <Card className="border-slate-100 bg-white/50 backdrop-blur-sm">
      <CardContent className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Overview</h2>
          <p className="mt-2 text-slate-600 leading-relaxed font-medium">
            {description || 'No description available for this department.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard
            label="Total Subjects"
            value={subjectsCount}
            icon={<BookOpen className="h-5 w-5 text-slate-400 font-semibold" />}
          />
          <StatCard
            label="Total Classes"
            value={classesCount}
            icon={<Layers className="h-5 w-5 text-slate-400 font-semibold" />}
          />
          <StatCard
            label="Enrolled Students"
            value={enrolledStudentsCount}
            icon={<Users className="h-5 w-5 text-slate-400 font-semibold" />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const StatCard = ({
  label,
  value,
  icon
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <Card className="border-slate-100 bg-white shadow-sm">
    <CardContent className="flex items-center justify-between p-4">
      <div className="space-y-1">
        <p className="text-sm font-bold text-slate-900">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
      {icon}
    </CardContent>
  </Card>
);

export default DepartmentStats;
