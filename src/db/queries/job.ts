'use server'

import { executeQuery } from '@/db/client'

export interface Job {
  id: number
  company_name: string
  company_address?: string
  company_logo_url?: string
  profile_id: number
  tags: Tag[]
  roles: Role[]
}

export interface Role {
  id: number
  title: string
  description?: string
  start_date?: string
  end_date?: string
}

export interface Tag {
  id: number
  name: string
  category_id?: number
}

export async function getJobs() {
  return executeQuery<Job[]>(async (sql) => {
    const result = await sql`
      SELECT 
        j.*,
        COALESCE(r.roles, '[]') AS roles,
        COALESCE(t.tags, '[]') AS tags
      FROM 
        Job j
      LEFT JOIN (
        SELECT 
          r.job_id,
          json_agg(
            json_build_object('id', r.id, 'title', r.title, 'description', r.description, 'start_date', r.start_date, 'end_date', r.end_date)
          ) AS roles
        FROM 
          Role r
        GROUP BY 
          r.job_id
      ) r ON r.job_id = j.id
      LEFT JOIN (
        SELECT 
          jt.job_id,
          json_agg(
            json_build_object('id', t.id, 'name', t.name)
          ) AS tags
        FROM 
          JobTag jt
        JOIN 
          Tag t ON t.id = jt.tag_id
        GROUP BY 
          jt.job_id
      ) t ON t.job_id = j.id
      ORDER BY 
        j.id DESC;
    `
    return result as Job[]
  })
}
