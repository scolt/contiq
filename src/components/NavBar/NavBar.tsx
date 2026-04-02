"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {MessageSquare, Briefcase, Info, LogOut, Coins} from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/libs/utils/cn";
import { Logo } from "@/components/Logo";
import { logout } from "@/features/auth/actions/logout";

const NAV_ITEMS = [
  { href: "/conversations", icon: MessageSquare, label: "Conversations" },
  { href: "/projects", icon: Briefcase, label: "Projects" },
  { href: "/about", icon: Info, label: "About" },
] as const;

interface NavBarProps {
  tokensBalance?: number;
  initials?: string;
}

export function NavBar({ tokensBalance = 0, initials = "U" }: NavBarProps) {
  const pathname = usePathname();
  const isLow = tokensBalance < 3;

  return (
    <nav className="flex h-full w-16 flex-shrink-0 flex-col items-center gap-2 bg-espresso py-5">
      <Logo width={64} height={64} className="text-sand" />
      <div className="flex flex-1 flex-col items-center gap-1">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
                isActive ? "bg-sienna/20 text-sienna shadow-inner" : "text-sand/50 hover:bg-white/5 hover:text-sand",
              )}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
            </Link>
          );
        })}
      </div>

      <div
        className="flex flex-col items-center gap-1 bg-bark rounded-lg px-2 py-4 w-10"
        title={`${tokensBalance} tokens remaining`}
      >
        <span className="text-base leading-none text-sand">
          <Coins />
        </span>
        <span
          className={cn(
            "font-mono text-sm font-semibold tabular-nums leading-none",
            isLow ? "text-red-400" : "text-sand",
          )}
        >
          {tokensBalance}
        </span>
      </div>

      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-bark text-xs font-semibold text-sand ring-1 ring-sand/20 transition-all hover:ring-sand/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sienna"
            title="Account"
          >
            {initials}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side="right"
            align="end"
            sideOffset={8}
            className="z-50 rounded-xl bg-espresso p-1 shadow-xl ring-1 ring-sand/10 animate-in fade-in-0 zoom-in-95"
          >
            <form action={logout}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-sand/70 transition-colors hover:bg-white/5 hover:text-sand"
              >
                <LogOut size={14} />
                Log out
              </button>
            </form>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </nav>
  );
}
