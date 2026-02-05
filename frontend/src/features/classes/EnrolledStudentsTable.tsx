import type { Class } from '@/services/classes/apiClasses';
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
import { Link } from 'react-router';

interface EnrolledStudentsTableProps {
  students: Class['enrolledStudents'];
}

export default function EnrolledStudentsTable({
  students
}: EnrolledStudentsTableProps) {
  if (!students || students.length === 0) {
    return (
      <div className="p-12 border rounded-xl bg-card text-center">
        <p className="text-muted-foreground">No students enrolled yet.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-bold">Enrolled Students</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[400px]">Student</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={student.avatarUrl || ''}
                      alt={student.name}
                    />
                    <AvatarFallback>
                      {student.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{student.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {student.email}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Link to={`/faculty/${student.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
