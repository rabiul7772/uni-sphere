import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DepartmentTableHeader = () => {
  return (
    <TableHeader className="bg-slate-50/50">
      <TableRow className="hover:bg-transparent border-slate-100">
        <TableHead className="w-[120px] py-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Code
        </TableHead>
        <TableHead className="w-[180px] py-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Name
        </TableHead>
        <TableHead className="w-[120px] py-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Subjects
        </TableHead>
        <TableHead className="py-4 text-sm font-semibold uppercase tracking-wider text-slate-500 text-center">
          Description
        </TableHead>
        <TableHead className="w-[150px] text-right py-4 pr-8 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Action
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default DepartmentTableHeader;
