import { Table } from '@/components/ui/table';
import DepartmentTableBody from './TableBody';
import DepartmentTableHeader from './TableHeader';
import type { Department } from '@/services/departments/apiDepartments';

interface DepartmentTableProps {
  departments: Department[];
}

const DepartmentTable = ({ departments }: DepartmentTableProps) => {
  return (
    <Table>
      <DepartmentTableHeader />
      <DepartmentTableBody departments={departments} />
    </Table>
  );
};

export default DepartmentTable;
