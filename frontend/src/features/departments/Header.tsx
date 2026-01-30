import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';

const DepartmentHeader = () => {
  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Departments
        </h1>
        <p className="text-slate-500">
          Quick access to essential metrics and management tools.
        </p>
      </div>
      <div className="flex items-center justify-between gap-4 rounded-xl bg-white p-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by name or code"
            className="pl-10 h-10 text-sm border-slate-200 bg-white"
          />
        </div>
        <Button className="h-10 px-4 text-sm bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-200">
          <Plus className="h-4 w-4" />
          Create
        </Button>
      </div>
    </div>
  );
};

export default DepartmentHeader;
