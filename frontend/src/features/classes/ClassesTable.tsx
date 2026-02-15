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

  if (isLoading) return <Spinner size="xl" className="min-h-[200px]" />;

  if (classes.length === 0) {
    return <div className="table-empty-state">No classes found.</div>;
  }

  return (
    <div className="table-container">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="table-header-row">
              <TableHead>Banner</TableHead>
              <TableHead>Class name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Capacity</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map(cls => (
              <TableRow key={cls.id} className="text-[13px]">
                <TableCell>
                  <div className="table-avatar rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                    {cls.bannerUrl ? (
                      <img
                        src={cls.bannerUrl}
                        alt={cls.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-[10px] font-semibold">
                        {cls.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="table-cell-primary bg-transparent text-[13px]">
                  {cls.name}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-muted/30 text-foreground border-border font-bold text-[11px]"
                  >
                    {cls.subject?.name || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="table-avatar">
                      <AvatarImage src={cls.teacher?.avatarUrl || ''} />
                      <AvatarFallback className="bg-muted text-muted-foreground font-semibold text-xs">
                        {cls.teacher?.name.slice(0, 2).toUpperCase() || 'T'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="table-cell-primary leading-tight text-[13px]">
                        {cls.teacher?.name || 'Unknown'}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
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
                      className={`h-2 w-2 rounded-full ${cls.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground/30'}`}
                    />
                    <span
                      className={`text-[13px] font-semibold ${cls.status === 'active' ? 'text-emerald-500' : 'text-muted-foreground'} capitalize`}
                    >
                      {cls.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="table-cell-primary text-center text-[13px]">
                  {cls.capacity}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClassesTable;
