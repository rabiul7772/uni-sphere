import { useState } from 'react';
import { EnrollmentsBreadcrumb } from '@/features/enrollments/EnrollmentsBreadcrumb';
import { EnrollmentForm } from '@/features/enrollments/EnrollmentForm';
import { EnrollmentSuccess } from '@/features/enrollments/EnrollmentSuccess';
import type { EnrollmentDetails } from '@/services/enrollments/apiEnrollments';

const Enrollments = () => {
  const [enrollmentDetails, setEnrollmentDetails] =
    useState<EnrollmentDetails | null>(null);

  return (
    <div className="max-w-[1200px] mx-auto pb-10">
      <EnrollmentsBreadcrumb />

      {!enrollmentDetails ? (
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Enroll in a Class
            </h1>
            <p className="text-slate-500 mt-2">
              Select a class to enroll as the current user.
            </p>
          </div>

          <div className="pt-4">
            <EnrollmentForm
              onSuccess={details => setEnrollmentDetails(details)}
            />
          </div>
        </div>
      ) : (
        <EnrollmentSuccess details={enrollmentDetails} />
      )}
    </div>
  );
};

export default Enrollments;
