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
}

const DepartmentClasses = ({ subjects }: DepartmentClassesProps) => {
  const navigate = useNavigate();
  const classes = subjects.flatMap(sub => sub.classes);

  return (
    <Card className="border-slate-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-bold">Classes</CardTitle>
        <span className="text-xs font-semibold text-slate-400">
          {classes.length}
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
            {classes.map(cls => (
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
      </CardContent>
    </Card>
  );
};

export default DepartmentClasses;
