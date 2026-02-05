import { useState } from 'react';
import { FacultyBreadcrumb } from '@/features/faculty/FacultyBreadcrumb';
import { FacultyTable } from '@/features/faculty/FacultyTable';
import { useUsers } from '@/hooks/users/useUsers';
import FacultyFilter from '@/features/faculty/FacultyFilter';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/components/shared/Pagination';
import SearchInput from '@/components/shared/SearchInput';
import { PAGE_SIZE } from '@/constants';

const Faculty = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const { data, isPending } = useUsers(
    {
      page,
      limit: PAGE_SIZE,
      search: searchTerm,
      role: selectedRole
    },
    { keepPreviousData: true }
  );

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <FacultyBreadcrumb />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Faculty</h1>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={val => {
            setSearchTerm(val);
            setSearchParams({ page: '1' }); // Reset to page 1 on search
          }}
          placeholder="Search by name or email..."
        />
        <FacultyFilter
          selectedRole={selectedRole}
          onRoleChange={val => {
            setSelectedRole(val);
            setSearchParams({ page: '1' }); // Reset on filter
          }}
        />
      </div>

      <FacultyTable users={data?.data || []} isLoading={isPending} />

      <Pagination
        currentPage={page}
        totalCount={data?.count || 0}
        pageSize={PAGE_SIZE}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Faculty;
