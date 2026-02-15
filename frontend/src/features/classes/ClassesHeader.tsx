import { useState } from 'react';
import Modal from '@/ui/Modal';
import { CreateClassForm } from './CreateClassForm';
import SearchInput from '@/components/shared/SearchInput';
import CreateButton from '@/components/shared/CreateButton';

import { useUser } from '@/hooks/auth/useAuth';

interface ClassesHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ClassesHeader = ({
  searchTerm,
  onSearchChange
}: ClassesHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user } = useUser();

  const canCreate = user?.role === 'admin' || user?.role === 'teacher';

  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Classes</h1>
        </div>

        <div className="page-header-actions">
          <SearchInput
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            placeholder="Search by class name"
            className="hidden md:block"
          />
          {canCreate && <CreateButton onClick={() => setIsModalOpen(true)} />}
        </div>
      </div>

      {canCreate && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Fill out form"
        >
          <CreateClassForm
            onSuccess={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};
