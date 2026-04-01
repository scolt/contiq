"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import type { ProjectSource } from "../../../../ProjectSettings";

interface URLImportProps {
  onAdd: (source: Omit<ProjectSource, "id" | "createdAt" | "chunksCount" | "status">) => void;
}

export function URLImport({ onAdd }: URLImportProps) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  function handleProcess() {
    if (!url.trim()) return;
    let domain = url;
    try { domain = new URL(url).hostname; } catch { /* keep raw */ }
    onAdd({ type: "url", name: name.trim() || domain, url });
    setUrl("");
    setName("");
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <Input
        placeholder="Resource name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="https://example.com/docs"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        type="url"
        className="font-mono"
      />
      <div className="mt-auto flex justify-end">
        <Button onClick={handleProcess} disabled={!url.trim()} className="gap-2">
          <Upload size={14} /> Process document
        </Button>
      </div>
    </div>
  );
}
