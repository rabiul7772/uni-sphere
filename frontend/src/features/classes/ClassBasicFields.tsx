import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface ClassBasicFieldsProps {
  isLoading: boolean;
  isEditing: boolean;
  subjects: any[] | undefined;
  teachers: any[] | undefined;
}

export const ClassBasicFields = ({
  isLoading,
  isEditing,
  subjects,
  teachers
}: ClassBasicFieldsProps) => {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs font-bold text-slate-700">Class Name *</Label>
        <Input
          placeholder="Introduction to Biology - Section A"
          className="h-10 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm disabled:pointer-events-auto"
          {...register('name')}
          disabled={isLoading || isEditing}
        />
        {errors.name && (
          <p className="text-xs text-red-500 font-medium ml-1">
            {errors.name.message as string}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-700">Subject *</Label>
          <Controller
            name="subjectId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading || isEditing}
              >
                <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects?.map((s: any) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.subjectId && (
            <p className="text-xs text-red-500 font-medium ml-1">
              {errors.subjectId.message as string}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-700">Teacher *</Label>
          <Controller
            name="teacherId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading}
              >
                <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm">
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers?.map(t => (
                    <SelectItem key={t.id} value={t.id.toString()}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.teacherId && (
            <p className="text-xs text-red-500 font-medium ml-1">
              {errors.teacherId.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
