import { useState } from 'react';
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
import Pagination from '@/components/shared/Pagination';

import { getDepartmentColor } from '@/lib/utils';
import { SUB_TABLE_PAGE_SIZE } from '@/constants';

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
  const [currentPage, setCurrentPage] = useState(1);

  const totalDepartments = departments.length;

  // Calculate pagination
  const startIndex = (currentPage - 1) * SUB_TABLE_PAGE_SIZE;
  const endIndex = startIndex + SUB_TABLE_PAGE_SIZE;
  const paginatedDepartments = departments.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <Card className="border-border shadow-sm bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-bold text-foreground">
            Departments
          </CardTitle>
          <Skeleton className="h-5 w-6" />
        </CardHeader>
        <Skeleton className="h-4 w-72 mx-4 mb-2" />
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent bg-muted/50">
                <TableHead className="font-bold text-foreground">
                  Code
                </TableHead>
                <TableHead className="font-bold text-foreground">
                  Department
                </TableHead>
                <TableHead className="font-bold text-foreground">
                  Description
                </TableHead>
                <TableHead className="text-right font-bold text-foreground pr-8">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map(i => (
                <TableRow key={i} className="border-border">
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
    <Card className="table-container border-border shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
        <CardTitle className="text-lg font-semibold text-foreground">
          Departments
        </CardTitle>

        <span className="text-sm font-semibold text-muted-foreground">
          {departments.length}
        </span>
      </CardHeader>
      <p className="text-muted-foreground text-sm px-4">
        Departments tied to {userName} based on classes and enrollments.
      </p>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="table-header-row">
              <TableHead>Code</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground font-medium"
                >
                  No departments found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedDepartments.map(dept => (
                <TableRow key={dept.id}>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getDepartmentColor(
                        Number(dept.id)
                      )}`}
                    >
                      {dept.code}
                    </span>
                  </TableCell>
                  <TableCell className="table-cell-primary">
                    {dept.name}
                  </TableCell>
                  <TableCell className="table-cell-secondary max-w-[400px] truncate">
                    {dept.description || 'No description available'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="table-action-btn"
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

        {totalDepartments > SUB_TABLE_PAGE_SIZE && !isLoading && (
          <div className="px-6 pb-6">
            <Pagination
              currentPage={currentPage}
              pageSize={SUB_TABLE_PAGE_SIZE}
              totalCount={totalDepartments}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FacultyDepartments;
