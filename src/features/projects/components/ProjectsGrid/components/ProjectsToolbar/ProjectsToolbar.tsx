"use client";

import { Search, ChevronDown } from "lucide-react";

export type SortKey = "lastActive" | "name" | "createdAt" | "sourcesCount";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "lastActive", label: "Last active" },
  { value: "name", label: "Name" },
  { value: "createdAt", label: "Created" },
  { value: "sourcesCount", label: "Sources count" },
];

interface ProjectsToolbarProps {
  search: string;
  onSearch: (value: string) => void;
  sortKey: SortKey;
  onSort: (key: SortKey) => void;
}

export function ProjectsToolbar({ search, onSearch, sortKey, onSort }: ProjectsToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative w-72">
        <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search projects…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full rounded-lg border border-brand-200 bg-white/80 py-2.5 pl-9 pr-4 text-sm text-espresso placeholder-brand-300 transition-colors focus:border-sienna focus:outline-none focus:ring-1 focus:ring-sienna/20"
        />
      </div>

      <div className="flex items-center gap-2.5">
        <span className="text-xs font-medium uppercase tracking-wider text-brand-400">Sort</span>
        <div className="relative">
          <select
            value={sortKey}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className="appearance-none rounded-lg border border-brand-200 bg-white/80 py-2 pl-3 pr-8 text-sm text-espresso focus:border-sienna focus:outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-400" />
        </div>
      </div>
    </div>
  );
}
