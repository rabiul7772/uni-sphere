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
import { Textarea } from '@/components/ui/textarea';

interface ClassDetailsFieldsProps {
  isLoading: boolean;
}

export const ClassDetailsFields = ({ isLoading }: ClassDetailsFieldsProps) => {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Capacity *
          </Label>
          <Input
            type="number"
            placeholder="30"
            className="h-10 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm"
            {...register('capacity', { valueAsNumber: true })}
            disabled={isLoading}
          />
          {errors.capacity && (
            <p className="text-[11px] text-destructive font-medium ml-1 mt-1">
              {errors.capacity.message as string}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Status *
          </Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading}
              >
                <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-[11px] text-destructive font-medium ml-1 mt-1">
              {errors.status.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Description *
        </Label>
        <Textarea
          placeholder="Brief description about the class"
          className="min-h-[50px] rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm resize-none"
          {...register('description')}
          disabled={isLoading}
        />
        {errors.description && (
          <p className="text-[11px] text-destructive font-medium ml-1 mt-1">
            {errors.description.message as string}
          </p>
        )}
      </div>
    </div>
  );
};
