import DepartmentBreadcrumb from '@/features/departments/Breadcrumb';
import DepartmentHeader from '@/features/departments/Header';
import DepartmentTable from '@/features/departments/Table';
import Pagination from '@/features/departments/Pagination';
import { useDepartments } from '@/hooks/departments/useDepartments';

import { Spinner } from '@/components/ui/spinner';
import { ErrorMessage } from '@/components/ui/error-message';

const Departments = () => {
  const { data: departments = [], isPending, error } = useDepartments();

  if (isPending) return <Spinner size="xl" className="min-h-[200px]" />;

  if (error)
    return (
      <ErrorMessage className="mx-8 mt-8" title="Failed to load departments" />
    );

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <DepartmentBreadcrumb />
      {/* Header */}
      <DepartmentHeader />

      {/* Table */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <DepartmentTable departments={departments} />
        <Pagination />
      </div>
    </div>
  );
};

export default Departments;
