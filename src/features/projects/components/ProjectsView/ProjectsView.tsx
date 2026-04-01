"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, MessageSquarePlus, Search } from "lucide-react";
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
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="flex flex-shrink-0 items-center gap-3 border-b border-gray-100 px-6 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-md shadow-brand-400/30">
          <LayoutGrid size={15} className="text-white" />
        </div>
        <h2 className="flex-1 text-base font-semibold text-gray-800">New Chat</h2>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-10">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">Hi, how can I help you?</p>
            <p className="mt-2 text-sm text-gray-500">
              Pick a project to start chatting with its documents.
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
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-left transition-colors hover:border-brand-200 hover:bg-brand-50 disabled:opacity-50"
                  >
                    <div
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: project.color + "33" }}
                    >
                      <Icon size={16} style={{ color: project.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-800">
                        {project.projectName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {project.resourceCount} source{project.resourceCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <MessageSquarePlus size={15} className="ml-auto flex-shrink-0 text-brand-400" />
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
      {/* Sidebar — only visible when a conversation is open */}
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
