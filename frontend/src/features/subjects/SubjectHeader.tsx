import { useNavigate } from 'react-router';
import { ArrowLeft, Home, ChevronRight, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Modal from '@/ui/Modal';
import EditSubjectForm from './EditSubjectForm';
import type { Subject } from '@/services/subjects/apiSubjects';

interface SubjectHeaderProps {
  subject: Subject;
}

const SubjectHeader = ({ subject }: SubjectHeaderProps) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <Home
          className="h-4 w-4 cursor-pointer hover:text-slate-900"
          onClick={() => navigate('/')}
        />
        <ChevronRight className="h-4 w-4" />
        <span
          className="cursor-pointer hover:text-slate-900"
          onClick={() => navigate('/subjects')}
        >
          Subjects
        </span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-900">Show</span>
      </nav>

      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-slate-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">{subject.name}</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-slate-200 text-slate-600 bg-white"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Subject"
      >
        <EditSubjectForm
          subject={subject}
          onSuccess={() => setIsEditModalOpen(false)}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default SubjectHeader;
