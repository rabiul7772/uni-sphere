import { useState } from 'react';
import Modal from '@/ui/Modal';
import { CreateSubjectForm } from './CreateSubjectForm';
import SearchInput from '@/components/shared/SearchInput';
import CreateButton from '@/components/shared/CreateButton';

interface SubjectHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SubjectHeader = ({ searchTerm, onSearchChange }: SubjectHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Subjects</h1>
        <p className="text-slate-500 mt-1">
          Quick access to essential metrics and management tools.
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-xl bg-white p-1">
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Search by name or code"
        />
        <CreateButton onClick={() => setIsModalOpen(true)} />
      </div>

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
    </div>
  );
};

export default SubjectHeader;
