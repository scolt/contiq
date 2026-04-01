import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/libs/utils/cn";

export type MessageRole = "user" | "assistant";

export type MessageSource = {
  chunkId: string;
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
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          isUser
            ? "bg-brand-600 text-white"
            : "bg-gradient-to-br from-brand-400 to-brand-600 text-white",
        )}
      >
        {isUser ? "U" : "AI"}
      </div>

      <div
        className={cn(
          "max-w-[75%] text-sm leading-relaxed",
          isUser
            ? "rounded-2xl rounded-tr-sm bg-brand-600 px-4 py-3 text-white"
            : "py-1 text-gray-700",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:font-semibold prose-headings:text-gray-800 prose-h1:text-lg prose-h2:text-base prose-h3:text-sm prose-strong:text-gray-800 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-xs prose-code:text-gray-800 prose-code:font-mono prose-pre:rounded-xl prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:text-xs prose-pre:text-gray-100 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-blockquote:border-brand-300 prose-blockquote:text-gray-500 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-hr:border-gray-200 prose-table:text-xs prose-th:bg-gray-50 prose-th:font-semibold">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
            {message.isStreaming && !message.content && (
              <span className="inline-block h-4 w-1 animate-pulse bg-gray-400" />
            )}
          </div>
        )}

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-3 border-t border-gray-100 pt-2">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Sources
            </p>
            <div className="flex flex-col gap-1">
              {message.sources.map((s, i) => (
                <a
                  key={s.chunkId}
                  href={s.sourceUrl ?? "#"}
                  target={s.sourceUrl ? "_blank" : undefined}
                  rel="noreferrer"
                  className="truncate text-[11px] text-brand-600 hover:underline"
                >
                  [{i + 1}] {s.sourceName}
                  {s.pageNumber ? `, p. ${s.pageNumber}` : ""}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
