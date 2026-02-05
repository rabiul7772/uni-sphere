import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SubjectDepartmentProps {
  department: {
    id: string;
    name: string;
    code: string;
  };
}

const SubjectDepartment = ({ department }: SubjectDepartmentProps) => {
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
