import {
  AreaChartCard,
  BarChartCard,
  PieChartCard
} from '@/features/dashboard/components/DashboardCharts';
import DashboardSkeleton from '@/features/dashboard/components/DashboardSkeleton';
import RecentClasses from '@/features/dashboard/components/RecentClasses';
import StatCard from '@/features/dashboard/components/StatCard';
import useChartData from '@/hooks/dashboard/useChartData';
import useDashboardStats from '@/hooks/dashboard/useDashboardStats';
import useRecentClasses from '@/hooks/dashboard/useRecentClasses';
import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Users
} from 'lucide-react';

const Home = () => {
  const { stats, isStatsLoading } = useDashboardStats();

  const { recentClasses, isClassesLoading } = useRecentClasses();

  const { chartData, isChartsLoading } = useChartData();

  const isLoading = isStatsLoading || isClassesLoading || isChartsLoading;

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your institution.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Departments"
          value={stats?.totalDepartments || 0}
          icon={LayoutDashboard}
        />
        <StatCard
          title="Total Subjects"
          value={stats?.totalSubjects || 0}
          icon={BookOpen}
        />
        <StatCard
          title="Total Teachers"
          value={stats?.totalTeachers || 0}
          icon={Users}
        />
        <StatCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={GraduationCap}
        />
        <StatCard
          title="Total Enrollments"
          value={stats?.totalEnrollments || 0}
          icon={ClipboardList}
        />
        <StatCard
          title="Active Classes"
          value={stats?.totalClasses || 0}
          icon={CalendarDays}
        />
      </div>

      {/* Recent Classes & Enrollment Distribution */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentClasses classes={recentClasses} />
        <PieChartCard
          title="Enrollment Distribution"
          data={chartData?.enrollmentDistribution || []}
        />
      </div>

      {/* Other Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <AreaChartCard
          title="Subjects per Department (Top 10)"
          data={chartData?.subjectsPerDept || []}
          xKey="name"
          yKey="subjectCount"
          label="Subjects"
        />
        <BarChartCard
          title="Enrollments per Subject (Top 10)"
          data={chartData?.enrollmentsPerSubject || []}
          xKey="name"
          yKey="enrollmentCount"
          label="Enrollments"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-1">
        <AreaChartCard
          title="Classes per Subject (Top 10)"
          data={chartData?.classesPerSubject || []}
          xKey="name"
          yKey="classCount"
          label="Classes"
        />
      </div>
    </div>
  );
};

export default Home;
