"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Briefcase, Info, LogOut, Coins } from "lucide-react";
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

const POPOVER_CONTENT =
  "z-50 rounded-xl bg-espresso p-1 shadow-xl ring-1 ring-sand/10 animate-in fade-in-0 zoom-in-95";
const POPOVER_BUTTON =
  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-sand/70 transition-colors hover:bg-white/5 hover:text-sand";

export function NavBar({ tokensBalance = 0, initials = "U" }: NavBarProps) {
  const pathname = usePathname();
  const isLow = tokensBalance < 3;

  return (
    <nav
      className={cn(
        "flex-shrink-0 bg-espresso",
        // Mobile: fixed-height bottom bar
        "order-last flex h-14 w-full flex-row items-center",
        // Desktop: tall left sidebar
        "sm:order-none sm:h-full sm:w-16 sm:flex-col sm:gap-2 sm:py-5",
      )}
    >
      {/* Logo — desktop only */}
      <Logo width={64} height={64} className="hidden text-sand sm:block" />

      {/* Nav items: row on mobile (flex-1 justify-around), column on desktop */}
      <div className="flex flex-1 flex-row items-center justify-around sm:flex-col sm:flex-1 sm:justify-start sm:gap-1">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
                isActive
                  ? "bg-sienna/20 text-sienna shadow-inner"
                  : "text-sand/50 hover:bg-white/5 hover:text-sand",
              )}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
            </Link>
          );
        })}

        {/* Account — mobile only (sits inside justify-around row as 4th item) */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-bark/70 text-xs font-semibold text-sand transition-all hover:bg-bark focus:outline-none focus-visible:ring-2 focus-visible:ring-sienna sm:hidden"
              title="Account"
            >
              {initials}
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content side="top" align="end" sideOffset={8} className={POPOVER_CONTENT}>
              <form action={logout}>
                <button type="submit" className={POPOVER_BUTTON}>
                  <LogOut size={14} />
                  Log out
                </button>
              </form>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      {/* Tokens widget — desktop only */}
      <div
        className="hidden w-10 flex-col items-center gap-1 rounded-lg bg-bark px-2 py-4 sm:flex"
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

      {/* Account — desktop only */}
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="mt-2 hidden h-8 w-8 items-center justify-center rounded-full bg-bark text-xs font-semibold text-sand ring-1 ring-sand/20 transition-all hover:ring-sand/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sienna sm:flex"
            title="Account"
          >
            {initials}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side="right" align="end" sideOffset={8} className={POPOVER_CONTENT}>
            <form action={logout}>
              <button type="submit" className={POPOVER_BUTTON}>
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
