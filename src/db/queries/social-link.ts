'use server'

import { executeQuery } from '@/db/client'

export interface SocialLink {
  id: number
  url: string
  name?: string
  photo_url?: string
  profile_id: number
}

export async function getSocialLinks() {
  return executeQuery<SocialLink[]>(async (sql) => {
    const result = await sql`
      SELECT * FROM SocialLink WHERE profile_id = 1
    `
    return result as SocialLink[]
  })
}
