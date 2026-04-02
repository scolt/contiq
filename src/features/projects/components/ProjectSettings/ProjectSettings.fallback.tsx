const SOURCE_LIST_COLS = "grid-cols-[120px_1fr_120px_80px_120px_44px]";

export function ProjectSettingsSkeleton() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden p-8">
      {/* Header */}
      <div className="mb-8 flex flex-shrink-0 items-center gap-4">
        <div className="h-10 w-10 animate-pulse rounded-xl bg-brand-200/50" />
        <div>
          <div className="h-7 w-24 animate-pulse rounded-lg bg-brand-200/60" />
          <div className="mt-0.5 h-3.5 w-52 animate-pulse rounded bg-brand-200/40" />
        </div>
        <div className="ml-4 h-8 w-px bg-brand-200" />
        <div className="h-4 w-16 animate-pulse rounded bg-brand-200/40" />
      </div>

      {/* Source list */}
      <div className="mb-6 flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-brand-200/50 bg-white/90 shadow-[0_2px_12px_rgba(44,26,14,0.06)]">
          <div className={`grid ${SOURCE_LIST_COLS} flex-shrink-0 border-b border-brand-100 bg-brand-50/70 px-5 py-3`}>
            {[55, 100, 65, 50, 65, 0].map((widthPct, index) => (
              <div
                key={index}
                className="h-3 animate-pulse rounded bg-brand-200/60"
                style={{ width: widthPct ? `${widthPct}%` : 0 }}
              />
            ))}
          </div>
          <div className="flex-1 divide-y divide-brand-100/70 overflow-y-auto">
            {[0, 1, 2, 3].map((rowIndex) => (
              <div key={rowIndex} className={`grid ${SOURCE_LIST_COLS} animate-pulse items-center px-5 py-3.5`}>
                <div className="h-5 w-16 rounded-full bg-brand-200/50" />
                <div className="h-4 w-3/4 rounded bg-brand-200/40" />
                <div className="h-4 w-20 rounded bg-brand-200/40" />
                <div className="h-4 w-8 rounded bg-brand-200/40" />
                <div className="h-5 w-16 rounded-full bg-brand-200/50" />
                <div className="ml-auto h-6 w-6 rounded bg-brand-200/40" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AddResourceWidget placeholder */}
      <div className="h-14 flex-shrink-0 animate-pulse rounded-xl bg-brand-200/40" />
    </div>
  );
}
