import type { ProjectRow } from "@/features/projects/queries/getProjects";
import { ProjectTableRow } from "./components/ProjectRow/ProjectRow";

interface ProjectsTableProps {
  projects: ProjectRow[];
}

// Mobile: name + actions only. Desktop: full 6-column layout.
export const TABLE_COLS = "grid-cols-[1fr_auto] sm:grid-cols-[1fr_96px_96px_168px_124px_128px]";

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-200 bg-white/80 shadow-[0_2px_12px_rgba(44,26,14,0.06)]">
      <div className={`grid ${TABLE_COLS} items-center border-b border-brand-200 bg-brand-50/80 px-4 py-3 sm:px-6`}>
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-400">Name</span>
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-400 text-right pr-4 sm:block">Sources</span>
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-400 text-right pr-4 sm:block">Chats</span>
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-400 sm:block">Last Active</span>
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-400 sm:block">Created</span>
        <span />
      </div>
      <div className="divide-y divide-brand-100">
        {projects.map((project) => (
          <ProjectTableRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
