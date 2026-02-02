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
import type { User } from '@/services/users/apiUsers';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

interface FacultyTableProps {
  users: User[];
  isLoading: boolean;
}

export const FacultyTable = ({ users, isLoading }: FacultyTableProps) => {
  if (isLoading) return <Spinner size="xl" />;

  if (users.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-slate-500">
        No faculty members found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold text-slate-700">Name</TableHead>
            <TableHead className="font-bold text-slate-700">Email</TableHead>
            <TableHead className="font-bold text-slate-700">Role</TableHead>
            <TableHead className="text-right font-bold text-slate-700">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow
              key={user.id}
              className="hover:bg-slate-50/50 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-100">
                    <AvatarImage src={user.avatarUrl || ''} />
                    <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">
                      {user.name}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-slate-600">{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${
                    user.role === 'admin'
                      ? 'bg-amber-50 text-amber-700'
                      : user.role === 'teacher'
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'bg-emerald-50 text-emerald-700'
                  } border-none capitalize font-bold`}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg h-8 px-4 font-bold border-slate-200 text-slate-600 hover:bg-slate-50"
                  onClick={() => console.log('View user:', user.id)}
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
