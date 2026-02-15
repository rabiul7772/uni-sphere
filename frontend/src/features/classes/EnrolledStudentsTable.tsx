import { useState } from 'react';
import type { Class } from '@/services/classes/apiClasses';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import Pagination from '@/components/shared/Pagination';
import { SUB_TABLE_PAGE_SIZE } from '@/constants';

interface EnrolledStudentsTableProps {
  students?: Class['enrolledStudents'];
  isLoading?: boolean;
}

export default function EnrolledStudentsTable({
  students,
  isLoading
}: EnrolledStudentsTableProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalStudents = students?.length || 0;

  const startIndex = (currentPage - 1) * SUB_TABLE_PAGE_SIZE;
  const endIndex = startIndex + SUB_TABLE_PAGE_SIZE;
  const paginatedStudents = students?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <Card className="border-border shadow-sm bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-8" />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent bg-muted/50">
                <TableHead className="font-bold text-foreground">
                  Student
                </TableHead>
                <TableHead className="text-right font-bold text-foreground pr-8">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i} className="border-border">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Skeleton className="ml-auto h-8 w-16" />
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Enrolled Students
        </CardTitle>
        <span className="text-sm font-semibold text-muted-foreground">
          {totalStudents}
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="table-header-row">
                <TableHead>Student</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!students || students.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="h-24 text-center text-muted-foreground font-medium"
                  >
                    No students enrolled yet.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedStudents?.map(student => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="table-avatar">
                          <AvatarImage
                            src={student.avatarUrl || ''}
                            alt={student.name}
                          />
                          <AvatarFallback className="bg-muted text-xs text-muted-foreground font-semibold">
                            {student.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="table-cell-primary">
                            {student.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {student.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="table-action-btn"
                        onClick={() => navigate(`/faculty/${student.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalStudents > SUB_TABLE_PAGE_SIZE && !isLoading && (
          <div className="px-6 pb-6">
            <Pagination
              currentPage={currentPage}
              pageSize={SUB_TABLE_PAGE_SIZE}
              totalCount={totalStudents}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
