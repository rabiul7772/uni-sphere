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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex items-start gap-5">
        <div className="p-3 bg-emerald-50 rounded-xl">
          <Check className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="space-y-5 flex-1">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Enrollment Confirmed
            </h2>
            <p className="text-slate-500 mt-1">
              You have been enrolled successfully. Please check your email for
              more details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100">
              {details.department.name}
            </span>
            <span className="text-slate-300 text-sm">/</span>
            <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100">
              {details.subject.name}
            </span>
            <span className="text-slate-300 text-sm">/</span>
            <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100">
              {details.class.name}
            </span>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Class Details</h3>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Class
            </label>
            <p className="text-lg font-bold text-slate-900 mt-1">
              {details.class.name}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Teacher
            </label>
            <p className="text-base font-bold text-slate-900 mt-1">
              {details.teacher.name}
            </p>
            <p className="text-sm text-slate-500">{details.teacher.email}</p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/classes/${details.class.id}`)}
              className="h-11 px-6 rounded-xl font-bold bg-emerald-400/20 border-transparent text-emerald-800 hover:bg-emerald-400/30 transition-all shadow-sm"
            >
              Go to Class
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
