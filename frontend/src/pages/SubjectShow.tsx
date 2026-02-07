import { useEffect } from 'react';
import PeopleTable from '@/components/shared/PeopleTable';
import SubjectClasses from '@/features/subjects/SubjectClasses';
import SubjectDepartment from '@/features/subjects/SubjectDepartment';
import SubjectHeader from '@/features/subjects/SubjectHeader';
import SubjectOverview from '@/features/subjects/SubjectOverview';
import { ErrorMessage } from '@/components/ui/error-message';
import { useSubject } from '@/hooks/subjects/useSubjects';
import { useParams } from 'react-router';

const SubjectShow = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) mainElement.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  const { data: subject, isPending, error } = useSubject(id!);

  if (error && !isPending)
    return (
      <ErrorMessage
        className="mx-8 mt-8"
        title="Failed to load subject"
        message="The subject could not be found."
      />
    );

  // Calculate unique teachers and students
  const classes = subject?.classes || [];

  const teachers = classes
    .map(cls => cls.teacher)
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
    .map(t => ({ ...t, role: 'teacher' }));

  const students = classes
    .flatMap(cls => cls.enrollments?.map(e => e.student) || [])
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6 p-6">
      <SubjectHeader subject={subject} isLoading={isPending} />

      <div className="space-y-6">
        <SubjectOverview subject={subject} isLoading={isPending} />
        <SubjectDepartment
          department={subject?.department}
          isLoading={isPending}
        />
        <SubjectClasses classes={subject?.classes} isLoading={isPending} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PeopleTable
            title="Teachers"
            people={teachers}
            isLoading={isPending}
          />
          <PeopleTable
            title="Students"
            people={students}
            isLoading={isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectShow;
