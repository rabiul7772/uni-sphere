import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SubjectDepartmentProps {
  department?: {
    id: string;
    name: string;
    code: string;
  };
  isLoading?: boolean;
}

const SubjectDepartment = ({
  department,
  isLoading = false
}: SubjectDepartmentProps) => {
  if (isLoading) {
    return (
      <Card className="border-slate-100 shadow-sm transition-all duration-200">
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-28" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-64" />
        </CardContent>
      </Card>
    );
  }

  if (!department) return null;

  return (
    <Card className="border-slate-100 shadow-sm transition-all duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-slate-900">
          Department
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <h3 className="text-base font-bold text-slate-900">
          {department.name}
        </h3>
        <p className="text-sm text-slate-500">
          Associated {department.code} department information and resources.
        </p>
      </CardContent>
    </Card>
  );
};

export default SubjectDepartment;
