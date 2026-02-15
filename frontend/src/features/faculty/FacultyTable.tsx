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
import type { UserDetail } from '@/services/users/apiUsers';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { useNavigate } from 'react-router';

interface FacultyTableProps {
  users: UserDetail[];
  isLoading: boolean;
}

export const FacultyTable = ({ users, isLoading }: FacultyTableProps) => {
  const navigate = useNavigate();

  if (isLoading) return <Spinner size="xl" className="min-h-[200px]" />;

  if (users.length === 0) {
    return <div className="table-empty-state">No faculty members found.</div>;
  }

  return (
    <div className="table-container">
      <Table>
        <TableHeader>
          <TableRow className="table-header-row">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id} className="text-[13px]">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="table-avatar">
                    <AvatarImage src={user.avatarUrl || ''} />
                    <AvatarFallback className="bg-muted text-muted-foreground font-semibold text-xs">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="table-cell-primary bg-transparent text-[13px]">
                      {user.name}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="table-cell-primary text-[13px]">
                {user.email}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${
                    user.role === 'admin'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-500'
                      : user.role === 'teacher'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500'
                  } border-none capitalize font-semibold`}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  className="table-action-btn"
                  onClick={() => navigate(`/faculty/${user.id}`)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
