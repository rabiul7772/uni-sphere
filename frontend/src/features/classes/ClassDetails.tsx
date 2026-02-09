import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useClass } from '@/hooks/classes/useClass';
import ClassHeader from './ClassHeader';
import ClassHero from './ClassHero';
import ClassMetadata from './ClassMetadata';
import EnrolledStudentsTable from './EnrolledStudentsTable';

export default function ClassDetails() {
  const { id } = useParams<{ id: string }>();
  const { classData, isPending, error, refetch } = useClass(id);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) mainElement.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (error && !isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-destructive font-semibold">
          Error loading class details
        </p>
        <button
          onClick={() => refetch()}
          className="text-sm text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ClassHeader classData={classData} isLoading={isPending} />

      <div className="flex flex-col">
        <ClassHero classData={classData} isLoading={isPending} />
        <ClassMetadata classData={classData} isLoading={isPending} />
        <EnrolledStudentsTable
          students={classData?.enrolledStudents}
          isLoading={isPending}
        />
      </div>
    </div>
  );
}
