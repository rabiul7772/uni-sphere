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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router';
import Pagination from '@/components/shared/Pagination';
import { SUB_TABLE_PAGE_SIZE } from '@/constants';

interface SubjectClassesProps {
  classes?: Array<{
    id: string;
    name: string;
    status: 'active' | 'inactive';
    teacher: {
      id: string;
      fullName: string;
      email: string;
      avatarUrl?: string;
    };
  }>;
  isLoading?: boolean;
}

const SubjectClasses = ({
  classes = [],
  isLoading = false
}: SubjectClassesProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalClasses = classes.length;

  // Calculate pagination
  const startIndex = (currentPage - 1) * SUB_TABLE_PAGE_SIZE;
  const endIndex = startIndex + SUB_TABLE_PAGE_SIZE;
  const paginatedClasses = classes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <Card className="border-border shadow-sm transition-all duration-200 bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-8" />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent bg-muted/50">
                <TableHead className="font-bold text-foreground">
                  Class
                </TableHead>
                <TableHead className="font-bold text-foreground">
                  Teacher
                </TableHead>
                <TableHead className="font-bold text-foreground">
                  Status
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
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-36" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16 rounded-lg" />
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
    <Card className="table-container border-border shadow-sm transition-all duration-200 bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Classes
        </CardTitle>
        <span className="text-sm font-semibold text-muted-foreground">
          {classes.length}
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="table-header-row">
              <TableHead>Class</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground font-medium"
                >
                  No classes found for this subject.
                </TableCell>
              </TableRow>
            ) : (
              paginatedClasses.map(cls => (
                <TableRow key={cls.id}>
                  <TableCell className="table-cell-primary">
                    {cls.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="table-avatar">
                        <AvatarImage
                          src={
                            cls.teacher?.avatarUrl ||
                            '/avatars/default-avatar.png'
                          }
                        />
                        <AvatarFallback className="bg-muted text-xs text-muted-foreground font-semibold">
                          {cls.teacher?.fullName
                            ?.split(' ')
                            .map((n: string) => n[0])
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
              ))
            )}
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

export default SubjectClasses;
