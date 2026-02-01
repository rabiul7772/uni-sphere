import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SubjectPagination = () => {
  return (
    <div>
      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-slate-500 hover:text-slate-900 pl-0 hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map(page => (
            <Button
              key={page}
              variant={page === 1 ? 'secondary' : 'ghost'}
              size="sm"
              className={
                page === 1
                  ? 'h-8 w-8 bg-slate-100 text-slate-900 font-bold'
                  : 'h-8 w-8 text-slate-500 hover:text-slate-900'
              }
            >
              {page}
            </Button>
          ))}
          <span className="text-slate-400 text-xs">...</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 text-slate-500 hover:text-slate-900"
          >
            8
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 text-slate-500 hover:text-slate-900"
          >
            9
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 text-slate-500 hover:text-slate-900"
          >
            10
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-slate-500 hover:text-slate-900 pr-0 hover:bg-transparent"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubjectPagination;
