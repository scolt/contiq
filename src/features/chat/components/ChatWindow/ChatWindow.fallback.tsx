export function ChatMessagesSkeleton() {
  return (
    <div className="space-y-6">
      {/* AI message */}
      <div className="flex max-w-[70%] animate-pulse flex-col gap-2">
        <div className="h-4 w-3/4 rounded bg-brand-200/50" />
        <div className="h-4 w-full rounded bg-brand-200/50" />
        <div className="h-4 w-1/2 rounded bg-brand-200/40" />
      </div>
      {/* User message */}
      <div className="ml-auto flex max-w-[60%] animate-pulse flex-col items-end gap-2">
        <div className="h-4 w-48 rounded bg-brand-300/40" />
        <div className="h-4 w-32 rounded bg-brand-300/40" />
      </div>
      {/* AI message */}
      <div className="flex max-w-[80%] animate-pulse flex-col gap-2">
        <div className="h-4 w-full rounded bg-brand-200/50" />
        <div className="h-4 w-5/6 rounded bg-brand-200/50" />
        <div className="h-4 w-2/3 rounded bg-brand-200/40" />
        <div className="h-4 w-1/2 rounded bg-brand-200/40" />
      </div>
      {/* User message */}
      <div className="ml-auto flex max-w-[55%] animate-pulse flex-col items-end gap-2">
        <div className="h-4 w-40 rounded bg-brand-300/40" />
      </div>
    </div>
  );
}
