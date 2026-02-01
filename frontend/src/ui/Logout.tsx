import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser, useLogout } from '@/hooks/auth/useAuth';
import { Spinner } from '@/components/ui/spinner';

const Logout = () => {
  const { data: user, isPending, error } = useUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  if (isPending || isLoggingOut) return <Spinner size="sm" />;
  if (error) return null;

  return (
    <div className="mt-auto border-t border-slate-800 p-4">
      <div className="flex items-center justify-between gap-3 rounded-lg p-2 transition-colors hover:bg-white/5 cursor-pointer group">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-slate-700">
            <AvatarImage src={user?.avatarUrl || ''} alt="User" />
            <AvatarFallback>
              {user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-white">
              {user?.name}
            </span>
            <span className="text-xs text-slate-400">{user?.email}</span>
          </div>
        </div>
        <LogOut
          onClick={() => logout?.()}
          className="h-5 w-5 text-slate-400 transition-colors group-hover:text-white"
        />
      </div>
    </div>
  );
};

export default Logout;
