import { University } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3 px-6 py-8">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-orange-400 to-orange-600 shadow-lg">
        <University className="h-6 w-6 text-white" />
      </div>
      <span className="text-2xl font-bold tracking-tight text-white">
        UNISPHERE
      </span>
    </div>
  );
};

export default Logo;
