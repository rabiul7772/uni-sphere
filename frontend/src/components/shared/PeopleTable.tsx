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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Person {
  id: string;
  fullName?: string;
  name?: string;
  email: string;
  avatarUrl?: string;
  avatar?: string; // Add this for compatibility
  role: string;
}

interface PeopleTableProps {
  title: string;
  people: Person[];
}

const PeopleTable = ({ title, people }: PeopleTableProps) => {
  const navigate = useNavigate();

  return (
    <Card className="border-slate-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-50 hover:bg-transparent">
              <TableHead className="font-bold text-slate-900">User</TableHead>
              <TableHead className="font-bold text-slate-900">Role</TableHead>
              <TableHead className="text-right font-bold text-slate-900 pr-8">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {people.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-slate-500"
                >
                  No {title.toLowerCase()} found.
                </TableCell>
              </TableRow>
            ) : (
              people.map(person => (
                <TableRow
                  key={person.id}
                  className="border-slate-50 hover:bg-slate-50/50"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={person.avatarUrl || person.avatar} />
                        <AvatarFallback className="bg-slate-100 text-xs text-slate-600 font-bold">
                          {(person.fullName || person.name || 'U')
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-700">
                          {person.fullName || person.name}
                        </span>
                        <span className="text-xs text-slate-400">
                          {person.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">
                    {person.role}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg border-slate-200 text-xs font-medium text-slate-600"
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
      </CardContent>
    </Card>
  );
};

export default PeopleTable;
