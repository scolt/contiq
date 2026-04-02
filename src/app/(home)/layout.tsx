import { NavBar } from "@/components/NavBar";
import { db } from "@/libs/db/db";
import { users } from "@/libs/db/schemas/users";
import { createClient } from "@/libs/supabase/server";
import { eq } from "drizzle-orm";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let tokensBalance = 0;
  if (user) {
    const [row] = await db
      .select({ tokensBalance: users.tokensBalance })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);
    tokensBalance = row?.tokensBalance ?? 0;
  }

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "?";

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden sm:flex-row">
      <NavBar tokensBalance={tokensBalance} initials={initials} />
      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
