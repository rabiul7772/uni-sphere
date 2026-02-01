import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SubjectTableHeader = () => {
  return (
    <TableHeader className="bg-slate-50/50">
      <TableRow className="border-slate-50 hover:bg-transparent">
        <TableHead className="w-[120px] font-bold text-slate-500 text-xs uppercase tracking-wider pl-6 py-4">
          Code
        </TableHead>
        <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-wider py-4">
          Subject
        </TableHead>
        <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-wider py-4">
          Department
        </TableHead>
        <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-wider py-4">
          Description
        </TableHead>
        <TableHead className="text-right font-bold text-slate-500 text-xs uppercase tracking-wider pr-8 py-4">
          Action
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default SubjectTableHeader;
