import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router';
import Pagination from '@/components/shared/Pagination';
import { SUB_TABLE_PAGE_SIZE } from '@/constants';

interface Subject {
  id: number;
  name: string;
  code: string;
  department: {
    id: number;
    name: string;
    code: string;
  };
}

interface FacultySubjectsProps {
  subjects: Subject[];
  userName: string;
  isLoading?: boolean;
}

const FacultySubjects = ({
  subjects,
  userName,
  isLoading = false
}: FacultySubjectsProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalSubjects = subjects.length;

  // Calculate pagination
  const startIndex = (currentPage - 1) * SUB_TABLE_PAGE_SIZE;
  const endIndex = startIndex + SUB_TABLE_PAGE_SIZE;
  const paginatedSubjects = subjects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <Card className="border-slate-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-bold text-slate-900">
            Subjects
          </CardTitle>
          <Skeleton className="h-5 w-6" />
        </CardHeader>
        <Skeleton className="h-4 w-72 mx-4 mb-2" />
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-50 hover:bg-transparent">
                <TableHead className="font-bold text-slate-900">Code</TableHead>
                <TableHead className="font-bold text-slate-900">
                  Subject
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Department
                </TableHead>
                <TableHead className="text-right font-bold text-slate-900 pr-8">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map(i => (
                <TableRow key={i} className="border-slate-50">
                  <TableCell className="py-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell className="py-4">
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell className="text-right pr-8 py-4">
                    <Skeleton className="h-8 w-14 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
        <CardTitle className="text-lg font-bold text-slate-900">
          Subjects
        </CardTitle>
        <span className="text-sm font-semibold text-slate-400">
          {subjects.length}
        </span>
      </CardHeader>
      <p className="text-slate-500 text-sm px-4">
        Subjects tied to {userName} based on classes and enrollments.
      </p>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-50 hover:bg-transparent">
              <TableHead className="font-bold text-slate-900">Code</TableHead>
              <TableHead className="font-bold text-slate-900">
                Subject
              </TableHead>
              <TableHead className="font-bold text-slate-900">
                Department
              </TableHead>
              <TableHead className="text-right font-bold text-slate-900 pr-8">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-slate-500"
                >
                  No subjects found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedSubjects.map(subject => (
                <TableRow
                  key={subject.id}
                  className="border-slate-50 hover:bg-slate-50/50"
                >
                  <TableCell className="py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
                      {subject.code}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-700 py-4">
                    {subject.name}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm py-4">
                    {subject.department.name} ({subject.department.code})
                  </TableCell>
                  <TableCell className="text-right pr-8 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg border-slate-200 text-xs font-semibold text-slate-600 bg-white"
                      onClick={() => navigate(`/subjects/${subject.id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {totalSubjects > SUB_TABLE_PAGE_SIZE && !isLoading && (
          <div className="px-6 pb-6">
            <Pagination
              currentPage={currentPage}
              pageSize={SUB_TABLE_PAGE_SIZE}
              totalCount={totalSubjects}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FacultySubjects;
