import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { DepartmentSummary } from '@/services/departments/apiDepartments';
import { Link } from 'react-router';

interface DepartmentTableBodyProps {
  departments: DepartmentSummary[];
}

const DepartmentTableBody = ({ departments }: DepartmentTableBodyProps) => {
  return (
    <TableBody>
      {departments.map(dept => (
        <TableRow
          key={dept.code}
          className="border-slate-50 hover:bg-slate-50/50"
        >
          <TableCell className="font-medium text-emerald-500 py-5 text-sm">
            {dept.code}
          </TableCell>
          <TableCell className="font-semibold text-slate-700 text-sm">
            {dept.name}
          </TableCell>
          <TableCell className="font-semibold text-slate-700 text-sm text-center">
            {dept.subjects}
          </TableCell>
          <TableCell className="text-slate-500 max-w-[500px] truncate text-sm text-center">
            {dept.description || '-'}
          </TableCell>
          <TableCell className="text-right pr-8">
            <Link to={`/departments/${dept.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-lg border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                View
              </Button>
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default DepartmentTableBody;
