"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Briefcase, Settings, Info } from "lucide-react";
import { cn } from "@/libs/utils/cn";

const NAV_ITEMS = [
  { href: "/conversations", icon: MessageSquare, label: "Conversations" },
  { href: "/projects", icon: Briefcase, label: "Projects" },
  { href: "/about", icon: Info, label: "About" },
] as const;

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-16 flex-shrink-0 flex-col items-center gap-2 py-5">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
        <span className="text-sm font-bold text-white">C</span>
      </div>

      <div className="flex flex-1 flex-col items-center gap-1">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                isActive
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                  : "text-brand-300 hover:bg-brand-100 hover:text-brand-600",
              )}
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </div>

      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-200 text-xs font-semibold text-brand-700">
        U
      </div>
    </nav>
  );
}
