import { Spinner } from '@/components/ui/spinner';
import DepartmentClasses from '@/features/departments/DepartmentClasses';
import DepartmentHeader from '@/features/departments/DepartmentHeader';
import PeopleTable from '@/components/shared/PeopleTable';
import DepartmentStats from '@/features/departments/DepartmentStats';
import DepartmentSubjects from '@/features/departments/DepartmentSubjects';
import { useDepartment } from '@/hooks/departments/useDepartments';
import { useParams } from 'react-router';

const DepartmentShow = () => {
  const { id } = useParams<{ id: string }>();

  const { data: department, isPending, error } = useDepartment(id!);

  if (isPending) return <Spinner size="xl" />;

  if (error || !department) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-slate-500">
        Department not found or error loading data.
      </div>
    );
  }

  const subjects = department.subjects || [];
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
      <DepartmentHeader department={department} />
      <DepartmentStats
        description={department.description}
        subjectsCount={subjects.length}
        classesCount={classes.length}
        enrolledStudentsCount={enrolledStudentsCount}
      />
      <DepartmentSubjects subjects={subjects} />
      <DepartmentClasses subjects={subjects} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PeopleTable title="Teachers" people={teachers} />
        <PeopleTable title="Students" people={students} />
      </div>
    </div>
  );
};

export default DepartmentShow;
