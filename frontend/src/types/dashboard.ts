export interface DashboardStats {
  totalDepartments: number;
  totalSubjects: number;
  totalTeachers: number;
  totalStudents: number;
  totalEnrollments: number;
  totalClasses: number;
}

export interface RecentClass {
  id: number;
  name: string;
  bannerUrl: string | null;
  status: string;
  createdAt: string;
  teacher?: {
    name: string;
    avatarUrl: string | null;
  };
  subject?: {
    name: string;
  };
}

export interface ChartData {
  enrollmentDistribution: { name: string; value: number }[];
  subjectsPerDept: { name: string; subjectCount: number }[];
  enrollmentsPerSubject: { name: string; enrollmentCount: number }[];
  classesPerSubject: { name: string; classCount: number }[];
}
