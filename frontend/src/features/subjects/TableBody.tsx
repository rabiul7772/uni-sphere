import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import type { Subject } from '@/services/subjects/apiSubjects';
import { colors } from '@/constants';

interface SubjectTableBodyProps {
  subjects: Subject[];
}

const getDepartmentColor = (id: number) => {
  return colors[id % colors.length];
};

const SubjectTableBody = ({ subjects }: SubjectTableBodyProps) => {
  const navigate = useNavigate();
  return (
    <TableBody>
      {subjects.map(subject => (
        <TableRow
          key={subject.id}
          className="border-slate-50 hover:bg-slate-50/50"
        >
          <TableCell className="font-semibold text-emerald-600 text-sm pl-6 py-4">
            {subject.code}
          </TableCell>
          <TableCell className="font-bold text-slate-900 text-sm py-4">
            {subject.name}
          </TableCell>
          <TableCell className="py-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${getDepartmentColor(
                Number(subject.departmentId)
              )}`}
            >
              {subject.department?.name || 'Unknown'}
            </span>
          </TableCell>
          <TableCell className="text-slate-500 max-w-[400px] truncate text-sm py-4">
            {subject.description}
          </TableCell>
          <TableCell className="text-right pr-8 py-4">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs font-semibold text-slate-600 border-slate-200 bg-white"
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
