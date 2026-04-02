import { Library } from "lucide-react";
import type { ProjectSource } from "../../ProjectSettings";
import { SourceRow } from "./components/SourceRow/SourceRow";

interface SourceListProps {
  sources: ProjectSource[];
  onDelete: (id: string) => void;
  onReindex: (id: string) => void;
}

// Mobile: type | name | status | menu. Desktop: full 6-column layout.
export const SOURCE_COLS =
  "grid-cols-[auto_1fr_auto_44px] sm:grid-cols-[120px_1fr_120px_80px_120px_44px]";

export function SourceList({ sources, onDelete, onReindex }: SourceListProps) {
  if (sources.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-brand-200/50 bg-white/70 shadow-[0_2px_12px_rgba(44,26,14,0.05)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100">
          <Library size={22} className="text-brand-400" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-brand-700">Your library is empty</p>
          <p className="mt-1 text-xs text-brand-400">Add your first source below</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-brand-200/50 bg-white/90 shadow-[0_2px_12px_rgba(44,26,14,0.06)]">
      <div className={`grid flex-shrink-0 ${SOURCE_COLS} border-b border-brand-100 bg-brand-50/70 px-4 py-3 sm:px-5`}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-400">
          Type
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-400">
          Name
        </span>
        <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-brand-400 sm:block">
          Added
        </span>
        <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-brand-400 sm:block">
          Chunks
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-400">
          Status
        </span>
        <span />
      </div>
      <div className="flex-1 divide-y divide-brand-100/70 overflow-y-auto">
        {sources.map((source) => (
          <SourceRow
            key={source.id}
            source={source}
            onDelete={onDelete}
            onReindex={onReindex}
          />
        ))}
      </div>
    </div>
  );
}
