import { Trash2 } from "lucide-react";
import { cn } from "@/libs/utils/cn";
import type { Conversation } from "@/features/projects/queries/getProjects";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (conversation: Conversation) => void;
  onDelete: (conversationId: string) => void;
}

function formatDate(date: Date): string {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (isYesterday) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
}: ConversationItemProps) {
  return (
    <div
      className={cn(
        "group flex items-center rounded-md",
        isActive && "bg-brand-50",
      )}
    >
      <button
        onClick={() => onSelect(conversation)}
        className="min-w-0 flex-1 px-2.5 py-2 text-left"
      >
        <p
          className={cn(
            "truncate text-xs font-medium leading-tight",
            isActive ? "text-brand-700" : "text-gray-700",
          )}
        >
          {conversation.conversationName}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-400">
          {formatDate(conversation.lastUpdatedAt)}
        </p>
      </button>

      <button
        onClick={() => onDelete(conversation.id)}
        className="mr-1 hidden h-6 w-6 flex-shrink-0 items-center justify-center rounded text-gray-400 hover:bg-red-50 hover:text-red-500 group-hover:flex"
        aria-label="Delete chat"
      >
        <Trash2 size={11} />
      </button>
    </div>
  );
}
