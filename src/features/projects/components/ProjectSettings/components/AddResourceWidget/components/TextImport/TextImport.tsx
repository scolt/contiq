"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { addTextSource } from "@/features/projects/actions/addTextSource";
import { cn } from "@/libs/utils/cn";

const MAX_TEXT_LENGTH = 10_000;

interface TextImportProps {
  projectId: string;
}

export function TextImport({ projectId }: TextImportProps) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isOverLimit = text.length > MAX_TEXT_LENGTH;

  function handleProcess() {
    if (!text.trim() || isOverLimit) return;
    setError(null);
    startTransition(async () => {
      const result = await addTextSource(projectId, text, name);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setText("");
      setName("");
      router.refresh();
    });
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <p className="text-xs text-gray-400">Resource name</p>
      <Input
        placeholder="Resource name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isPending}
      />

      <p className="text-xs text-gray-400">Resource content</p>
      <Textarea
        placeholder="Paste or type your text content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={cn("flex-1 resize-none", isOverLimit && "border-red-400 focus:border-red-400")}
        disabled={isPending}
      />
      {error && (
        <p className="text-xs font-medium text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}
      <div className="flex items-center justify-between">
        <span className={cn("text-xs", isOverLimit ? "text-red-500 font-medium" : "text-gray-400")}>
          {text.length.toLocaleString()} / {MAX_TEXT_LENGTH.toLocaleString()} characters
          {isOverLimit && " — limit exceeded"}
        </span>
        <Button onClick={handleProcess} disabled={!text.trim() || isOverLimit || isPending} className="gap-2">
          {isPending
            ? <><Loader2 size={14} className="animate-spin" /> Processing...</>
            : <><Upload size={14} /> Process document</>
          }
        </Button>
      </div>
    </div>
  );
}
