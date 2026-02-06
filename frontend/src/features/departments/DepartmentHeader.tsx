import { useNavigate } from 'react-router';
import { ArrowLeft, Home, ChevronRight, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Modal from '@/ui/Modal';
import EditDepartmentForm from './EditDepartmentForm';
import type { Department } from '@/services/departments/apiDepartments';

import { Skeleton, SkeletonList } from '@/components/ui/skeleton';

interface DepartmentHeaderProps {
  department?: Department;
  isLoading?: boolean;
}

const DepartmentHeader = ({
  department,
  isLoading = false
}: DepartmentHeaderProps) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <SkeletonList count={4} className="h-4 w-4" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-8 w-64" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    );
  }

  if (!department) return null;

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <Home
          className="h-4 w-4 cursor-pointer hover:text-slate-900"
          onClick={() => navigate('/')}
        />
        <ChevronRight className="h-4 w-4" />
        <span
          className="cursor-pointer hover:text-slate-900"
          onClick={() => navigate('/departments')}
        >
          Departments
        </span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-900">Show</span>
      </nav>

      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-slate-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">
            {department.name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-slate-200 text-slate-600"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Department"
      >
        <EditDepartmentForm
          department={department}
          onClose={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default DepartmentHeader;
