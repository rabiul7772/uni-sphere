import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface ClassFormActionsProps {
  isLoading: boolean;
  isUploading: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

export const ClassFormActions = ({
  isLoading,
  isUploading,
  isEditing,
  onCancel
}: ClassFormActionsProps) => {
  return (
    <div className="flex gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
        className="flex-1 h-11 rounded-xl font-bold border-slate-200"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isLoading}
        className="flex-2 h-11 bg-emerald-400 hover:bg-emerald-500 text-emerald-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-100"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" className="text-emerald-950" />
            <span>
              {isUploading
                ? 'Uploading Banner...'
                : isEditing
                  ? 'Updating Class...'
                  : 'Creating Class...'}
            </span>
          </div>
        ) : isEditing ? (
          'Update Class'
        ) : (
          'Create Class'
        )}
      </Button>
    </div>
  );
};
