import { useNavigate } from 'react-router';
import { ArrowLeft, Home, ChevronRight, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Modal from '@/ui/Modal';
import EditDepartmentForm from './EditDepartmentForm';
import type { Department } from '@/services/departments/apiDepartments';

import { Skeleton, SkeletonList } from '@/components/ui/skeleton';

import { useUser } from '@/hooks/auth/useAuth';

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
  const { data: user } = useUser();

  const canEdit = user?.role === 'admin' || user?.role === 'teacher';

  if (isLoading) {
    return (
      <div className="detail-header">
        <div className="detail-breadcrumb">
          <SkeletonList count={4} className="h-4 w-4" />
        </div>
        <div className="detail-title-row">
          <div className="detail-title-group">
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
    <div className="detail-header">
      <nav className="detail-breadcrumb">
        <Home
          className="h-4 w-4 detail-breadcrumb-link"
          onClick={() => navigate('/')}
        />
        <ChevronRight className="h-4 w-4" />
        <span
          className="detail-breadcrumb-link"
          onClick={() => navigate('/departments')}
        >
          Departments
        </span>
        <ChevronRight className="h-4 w-4" />
        <span className="detail-breadcrumb-current">Show</span>
      </nav>

      <div className="detail-title-row">
        <div className="detail-title-group">
          <Button
            variant="ghost"
            size="icon"
            className="detail-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </Button>
          <h1 className="detail-title">{department.name}</h1>
        </div>

        {canEdit && (
          <Button
            className="detail-edit-btn"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Pencil className="h-4 w-4" />
            <span className="font-semibold text-base">Edit</span>
          </Button>
        )}
      </div>

      {canEdit && (
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
      )}
    </div>
  );
};

export default DepartmentHeader;
