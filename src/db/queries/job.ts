'use server'

import { executeQuery } from '@/db/client'

export interface Job {
  id: number
  company_name: string
  company_address?: string
  role: string
  start_date?: string
  end_date?: string
  description?: string
  company_logo_url?: string
  profile_id: number
}

export interface Tag {
  id: number
  name: string
  description?: string
  category_id?: number
}

export interface JobTag {
  job_id: number
  tag_id: number
}

export async function getJobs() {
  return executeQuery<(Job & Tag)[]>(async (sql) => {
    const result = await sql`
      SELECT 
        j.*,
        COALESCE(
          json_agg(
            json_build_object('id', t.id, 'name', t.name, 'description', t.description)
          ) FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) AS tags
      FROM 
        Job j
      LEFT JOIN 
        JobTag jt ON j.id = jt.job_id
      LEFT JOIN 
        Tag t ON t.id = jt.tag_id
      GROUP BY 
        j.id
      ORDER BY 
        j.id DESC 
    `
    return result as (Job & Tag)[]
  })
}
