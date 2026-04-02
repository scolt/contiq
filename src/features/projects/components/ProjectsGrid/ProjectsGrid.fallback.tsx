import { TABLE_COLS } from "./components/ProjectsTable/ProjectsTable";

export function ProjectsGridSkeleton() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-shrink-0 border-b border-brand-200 px-4 pt-6 pb-5 sm:px-10 sm:pt-9 sm:pb-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-1.5 h-3 w-24 animate-pulse rounded bg-brand-200/60" />
            <div className="h-9 w-40 animate-pulse rounded-lg bg-brand-200/50 sm:h-10 sm:w-48" />
            <div className="mt-2 h-4 w-40 animate-pulse rounded bg-brand-200/40" />
          </div>
          <div className="mt-1 h-9 w-16 animate-pulse rounded-lg bg-brand-200/50 sm:w-32" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-5 sm:gap-6 sm:px-10 sm:py-7">
        {/* StatsBar skeleton */}
        <div className="flex w-fit items-center rounded-xl border border-brand-200 bg-white/60">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex items-center">
              <div className="flex animate-pulse items-center gap-2 px-4 py-3 sm:gap-3 sm:px-7 sm:py-4">
                <div className="h-4 w-4 rounded bg-brand-200/60" />
                <div className="h-7 w-8 rounded bg-brand-200/60" />
                <div className="h-4 w-14 rounded bg-brand-200/40 sm:w-16" />
              </div>
              {index < 2 && <div className="h-8 w-px bg-brand-200" />}
            </div>
          ))}
        </div>

        {/* Toolbar skeleton */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="h-9 w-full animate-pulse rounded-lg bg-brand-200/50 sm:w-64" />
          <div className="h-9 w-32 animate-pulse rounded-lg bg-brand-200/50" />
        </div>

        {/* Table skeleton */}
        <div className="overflow-hidden rounded-xl border border-brand-200 bg-white/80 shadow-[0_2px_12px_rgba(44,26,14,0.06)]">
          <div className={`grid ${TABLE_COLS} items-center border-b border-brand-200 bg-brand-50/80 px-4 py-3 sm:px-6`}>
            <div className="h-3 w-3/4 animate-pulse rounded bg-brand-200/60" />
            <div className="hidden h-3 w-2/3 animate-pulse rounded bg-brand-200/60 sm:block" />
            <div className="hidden h-3 w-2/3 animate-pulse rounded bg-brand-200/60 sm:block" />
            <div className="hidden h-3 w-3/5 animate-pulse rounded bg-brand-200/60 sm:block" />
            <div className="hidden h-3 w-1/2 animate-pulse rounded bg-brand-200/60 sm:block" />
            <div />
          </div>
          <div className="divide-y divide-brand-100">
            {[0, 1, 2, 3, 4].map((rowIndex) => (
              <div key={rowIndex} className={`grid ${TABLE_COLS} animate-pulse items-center px-4 py-4 sm:px-6`}>
                <div className="flex items-center gap-3 pl-1 sm:pl-4">
                  <div className="h-8 w-8 flex-shrink-0 rounded-xl bg-brand-200/50" />
                  <div className="space-y-1">
                    <div className="h-4 w-28 rounded bg-brand-200/50" />
                    <div className="h-3 w-20 rounded bg-brand-200/35 sm:hidden" />
                  </div>
                </div>
                <div className="hidden mr-4 ml-auto h-4 w-8 rounded bg-brand-200/40 sm:block" />
                <div className="hidden mr-4 ml-auto h-4 w-8 rounded bg-brand-200/40 sm:block" />
                <div className="hidden h-4 w-24 rounded bg-brand-200/40 sm:block" />
                <div className="hidden h-4 w-20 rounded bg-brand-200/40 sm:block" />
                <div className="ml-auto h-7 w-8 rounded-md bg-brand-200/40 sm:w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
