// Department with full subjects array (used in detail view)
export interface Department {
  id: string;
  code: string;
  name: string;
  description: string | null;
  subjects?: Array<{
    id: string;
    name: string;
    code: string;
    description: string;
    classes: Array<{
      id: string;
      name: string;
      status: string;
      teacher: {
        id: string;
        fullName: string;
        email: string;
        avatar?: string;
        role: string;
      };
      subject: {
        id: string;
        name: string;
        code: string;
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
  }>;
  createdAt?: string;
  updatedAt?: string;
}

// Department with subjects count (used in list view)
export interface DepartmentSummary {
  id: string;
  code: string;
  name: string;
  description: string | null;
  subjects: number; // Count of subjects
  createdAt?: string;
  updatedAt?: string;
}

export interface NewDepartment {
  name: string;
  code: string;
  description: string;
  departmentId?: string; // Added optional just in case, though not in original
}
