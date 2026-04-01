"use client";

import { useState, useEffect, useRef } from "react";
import { X, LayoutGrid } from "lucide-react";
import type { Conversation } from "@/features/projects/queries/getProjects";
import { Button } from "@/components/Button";
import { ChatMessage, type ChatMessageData, type MessageSource } from "./components/ChatMessage/ChatMessage";
import { ChatInput } from "./components/ChatInput/ChatInput";
import { getMessages } from "@/features/chat/queries/getMessages";

const SOURCES_SENTINEL = "\n\n__SOURCES__";

interface ChatWindowProps {
  conversation: Conversation;
  onClose: () => void;
}

export function ChatWindow({ conversation, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
    getMessages(conversation.id).then(setMessages);
  }, [conversation.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(text: string) {
    if (isSending) return;
    setIsSending(true);

    const aiId = `a-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", content: text },
      { id: aiId, role: "assistant", content: "", isStreaming: true },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: conversation.id,
          projectId: conversation.projectId,
          message: text,
        }),
      });

      if (!response.ok) throw new Error("Chat request failed");

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const sentinelIdx = buffer.indexOf(SOURCES_SENTINEL);
        const displayContent =
          sentinelIdx !== -1 ? buffer.slice(0, sentinelIdx) : buffer;

        setMessages((prev) =>
          prev.map((message) =>
            message.id === aiId ? { ...message, content: displayContent } : message,
          ),
        );
      }

      const sentinelIdx = buffer.indexOf(SOURCES_SENTINEL);
      let sources: MessageSource[] | undefined;
      if (sentinelIdx !== -1) {
        try {
          sources = JSON.parse(buffer.slice(sentinelIdx + SOURCES_SENTINEL.length));
        } catch {
          // ignore parse error
        }
      }

      setMessages((prev) =>
        prev.map((message) =>
          message.id === aiId ? { ...message, isStreaming: false, sources } : message,
        ),
      );
    } catch {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === aiId
            ? { ...message, content: "Sorry, something went wrong. Please try again.", isStreaming: false }
            : message,
        ),
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-md shadow-brand-400/20">
            <LayoutGrid size={15} className="text-white" />
          </div>
          <h2 className="truncate text-base font-semibold text-gray-800">
            {conversation.conversationName}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="ml-3 h-7 w-7 flex-shrink-0"
        >
          <X size={16} />
        </Button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex-shrink-0 px-5 py-4">
        <ChatInput onSend={handleSend} disabled={isSending} />
      </div>
    </div>
  );
}
