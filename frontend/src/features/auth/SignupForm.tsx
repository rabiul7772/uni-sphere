import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Link } from 'react-router';
import { useSignup } from '@/hooks/auth/useAuth';
import { uploadImage } from '@/services/auth/apiCloudinary';
import { Spinner } from '@/components/ui/spinner';
import { Camera, User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z
    .email('Invalid email format')
    .regex(emailRegex, 'Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'student', 'teacher']),
  avatarUrl: z.string().optional()
});

type SignupFormValues = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { mutate, isPending: isSigningUp } = useSignup();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'student'
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: SignupFormValues) => {
    try {
      let avatarUrl = '';
      if (imageFile) {
        setIsUploading(true);
        avatarUrl = await uploadImage(imageFile);
        setIsUploading(false);
      }

      mutate({ ...data, avatarUrl });
    } catch (error) {
      setIsUploading(false);
      toast.error('Failed to upload avatar. Please try again.');
    }
  };

  const isLoading = isSigningUp || isUploading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Avatar Upload */}
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="relative group">
          <div className="h-20 w-20 rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 group-hover:border-indigo-400 transition-colors flex items-center justify-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-slate-300" />
            )}
          </div>
          <label
            htmlFor="avatar"
            className="absolute -bottom-1 -right-1 h-7 w-7 bg-indigo-600 rounded-lg text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-indigo-700 transition-colors"
          >
            <Camera className="h-3.5 w-3.5" />
            <input
              type="file"
              id="avatar"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isLoading}
            />
          </label>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Upload Avatar
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-600 ml-1">
            Full Name
          </Label>
          <div className="relative">
            <Input
              placeholder="John Doe"
              className="pl-9 h-10 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all shadow-sm text-sm"
              {...register('name')}
              disabled={isLoading}
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          {errors.name && (
            <p className="text-[10px] text-red-500 font-bold ml-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-bold text-slate-600 ml-1">
            Email Address
          </Label>
          <div className="relative">
            <Input
              placeholder="name@example.com"
              className="pl-9 h-10 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all shadow-sm text-sm"
              {...register('email')}
              disabled={isLoading}
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          {errors.email && (
            <p className="text-[10px] text-red-500 font-bold ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-600 ml-1">
              Role
            </Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-10 rounded-xl border-slate-200 focus:border-indigo-500 shadow-sm text-sm">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-[10px] text-red-500 font-bold ml-1">
                {errors.role.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-600 ml-1">
              Password
            </Label>
            <div className="relative">
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-9 h-10 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all shadow-sm text-sm"
                {...register('password')}
                disabled={isLoading}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
            {errors.password && (
              <p className="text-[10px] text-red-500 font-bold ml-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-100 transition-all mt-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" className="text-white" />
            <span className="text-sm">
              {isUploading ? 'Uploading...' : 'Creating...'}
            </span>
          </div>
        ) : (
          'Create Account'
        )}
      </Button>

      <div className="text-center mt-4">
        <p className="text-slate-500 text-xs">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};
