import { Table } from '@/components/ui/table';
import SubjectTableHeader from './TableHeader';
import SubjectTableBody from './TableBody';
import type { Subject } from '@/services/subjects/apiSubjects';
import { Spinner } from '@/components/ui/spinner';

interface SubjectTableProps {
  subjects: Subject[];
  isLoading: boolean;
}

const SubjectTable = ({ subjects, isLoading }: SubjectTableProps) => {
  if (isLoading) return <Spinner size="xl" className="min-h-[200px]" />;

  if (subjects.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-slate-500">
        No subjects found.
      </div>
    );
  }

  return (
    <Table>
      <SubjectTableHeader />
      <SubjectTableBody subjects={subjects} />
    </Table>
  );
};

export default SubjectTable;
