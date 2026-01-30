import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Logout = () => {
  return (
    <div className="mt-auto border-t border-slate-800 p-4">
      <div className="flex items-center justify-between gap-3 rounded-lg p-2 transition-colors hover:bg-white/5 cursor-pointer group">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-slate-700">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-white">Rabiul</span>
            <span className="text-xs text-slate-400">[EMAIL_ADDRESS]</span>
          </div>
        </div>
        <LogOut className="h-5 w-5 text-slate-400 transition-colors group-hover:text-white" />
      </div>
    </div>
  );
};

export default Logout;
