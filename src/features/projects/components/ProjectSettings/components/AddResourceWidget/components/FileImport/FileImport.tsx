"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FileDropZone } from "./components/FileDropZone/FileDropZone";
import { addFileSource } from "@/features/projects/actions/addFileSource";

interface FileImportProps {
  projectId: string;
}

export function FileImport({ projectId }: FileImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleFileChange(f: File | null) {
    setFile(f);
    setError(null);
    if (f) setName((prev) => prev || f.name.replace(/\.[^.]+$/, ""));
    else setName("");
  }

  function handleProcess() {
    if (!file) return;
    setError(null);
    startTransition(async () => {
      const result = await addFileSource(projectId, file, name);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setFile(null);
      setName("");
      router.refresh();
    });
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <Input
        placeholder="Resource name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isPending}
      />
      <FileDropZone file={file} onFileChange={isPending ? () => {} : handleFileChange} />
      {error && (
        <p className="text-xs font-medium text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}
      <div className="mt-auto flex justify-end pt-1">
        <Button onClick={handleProcess} disabled={!file || isPending} className="gap-2">
          {isPending
            ? <><Loader2 size={14} className="animate-spin" /> Uploading...</>
            : <><Upload size={14} /> Process document</>
          }
        </Button>
      </div>
    </div>
  );
}
