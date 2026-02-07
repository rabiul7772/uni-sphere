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

  if (isLoading) {
    return (
      <Card className="border-slate-100 shadow-sm transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-8" />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-50 hover:bg-transparent">
                <TableHead className="font-bold text-slate-900">
                  Class
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Teacher
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Status
                </TableHead>
                <TableHead className="text-right font-bold text-slate-900 pr-8">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i} className="border-slate-50">
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
    <Card className="border-slate-100 shadow-sm transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-bold text-slate-900">
          Classes
        </CardTitle>
        <span className="text-sm font-semibold text-slate-400">
          {classes.length}
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-50 hover:bg-transparent">
              <TableHead className="font-bold text-slate-900">Class</TableHead>
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
            {classes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-slate-500"
                >
                  No classes found for this subject.
                </TableCell>
              </TableRow>
            ) : (
              classes.map(cls => (
                <TableRow
                  key={cls.id}
                  className="border-slate-50 hover:bg-slate-50/50"
                >
                  <TableCell className="font-medium text-slate-700 py-4">
                    {cls.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            cls.teacher?.avatarUrl ||
                            '/avatars/default-avatar.png'
                          }
                        />
                        <AvatarFallback className="bg-slate-100 text-xs text-slate-600 font-bold">
                          {cls.teacher?.fullName
                            ?.split(' ')
                            .map((n: string) => n[0])
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
                      className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        cls.status === 'active'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-slate-50 text-slate-600 border-slate-100'
                      }`}
                      variant="outline"
                    >
                      {cls.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg border-slate-200 text-xs font-semibold text-slate-600 bg-white"
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
      </CardContent>
    </Card>
  );
};

export default SubjectClasses;
