import { Button } from "@/components/Button";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  onCreateProject: () => void;
}

export function EmptyState({ onCreateProject }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
      <div className="mb-8 opacity-80">
        <svg width="140" height="120" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="70" cy="100" rx="45" ry="8" fill="#E8D5AE" opacity="0.5" />
          <rect x="28" y="42" width="72" height="56" rx="10" fill="#E8D5AE" />
          <rect x="34" y="30" width="62" height="56" rx="10" fill="#D4B896" />
          <rect x="40" y="20" width="58" height="56" rx="10" fill="#C9832A" opacity="0.25" />
          <path d="M69 35 L69 51 M61 43 L77 43" stroke="#8B5E3C" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="105" cy="22" r="12" fill="#C9832A" opacity="0.12" />
          <circle cx="105" cy="22" r="7" fill="#C9832A" opacity="0.18" />
          <circle cx="33" cy="72" r="6" fill="#D4B896" opacity="0.6" />
          <circle cx="114" cy="58" r="4" fill="#C9832A" opacity="0.2" />
        </svg>
      </div>

      <h2 className="font-display text-2xl font-bold text-espresso">No projects yet</h2>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-brand-500">
        Create your first project to start organizing documents and building your knowledge base.
      </p>
      <Button onClick={onCreateProject} className="mt-7 flex items-center gap-2">
        <Plus size={14} strokeWidth={2} />
        Create Project
      </Button>
    </div>
  );
}
