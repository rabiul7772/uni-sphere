import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { Subject } from '@/services/subjects/apiSubjects';

interface SubjectTableBodyProps {
  subjects: Subject[];
}

const colors = [
  'text-blue-600 bg-blue-50',
  'text-red-600 bg-red-50',
  'text-purple-600 bg-purple-50',
  'text-pink-600 bg-pink-50',
  'text-emerald-600 bg-emerald-50',
  'text-orange-600 bg-orange-50',
  'text-indigo-600 bg-indigo-50'
];

const getDepartmentColor = (id: number) => {
  return colors[id % colors.length];
};

const SubjectTableBody = ({ subjects }: SubjectTableBodyProps) => {
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
                subject.departmentId
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
              className="h-8 text-xs font-semibold text-slate-600 border-slate-200"
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
