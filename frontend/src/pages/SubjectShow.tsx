import PeopleTable from '@/components/shared/PeopleTable';
import { Spinner } from '@/components/ui/spinner';
import SubjectClasses from '@/features/subjects/SubjectClasses';
import SubjectDepartment from '@/features/subjects/SubjectDepartment';
import SubjectHeader from '@/features/subjects/SubjectHeader';
import SubjectOverview from '@/features/subjects/SubjectOverview';

import { useSubject } from '@/hooks/subjects/useSubjects';
import { useParams } from 'react-router';

const SubjectShow = () => {
  const { id } = useParams<{ id: string }>();
  const { data: subject, isPending, error } = useSubject(id!);

  if (isPending) return <Spinner size="xl" className="mx-auto mt-20" />;

  if (error || !subject) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-slate-500 font-medium">
        Subject not found or error loading data.
      </div>
    );
  }

  // Calculate unique teachers and students
  const teachers = subject.classes
    .map(cls => cls.teacher)
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
    .map(t => ({ ...t, role: 'teacher' }));

  const students = subject.classes
    .flatMap(cls => cls.enrollments?.map(e => e.student) || [])
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6 p-6">
      <SubjectHeader subject={subject} />

      <div className="space-y-6">
        <SubjectOverview subject={subject} />
        <SubjectDepartment department={subject.department} />
        <SubjectClasses classes={subject.classes} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PeopleTable title="Teachers" people={teachers as any} />
          <PeopleTable title="Students" people={students} />
        </div>
      </div>
    </div>
  );
};

export default SubjectShow;
