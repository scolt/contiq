"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, FolderOpen } from "lucide-react";
import { Button } from "@/components/Button";
import type { Project } from "@/features/projects/queries/getProjects";
import { PROJECT_ICON_MAP } from "@/features/projects/libs/projectIcons";
import { NewProjectModal } from "./components/NewProjectModal/NewProjectModal";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and organize your document projects
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* New project card */}
        <Button
          variant="outline"
          onClick={() => setModalOpen(true)}
          className="group h-[88px] w-full justify-start gap-3 rounded-2xl border-2 border-dashed border-brand-200 bg-white px-4 hover:border-brand-400 hover:bg-brand-50"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 transition-colors group-hover:bg-brand-200">
            <Plus size={18} className="text-brand-600" />
          </div>
          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-semibold text-gray-700 group-hover:text-brand-700">
              New Project
            </p>
            <p className="mt-0.5 truncate text-xs text-gray-400">Organize your documents</p>
          </div>
        </Button>

        {/* Project cards */}
        {projects.map((project) => {
          const Icon = PROJECT_ICON_MAP[project.iconName] ?? FolderOpen;
          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group flex h-[88px] items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
            >
              <div
                style={{ backgroundColor: project.color }}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-opacity group-hover:opacity-80"
              >
                <Icon size={18} className="text-gray-700" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800 group-hover:text-brand-700">
                  {project.projectName}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {project.resourceCount}{" "}
                  {project.resourceCount === 1 ? "resource" : "resources"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <NewProjectModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
