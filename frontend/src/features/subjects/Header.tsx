import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Plus } from 'lucide-react';
import Modal from '@/ui/Modal';
import { CreateSubjectForm } from './CreateSubjectForm';

const SubjectHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Subjects</h1>
        <p className="text-slate-500 mt-1">
          Quick access to essential metrics and management tools.
        </p>
      </div>

      <Button
        variant="outline"
        className="h-11 px-4 gap-2 border-slate-200 rounded-xl text-slate-600 bg-white"
      >
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters</span>
      </Button>

      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-4 rounded-lg flex items-center gap-2"
      >
        <Plus className="h-5 w-5" />
        <span className="font-semibold text-base">Add</span>
      </Button>

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
