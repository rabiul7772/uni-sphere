import { useParams } from 'react-router';
import { useUser } from '@/hooks/users/useUsers';
import { Spinner } from '@/components/ui/spinner';
import FacultyHeader from '@/features/faculty/FacultyHeader';
import FacultyProfile from '@/features/faculty/FacultyProfile';
import FacultyDepartments from '@/features/faculty/FacultyDepartments';
import FacultySubjects from '@/features/faculty/FacultySubjects';

const FacultyShow = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isPending, error } = useUser(id!);

  if (isPending) return <Spinner size="xl" className="mx-auto mt-20" />;

  if (error || !user) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-slate-500 font-medium">
        User not found or error loading data.
      </div>
    );
  }

  // Extract unique departments and subjects based on role
  const departments =
    user.role === 'teacher'
      ? Array.from(
          new Map(
            user.classes?.map(cls => [
              cls.subject.department.id,
              cls.subject.department
            ]) || []
          ).values()
        )
      : Array.from(
          new Map(
            user.enrollments?.map(enr => [
              enr.class.subject.department.id,
              enr.class.subject.department
            ]) || []
          ).values()
        );

  const subjects =
    user.role === 'teacher'
      ? Array.from(
          new Map(
            user.classes?.map(cls => [cls.subject.id, cls.subject]) || []
          ).values()
        )
      : Array.from(
          new Map(
            user.enrollments?.map(enr => [
              enr.class.subject.id,
              enr.class.subject
            ]) || []
          ).values()
        );

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6 p-6">
      <FacultyHeader user={user} />
      <FacultyProfile user={user} />
      <FacultyDepartments departments={departments} userName={user.name} />
      <FacultySubjects subjects={subjects} userName={user.name} />
    </div>
  );
};

export default FacultyShow;
