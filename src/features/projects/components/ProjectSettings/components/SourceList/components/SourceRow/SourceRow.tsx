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

const TYPE_CONFIG: Record<
  SourceType,
  {
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    className: string;
  }
> = {
  file: { label: "File", icon: FileText, className: "bg-blue-50 text-blue-600" },
  url: { label: "URL", icon: Link2, className: "bg-violet-50 text-violet-600" },
  text: { label: "Text", icon: AlignLeft, className: "bg-teal-50 text-teal-600" },
};

const STATUS_CONFIG: Record<
  SourceStatus,
  {
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    className: string;
  }
> = {
  pending: { label: "Pending", icon: Clock, className: "bg-gray-100 text-gray-500" },
  processing: { label: "Processing", icon: Zap, className: "bg-amber-50 text-amber-600" },
  ready: { label: "Ready", icon: CheckCircle2, className: "bg-green-50 text-green-600" },
  error: { label: "Error", icon: AlertCircle, className: "bg-red-50 text-red-500" },
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
      <div className="grid grid-cols-[120px_1fr_120px_80px_110px_44px] items-center px-4 py-3 transition-colors hover:bg-gray-50/50">
        <div
          className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium",
            typeConfig.className,
          )}
        >
          <TypeIcon size={12} />
          {typeConfig.label}
        </div>

        <div className="min-w-0 pr-4">
          <p className="truncate text-sm font-medium text-gray-800">{source.name}</p>
          {source.url && (
            <p className="mt-0.5 truncate text-xs text-gray-400">{source.url}</p>
          )}
        </div>

        <span className="text-xs text-gray-500">{formatDate(source.createdAt)}</span>

        <span className="text-xs font-medium text-gray-700">
          {source.status === "ready" ? source.chunksCount : "—"}
        </span>

        <div
          className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium",
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
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <MoreHorizontal size={15} />
          </button>
          {open && createPortal(
            <div
              ref={menuRef}
              style={{ top: menuPos.top, right: menuPos.right }}
              className="fixed z-50 min-w-[150px] rounded-xl border border-gray-100 bg-white py-1 shadow-lg shadow-gray-200/60"
            >
              <button
                onClick={handleViewSource}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <ExternalLink size={13} className="text-gray-400" />
                View source
              </button>
              <button
                onClick={() => { setOpen(false); onReindex(source.id); }}
                disabled={source.type === "file"}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 text-gray-700"
              >
                <RefreshCw size={13} className="text-gray-400" />
                Re-index
              </button>
              <div className="my-1 border-t border-gray-100" />
              <button
                onClick={() => { setOpen(false); setConfirmDeleteOpen(true); }}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <Trash2 size={13} className="text-red-400" />
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
