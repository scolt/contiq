"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings2 } from "lucide-react";
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
      (s) => s.status === "pending" || s.status === "processing",
    );
    if (!hasPending) return;
    const id = setInterval(() => router.refresh(), 3000);
    return () => clearInterval(id);
  }, [sources, router]);

  function handleDelete(id: string) {
    setSources((prev) => prev.filter((s) => s.id !== id));
    deleteSource(id, projectId);
  }

  function handleReindex(id: string) {
    const source = sources.find((s) => s.id === id);
    if (!source || source.type === "file") return;
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "processing", chunksCount: 0 } : s)),
    );
    reindexSource(id, projectId);
  }

  function handleAdd(
    source: Omit<ProjectSource, "id" | "createdAt" | "chunksCount" | "status">,
  ) {
    const newSource: ProjectSource = {
      ...source,
      id: Math.random().toString(36).slice(2),
      createdAt: new Date(),
      chunksCount: 0,
      status: "pending",
    };
    setSources((prev) => [...prev, newSource]);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden p-6">
      <div className="mb-6 flex flex-shrink-0 items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100">
          <Settings2 size={18} className="text-brand-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Project Sources</h1>
          <p className="text-xs text-gray-400">
            Manage documents, URLs, and text for this project
          </p>
        </div>
      </div>

      <div className="mb-6 flex min-h-0 flex-1 flex-col">
        <SourceList
          sources={sources}
          onDelete={handleDelete}
          onReindex={handleReindex}
        />
      </div>

      <div className="flex-shrink-0">
        <AddResourceWidget projectId={projectId} onAdd={handleAdd} />
      </div>
    </div>
  );
}
