import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Eye } from 'lucide-react';

interface RecentClass {
  id: number;
  name: string;
  bannerUrl: string | null;
  teacher?: {
    name: string;
    avatarUrl: string | null;
  };
}

interface RecentClassesProps {
  classes: RecentClass[];
}

const RecentClasses = ({ classes }: RecentClassesProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recent Classes</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <div className="space-y-4">
          {classes.map(cls => (
            <div key={cls.id} className="flex items-center gap-4">
              <div className="h-12 w-20 rounded-md overflow-hidden shrink-0 bg-muted">
                {cls.bannerUrl ? (
                  <img
                    src={cls.bannerUrl}
                    alt={cls.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-1 flex items-center justify-between min-w-0">
                <div className="flex items-center gap-4 min-w-0">
                  <p className="text-sm font-medium leading-none truncate max-w-[140px] sm:max-w-[200px] lg:max-w-[240px]">
                    {cls.name}
                  </p>
                  <div className="hidden md:flex items-center gap-2 shrink-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={cls.teacher?.avatarUrl ?? undefined} />
                      <AvatarFallback>
                        {cls.teacher?.name?.charAt(0) || 'T'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {cls.teacher?.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="table-action-btn"
                    asChild
                  >
                    <Link to={`/classes/${cls.id}`}>
                      <Eye className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">View</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {classes.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No recent classes found.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentClasses;
