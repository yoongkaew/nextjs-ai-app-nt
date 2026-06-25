export default function AdminLoading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="h-9 w-48 animate-pulse bg-muted" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse border border-border bg-muted" />
        ))}
      </div>
      <div className="h-64 animate-pulse border border-border bg-muted" />
    </div>
  );
}
