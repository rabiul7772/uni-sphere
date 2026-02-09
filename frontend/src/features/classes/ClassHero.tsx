import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { Class } from '@/services/classes/apiClasses';

interface ClassHeroProps {
  classData?: Class;
  isLoading?: boolean;
}

export default function ClassHero({ classData, isLoading }: ClassHeroProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 mb-8">
        <Skeleton className="w-full h-[280px] rounded-xl" />
        <div className="flex flex-col gap-2 p-6 border rounded-xl bg-card">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-9 w-3/4" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!classData) return null;

  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Banner */}
      <div className="relative w-full h-[280px] rounded-xl overflow-hidden bg-muted">
        {classData.bannerUrl ? (
          <img
            src={classData.bannerUrl}
            alt={classData.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-accent/20">
            <span className="text-muted-foreground">No banner image</span>
          </div>
        )}
      </div>

      {/* Title and Badge */}
      <div className="flex flex-col gap-2 p-6 border rounded-xl bg-card">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold">{classData.name}</h2>
            <p className="text-muted-foreground text-lg">
              {classData.description}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="bg-accent/10 px-3 py-1">
              {classData.capacity} spots
            </Badge>
            <Badge
              className={`${
                classData.status === 'active'
                  ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
                  : 'bg-muted text-muted-foreground'
              } px-3 py-1 uppercase font-semibold`}
            >
              {classData.status}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
