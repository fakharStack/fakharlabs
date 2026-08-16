/** Shimmer skeleton primitives matching the site's light purple surfaces. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`skeleton rounded-lg ${className}`} />;
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3 ${i === lines - 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}

/** Card-shaped skeleton used while a section's content is still resolving. */
export function CardSkeleton({ withImage = false }: { withImage?: boolean }) {
  return (
    <div className="glass-card overflow-hidden rounded-2xl p-6" role="status" aria-busy="true">
      <span className="sr-only">Loading content</span>
      {withImage && <Skeleton className="mb-5 aspect-[4/3] w-full rounded-xl" />}
      <Skeleton className="mb-4 h-11 w-11 rounded-full" />
      <Skeleton className="mb-3 h-5 w-1/2" />
      <SkeletonText lines={3} />
      <Skeleton className="mt-6 h-9 w-32 rounded-full" />
    </div>
  );
}
