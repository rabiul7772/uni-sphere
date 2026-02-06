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
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router';

import { getDepartmentColor } from '@/lib/utils';

interface SimpleDepartment {
  id: number | string;
  name: string;
  code: string;
  description?: string | null;
}

interface FacultyDepartmentsProps {
  departments: SimpleDepartment[];
  userName: string;
  isLoading?: boolean;
}

const FacultyDepartments = ({
  departments,
  userName,
  isLoading = false
}: FacultyDepartmentsProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className="border-slate-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-bold text-slate-900">
            Departments
          </CardTitle>
          <Skeleton className="h-5 w-6" />
        </CardHeader>
        <Skeleton className="h-4 w-72 mx-4 mb-2" />
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-50 hover:bg-transparent">
                <TableHead className="font-bold text-slate-900">Code</TableHead>
                <TableHead className="font-bold text-slate-900">Department</TableHead>
                <TableHead className="font-bold text-slate-900">Description</TableHead>
                <TableHead className="text-right font-bold text-slate-900 pr-8">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map(i => (
                <TableRow key={i} className="border-slate-50">
                  <TableCell className="py-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell className="text-right pr-8 py-4">
                    <Skeleton className="h-8 w-14 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

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
                        Number(dept.id)
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
