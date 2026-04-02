"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import { cn } from "@/libs/utils/cn";
import type { ProjectRow } from "@/features/projects/queries/getProjects";
import { PROJECT_ICON_MAP } from "@/features/projects/libs/projectIcons";
import { TABLE_COLS } from "../../ProjectsTable";

function formatRelative(date: Date | null): string {
  if (!date) return "—";
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatFull(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

interface ProjectTableRowProps {
  project: ProjectRow;
}

export function ProjectTableRow({ project }: ProjectTableRowProps) {
  const router = useRouter();
  const Icon = PROJECT_ICON_MAP[project.iconName] ?? FolderOpen;

  return (
    <div
      role="row"
      onClick={() => router.push(`/projects/${project.id}`)}
      className={cn(
        "group relative grid cursor-pointer items-center px-4 transition-colors duration-100 hover:bg-parchment/60 sm:px-6",
        TABLE_COLS,
      )}
      style={{ minHeight: "56px" }}
    >
      {/* Name column */}
      <div className="flex min-w-0 items-center gap-3 py-3.5 pl-1 sm:pl-4">
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border-sand border-1"
          style={{ backgroundColor: project.color }}
        >
          <Icon size={14} className="text-espresso" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <span className="truncate text-sm font-semibold text-espresso">{project.name}</span>
          {/* Mobile-only subtitle: show key stats inline */}
          <p className="mt-0.5 text-xs text-brand-400 sm:hidden">
            {project.sourcesCount} sources · {formatRelative(project.lastActive)}
          </p>
        </div>
      </div>

      {/* Sources — desktop only */}
      <div className="hidden pr-4 text-right sm:block">
        <span className="font-mono text-sm tabular-nums text-brand-700">{project.sourcesCount}</span>
      </div>

      {/* Chats — desktop only */}
      <div className="hidden pr-4 text-right sm:block">
        <span className="font-mono text-sm tabular-nums text-brand-700">{project.chatsCount}</span>
      </div>

      {/* Last active — desktop only */}
      <div className="hidden sm:block" title={formatFull(project.lastActive)}>
        <span className="text-sm text-brand-600">{formatRelative(project.lastActive)}</span>
      </div>

      {/* Created — desktop only */}
      <div className="hidden sm:block">
        <span className="text-sm text-brand-500">{formatDate(project.createdAt)}</span>
      </div>

      {/* Actions — always visible on mobile, hover-only on desktop */}
      <div className="flex items-center justify-end gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
        <Link
          href={`/projects/${project.id}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 rounded-md border border-brand-200 bg-white px-2.5 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:border-sienna hover:text-sienna"
        >
          <span className="hidden sm:inline">Open</span>
          <ArrowRight size={11} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}
