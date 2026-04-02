"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { addUrlSource } from "@/features/projects/actions/addUrlSource";

interface URLImportProps {
  projectId: string;
}

export function URLImport({ projectId }: URLImportProps) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleProcess() {
    if (!url.trim()) return;
    setError(null);
    startTransition(async () => {
      const result = await addUrlSource(projectId, url, name);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setUrl("");
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
      <Input
        placeholder="https://example.com/docs"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        type="url"
        className="font-mono"
        disabled={isPending}
      />
      <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
        Only the first 50,000 characters of the page content will be processed.
      </p>
      {error && (
        <p className="text-xs font-medium text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}
      <div className="mt-auto flex justify-end">
        <Button onClick={handleProcess} disabled={!url.trim() || isPending} className="gap-2">
          {isPending
            ? <><Loader2 size={14} className="animate-spin" /> Processing...</>
            : <><Upload size={14} /> Process document</>
          }
        </Button>
      </div>
    </div>
  );
}
