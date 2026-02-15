import { useParams } from 'react-router';
import { useUser } from '@/hooks/users/useUsers';
import FacultyHeader from '@/features/faculty/FacultyHeader';
import FacultyProfile from '@/features/faculty/FacultyProfile';
import FacultyDepartments from '@/features/faculty/FacultyDepartments';
import FacultySubjects from '@/features/faculty/FacultySubjects';
import { useEffect } from 'react';
import { ErrorMessage } from '@/components/ui/error-message';
import useUniqueDepartmentsAndSubjects from '@/hooks/useUniqueDeptAndSubj';

const FacultyShow = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) mainElement.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  const { data: user, isPending, error } = useUser(id!);

  // Extract unique departments and subjects based on role
  const { departments, subjects } = useUniqueDepartmentsAndSubjects(user);

  if (error || (!isPending && !user))
    return <ErrorMessage message="User not found or error loading data." />;

  return (
    <div className="detail-container">
      <FacultyHeader user={user} isLoading={isPending} />
      <FacultyProfile user={user} isLoading={isPending} />
      <FacultyDepartments
        departments={departments}
        userName={user?.name || ''}
        isLoading={isPending}
      />
      <FacultySubjects
        subjects={subjects}
        userName={user?.name || ''}
        isLoading={isPending}
      />
    </div>
  );
};

export default FacultyShow;
