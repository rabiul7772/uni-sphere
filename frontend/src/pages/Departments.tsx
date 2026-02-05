import { useState } from 'react';
import DepartmentBreadcrumb from '@/features/departments/Breadcrumb';
import DepartmentHeader from '@/features/departments/Header';
import DepartmentTable from '@/features/departments/Table';
import Pagination from '@/features/departments/Pagination';
import { useDepartments } from '@/hooks/departments/useDepartments';

import { Spinner } from '@/components/ui/spinner';
import { ErrorMessage } from '@/components/ui/error-message';

const Departments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: departments = [], isPending, error } = useDepartments();

  // Filter departments by name or code
  const filteredDepartments = departments.filter(
    dept =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isPending) return <Spinner size="xl" className="min-h-[200px]" />;

  if (error)
    return (
      <ErrorMessage className="mx-8 mt-8" title="Failed to load departments" />
    );

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <DepartmentBreadcrumb />
      {/* Header with Search */}
      <DepartmentHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Table */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <DepartmentTable departments={filteredDepartments} />
        <Pagination />
      </div>
    </div>
  );
};

export default Departments;
