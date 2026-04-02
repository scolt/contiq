"use client";

import { AlignLeft, FileText, Link2, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { FileImport } from "./components/FileImport/FileImport";
import { URLImport } from "./components/URLImport/URLImport";
import { TextImport } from "./components/TextImport/TextImport";

interface AddResourceWidgetProps {
  projectId: string;
}

export function AddResourceWidget({ projectId }: AddResourceWidgetProps) {
  return (
    <Tabs defaultValue="file" className="flex h-[280px] flex-col overflow-hidden rounded-2xl border border-brand-200/50 bg-white/90 shadow-[0_2px_16px_rgba(44,26,14,0.07)] sm:h-[360px]">
      <div className="flex flex-shrink-0 items-center justify-between border-b border-brand-100 px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sienna/10">
            <Plus size={14} className="text-sienna" strokeWidth={2} />
          </div>
          <h2 className="text-sm font-semibold text-brand-800">Add source</h2>
        </div>
        <TabsList>
          <TabsTrigger value="file"><FileText size={12} strokeWidth={1.5} />File</TabsTrigger>
          <TabsTrigger value="url"><Link2 size={12} strokeWidth={1.5} />URL</TabsTrigger>
          <TabsTrigger value="text"><AlignLeft size={12} strokeWidth={1.5} />Text</TabsTrigger>
        </TabsList>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
        <TabsContent value="file"><FileImport projectId={projectId} /></TabsContent>
        <TabsContent value="url"><URLImport projectId={projectId} /></TabsContent>
        <TabsContent value="text"><TextImport projectId={projectId} /></TabsContent>
      </div>
    </Tabs>
  );
}

