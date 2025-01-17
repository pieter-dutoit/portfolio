'use server'

import { executeQuery } from '@/db/utils'

export async function getProfileById(id: string) {
  return executeQuery(async (sql) => {
    const result = await sql`
      SELECT * FROM profile WHERE id = ${id}
    `
    return result[0]
  })
}

getProfileById('1')
