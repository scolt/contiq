import { cn } from "@/libs/utils/cn";

export type MessageRole = "user" | "assistant";

export interface ChatMessageData {
  id: string;
  role: MessageRole;
  content: string;
}

interface ChatMessageProps {
  message: ChatMessageData;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          isUser
            ? "bg-brand-600 text-white"
            : "bg-gradient-to-br from-brand-400 to-brand-600 text-white"
        )}
      >
        {isUser ? "U" : "AI"}
      </div>
      <div
        className={cn(
          "max-w-[75%] text-sm leading-relaxed",
          isUser
            ? "rounded-2xl rounded-tr-sm bg-brand-600 px-4 py-3 text-white"
            : "py-1 text-gray-700"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
