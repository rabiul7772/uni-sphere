import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, ChevronRight, Edit } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/ui/Modal';
import { CreateClassForm } from './CreateClassForm';
import type { Class } from '@/services/classes/apiClasses';
import { useUser } from '@/hooks/auth/useAuth';
import { Skeleton, SkeletonList } from '@/components/ui/skeleton';

interface ClassHeaderProps {
  classData?: Class;
  isLoading?: boolean;
}

export default function ClassHeader({
  classData,
  isLoading
}: ClassHeaderProps) {
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
            <Skeleton className="h-8 w-48" />
          </div>
        </div>
      </div>
    );
  }

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
          onClick={() => navigate('/classes')}
        >
          Classes
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
          <h1 className="detail-title">Class Details</h1>
        </div>

        {canEdit && (
          <Button
            className="detail-edit-btn"
            onClick={() => setIsEditModalOpen(true)}
            disabled={!classData}
          >
            <Edit className="h-4 w-4" />
            <span className="font-semibold text-base">Edit</span>
          </Button>
        )}
      </div>

      {canEdit && classData && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Class"
        >
          <CreateClassForm
            initialData={classData}
            onSuccess={() => setIsEditModalOpen(false)}
            onCancel={() => setIsEditModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
