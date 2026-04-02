"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { SourceList } from "./components/SourceList/SourceList";
import { AddResourceWidget } from "./components/AddResourceWidget/AddResourceWidget";
import { deleteSource } from "@/features/projects/actions/deleteSource";
import { reindexSource } from "@/features/projects/actions/reindexSource";

export type SourceStatus = "pending" | "processing" | "ready" | "error";
export type SourceType = "file" | "url" | "text";

export interface ProjectSource {
  id: string;
  type: SourceType;
  name: string;
  createdAt: Date;
  chunksCount: number;
  status: SourceStatus;
  url?: string;
}

interface ProjectSettingsProps {
  projectId: string;
  initialSources: ProjectSource[];
}

export function ProjectSettings({ projectId, initialSources }: ProjectSettingsProps) {
  const [sources, setSources] = useState<ProjectSource[]>(initialSources);
  const router = useRouter();

  useEffect(() => {
    setSources(initialSources);
  }, [initialSources]);

  useEffect(() => {
    const hasPending = sources.some(
      (source) => source.status === "pending" || source.status === "processing",
    );
    if (!hasPending) return;
    const id = setInterval(() => router.refresh(), 3000);
    return () => clearInterval(id);
  }, [sources, router]);

  function handleDelete(id: string) {
    setSources((prev) => prev.filter((source) => source.id !== id));
    deleteSource(id, projectId);
  }

  function handleReindex(id: string) {
    const source = sources.find((source) => source.id === id);
    if (!source || source.type === "file") return;
    setSources((prev) =>
      prev.map((source) => (source.id === id ? { ...source, status: "processing", chunksCount: 0 } : source)),
    );
    reindexSource(id, projectId);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden p-8">
      <div className="mb-8 flex flex-shrink-0 items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-800/10">
          <BookOpen size={18} className="text-brand-700" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900 leading-tight tracking-tight">
            Sources
          </h1>
          <p className="text-xs text-brand-400 mt-0.5">
            Manage documents, URLs, and text for this project
          </p>
        </div>
        <div className="ml-4 h-8 w-px bg-brand-200" />
        <span className="text-xs font-medium text-brand-500">
          {sources.length} {sources.length === 1 ? "source" : "sources"}
        </span>
      </div>

      <div className="mb-6 flex min-h-0 flex-1 flex-col">
        <SourceList
          sources={sources}
          onDelete={handleDelete}
          onReindex={handleReindex}
        />
      </div>

      <div className="flex-shrink-0">
        <AddResourceWidget projectId={projectId} />
      </div>
    </div>
  );
}

