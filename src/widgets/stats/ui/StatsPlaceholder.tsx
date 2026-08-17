export function StatPlaceholder() {
  return (
    <div className="flex items-baseline gap-2">
      <span className="inline-flex gap-1">
        <span className="size-1.5 animate-pulse rounded-full bg-linear-to-r from-blue-400 to-indigo-400 [animation-delay:0ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-linear-to-r from-blue-400 to-indigo-400 [animation-delay:150ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-linear-to-r from-blue-400 to-indigo-400 [animation-delay:300ms]" />
      </span>
      <span className="text-sm tracking-wide text-slate-400">collecting stats</span>
    </div>
  );
}
