'use server'

import { executeQuery } from '@/db/client'

export interface Blog {
  id: number
  draft: boolean
  title: string
  excerpt?: string
  content?: string
  cover_image_url?: string
  updated_at: string
  published_at: string
  profile_id: number
  tags: Tag[]
}

export interface Tag {
  id: number
  name: string
  category_id?: number
  category_name?: string
}

export async function getBlogById(id: string) {
  return executeQuery<Blog>(async (sql) => {
    const result = await sql`
      SELECT 
        b.*,
        COALESCE(t.tags, '[]') AS tags
      FROM 
        Blog b
      LEFT JOIN (
        SELECT 
          bt.blog_id,
          json_agg(
            json_build_object(
              'id', t.id,
              'name', t.name,
              'category_id', t.category_id,
              'category_name', c.name
            )
          ) AS tags
        FROM 
          BlogTag bt
        JOIN 
          Tag t ON t.id = bt.tag_id
        LEFT JOIN 
          Category c ON t.category_id = c.id
        GROUP BY 
          bt.blog_id
      ) t ON t.blog_id = b.id
      WHERE 
        b.id = ${id}
      LIMIT 1;
    `
    return result[0] as Blog
  })
}

export async function getBlogs() {
  return executeQuery<Blog[]>(async (sql) => {
    const result = await sql`
      SELECT 
        b.*,
        COALESCE(t.tags, '[]') AS tags
      FROM 
        Blog b
      LEFT JOIN (
        SELECT 
          bt.blog_id,
          json_agg(
            json_build_object(
              'id', t.id,
              'name', t.name,
              'category_id', t.category_id,
              'category_name', c.name
            )
          ) AS tags
        FROM 
          BlogTag bt
        JOIN 
          Tag t ON t.id = bt.tag_id
        LEFT JOIN 
          Category c ON t.category_id = c.id
        GROUP BY 
          bt.blog_id
      ) t ON t.blog_id = b.id
      ORDER BY 
        b.id DESC;
    `
    return result as Blog[]
  })
}
