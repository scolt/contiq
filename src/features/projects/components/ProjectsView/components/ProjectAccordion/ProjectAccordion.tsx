"use client";

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { cn } from "@/libs/utils/cn";
import type { Project, Conversation } from "@/features/projects/queries/getProjects";
import { PROJECT_ICON_MAP } from "@/features/projects/libs/projectIcons";
import { Button } from "@/components/Button";
import { ConversationItem } from "../ConversationItem/ConversationItem";

interface ProjectAccordionProps {
  project: Project;
  selectedConversationId: string | null;
  defaultOpen?: boolean;
  onSelectConversation: (conversation: Conversation) => void;
  onDeleteConversation: (conversationId: string) => void;
  onNewChat: (projectId: string) => void;
}

export function ProjectAccordion({
  project,
  selectedConversationId,
  defaultOpen = false,
  onSelectConversation,
  onDeleteConversation,
  onNewChat,
}: ProjectAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const Icon = PROJECT_ICON_MAP[project.iconName] ?? PROJECT_ICON_MAP["FolderOpen"];

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => setIsOpen((v) => !v)}
        className="h-auto w-full justify-start gap-2.5 px-2 py-2"
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-brand-100">
          <Icon size={14} className="text-brand-600" />
        </div>
        <span className="flex-1 truncate text-xs font-semibold text-gray-700">
          {project.projectName}
        </span>
        <ChevronDown
          size={13}
          className={cn(
            "flex-shrink-0 text-gray-400 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </Button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[500px]" : "max-h-0",
        )}
      >
        <div className="ml-3 border-l border-gray-100 pl-2 pt-0.5 pb-1">
          {project.conversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isActive={selectedConversationId === conv.id}
              onSelect={onSelectConversation}
              onDelete={onDeleteConversation}
            />
          ))}

          <button
            onClick={() => onNewChat(project.id)}
            className="mt-0.5 flex w-full items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium text-brand-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
          >
            <Plus size={11} />
            Start a new chat
          </button>
        </div>
      </div>
    </div>
  );
}
