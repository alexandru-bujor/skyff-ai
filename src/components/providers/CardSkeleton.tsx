export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card">
      <div className="flex gap-4 p-5">
        <div className="skeleton-shimmer h-16 w-16 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton-shimmer h-4 w-2/3 rounded" />
          <div className="skeleton-shimmer h-3 w-1/2 rounded" />
          <div className="skeleton-shimmer h-3 w-1/3 rounded" />
        </div>
      </div>
      <div className="space-y-2 px-5 pb-5">
        <div className="skeleton-shimmer h-3 w-full rounded" />
        <div className="skeleton-shimmer h-3 w-4/5 rounded" />
      </div>
      <div className="flex gap-2 border-t border-border/60 p-3">
        <div className="skeleton-shimmer h-9 flex-1 rounded-xl" />
        <div className="skeleton-shimmer h-9 flex-1 rounded-xl" />
      </div>
    </div>
  );
}
