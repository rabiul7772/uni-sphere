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
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Classes</h1>
        <p className="text-slate-500 mt-1">
          Quick access to essential metrics and management tools.
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-xl bg-white p-1">
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Search by class name"
        />
        {canCreate && <CreateButton onClick={() => setIsModalOpen(true)} />}
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
    </div>
  );
};
