import SubjectBreadcrumb from '@/features/subjects/Breadcrumb';
import SubjectHeader from '@/features/subjects/Header';
import SubjectTable from '@/features/subjects/Table';
import SubjectPagination from '@/features/subjects/Pagination';
import { useSubjects } from '@/hooks/subjects/useSubjects';
import { Spinner } from '@/components/ui/spinner';
import { ErrorMessage } from '@/components/ui/error-message';

const Subjects = () => {
  const { data: subjects, isPending, error } = useSubjects();

  if (isPending) return <Spinner size="xl" className="mt-20" />;
  if (error)
    return (
      <ErrorMessage
        title="Failed to load subjects"
        message={error.message}
        className="mt-8"
      />
    );

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <SubjectBreadcrumb />
      <div className="mt-4">
        <SubjectHeader />
        <SubjectTable subjects={subjects || []} />
        <SubjectPagination />
      </div>
    </div>
  );
};

export default Subjects;
