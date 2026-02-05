import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({
  searchTerm,
  onSearchChange,
  placeholder = 'Search...'
}: SearchInputProps) => {
  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        className="pl-10 h-10 text-sm border-slate-200 bg-white"
      />
    </div>
  );
};

export default SearchInput;
