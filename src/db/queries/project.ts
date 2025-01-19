'use server'

import { executeQuery } from '@/db/client'

export interface Project {
  id: number
  title: string
  description?: string
  repo_url?: string
  demo_url?: string
  start_date?: string
  end_date?: string
  cover_image_url?: string
  profile_id: number
  tags: Tag[]
}

export interface Tag {
  id: number
  name: string
  category_id?: number
  category_name?: string
}

export async function getProjectById(id: string) {
  return executeQuery<Project>(async (sql) => {
    const result = await sql`
      SELECT 
        p.*,
        COALESCE(t.tags, '[]') AS tags
      FROM 
        Project p
      LEFT JOIN (
        SELECT 
          pt.project_id,
          json_agg(
            json_build_object(
              'id', t.id,
              'name', t.name,
              'category_id', t.category_id,
              'category_name', c.name
            )
          ) AS tags
        FROM 
          ProjectTag pt
        JOIN 
          Tag t ON t.id = pt.tag_id
        LEFT JOIN 
          Category c ON t.category_id = c.id
        GROUP BY 
          pt.project_id
      ) t ON t.project_id = p.id
      WHERE 
        p.id = ${id}
      LIMIT 1;
    `
    return result[0] as Project
  })
}

export async function getProjects() {
  return executeQuery<Project[]>(async (sql) => {
    const result = await sql`
      SELECT 
        p.*,
        COALESCE(t.tags, '[]') AS tags
      FROM 
        Project p
      LEFT JOIN (
        SELECT 
          pt.project_id,
          json_agg(
            json_build_object(
              'id', t.id,
              'name', t.name,
              'category_id', t.category_id,
              'category_name', c.name
            )
          ) AS tags
        FROM 
          ProjectTag pt
        JOIN 
          Tag t ON t.id = pt.tag_id
        LEFT JOIN 
          Category c ON t.category_id = c.id
        GROUP BY 
          pt.project_id
      ) t ON t.project_id = p.id
      ORDER BY 
        p.id DESC;
    `
    return result as Project[]
  })
}
