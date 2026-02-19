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
    <div className="mt-auto border-t border-sidebar-border p-4">
      <div className="flex flex-col gap-3 rounded-lg p-2 transition-colors hover:bg-sidebar-accent/50 group">
        <div className="flex items-center gap-3 overflow-hidden">
          <Avatar className="h-10 w-10 border border-sidebar-border shrink-0">
            <AvatarImage src={user?.avatarUrl || ''} alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left min-w-0">
            <span className="text-sm font-semibold text-sidebar-foreground truncate">
              {user?.name}
            </span>
            <span className="text-xs text-sidebar-foreground/90 truncate">
              {user?.email}
            </span>
          </div>
        </div>
        <button
          onClick={() => logout?.()}
          className="flex items-center gap-2 w-full mt-1 py-1.5 px-3 rounded-md text-sm font-bold text-destructive hover:bg-destructive/10 transition-all border border-transparent hover:border-destructive/20"
        >
          <LogOut className="h-4 w-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Logout;
