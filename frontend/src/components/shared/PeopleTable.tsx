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
import { useNavigate } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import Pagination from './Pagination';
import { SUB_TABLE_PAGE_SIZE } from '@/constants';

interface Person {
  id: string;
  fullName?: string;
  name?: string;
  email: string;
  avatarUrl?: string;
  avatar?: string;
  role: string;
}

interface PeopleTableProps {
  title: string;
  people: Person[];
  isLoading?: boolean;
}

const PeopleTable = ({
  title,
  people,
  isLoading = false
}: PeopleTableProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPeople = people.length;

  const startIndex = (currentPage - 1) * SUB_TABLE_PAGE_SIZE;
  const endIndex = startIndex + SUB_TABLE_PAGE_SIZE;
  const paginatedPeople = people.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="table-container border-border shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
        <span className="text-xs font-semibold text-muted-foreground">
          {totalPeople}
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="table-header-row">
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
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
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="ml-auto h-8 w-16" />
                    </TableCell>
                  </TableRow>
                ))
              ) : totalPeople === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-24 text-center text-muted-foreground font-medium"
                  >
                    No {title.toLowerCase()} found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedPeople.map(person => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="table-avatar h-8 w-8">
                          <AvatarImage
                            src={person.avatarUrl || person.avatar}
                          />
                          <AvatarFallback className="bg-muted text-xs text-muted-foreground font-semibold">
                            {(person.fullName || person.name || 'U')
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="table-cell-primary">
                            {person.fullName || person.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {person.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="table-cell-secondary">
                      {person.role}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="table-action-btn"
                        onClick={() => navigate(`/faculty/${person.id}`)}
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

        {totalPeople > SUB_TABLE_PAGE_SIZE && !isLoading && (
          <div className="px-6 pb-6">
            <Pagination
              currentPage={currentPage}
              pageSize={SUB_TABLE_PAGE_SIZE}
              totalCount={totalPeople}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PeopleTable;
