import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import type { EnrollmentDetails } from '@/services/enrollments/apiEnrollments';

interface EnrollmentSuccessProps {
  details: EnrollmentDetails;
}

export const EnrollmentSuccess = ({ details }: EnrollmentSuccessProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Confirmation Card */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-8 flex items-start gap-5">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Check className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-5 flex-1">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Enrollment Confirmed
            </h2>
            <p className="text-muted-foreground mt-1">
              You have been enrolled successfully. Please check your email for
              more details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 bg-muted text-foreground rounded-lg text-xs font-bold border border-border">
              {details.department.name}
            </span>
            <span className="text-muted-foreground/30 text-sm">/</span>
            <span className="px-3 py-1.5 bg-muted text-foreground rounded-lg text-xs font-bold border border-border">
              {details.subject.name}
            </span>
            <span className="text-muted-foreground/30 text-sm">/</span>
            <span className="px-3 py-1.5 bg-muted text-foreground rounded-lg text-xs font-bold border border-border">
              {details.class.name}
            </span>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="px-8 py-6 border-b border-border bg-muted/50">
          <h3 className="text-lg font-bold text-foreground">Class Details</h3>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
              Class
            </label>
            <p className="text-lg font-bold text-foreground mt-1">
              {details.class.name}
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
              Teacher
            </label>
            <p className="text-base font-bold text-foreground mt-1">
              {details.teacher.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {details.teacher.email}
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/classes/${details.class.id}`)}
              className="h-11 px-6 rounded-xl font-bold bg-primary/40 border-transparent text-primary hover:bg-primary/20 transition-all shadow-sm"
            >
              Go to Class
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
