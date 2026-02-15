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
        return 'bg-primary/10 text-primary border-primary/20';
      case 'student':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'admin':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (isLoading) {
    return (
      <Card className="section-card">
        <CardHeader className="section-card-header">
          <CardTitle className="section-card-title">Profile</CardTitle>
          <Skeleton className="h-5 w-16 rounded-lg" />
        </CardHeader>
        <CardContent className="section-card-content">
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
    <Card className="section-card">
      <CardHeader className="section-card-header">
        <CardTitle className="section-card-title">Profile</CardTitle>
        <Badge
          className={`rounded-lg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getRoleBadgeColor(
            user.role
          )}`}
          variant="outline"
        >
          {user.role}
        </Badge>
      </CardHeader>
      <CardContent className="section-card-content">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border border-border">
            <AvatarImage src={user.avatarUrl || undefined} />
            <AvatarFallback className="bg-muted text-lg text-muted-foreground font-semibold">
              {user.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold text-foreground">
              {user.name}
            </h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacultyProfile;
