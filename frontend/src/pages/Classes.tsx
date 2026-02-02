import { useState } from 'react';
import { ClassesBreadcrumb } from '@/features/classes/ClassesBreadcrumb';
import { ClassesHeader } from '@/features/classes/ClassesHeader';
import { ClassesTable } from '@/features/classes/ClassesTable';
import { useClasses } from '@/hooks/classes/useClasses';
import { Input } from '@/components/ui/input';
import { Search, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { classes, isPending } = useClasses();

  const filteredClasses = classes?.filter(
    cls =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto pb-10">
      <ClassesBreadcrumb />
      <ClassesHeader />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="relative max-w-md w-full">
          <Input
            placeholder="Search by name"
            className="pl-10 h-11 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-11 px-4 gap-2 border-slate-200 rounded-xl text-slate-600 bg-white shadow-sm"
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm font-bold">Filters</span>
          </Button>
        </div>
      </div>

      <ClassesTable classes={filteredClasses || []} isLoading={isPending} />

      {/* Pagination based on design */}
      <div className="flex items-center justify-between mt-8 text-sm font-bold">
        <button className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2">
          <span>&larr;</span> Previous
        </button>
        <div className="flex items-center gap-1">
          {[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
            <button
              key={i}
              className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                page === 1
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2">
          Next <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default Classes;
