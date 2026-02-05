import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router';
import { colors } from '@/constants';

interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
}

interface FacultyDepartmentsProps {
  departments: Department[];
  userName: string;
}

const getDepartmentColor = (id: number) => {
  return colors[id % colors.length];
};

const FacultyDepartments = ({
  departments,
  userName
}: FacultyDepartmentsProps) => {
  const navigate = useNavigate();

  return (
    <Card className="border-slate-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
        <CardTitle className="text-lg font-bold text-slate-900">
          Departments
        </CardTitle>

        <span className="text-sm font-semibold text-slate-400">
          {departments.length}
        </span>
      </CardHeader>
      <p className="text-slate-500 text-sm px-4">
        Departments tied to {userName} based on classes and enrollments.
      </p>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-50 hover:bg-transparent">
              <TableHead className="font-bold text-slate-900">Code</TableHead>
              <TableHead className="font-bold text-slate-900">
                Department
              </TableHead>
              <TableHead className="font-bold text-slate-900">
                Description
              </TableHead>
              <TableHead className="text-right font-bold text-slate-900 pr-8">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-slate-500"
                >
                  No departments found.
                </TableCell>
              </TableRow>
            ) : (
              departments.map(dept => (
                <TableRow
                  key={dept.id}
                  className="border-slate-50 hover:bg-slate-50/50"
                >
                  <TableCell className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getDepartmentColor(
                        dept.id
                      )}`}
                    >
                      {dept.code}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-700 py-4">
                    {dept.name}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm py-4 max-w-[400px] truncate">
                    {dept.description || 'No description available'}
                  </TableCell>
                  <TableCell className="text-right pr-8 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg border-slate-200 text-xs font-semibold text-slate-600 bg-white"
                      onClick={() => navigate(`/departments/${dept.id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FacultyDepartments;
