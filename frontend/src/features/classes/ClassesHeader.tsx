import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/ui/Modal';
import { CreateClassForm } from './CreateClassForm';

export const ClassesHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Classes</h1>
        <p className="text-slate-500 mt-1">
          Quick access to essential metrics and management tools.
        </p>
      </div>

      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-4 rounded-lg flex items-center gap-2"
      >
        <Plus className="h-5 w-5" />
        <span className="font-semibold text-base">Create a class</span>
      </Button>

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
    </div>
  );
};
