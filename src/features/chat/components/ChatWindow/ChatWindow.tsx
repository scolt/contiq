"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { Conversation } from "@/features/projects/queries/getProjects";
import { Button } from "@/components/Button";
import { ChatMessage, type ChatMessageData, type MessageSource } from "./components/ChatMessage/ChatMessage";
import { ChatInput } from "./components/ChatInput/ChatInput";
import { ChatMessagesSkeleton } from "./ChatWindow.fallback";
import { getMessages } from "@/features/chat/queries/getMessages";

const SOURCES_SENTINEL = "\n\n__SOURCES__";

interface ChatWindowProps {
  conversation: Conversation;
  onClose: () => void;
}

export function ChatWindow({ conversation, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMessages([]);
    setIsLoadingMessages(true);
    getMessages(conversation.id).then((loadedMessages) => {
      setMessages(loadedMessages);
      setIsLoadingMessages(false);
    });
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

      if (!response.ok) {
        if (response.status === 402) {
          const errorText = await response.text();
          setMessages((prev) =>
            prev.map((message) =>
              message.id === aiId
                ? { ...message, content: errorText, isStreaming: false }
                : message,
            ),
          );
          return;
        }
        throw new Error("Chat request failed");
      }

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
      router.refresh();
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
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white/95 shadow-[0_4px_24px_rgba(44,26,14,0.08)] border border-brand-200/40">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-brand-100 bg-brand-50/50 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-sienna/60 flex-shrink-0" />
          <h2 className="truncate font-display text-base font-semibold text-brand-900 italic">
            {conversation.conversationName}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="ml-3 h-7 w-7 flex-shrink-0"
        >
          <X size={15} strokeWidth={1.5} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4 sm:px-8 sm:py-6">
        {isLoadingMessages ? (
          <ChatMessagesSkeleton />
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-brand-100 px-3 py-3 sm:px-6 sm:py-4">
        <ChatInput onSend={handleSend} disabled={isSending} />
      </div>
    </div>
  );
}

