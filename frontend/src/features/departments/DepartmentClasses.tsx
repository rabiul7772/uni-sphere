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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import Pagination from '@/components/shared/Pagination';
import { SUB_TABLE_PAGE_SIZE } from '@/constants';

interface Class {
  id: string;
  name: string;
  status: string;
  teacher: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
  };
  subject: {
    id: string;
    name: string;
    code: string;
  };
}

interface Subject {
  classes: Class[];
}

interface DepartmentClassesProps {
  subjects: Subject[];
  isLoading?: boolean;
}

const DepartmentClasses = ({
  subjects,
  isLoading = false
}: DepartmentClassesProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const classes = subjects.flatMap(sub => sub.classes);
  const totalClasses = classes.length;

  // Calculate pagination
  const startIndex = (currentPage - 1) * SUB_TABLE_PAGE_SIZE;
  const endIndex = startIndex + SUB_TABLE_PAGE_SIZE;
  const paginatedClasses = classes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="border-slate-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-bold">Classes</CardTitle>
        <span className="text-xs font-semibold text-slate-400">
          {totalClasses}
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-50 hover:bg-transparent">
              <TableHead className="font-bold text-slate-900">Class</TableHead>
              <TableHead className="font-bold text-slate-900">
                Subject
              </TableHead>
              <TableHead className="font-bold text-slate-900">
                Teacher
              </TableHead>
              <TableHead className="font-bold text-slate-900">Status</TableHead>
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
                      <Skeleton className="h-6 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-40" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex flex-col gap-1">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20" />
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Skeleton className="ml-auto h-8 w-16" />
                    </TableCell>
                  </TableRow>
                ))
              : paginatedClasses.map(cls => (
                  <TableRow
                    key={cls.id}
                    className="border-slate-50 hover:bg-slate-50/50"
                  >
                    <TableCell className="py-4 font-semibold text-slate-700">
                      {cls.name}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {cls.subject.name} ({cls.subject.code})
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={cls.teacher.avatarUrl} />
                          <AvatarFallback className="bg-slate-100 text-xs text-slate-600">
                            {cls.teacher?.fullName
                              ?.split(' ')
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-700">
                            {cls.teacher?.fullName}
                          </span>
                          <span className="text-xs text-slate-400">
                            {cls.teacher?.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 font-medium"
                      >
                        {cls.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-lg border-slate-200 text-xs font-medium text-slate-600"
                        onClick={() => navigate(`/classes/${cls.id}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        {totalClasses > SUB_TABLE_PAGE_SIZE && !isLoading && (
          <div className="px-6 pb-6">
            <Pagination
              currentPage={currentPage}
              pageSize={SUB_TABLE_PAGE_SIZE}
              totalCount={totalClasses}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DepartmentClasses;
