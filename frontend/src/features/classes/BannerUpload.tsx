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
    <div className="space-y-2">
      <Label className="text-xs font-bold text-slate-700">Banner Image *</Label>
      <div className="relative">
        <label
          htmlFor="banner-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all overflow-hidden group"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="p-3 bg-white rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8 text-orange-500" />
              </div>
              <p className="text-sm font-bold text-slate-900">
                <span className="text-orange-600">Click to upload photo</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
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
