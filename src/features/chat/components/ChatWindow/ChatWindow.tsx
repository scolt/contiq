"use client";

import { useState, useEffect, useRef } from "react";
import { X, LayoutGrid } from "lucide-react";
import type { Conversation } from "@/features/projects/queries/getProjects";
import { Button } from "@/components/Button";
import { ChatMessage, type ChatMessageData } from "./components/ChatMessage/ChatMessage";
import { ChatInput } from "./components/ChatInput/ChatInput";

const SEED_MESSAGES: ChatMessageData[] = [
  {
    id: "seed-1",
    role: "user",
    content: "Can you summarise the key points from the uploaded documents?",
  },
  {
    id: "seed-2",
    role: "assistant",
    content:
      "Based on the documents in this project, here are the key findings:\n\n1. **Market opportunity** is estimated at $4.2B by 2027, growing at 18% CAGR.\n2. **Primary risk factors** include regulatory changes and increased competition from new entrants.\n3. **Recommended action**: focus on customer retention before expanding to new segments.",
  },
  {
    id: "seed-3",
    role: "user",
    content: "What does the data say about customer retention strategies?",
  },
  {
    id: "seed-4",
    role: "assistant",
    content:
      "The documents highlight three proven retention tactics:\n\n• Personalised onboarding reduces churn by up to 23%.\n• Proactive support outreach increases NPS by 15 points on average.\n• Loyalty programmes show strongest ROI when introduced at the 90-day mark.",
  },
];

interface ChatWindowProps {
  conversation: Conversation;
  onClose: () => void;
}

export function ChatWindow({ conversation, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessageData[]>(SEED_MESSAGES);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(SEED_MESSAGES);
  }, [conversation.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(text: string) {
    const userMsg: ChatMessageData = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };
    const aiMsg: ChatMessageData = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content:
        "I'm reviewing the project documents to answer your question. Based on what I've found, this topic is covered in detail in section 3 of the uploaded files — would you like me to pull a direct quote?",
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
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
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
