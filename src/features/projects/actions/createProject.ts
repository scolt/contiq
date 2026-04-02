'use server';

import { db } from '@/libs/db/db';
import { projects } from '@/libs/db/schemas/projects';
import { createClient } from '@/libs/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createProject(name: string, iconName: string, color: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  await db.insert(projects).values({
    userId: user.id,
    name,
    iconName,
    color,
  });

  revalidatePath('/projects');
}
