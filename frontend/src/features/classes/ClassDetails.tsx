import { useParams } from 'react-router';
import { useClass } from '@/hooks/classes/useClass';
import ClassHeader from './ClassHeader';
import ClassHero from './ClassHero';
import ClassMetadata from './ClassMetadata';
import EnrolledStudentsTable from './EnrolledStudentsTable';
import { Spinner } from '@/components/ui/spinner';

export default function ClassDetails() {
  const { id } = useParams<{ id: string }>();
  const { classData, isPending, error, refetch } = useClass(id);

  if (isPending) return <Spinner size="xl" />;

  if (error || !classData) {
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
      <ClassHeader classData={classData} />

      <div className="flex flex-col">
        <ClassHero classData={classData} />
        <ClassMetadata classData={classData} />
        <EnrolledStudentsTable students={classData.enrolledStudents} />
      </div>
    </div>
  );
}
