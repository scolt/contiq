'use server'

import { db } from '@/libs/db/db'
import { sources } from '@/libs/db/schemas/sources'
import { createClient } from '@/libs/supabase/server'
import { createAdminClient } from '@/libs/supabase/admin'
import { uploadFile } from '@/libs/supabase/files'
import { publishProcessJob } from '@/libs/qstash/jobs'
import { revalidatePath } from 'next/cache'

export async function addFileSource(projectId: string, file: File, name?: string): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const supabaseAdminClientServer = await createAdminClient();

  if (!user) throw new Error('Unauthorized')

  const storagePath = `${user.id}/${projectId}/${Date.now()}-${file.name}`
  await uploadFile(supabaseAdminClientServer, storagePath, file)

  const [source] = await db
    .insert(sources)
    .values({
      projectId,
      userId: user.id,
      type: 'file',
      name: name?.trim() || file.name,
      storagePath,
      status: 'pending',
    })
    .returning({ id: sources.id })

  await publishProcessJob(source.id)

  revalidatePath(`/projects/${projectId}`)
}
