import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface FacultyHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const FacultyHeader = ({
  searchTerm,
  onSearchChange
}: FacultyHeaderProps) => {
  return (
    <div className="space-y-6 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Faculty</h1>
        <p className="text-slate-500 mt-1">Browse and manage faculty members</p>
      </div>

      <div className="relative max-w-md">
        <Input
          type="search"
          placeholder="Search by name or email"
          className="pl-10 h-11 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
      </div>
    </div>
  );
};
