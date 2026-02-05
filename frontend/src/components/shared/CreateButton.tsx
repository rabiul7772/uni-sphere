import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CreateButtonProps {
  onClick: () => void;
  label?: string;
}

const CreateButton = ({ onClick, label = 'Create' }: CreateButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-4 rounded-lg flex items-center gap-2"
    >
      <Plus className="h-5 w-5" />
      <span className="font-semibold text-base">{label}</span>
    </Button>
  );
};

export default CreateButton;
