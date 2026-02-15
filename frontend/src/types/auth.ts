export interface UserDetail {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'teacher';
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
  classes?: Array<{
    id: number;
    name: string;
    subject: {
      id: number;
      name: string;
      code: string;
      department: {
        id: number;
        name: string;
        code: string;
      };
    };
  }>;
  enrollments?: Array<{
    id: number;
    class: {
      id: number;
      name: string;
      subject: {
        id: number;
        name: string;
        code: string;
        department: {
          id: number;
          name: string;
          code: string;
        };
      };
    };
  }>;
}
