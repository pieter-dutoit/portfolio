import { neon } from '@neondatabase/serverless'

function createNeonClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }
  return neon(process.env.DATABASE_URL)
}

export async function executeQuery<T>(
  queryFn: (sql: ReturnType<typeof createNeonClient>) => Promise<T>
): Promise<T> {
  const sql = createNeonClient()
  try {
    return await queryFn(sql)
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}
