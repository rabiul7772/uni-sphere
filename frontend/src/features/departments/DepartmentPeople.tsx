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

interface Person {
  id: string;
  fullName?: string; // Standardize this
  name?: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

interface DepartmentPeopleProps {
  title: string;
  people: Person[];
}

const DepartmentPeople = ({ title, people }: DepartmentPeopleProps) => {
  return (
    <Card className="table-container border-border shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="table-header-row">
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {people.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-muted-foreground font-medium"
                >
                  No {title.toLowerCase()} found.
                </TableCell>
              </TableRow>
            ) : (
              people.map(person => (
                <TableRow key={person.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="table-avatar">
                        <AvatarImage src={person.avatarUrl} />
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

export default DepartmentPeople;
