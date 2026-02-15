import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface ClassFormActionsProps {
  isLoading: boolean;
  isSubmitting: boolean;
  isUploading: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

export const ClassFormActions = ({
  isLoading,
  isSubmitting,
  isUploading,
  isEditing,
  onCancel
}: ClassFormActionsProps) => {
  return (
    <div className="flex gap-4 pt-4 border-t border-slate-100">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
        className="flex-1 h-9 sm:h-10 text-xs sm:text-sm rounded-xl font-bold border-slate-200"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isLoading}
        className="flex-2 h-9 sm:h-10 text-xs sm:text-sm bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all shadow-lg shadow-primary/10"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" className="text-primary-foreground" />
            <span>
              {isUploading
                ? 'Uploading...'
                : isEditing
                  ? 'Updating...'
                  : 'Submitting...'}
            </span>
          </div>
        ) : isEditing ? (
          'Update'
        ) : (
          'Submit'
        )}
      </Button>
    </div>
  );
};
