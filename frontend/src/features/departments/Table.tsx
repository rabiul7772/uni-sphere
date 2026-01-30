import { Table } from '@/components/ui/table';
import DepartmentTableBody from './TableBody';
import DepartmentTableHeader from './TableHeader';

const DepartmentTable = () => {
  return (
    <Table>
      <DepartmentTableHeader />
      <DepartmentTableBody />
    </Table>
  );
};

export default DepartmentTable;
