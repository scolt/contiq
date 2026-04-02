import { getSourceSignedUrl } from "@/features/projects/actions/getSourceSignedUrl";
import type { MessageSource } from "../../ChatMessage";

interface MessageReferencesProps {
  sources: MessageSource[];
}

async function openFileSource(sourceId: string) {
  const signedUrl = await getSourceSignedUrl(sourceId);
  window.open(signedUrl, "_blank", "noreferrer");
}

export function MessageReferences({ sources }: MessageReferencesProps) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-5 border-t border-brand-100 pt-4">
      <div className="mb-2.5 flex items-center gap-2">
        <div className="h-px flex-1 bg-brand-200" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-400">
          References
        </span>
        <div className="h-px flex-1 bg-brand-200" />
      </div>
      <div className="flex flex-col gap-1.5">
        {sources.map((source, index) => {
          const label = (
            <>
              {source.sourceName}
              {source.pageNumber ? (
                <span className="ml-1 text-brand-400/70">&mdash; p. {source.pageNumber}</span>
              ) : null}
            </>
          );
          const sharedClassName =
            "group flex items-baseline gap-2 text-[12px] text-brand-500 hover:text-sienna transition-colors cursor-pointer";
          const indexBadge = (
            <span className="flex-shrink-0 font-display italic text-brand-300 group-hover:text-sienna/60">
              {index + 1}.
            </span>
          );

          if (source.sourceType === "url" && source.sourceUrl) {
            return (
              <a
                key={source.chunkId}
                href={source.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className={sharedClassName}
              >
                {indexBadge}
                <span className="truncate">{label}</span>
              </a>
            );
          }

          if (source.sourceType === "file") {
            return (
              <button
                key={source.chunkId}
                type="button"
                onClick={() => openFileSource(source.sourceId)}
                className={sharedClassName}
              >
                {indexBadge}
                <span className="truncate">{label}</span>
              </button>
            );
          }

          return (
            <span key={source.chunkId} className={sharedClassName}>
              {indexBadge}
              <span className="truncate">{label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
