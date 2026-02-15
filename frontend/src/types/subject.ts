export interface Subject {
  id: string;
  code: string;
  name: string;
  description: string;
  departmentId: string;
  department: {
    id: string;
    name: string;
    code: string;
  };
  classes: Array<{
    id: string;
    name: string;
    status: 'active' | 'inactive';
    teacher: {
      id: string;
      fullName: string;
      email: string;
      avatarUrl?: string;
    };
    enrollments: Array<{
      id: string;
      student: {
        id: string;
        fullName: string;
        email: string;
        avatar?: string;
        role: string;
      };
    }>;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewSubject {
  name: string;
  code: string;
  description: string;
  departmentId: number | string;
}
