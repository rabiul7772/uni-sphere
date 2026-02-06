import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-100', className)}
      {...props}
    />
  );
}

function SkeletonList({
  count = 1,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className={className} {...props} />
      ))}
    </>
  );
}

export { Skeleton, SkeletonList };
