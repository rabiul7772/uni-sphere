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
    return (
      <div className="w-full h-64 flex items-center justify-center text-slate-500">
        No departments found.
      </div>
    );
  }

  return (
    <Table>
      <DepartmentTableHeader />
      <DepartmentTableBody departments={departments} />
    </Table>
  );
};

export default DepartmentTable;
