import { Table } from '@/components/ui/table';
import DepartmentTableBody from './TableBody';
import DepartmentTableHeader from './TableHeader';
import type { DepartmentSummary } from '@/services/departments/apiDepartments';
import { Spinner } from '@/components/ui/spinner';

interface DepartmentTableProps {
  departments: DepartmentSummary[];
  isLoading: boolean;
}

const DepartmentTable = ({ departments, isLoading }: DepartmentTableProps) => {
  if (isLoading) return <Spinner size="xl" className="min-h-[200px]" />;

  if (departments.length === 0) {
    return <div className="table-empty-state">No departments found.</div>;
  }

  return (
    <div className="table-container">
      <div className="overflow-x-auto">
        <Table>
          <DepartmentTableHeader />
          <DepartmentTableBody departments={departments} />
        </Table>
      </div>
    </div>
  );
};

export default DepartmentTable;
