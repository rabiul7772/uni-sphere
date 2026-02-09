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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
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
  const [currentPage, setCurrentPage] = useState(1);

  const totalStudents = students?.length || 0;

  // Calculate pagination
  const startIndex = (currentPage - 1) * SUB_TABLE_PAGE_SIZE;
  const endIndex = startIndex + SUB_TABLE_PAGE_SIZE;
  const paginatedStudents = students?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="border rounded-xl bg-card overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-bold">Enrolled Students</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[400px]">Student</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="p-12 border rounded-xl bg-card text-center">
        <p className="text-muted-foreground">No students enrolled yet.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-bold">Enrolled Students</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[400px]">Student</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedStudents?.map(student => (
            <TableRow key={student.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={student.avatarUrl || ''}
                      alt={student.name}
                    />
                    <AvatarFallback>
                      {student.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{student.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {student.email}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Link to={`/faculty/${student.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
    </div>
  );
}
