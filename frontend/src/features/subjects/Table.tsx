import { Table } from '@/components/ui/table';
import SubjectTableHeader from './TableHeader';
import SubjectTableBody from './TableBody';
import type { Subject } from '@/services/subjects/apiSubjects';

interface SubjectTableProps {
  subjects: Subject[];
}

const SubjectTable = ({ subjects }: SubjectTableProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <Table>
        <SubjectTableHeader />
        <SubjectTableBody subjects={subjects} />
      </Table>
    </div>
  );
};

export default SubjectTable;
