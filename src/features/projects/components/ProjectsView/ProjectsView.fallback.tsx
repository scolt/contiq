export function ProjectsViewSkeleton() {
  return (
    <div className="flex flex-1 gap-3 overflow-hidden p-3">
      {/* Sidebar */}
      <div className="flex w-72 flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-sand bg-parchment">
        <div className="flex flex-shrink-0 items-center justify-between border-b border-sand px-5 py-4">
          <div className="h-4 w-28 animate-pulse rounded bg-brand-300/30" />
          <div className="h-7 w-7 animate-pulse rounded-lg bg-brand-300/30" />
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto p-3">
          {[0, 1, 2].map((projectIndex) => (
            <div key={projectIndex} className="space-y-1.5 rounded-xl p-3">
              <div className="flex animate-pulse items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-brand-300/30" />
                <div className="h-4 w-24 rounded bg-brand-300/25" />
                <div className="ml-auto h-3 w-3 rounded bg-brand-300/25" />
              </div>
              {projectIndex === 0 && (
                <div className="space-y-1 pl-10">
                  {[0, 1, 2].map((convIndex) => (
                    <div key={convIndex} className="h-8 animate-pulse rounded-lg bg-brand-300/20" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main panel */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 overflow-hidden rounded-2xl border border-brand-200/40 bg-white/95 shadow-[0_4px_24px_rgba(44,26,14,0.07)] px-8 py-12">
        <div className="w-full max-w-2xl space-y-10">
          <div className="flex flex-col items-center gap-3">
            <div className="h-9 w-72 animate-pulse rounded-lg bg-brand-200/50" />
            <div className="h-4 w-80 animate-pulse rounded bg-brand-200/40" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((cardIndex) => (
              <div key={cardIndex} className="h-16 animate-pulse rounded-2xl bg-brand-200/40" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
