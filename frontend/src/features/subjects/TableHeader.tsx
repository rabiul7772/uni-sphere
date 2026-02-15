import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SubjectTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="table-header-row">
        <TableHead>Code</TableHead>
        <TableHead>Subject</TableHead>
        <TableHead>Department</TableHead>
        <TableHead className="text-center">Description</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default SubjectTableHeader;
