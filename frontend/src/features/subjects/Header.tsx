import { useState } from 'react';
import Modal from '@/ui/Modal';
import { CreateSubjectForm } from './CreateSubjectForm';
import SearchInput from '@/components/shared/SearchInput';
import CreateButton from '@/components/shared/CreateButton';
import { useUser } from '@/hooks/auth/useAuth';

interface SubjectHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SubjectHeader = ({ searchTerm, onSearchChange }: SubjectHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user } = useUser();

  const canCreate = user?.role === 'admin' || user?.role === 'teacher';

  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Subjects</h1>
        </div>

        <div className="page-header-actions">
          <SearchInput
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            placeholder="Search by name or code"
            className="hidden md:block"
          />
          {canCreate && <CreateButton onClick={() => setIsModalOpen(true)} />}
        </div>
      </div>

      {canCreate && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Subject"
        >
          <CreateSubjectForm
            onSuccess={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default SubjectHeader;
