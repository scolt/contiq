"use client";

import { useCallback, useRef, useState } from "react";
import { File, Upload, X } from "lucide-react";
import { cn } from "@/libs/utils/cn";

interface FileDropZoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export function FileDropZone({ file, onFileChange }: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileChange(dropped);
  }, [onFileChange]);

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-100">
          <File size={16} className="text-brand-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-800">{file.name}</p>
          <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
        </div>
        <button onClick={() => onFileChange(null)}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-brand-100 hover:text-gray-600">
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => inputRef.current?.click()}
      className={cn("flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-7 transition-all",
        isDragging ? "border-brand-400 bg-brand-50" : "border-gray-200 bg-gray-50 hover:border-brand-300 hover:bg-brand-50/50")}>
      <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
        isDragging ? "bg-brand-200" : "bg-gray-200")}>
        <Upload size={18} className={isDragging ? "text-brand-600" : "text-gray-500"} />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">{isDragging ? "Drop to upload" : "Drop a file here"}</p>
        <p className="mt-0.5 text-xs text-gray-400">or click to browse</p>
      </div>
      <input ref={inputRef} type="file" accept=".pdf" className="hidden"
        onChange={(e) => { const selected = e.target.files?.[0]; if (selected) onFileChange(selected); }} />
    </div>
  );
}
