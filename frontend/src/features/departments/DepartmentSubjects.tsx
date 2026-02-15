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
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router';
import Pagination from '@/components/shared/Pagination';
import { SUB_TABLE_PAGE_SIZE } from '@/constants';

import { Skeleton } from '@/components/ui/skeleton';

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
}

interface DepartmentSubjectsProps {
  subjects: Subject[];
  isLoading?: boolean;
}

const DepartmentSubjects = ({
  subjects,
  isLoading = false
}: DepartmentSubjectsProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalSubjects = subjects.length;

  // Calculate pagination
  const startIndex = (currentPage - 1) * SUB_TABLE_PAGE_SIZE;
  const endIndex = startIndex + SUB_TABLE_PAGE_SIZE;
  const paginatedSubjects = subjects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="table-container border-border shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Subjects
        </CardTitle>
        <span className="text-sm font-semibold text-muted-foreground">
          {subjects.length}
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="table-header-row">
                <TableHead className="w-[150px]">Code</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-6 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-64" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="ml-auto h-8 w-16" />
                      </TableCell>
                    </TableRow>
                  ))
                : paginatedSubjects.map(subject => (
                    <TableRow key={subject.id}>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20 font-bold border-none"
                        >
                          {subject.code}
                        </Badge>
                      </TableCell>
                      <TableCell className="table-cell-primary">
                        {subject.name}
                      </TableCell>
                      <TableCell className="table-cell-secondary max-w-[400px] truncate text-center">
                        {subject.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="table-action-btn"
                          onClick={() => navigate(`/subjects/${subject.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>

        {totalSubjects > SUB_TABLE_PAGE_SIZE && !isLoading && (
          <div className="px-6 pb-6">
            <Pagination
              currentPage={currentPage}
              pageSize={SUB_TABLE_PAGE_SIZE}
              totalCount={totalSubjects}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DepartmentSubjects;
