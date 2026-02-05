import { useState } from 'react';
import SubjectBreadcrumb from '@/features/subjects/Breadcrumb';
import SubjectHeader from '@/features/subjects/Header';
import SubjectTable from '@/features/subjects/Table';
import SubjectPagination from '@/features/subjects/Pagination';
import { useSubjects } from '@/hooks/subjects/useSubjects';
import { Spinner } from '@/components/ui/spinner';
import { ErrorMessage } from '@/components/ui/error-message';

const Subjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: subjects, isPending, error } = useSubjects();

  // Filter subjects by name or code
  const filteredSubjects = subjects?.filter(
    subject =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <SubjectHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <SubjectTable subjects={filteredSubjects || []} />
        <SubjectPagination />
      </div>
    </div>
  );
};

export default Subjects;
