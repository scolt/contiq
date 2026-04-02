import { Folder, FileText, MessageSquare } from "lucide-react";

interface StatsBarProps {
  totalProjects: number;
  totalSources: number;
  totalChats: number;
}

export function StatsBar({ totalProjects, totalSources, totalChats }: StatsBarProps) {
  const stats = [
    { icon: Folder, count: totalProjects, label: totalProjects === 1 ? "Project" : "Projects" },
    { icon: FileText, count: totalSources, label: totalSources === 1 ? "Source" : "Sources" },
    { icon: MessageSquare, count: totalChats, label: totalChats === 1 ? "Chat" : "Chats" },
  ];

  return (
    <div className="flex items-center rounded-xl border border-brand-200 bg-white/60 w-fit">
      {stats.map((stat, index) => (
        <div key={stat.label} className="flex items-center">
          <div className="flex items-center gap-3 px-7 py-4">
            <stat.icon size={15} className="text-brand-400" strokeWidth={1.5} />
            <span className="font-display text-2xl font-bold tabular-nums text-espresso leading-none">
              {stat.count}
            </span>
            <span className="text-sm text-brand-500">{stat.label}</span>
          </div>
          {index < stats.length - 1 && (
            <div className="h-8 w-px bg-brand-200" />
          )}
        </div>
      ))}
    </div>
  );
}
