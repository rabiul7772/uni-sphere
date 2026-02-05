import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface FacultyFilterProps {
  selectedRole: string;
  onRoleChange: (value: string) => void;
}

const FacultyFilter = ({ selectedRole, onRoleChange }: FacultyFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-slate-500" />
      <Select value={selectedRole} onValueChange={value => onRoleChange(value)}>
        <SelectTrigger className="w-[180px] h-11 border-slate-200 rounded-lg bg-white">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="teacher">Teacher</SelectItem>
          <SelectItem value="student">Student</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FacultyFilter;
