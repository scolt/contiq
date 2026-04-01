import type { SupabaseClient } from '@supabase/supabase-js'

const BUCKET = 'sources'

export async function uploadFile(
  client: SupabaseClient,
  storagePath: string,
  file: File,
): Promise<string> {
  const { error } = await client.storage
    .from(BUCKET)
    .upload(storagePath, file, { upsert: false })
  if (error) throw new Error(`Upload failed: ${error.message}`)

  return storagePath
}

export async function downloadFile(
  client: SupabaseClient,
  storagePath: string,
): Promise<Buffer> {
  const { data, error } = await client.storage
    .from(BUCKET)
    .download(storagePath)

  if (error || !data) throw new Error(`Download failed: ${error?.message ?? 'unknown error'}`)

  return Buffer.from(await data.arrayBuffer())
}

export async function deleteFile(
  client: SupabaseClient,
  storagePath: string,
): Promise<void> {
  const { error } = await client.storage.from(BUCKET).remove([storagePath])
  if (error) throw new Error(`Delete failed: ${error.message}`)
}

export async function createSignedUrl(
  client: SupabaseClient,
  storagePath: string,
  expiresIn = 3600,
): Promise<string> {
  const { data, error } = await client.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, expiresIn)

  if (error || !data) throw new Error(`Signed URL failed: ${error?.message ?? 'unknown error'}`)

  return data.signedUrl
}
