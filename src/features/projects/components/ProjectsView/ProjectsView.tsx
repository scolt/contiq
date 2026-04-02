"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquarePlus, PenLine } from "lucide-react";
import type { Project, Conversation } from "@/features/projects/queries/getProjects";
import { PROJECT_ICON_MAP } from "@/features/projects/libs/projectIcons";
import { ProjectAccordion } from "./components/ProjectAccordion/ProjectAccordion";
import { ChatWindow } from "@/features/chat/components/ChatWindow/ChatWindow";
import { Button } from "@/components/Button";
import { createChat } from "@/features/chat/actions/createChat";
import { deleteChat } from "@/features/chat/actions/deleteChat";

interface ProjectsViewProps {
  projects: Project[];
}

interface NewChatPanelProps {
  projects: Project[];
  onNewChat: (projectId: string) => void;
  isCreating: boolean;
}

function NewChatPanel({ projects, onNewChat, isCreating }: NewChatPanelProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white/95 border border-brand-200/40 shadow-[0_4px_24px_rgba(44,26,14,0.07)]">
      <div className="flex flex-shrink-0 items-center gap-3 border-b border-brand-100 px-7 py-5">
        <div className="h-1.5 w-1.5 rounded-full bg-brand-300" />
        <h2 className="font-display text-base font-semibold italic text-brand-800">
          Start a conversation
        </h2>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-8 py-12">
        <div className="w-full max-w-2xl space-y-10">
          <div className="text-center">
            <h3 className="font-display text-3xl font-bold italic text-brand-900 leading-tight">
              What would you like to research?
            </h3>
            <p className="mt-3 text-sm text-brand-500 leading-relaxed">
              Select a project below to begin a conversation with its documents.
            </p>
          </div>

          {projects.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {projects.map((project) => {
                const Icon = PROJECT_ICON_MAP[project.iconName] ?? PROJECT_ICON_MAP["FolderOpen"];
                return (
                  <button
                    key={project.id}
                    onClick={() => onNewChat(project.id)}
                    disabled={isCreating}
                    className="group flex items-center gap-3.5 rounded-2xl border border-brand-200/60 bg-white/80 px-5 py-4 text-left shadow-[0_1px_6px_rgba(44,26,14,0.05)] transition-all hover:border-brand-300 hover:bg-white hover:shadow-[0_3px_16px_rgba(44,26,14,0.10)] disabled:opacity-50"
                  >
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl opacity-90 "
                      style={{ backgroundColor: project.color }}
                    >
                      <Icon size={16} className="text-espresso" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-brand-900">
                        {project.projectName}
                      </p>
                      <p className="text-xs text-brand-400">
                        {project.resourceCount} source{project.resourceCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <MessageSquarePlus size={15} className="ml-auto flex-shrink-0 text-brand-300 group-hover:text-sienna transition-colors" strokeWidth={1.5} />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsView({ projects }: ProjectsViewProps) {
  const router = useRouter();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  async function handleNewChat(projectId: string) {
    if (isCreating) return;
    setIsCreating(true);
    try {
      const conv = await createChat(projectId);
      setSelectedConversation(conv);
      router.refresh();
    } finally {
      setIsCreating(false);
    }
  }

  async function handleDeleteConversation(conversationId: string) {
    await deleteChat(conversationId);
    if (selectedConversation?.id === conversationId) {
      setSelectedConversation(null);
    }
    router.refresh();
  }

  return (
    <div className="flex flex-1 gap-3 overflow-hidden p-3">
      {/* Warm sand sidebar */}
      <div className="flex w-72 flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-sand bg-parchment">
        {/* Sidebar header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-sand px-5 py-4">
          <h1 className="font-display text-sm font-semibold italic text-espresso tracking-wide">
            Conversations
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-umber hover:bg-sand hover:text-bark"
            onClick={() => setSelectedConversation(null)}
          >
            <PenLine size={14} strokeWidth={1.5} />
          </Button>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto p-3">
          {projects.map((project, index) => (
            <ProjectAccordion
              key={project.id}
              project={project}
              defaultOpen={index === 0}
              selectedConversationId={selectedConversation?.id ?? null}
              onSelectConversation={setSelectedConversation}
              onDeleteConversation={handleDeleteConversation}
              onNewChat={handleNewChat}
            />
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 overflow-hidden">
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            onClose={() => setSelectedConversation(null)}
          />
        ) : (
          <NewChatPanel projects={projects} onNewChat={handleNewChat} isCreating={isCreating} />
        )}
      </div>
    </div>
  );
}

