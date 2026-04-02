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
        "group flex items-center rounded-lg transition-colors",
        isActive
          ? "bg-sienna shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
          : "hover:bg-sand",
      )}
    >
      <button
        onClick={() => onSelect(conversation)}
        className="min-w-0 flex-1 px-2.5 py-2 text-left"
      >
        <p
          className={cn(
            "truncate text-xs leading-tight",
            isActive ? "font-semibold text-white" : "font-medium text-brand-800",
          )}
        >
          {conversation.conversationName}
        </p>
        <p className={cn("mt-0.5 text-[10px] tabular-nums", isActive ? "text-white/70" : "text-umber")}>
          {formatDate(conversation.lastUpdatedAt)}
        </p>
      </button>

      <button
        onClick={() => onDelete(conversation.id)}
        className="mr-1 hidden h-6 w-6 flex-shrink-0 items-center justify-center rounded text-umber hover:bg-red-100 hover:text-red-500 group-hover:flex"
        aria-label="Delete chat"
      >
        <Trash2 size={11} strokeWidth={1.5} />
      </button>
    </div>
  );
}

