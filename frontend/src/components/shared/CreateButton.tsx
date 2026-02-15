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
      className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-4 rounded-lg flex items-center gap-2 shadow-md shadow-primary/20"
    >
      <Plus className="h-5 w-5" />
      <span className="font-semibold text-base">{label}</span>
    </Button>
  );
};

export default CreateButton;
