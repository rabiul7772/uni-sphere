import { Label } from '@/components/ui/label';
import { UploadCloud } from 'lucide-react';

interface BannerUploadProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export const BannerUpload = ({
  imagePreview,
  onImageChange,
  isLoading
}: BannerUploadProps) => {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
        Banner Image *
      </Label>
      <div className="relative">
        <label
          htmlFor="banner-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-2xl cursor-pointer bg-muted/20 dark:bg-muted/10 hover:bg-card dark:hover:bg-muted/20 transition-all overflow-hidden group shadow-sm"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="p-3 bg-card dark:bg-muted/50 rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform border border-border">
                <UploadCloud className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm font-bold text-foreground">
                <span className="text-primary">Click to upload photo</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>
          )}
          <input
            id="banner-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onImageChange}
            disabled={isLoading}
          />
        </label>
      </div>
    </div>
  );
};
