import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FacultySearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const FacultySearch = ({ searchTerm, onSearchChange }: FacultySearchProps) => {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        className="pl-10 h-11 border-slate-200 rounded-lg bg-white"
      />
    </div>
  );
};

export default FacultySearch;
