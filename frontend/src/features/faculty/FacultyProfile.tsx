import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { UserDetail } from '@/services/users/apiUsers';

interface FacultyProfileProps {
  user?: UserDetail;
  isLoading?: boolean;
}

const FacultyProfile = ({ user, isLoading = false }: FacultyProfileProps) => {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'teacher':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'student':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'admin':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  if (isLoading) {
    return (
      <Card className="border-slate-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold text-slate-900">
            Profile
          </CardTitle>
          <Skeleton className="h-5 w-16 rounded-lg" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) return null;

  return (
    <Card className="border-slate-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold text-slate-900">
          Profile
        </CardTitle>
        <Badge
          className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getRoleBadgeColor(
            user.role
          )}`}
          variant="outline"
        >
          {user.role}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatarUrl || undefined} />
            <AvatarFallback className="bg-slate-100 text-lg text-slate-600 font-bold">
              {user.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacultyProfile;
