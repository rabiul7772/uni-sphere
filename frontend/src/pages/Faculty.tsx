import { useState } from 'react';
import { FacultyBreadcrumb } from '@/features/faculty/FacultyBreadcrumb';
import { FacultyHeader } from '@/features/faculty/FacultyHeader';
import { FacultyTable } from '@/features/faculty/FacultyTable';
import { useUsers } from '@/hooks/users/useUsers';

const Faculty = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { users, isPending } = useUsers();

  const filteredUsers = users?.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto">
      <FacultyBreadcrumb />
      <FacultyHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <FacultyTable users={filteredUsers || []} isLoading={isPending} />

      {/* Pagination Placeholder based on design */}
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

export default Faculty;
