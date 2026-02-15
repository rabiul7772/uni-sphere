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
        <TableRow key={dept.code}>
          <TableCell className="table-cell-accent">{dept.code}</TableCell>
          <TableCell className="table-cell-primary bg-transparent">
            {dept.name}
          </TableCell>
          <TableCell className="table-cell-primary text-center">
            {dept.subjects}
          </TableCell>
          <TableCell className="table-cell-primary max-w-[500px] truncate text-center">
            {dept.description || '-'}
          </TableCell>
          <TableCell className="text-right">
            <Link to={`/departments/${dept.id}`}>
              <Button variant="outline" size="sm" className="table-action-btn">
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
