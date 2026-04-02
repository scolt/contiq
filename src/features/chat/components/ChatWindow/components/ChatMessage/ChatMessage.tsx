import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/libs/utils/cn";
import { MessageReferences } from "./components/MessageReferences/MessageReferences";

export type MessageRole = "user" | "assistant";

export type MessageSource = {
  chunkId: string;
  sourceId: string;
  sourceType: "file" | "url" | "text";
  sourceUrl: string | null;
  sourceName: string;
  pageNumber: number | null;
};

export interface ChatMessageData {
  id: string;
  role: MessageRole;
  content: string;
  sources?: MessageSource[];
  isStreaming?: boolean;
}

interface ChatMessageProps {
  message: ChatMessageData;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-4", isUser && "flex-row-reverse")}>
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-semibold tracking-wide",
          isUser
            ? "bg-brand-700 text-cream"
            : "bg-espresso text-sand",
        )}
      >
        {isUser ? "You" : "AI"}
      </div>

      <div
        className={cn(
          "max-w-[78%] leading-relaxed",
          isUser
            ? "rounded-2xl rounded-tr-sm bg-brand-700 px-5 py-3.5 text-sm text-cream/95 shadow-sm"
            : "py-0.5 text-brand-900",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose max-w-none text-[15px] leading-[1.75] prose-p:my-2 prose-headings:font-display prose-headings:font-semibold prose-headings:text-brand-900 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-strong:text-brand-800 prose-strong:font-semibold prose-code:rounded-md prose-code:bg-brand-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-xs prose-code:text-brand-800 prose-code:font-mono prose-pre:rounded-xl prose-pre:bg-brand-900 prose-pre:p-4 prose-pre:text-xs prose-pre:text-brand-100 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-blockquote:border-sienna/40 prose-blockquote:text-brand-600 prose-blockquote:italic prose-a:text-sienna prose-a:no-underline hover:prose-a:underline prose-hr:border-brand-100 prose-table:text-xs prose-th:bg-brand-50 prose-th:font-semibold prose-th:text-brand-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
            {message.isStreaming && !message.content && (
              <span className="inline-block h-4 w-0.5 animate-pulse bg-brand-400" />
            )}
          </div>
        )}

        {!isUser && message.sources && (
          <MessageReferences sources={message.sources} />
        )}
      </div>
    </div>
  );
}

