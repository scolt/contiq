"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { Send, Mic, Paperclip } from "lucide-react";
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
    <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
      <Button variant="ghost" size="icon" type="button" className="mb-0.5 flex-shrink-0">
        <Paperclip size={18} />
      </Button>

      <Textarea
        ref={textareaRef}
        variant="ghost"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        rows={1}
        className="flex-1 py-[7px] leading-[1.4] overflow-hidden"
      />

      <Button variant="ghost" size="icon" type="button" className="mb-0.5 flex-shrink-0">
        <Mic size={18} />
      </Button>

      <Button
        variant="default"
        size="icon"
        type="button"
        onClick={handleSend}
        disabled={!value.trim() || disabled}
        className="flex-shrink-0"
      >
        <Send size={14} />
      </Button>
    </div>
  );
}
