"use client";

import { AlignLeft, FileText, Link2, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { FileImport } from "./components/FileImport/FileImport";
import { URLImport } from "./components/URLImport/URLImport";
import { TextImport } from "./components/TextImport/TextImport";
import type { ProjectSource } from "../../ProjectSettings";

interface AddResourceWidgetProps {
  projectId: string;
  onAdd: (source: Omit<ProjectSource, "id" | "createdAt" | "chunksCount" | "status">) => void;
}

export function AddResourceWidget({ projectId, onAdd }: AddResourceWidgetProps) {
  return (
    <Tabs defaultValue="file" className="flex h-[360px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100">
            <Plus size={14} className="text-brand-600" />
          </div>
          <h2 className="text-sm font-semibold text-gray-800">Add resource</h2>
        </div>
        <TabsList>
          <TabsTrigger value="file"><FileText size={12} />File</TabsTrigger>
          <TabsTrigger value="url"><Link2 size={12} />URL</TabsTrigger>
          <TabsTrigger value="text"><AlignLeft size={12} />Text</TabsTrigger>
        </TabsList>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-5 py-5">
        <TabsContent value="file"><FileImport projectId={projectId} /></TabsContent>
        <TabsContent value="url"><URLImport onAdd={onAdd} /></TabsContent>
        <TabsContent value="text"><TextImport onAdd={onAdd} /></TabsContent>
      </div>
    </Tabs>
  );
}
