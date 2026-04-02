"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/Button";
import type { ProjectsPageData } from "@/features/projects/queries/getProjects";
import { StatsBar } from "./components/StatsBar/StatsBar";
import { ProjectsToolbar, type SortKey } from "./components/ProjectsToolbar/ProjectsToolbar";
import { ProjectsTable } from "./components/ProjectsTable/ProjectsTable";
import { EmptyState } from "./components/EmptyState/EmptyState";
import { NewProjectModal } from "./components/NewProjectModal/NewProjectModal";

interface ProjectsGridProps {
  data: ProjectsPageData;
}

export function ProjectsGrid({ data }: ProjectsGridProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("lastActive");

  const filtered = useMemo(() => {
    let list = data.projects;
    if (search.trim()) {
      const lower = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(lower));
    }
    return [...list].sort((a, b) => {
      switch (sortKey) {
        case "name":
          return a.name.localeCompare(b.name);
        case "createdAt":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "sourcesCount":
          return b.sourcesCount - a.sourcesCount;
        case "lastActive":
        default: {
          if (!a.lastActive && !b.lastActive) return 0;
          if (!a.lastActive) return 1;
          if (!b.lastActive) return -1;
          return b.lastActive.getTime() - a.lastActive.getTime();
        }
      }
    });
  }, [data.projects, search, sortKey]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-shrink-0 border-b border-brand-200 px-4 pt-6 pb-5 sm:px-10 sm:pt-9 sm:pb-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-brand-400">
              {data.userEmail}
            </p>
            <h1 className="font-display text-3xl font-bold leading-none tracking-tight text-espresso sm:text-[2.5rem]">
              Projects
            </h1>
            <p className="mt-2 text-sm text-brand-500">Your curated knowledge base</p>
          </div>
          <Button onClick={() => setModalOpen(true)} className="mt-1 flex items-center gap-2">
            <Plus size={14} strokeWidth={2} />
            <span className="hidden sm:inline">New Project</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-5 gap-5 sm:px-10 sm:py-7 sm:gap-6">
        <StatsBar
          totalProjects={data.projects.length}
          totalSources={data.totalSources}
          totalChats={data.totalChats}
        />

        {data.projects.length === 0 ? (
          <EmptyState onCreateProject={() => setModalOpen(true)} />
        ) : (
          <>
            <ProjectsToolbar
              search={search}
              onSearch={setSearch}
              sortKey={sortKey}
              onSort={setSortKey}
            />
            <ProjectsTable projects={filtered} />
          </>
        )}
      </div>

      <NewProjectModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
