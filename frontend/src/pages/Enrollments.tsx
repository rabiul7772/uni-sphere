import { useState } from 'react';
import { EnrollmentsBreadcrumb } from '@/features/enrollments/EnrollmentsBreadcrumb';
import { EnrollmentForm } from '@/features/enrollments/EnrollmentForm';
import { EnrollmentSuccess } from '@/features/enrollments/EnrollmentSuccess';
import type { EnrollmentDetails } from '@/services/enrollments/apiEnrollments';

const Enrollments = () => {
  const [enrollmentDetails, setEnrollmentDetails] =
    useState<EnrollmentDetails | null>(null);

  return (
    <div className="page-container">
      <EnrollmentsBreadcrumb />

      {!enrollmentDetails ? (
        <>
          <div className="page-header">
            <div className="page-header-content">
              <h1 className="page-title">Enroll in a Class</h1>
            </div>
          </div>

          <EnrollmentForm
            onSuccess={details => setEnrollmentDetails(details)}
          />
        </>
      ) : (
        <EnrollmentSuccess details={enrollmentDetails} />
      )}
    </div>
  );
};

export default Enrollments;
