export interface Class {
  id: number;
  name: string;
  bannerUrl: string | null;
  subjectId: number;
  teacherId: number;
  capacity: number;
  status: 'active' | 'inactive';
  description: string;
  createdAt: string;
  updatedAt: string;
  subject?: {
    id: number;
    name: string;
    code: string;
    description: string;
  };
  department?: {
    id: number;
    name: string;
    description: string;
  };
  teacher?: {
    id: number;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
  enrolledStudents?: {
    id: number;
    name: string;
    email: string;
    avatarUrl: string | null;
    enrolledAt: string;
  }[];
}
