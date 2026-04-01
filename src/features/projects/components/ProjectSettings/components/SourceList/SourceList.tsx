import { Database } from "lucide-react";
import type { ProjectSource } from "../../ProjectSettings";
import { SourceRow } from "./components/SourceRow/SourceRow";

interface SourceListProps {
  sources: ProjectSource[];
  onDelete: (id: string) => void;
  onReindex: (id: string) => void;
}

export function SourceList({ sources, onDelete, onReindex }: SourceListProps) {
  if (sources.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
          <Database size={20} className="text-brand-400" />
        </div>
        <p className="text-sm text-gray-400">No sources yet. Add one below.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="grid flex-shrink-0 grid-cols-[120px_1fr_120px_80px_110px_44px] border-b border-gray-100 bg-gray-50/60 px-4 py-2.5">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Type
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Name
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Created
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Chunks
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Status
        </span>
        <span />
      </div>
      <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
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
