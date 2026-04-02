import { db } from '@/libs/db/db';
import { users } from '@/libs/db/schemas/users';
import { tokenTransactions } from '@/libs/db/schemas/tokenTransactions';
import { and, eq, sql } from 'drizzle-orm';

export const TOKEN_COSTS = {
  file: 10,
  url: 8,
  text: 3,
  message: 1,
} as const;

export async function checkAndSpendTokens(
  userId: string,
  cost: number,
  description: string,
): Promise<{ success: true } | { success: false; error: string }> {
  const updated = await db
    .update(users)
    .set({
      tokensBalance: sql`${users.tokensBalance} - ${cost}`,
      tokensUsed: sql`${users.tokensUsed} + ${cost}`,
    })
    .where(and(eq(users.id, userId), sql`${users.tokensBalance} >= ${cost}`))
    .returning({ tokensBalance: users.tokensBalance });

  if (updated.length === 0) {
    return { success: false, error: 'You have reached your token limit.' };
  }

  await db.insert(tokenTransactions).values({
    userId,
    amount: -cost,
    type: 'usage',
    description,
  });

  return { success: true };
}
