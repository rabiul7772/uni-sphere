import Modal from '@/ui/Modal';
import { CreateDepartmentForm } from './CreateDepartmentForm';
import { useState } from 'react';
import SearchInput from '@/components/shared/SearchInput';
import CreateButton from '@/components/shared/CreateButton';

interface DepartmentHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const DepartmentHeader = ({
  searchTerm,
  onSearchChange
}: DepartmentHeaderProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Departments
        </h1>
        <p className="text-slate-500">
          Quick access to essential metrics and management tools.
        </p>
      </div>
      <div className="flex items-center justify-between gap-4 rounded-xl bg-white p-1">
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Search by name or code"
        />
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
      </div>
    </div>
  );
};

export default DepartmentHeader;
