import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { Badge } from '@/components/ui/badge';
import type { Subject } from '@/services/subjects/apiSubjects';

interface SubjectTableBodyProps {
  subjects: Subject[];
}

const SubjectTableBody = ({ subjects }: SubjectTableBodyProps) => {
  const navigate = useNavigate();
  return (
    <TableBody>
      {subjects.map(subject => (
        <TableRow key={subject.id} className="text-[13px]">
          <TableCell className="table-cell-accent">{subject.code}</TableCell>
          <TableCell className="table-cell-primary bg-transparent text-[13px]">
            {subject.name}
          </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              className="font-bold border-border bg-muted/30 text-foreground capitalize text-[11px]"
            >
              {subject.department?.name || 'Unknown'}
            </Badge>
          </TableCell>
          <TableCell className="table-cell-primary max-w-[400px] truncate text-[13px]">
            {subject.description}
          </TableCell>
          <TableCell className="text-right">
            <Button
              variant="outline"
              size="sm"
              className="table-action-btn"
              onClick={() => navigate(`/subjects/${subject.id}`)}
            >
              View
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default SubjectTableBody;
