"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AlertCircle,
  AlignLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Link2,
  MoreHorizontal,
  RefreshCw,
  Trash2,
  Zap,
} from "lucide-react";
import { cn } from "@/libs/utils/cn";
import { ConfirmModal } from "@/components/ConfirmModal";
import { ViewTextModal } from "../../../ViewTextModal/ViewTextModal";
import { getSourceSignedUrl } from "@/features/projects/actions/getSourceSignedUrl";
import type {
  ProjectSource,
  SourceStatus,
  SourceType,
} from "../../../../ProjectSettings";
import { SOURCE_COLS } from "../../SourceList";

const TYPE_CONFIG: Record<
  SourceType,
  {
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    className: string;
  }
> = {
  file: { label: "File", icon: FileText, className: "bg-brand-100 text-brand-600" },
  url: { label: "URL", icon: Link2, className: "bg-sienna/10 text-sienna" },
  text: { label: "Text", icon: AlignLeft, className: "bg-bark/10 text-bark" },
};

const STATUS_CONFIG: Record<
  SourceStatus,
  {
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    className: string;
  }
> = {
  pending: { label: "Pending", icon: Clock, className: "bg-sand/30 text-brand-500" },
  processing: { label: "Processing", icon: Zap, className: "bg-sienna/10 text-sienna" },
  ready: { label: "Indexed", icon: CheckCircle2, className: "bg-forest/10 text-forest" },
  error: { label: "Error", icon: AlertCircle, className: "bg-red-50 text-red-600" },
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface SourceRowProps {
  source: ProjectSource;
  onDelete: (id: string) => void;
  onReindex: (id: string) => void;
}

export function SourceRow({ source, onDelete, onReindex }: SourceRowProps) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [viewTextOpen, setViewTextOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function handleToggle() {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    setOpen((v) => !v);
  }

  async function handleViewSource() {
    setOpen(false);
    if (source.type === "url") {
      window.open(source.url, "_blank");
    } else if (source.type === "text") {
      setViewTextOpen(true);
    } else {
      const url = await getSourceSignedUrl(source.id);
      window.open(url, "_blank");
    }
  }

  const typeConfig = TYPE_CONFIG[source.type];
  const statusConfig = STATUS_CONFIG[source.status];
  const TypeIcon = typeConfig.icon;
  const StatusIcon = statusConfig.icon;

  return (
    <>
      <div className={`grid ${SOURCE_COLS} items-center px-4 py-3.5 transition-colors hover:bg-brand-50/40 sm:px-5 sm:py-4`}>
        <div
          className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium",
            typeConfig.className,
          )}
        >
          <TypeIcon size={12} />
          {typeConfig.label}
        </div>

        <div className="min-w-0 pr-4">
          <p className="truncate text-sm font-medium text-brand-900">{source.name}</p>
          {source.url && (
            <p className="mt-0.5 truncate text-xs text-brand-400">{source.url}</p>
          )}
        </div>

        <span className="hidden text-xs text-brand-500 sm:block">{formatDate(source.createdAt)}</span>

        <span className="hidden text-xs font-medium text-brand-700 sm:block">
          {source.status === "ready" ? source.chunksCount : "—"}
        </span>

        <div
          className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium",
            statusConfig.className,
          )}
        >
          <StatusIcon
            size={12}
            className={source.status === "processing" ? "animate-pulse" : ""}
          />
          {statusConfig.label}
        </div>

        <div className="flex justify-center">
          <button
            ref={buttonRef}
            onClick={handleToggle}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-brand-400 transition-colors hover:bg-brand-100 hover:text-brand-700"
          >
            <MoreHorizontal size={15} />
          </button>
          {open && createPortal(
            <div
              ref={menuRef}
              style={{ top: menuPos.top, right: menuPos.right }}
              className="fixed z-50 min-w-[150px] rounded-xl border border-brand-100 bg-white py-1 shadow-[0_4px_24px_rgba(44,26,14,0.12)]"
            >
              <button
                onClick={handleViewSource}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-brand-700 transition-colors hover:bg-brand-50"
              >
                <ExternalLink size={13} className="text-brand-400" strokeWidth={1.5} />
                View source
              </button>
              <button
                onClick={() => { setOpen(false); onReindex(source.id); }}
                disabled={source.type === "file"}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40 text-brand-700"
              >
                <RefreshCw size={13} className="text-brand-400" strokeWidth={1.5} />
                Re-index
              </button>
              <div className="my-1 border-t border-brand-100" />
              <button
                onClick={() => { setOpen(false); setConfirmDeleteOpen(true); }}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <Trash2 size={13} className="text-red-400" strokeWidth={1.5} />
                Delete
              </button>
            </div>,
            document.body,
          )}
        </div>
      </div>

      <ConfirmModal
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="Delete source"
        description={`Are you sure you want to delete "${source.name}"? This will permanently remove all indexed chunks.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => { setConfirmDeleteOpen(false); onDelete(source.id); }}
      />

      {source.type === "text" && (
        <ViewTextModal
          open={viewTextOpen}
          onOpenChange={setViewTextOpen}
          title={source.name}
          content={source.url ?? ""}
        />
      )}
    </>
  );
}
