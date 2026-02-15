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
    <Card className="table-container border-border shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Classes
        </CardTitle>
        <span className="text-sm font-semibold text-muted-foreground">
          {totalClasses}
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="table-header-row">
                <TableHead>Class</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
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
                      <TableCell className="text-right">
                        <Skeleton className="ml-auto h-8 w-16" />
                      </TableCell>
                    </TableRow>
                  ))
                : paginatedClasses.map(cls => (
                    <TableRow key={cls.id}>
                      <TableCell className="table-cell-primary">
                        {cls.name}
                      </TableCell>
                      <TableCell className="table-cell-secondary">
                        {cls.subject.name} ({cls.subject.code})
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="table-avatar">
                            <AvatarImage src={cls.teacher.avatarUrl} />
                            <AvatarFallback className="bg-muted text-xs text-muted-foreground font-semibold">
                              {cls.teacher?.fullName
                                ?.split(' ')
                                .map(n => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="table-cell-primary">
                              {cls.teacher?.fullName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {cls.teacher?.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`rounded-lg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            cls.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                              : 'bg-muted text-muted-foreground border-border'
                          }`}
                          variant="outline"
                        >
                          {cls.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="table-action-btn"
                          onClick={() => navigate(`/classes/${cls.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>

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
