"use client";

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { cn } from "@/libs/utils/cn";
import type { Project, Conversation } from "@/features/projects/queries/getProjects";
import { PROJECT_ICON_MAP } from "@/features/projects/libs/projectIcons";
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
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-auto w-full items-center justify-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-sand"
      >
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border-sand border-1"
          style={{ backgroundColor: project.color }}
        >
          <Icon size={16} className="text-espresso" strokeWidth={1.5} />
        </div>
        <span className="flex-1 truncate text-xs font-semibold uppercase tracking-[0.06em] text-bark">
          {project.projectName}
        </span>
        <ChevronDown
          size={12}
          className={cn(
            "flex-shrink-0 text-umber transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[500px]" : "max-h-0",
        )}
      >
        <div className="ml-3 border-l border-sand pl-2 pt-0.5 pb-1">
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
            className="mt-0.5 flex w-full items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-umber hover:bg-sand hover:text-bark transition-colors"
          >
            <Plus size={10} strokeWidth={2} />
            New conversation
          </button>
        </div>
      </div>
    </div>
  );
}

