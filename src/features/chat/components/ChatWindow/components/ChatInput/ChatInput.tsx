"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";

const MAX_HEIGHT = 120;

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, MAX_HEIGHT);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    resize();
  }

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.overflowY = "hidden";
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex items-end gap-3 rounded-2xl border border-brand-200 bg-white/80 px-4 py-3 shadow-[0_2px_10px_rgba(44,26,14,0.06)] focus-within:border-brand-300 focus-within:shadow-[0_2px_10px_rgba(44,26,14,0.10)] transition-all">
      <Textarea
        ref={textareaRef}
        variant="ghost"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about your documents…"
        rows={1}
        className="flex-1 py-[5px] leading-[1.5] overflow-hidden text-[15px] placeholder:text-brand-300"
      />

      <Button
        variant="default"
        size="icon"
        type="button"
        onClick={handleSend}
        disabled={!value.trim() || disabled}
        className="h-8 w-8 flex-shrink-0 rounded-xl"
      >
        <Send size={13} strokeWidth={2} />
      </Button>
    </div>
  );
}

