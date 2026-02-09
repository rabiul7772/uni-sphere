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
    <Card className="border-slate-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-bold">Subjects</CardTitle>
        <span className="text-xs font-semibold text-slate-400">
          {subjects.length}
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-50 hover:bg-transparent">
              <TableHead className="w-[150px] font-bold text-slate-900">
                Code
              </TableHead>
              <TableHead className="font-bold text-slate-900">
                Subject
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
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i} className="border-slate-50">
                    <TableCell className="py-4">
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-64" />
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Skeleton className="ml-auto h-8 w-16" />
                    </TableCell>
                  </TableRow>
                ))
              : paginatedSubjects.map(subject => (
                  <TableRow
                    key={subject.id}
                    className="border-slate-50 hover:bg-slate-50/50"
                  >
                    <TableCell className="py-4">
                      <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 font-medium"
                      >
                        {subject.code}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-700">
                      {subject.name}
                    </TableCell>
                    <TableCell className="text-slate-500 max-w-[400px] truncate">
                      {subject.description}
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-lg border-slate-200 text-xs font-medium text-slate-600"
                        onClick={() => navigate(`/subjects/${subject.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

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
