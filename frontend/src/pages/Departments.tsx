import DepartmentBreadcrumb from '@/features/departments/Breadcrumb';
import DepartmentHeader from '@/features/departments/Header';
import DepartmentTable from '@/features/departments/Table';
import Pagination from '@/features/departments/Pagination';

const Departments = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <DepartmentBreadcrumb />
      {/* Header */}
      <DepartmentHeader />

      {/* Table */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <DepartmentTable />
        <Pagination />
      </div>
    </div>
  );
};

export default Departments;
