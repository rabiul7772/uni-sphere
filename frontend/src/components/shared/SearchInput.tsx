import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  className?: string; // Added className prop
}

const SearchInput = ({
  searchTerm,
  onSearchChange,
  placeholder = 'Search...',
  className // Destructure className
}: SearchInputProps) => {
  return (
    <div className={`relative flex-1 max-w-sm ${className || ''}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        className="pl-10 h-10 text-sm  dark:border-border bg-background border-2 border-primary border-solid rounded-xl"
      />
    </div>
  );
};

export default SearchInput;
