import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DepartmentTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="table-header-row">
        <TableHead>Code</TableHead>
        <TableHead>Name</TableHead>
        <TableHead className="text-center">Subjects</TableHead>
        <TableHead className="text-center">Description</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default DepartmentTableHeader;
