"use client";

import { useState } from "react";
import {
  LayoutGrid,
  Mic,
  FileText,
  Languages,
  Search,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/libs/utils/cn";
import type { Project, Conversation } from "@/features/projects/queries/getProjects";
import { ProjectAccordion } from "./components/ProjectAccordion/ProjectAccordion";
import { ChatWindow } from "@/features/chat/components/ChatWindow/ChatWindow";
import { ChatInput } from "@/features/chat/components/ChatWindow/components/ChatInput/ChatInput";
import { Button } from "@/components/Button";

interface ProjectsViewProps {
  projects: Project[];
}

const ACTION_CARDS = [
  { label: "Chat Files", icon: FileText, from: "from-violet-500", to: "to-purple-600" },
  { label: "Images", icon: ImageIcon, from: "from-pink-400", to: "to-purple-500" },
  { label: "Translate", icon: Languages, from: "from-blue-400", to: "to-cyan-500" },
  { label: "Audio Chat", icon: Mic, from: "from-orange-400", to: "to-amber-500" },
];

function NewChatPanel() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="flex flex-shrink-0 items-center gap-3 border-b border-gray-100 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-md shadow-brand-400/30">
          <LayoutGrid size={15} className="text-white" />
        </div>
        <h2 className="flex-1 text-base font-semibold text-gray-800">New Chat</h2>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
        {/* Greeting */}
        <div className="flex gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-semibold text-white shadow shadow-brand-400/20">
            AI
          </div>
          <div className="min-w-0">
            <p className="text-xl font-bold text-gray-800">Hi, How can I help you?</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Imagine that I&apos;m the manager of a product development team. List the main
              risks associated with launching a new product.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 px-5 py-4">
        <ChatInput onSend={() => {}} />
      </div>
    </div>
  );
}

export function ProjectsView({ projects }: ProjectsViewProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  return (
    <div className="flex flex-1 gap-3 overflow-hidden py-3 pl-3">
      {/* Sidebar */}
      <div className="flex w-72 flex-shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-100 px-4 py-4">
          <h1 className="text-base font-semibold text-gray-800">Chat results</h1>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Search size={15} />
          </Button>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto p-3">
          {projects.map((project, i) => (
            <ProjectAccordion
              key={project.id}
              project={project}
              defaultOpen={i === 0}
              selectedConversationId={selectedConversation?.id ?? null}
              onSelectConversation={setSelectedConversation}
            />
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            onClose={() => setSelectedConversation(null)}
          />
        ) : (
          <NewChatPanel />
        )}
      </div>
    </div>
  );
}
