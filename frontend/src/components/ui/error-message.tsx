import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  className?: string;
}

export function ErrorMessage({
  title = 'Error',
  message = 'Something went wrong. Please try again.',
  className
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive dark:border-destructive',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5" />
        <div className="flex flex-col">
          {title && (
            <h5 className="font-medium leading-none tracking-tight">{title}</h5>
          )}
          {message && <div className="text-sm opacity-90 mt-1">{message}</div>}
        </div>
      </div>
    </div>
  );
}
