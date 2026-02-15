import Modal from '@/ui/Modal';
import { CreateDepartmentForm } from './CreateDepartmentForm';
import { useState } from 'react';
import SearchInput from '@/components/shared/SearchInput';
import CreateButton from '@/components/shared/CreateButton';

import { useUser } from '@/hooks/auth/useAuth';

interface DepartmentHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const DepartmentHeader = ({
  searchTerm,
  onSearchChange
}: DepartmentHeaderProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: user } = useUser();

  const canCreate = user?.role === 'admin' || user?.role === 'teacher';

  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Departments
        </h1>
      </div>
      <div className="flex items-center justify-between gap-4 rounded-xl bg-card border border-border p-1">
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Search by name or code"
          className="hidden md:block"
        />
        {canCreate && (
          <>
            <CreateButton onClick={() => setIsOpenModal(true)} />
            {isOpenModal && (
              <Modal
                title="Create Department"
                onClose={() => setIsOpenModal(false)}
              >
                <CreateDepartmentForm
                  onSuccess={() => setIsOpenModal(false)}
                  onCancel={() => setIsOpenModal(false)}
                />
              </Modal>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DepartmentHeader;
