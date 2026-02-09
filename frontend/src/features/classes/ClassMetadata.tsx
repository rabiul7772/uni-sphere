import type { Class } from '@/services/classes/apiClasses';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GraduationCap, Building2, BookText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface ClassMetadataProps {
  classData?: Class;
  isLoading?: boolean;
}

export default function ClassMetadata({
  classData,
  isLoading
}: ClassMetadataProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-6 border rounded-xl bg-card">
        {/* Left Column Skeleton */}
        <div className="flex flex-col gap-10">
          {/* Instructor Skeleton */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs font-bold tracking-wider">
              <GraduationCap className="h-4 w-4" />
              <span>Instructor</span>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>

          {/* Subject Skeleton */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs font-bold tracking-wider">
              <BookText className="h-4 w-4" />
              <span>Subject</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs font-bold tracking-wider">
            <Building2 className="h-4 w-4" />
            <span>Department</span>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!classData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-6 border rounded-xl bg-card">
      {/* Left Column: Teacher & Subject */}
      <div className="flex flex-col gap-10">
        {/* Instructor Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs font-bold tracking-wider">
            <GraduationCap className="h-4 w-4" />
            <span>Instructor</span>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
              <AvatarImage
                src={classData.teacher?.avatarUrl || ''}
                alt={classData.teacher?.name}
              />
              <AvatarFallback className="bg-primary/10 text-primary">
                {classData.teacher?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-primary">
                {classData.teacher?.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {classData.teacher?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Subject Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs font-bold tracking-wider">
            <BookText className="h-4 w-4" />
            <span>Subject</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">
                Code:
              </span>
              <Badge variant="outline" className="font-mono text-xs">
                {classData.subject?.code}
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-emerald-500">
              {classData.subject?.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {classData.subject?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Department */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs font-bold tracking-wider">
          <Building2 className="h-4 w-4" />
          <span>Department</span>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-emerald-500">
            {classData.department?.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {classData.department?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
