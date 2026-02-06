import { useEffect } from 'react';
import DepartmentClasses from '@/features/departments/DepartmentClasses';
import DepartmentHeader from '@/features/departments/DepartmentHeader';
import PeopleTable from '@/components/shared/PeopleTable';
import DepartmentStats from '@/features/departments/DepartmentStats';
import DepartmentSubjects from '@/features/departments/DepartmentSubjects';
import { useDepartment } from '@/hooks/departments/useDepartments';
import { useParams } from 'react-router';
import { ErrorMessage } from '@/components/ui/error-message';

const DepartmentShow = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) mainElement.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  const { data: department, isPending, error } = useDepartment(id!);

  if (error) return <ErrorMessage message={error.message} />;

  const subjects = department?.subjects || [];
  const classes = subjects.flatMap(sub => sub.classes);

  const enrolledStudentsCount = classes.reduce(
    (acc, cls) => acc + (cls.enrollments?.length || 0),
    0
  );

  const students = classes
    .flatMap(cls => cls.enrollments?.map(e => e.student) || [])
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

  const teachers = classes
    .map(c => c.teacher)
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-8 p-6">
      <DepartmentHeader department={department} isLoading={isPending} />
      <DepartmentStats
        description={department?.description}
        subjectsCount={subjects.length || 0}
        classesCount={classes.length || 0}
        enrolledStudentsCount={enrolledStudentsCount}
        isLoading={isPending}
      />
      <DepartmentSubjects subjects={subjects} isLoading={isPending} />
      <DepartmentClasses subjects={subjects} isLoading={isPending} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PeopleTable title="Teachers" people={teachers} isLoading={isPending} />
        <PeopleTable title="Students" people={students} isLoading={isPending} />
      </div>
    </div>
  );
};

export default DepartmentShow;
