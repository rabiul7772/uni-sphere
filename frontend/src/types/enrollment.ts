export interface EnrollmentDetails {
  id: number;
  class: {
    id: number;
    name: string;
    description: string;
  };
  subject: {
    name: string;
    code?: string; // Optional based on usage
  };
  department: {
    name: string;
  };
  teacher: {
    name: string;
    email: string;
  };
}
