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
import { useNavigate } from 'react-router';
import { type Class } from '@/services/classes/apiClasses';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

interface ClassesTableProps {
  classes: Class[];
  isLoading: boolean;
}

export const ClassesTable = ({ classes, isLoading }: ClassesTableProps) => {
  const navigate = useNavigate();

  if (isLoading) return <Spinner size="xl" />;

  if (classes.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-slate-500 font-bold">
        No classes found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold text-slate-700">Banner</TableHead>
            <TableHead className="font-bold text-slate-700">
              Class name
            </TableHead>
            <TableHead className="font-bold text-slate-700">Subject</TableHead>
            <TableHead className="font-bold text-slate-700">Teacher</TableHead>
            <TableHead className="font-bold text-slate-700">Status</TableHead>
            <TableHead className="font-bold text-slate-700 text-center">
              Capacity
            </TableHead>
            <TableHead className="text-right font-bold text-slate-700">
              Details
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map(cls => (
            <TableRow
              key={cls.id}
              className="hover:bg-slate-50/50 transition-colors"
            >
              <TableCell>
                <div className="h-10 w-10 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-100">
                  {cls.bannerUrl ? (
                    <img
                      src={cls.bannerUrl}
                      alt={cls.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                      {cls.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-bold text-slate-900">
                {cls.name}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-indigo-50 text-indigo-700 border-none font-bold"
                >
                  {cls.subject?.name || 'N/A'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-100">
                    <AvatarImage src={cls.teacher?.avatarUrl || ''} />
                    <AvatarFallback className="bg-slate-100 text-slate-700 font-bold text-xs">
                      {cls.teacher?.name.slice(0, 2).toUpperCase() || 'T'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 leading-tight">
                      {cls.teacher?.name || 'Unknown'}
                    </span>
                    <span className="text-xs text-slate-500">
                      @
                      {cls.teacher?.name.toLowerCase().replace(/\s+/g, '') ||
                        'teacher'}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${cls.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  />
                  <span
                    className={`text-sm font-bold ${cls.status === 'active' ? 'text-emerald-600' : 'text-slate-500'} capitalize`}
                  >
                    {cls.status}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center font-bold text-slate-700">
                {cls.capacity}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg h-8 px-4 font-bold border-slate-200 text-slate-600 hover:bg-slate-50"
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
  );
};
