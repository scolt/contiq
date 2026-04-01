"use client";

import {useState} from "react";
import {Upload} from "lucide-react";
import {Button} from "@/components/Button";
import {Input} from "@/components/Input";
import {Textarea} from "@/components/Textarea";
import type {ProjectSource} from "../../../../ProjectSettings";

interface TextImportProps {
  onAdd: (source: Omit<ProjectSource, "id" | "createdAt" | "chunksCount" | "status">) => void;
}

export function TextImport({onAdd}: TextImportProps) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  function handleProcess() {
    if (!text.trim()) return;
    onAdd({type: "text", name: name.trim() || "Untitled text"});
    setText("");
    setName("");
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <p className="text-xs text-gray-400">Resource name</p>
      <Input
        placeholder="Resource name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p className="text-xs text-gray-400">Resource content</p>
      <Textarea
        placeholder="Paste or type your text content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 resize-none"
      />
      <div className="flex justify-end">
        <Button onClick={handleProcess} disabled={!text.trim()} className="gap-2">
          <Upload size={14}/> Process document
        </Button>
      </div>
    </div>
  );
}
