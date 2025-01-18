'use server'

import { executeQuery } from '@/db/client'

export interface Profile {
  id: number
  full_name: string
  photo_url?: string
  title?: string
  email_address?: string
  physical_address?: string
  about_me?: string
}

export async function getProfile() {
  return executeQuery<Profile>(async (sql) => {
    const result = await sql`
      SELECT * FROM profile WHERE id = 1
    `
    return result[0] as Profile
  })
}
