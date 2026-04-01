import { cn } from "@/libs/utils/cn";
import type { Conversation } from "@/features/projects/queries/getProjects";
import { Button } from "@/components/Button";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (conversation: Conversation) => void;
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
}: ConversationItemProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => onSelect(conversation)}
      className={cn(
        "h-auto w-full justify-start px-2.5 py-2",
        isActive && "bg-brand-50 hover:bg-brand-50",
      )}
    >
      <div className="min-w-0 flex-1 text-left">
        <p
          className={cn(
            "truncate text-xs font-medium leading-tight",
            isActive ? "text-brand-700" : "text-gray-700",
          )}
        >
          {conversation.conversationName}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-400">{formatDate(conversation.lastUpdatedAt)}</p>
      </div>
    </Button>
  );
}
