const COLS = "grid-cols-[1fr_96px_96px_168px_124px_128px]";

export function ProjectsGridSkeleton() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-shrink-0 border-b border-brand-200 px-10 pt-9 pb-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-1.5 h-3 w-24 animate-pulse rounded bg-brand-200/60" />
            <div className="h-10 w-48 animate-pulse rounded-lg bg-brand-200/50" />
            <div className="mt-2 h-4 w-40 animate-pulse rounded bg-brand-200/40" />
          </div>
          <div className="mt-1 h-9 w-32 animate-pulse rounded-lg bg-brand-200/50" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-10 py-7">
        {/* StatsBar skeleton */}
        <div className="flex w-fit items-center rounded-xl border border-brand-200 bg-white/60">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex items-center">
              <div className="flex animate-pulse items-center gap-3 px-7 py-4">
                <div className="h-4 w-4 rounded bg-brand-200/60" />
                <div className="h-7 w-8 rounded bg-brand-200/60" />
                <div className="h-4 w-16 rounded bg-brand-200/40" />
              </div>
              {index < 2 && <div className="h-8 w-px bg-brand-200" />}
            </div>
          ))}
        </div>

        {/* Toolbar skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-64 animate-pulse rounded-lg bg-brand-200/50" />
          <div className="h-9 w-36 animate-pulse rounded-lg bg-brand-200/50" />
        </div>

        {/* Table skeleton */}
        <div className="overflow-hidden rounded-xl border border-brand-200 bg-white/80 shadow-[0_2px_12px_rgba(44,26,14,0.06)]">
          <div className={`grid ${COLS} items-center border-b border-brand-200 bg-brand-50/80 px-6 py-3`}>
            {[75, 40, 40, 60, 55, 0].map((widthPct, index) => (
              <div
                key={index}
                className="h-3 animate-pulse rounded bg-brand-200/60"
                style={{ width: widthPct ? `${widthPct}%` : 0 }}
              />
            ))}
          </div>
          <div className="divide-y divide-brand-100">
            {[0, 1, 2, 3, 4].map((rowIndex) => (
              <div key={rowIndex} className={`grid ${COLS} animate-pulse items-center px-6 py-4`}>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 flex-shrink-0 rounded-xl bg-brand-200/50" />
                  <div className="h-4 w-32 rounded bg-brand-200/50" />
                </div>
                <div className="mr-4 ml-auto h-4 w-8 rounded bg-brand-200/40" />
                <div className="mr-4 ml-auto h-4 w-8 rounded bg-brand-200/40" />
                <div className="h-4 w-24 rounded bg-brand-200/40" />
                <div className="h-4 w-20 rounded bg-brand-200/40" />
                <div className="ml-auto h-7 w-20 rounded-lg bg-brand-200/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
