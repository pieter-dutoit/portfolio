import { executeQuery } from '@/db/client'

export interface Qualification {
  id: number
  institution_name: string
  institution_address?: string
  institution_logo_url?: string
  name: string
  description?: string
  start_date?: string
  end_date?: string
  profile_id: number
  tags: Tag[]
  achievements: Achievement[]
}

export interface Tag {
  id: number
  name: string
  category_id?: number
}

export interface Achievement {
  id: number
  name: string
  description?: string
  verification_url?: string
  pdf_url?: string
}

export async function getQualifications() {
  return executeQuery<Qualification[]>(async (sql) => {
    const result = await sql`
      SELECT 
        e.*,
        COALESCE(t.tags, '[]') AS tags,
        COALESCE(a.achievements, '[]') AS achievements
      FROM 
        Qualification e
      LEFT JOIN (
        SELECT 
          et.qualification_id,
          json_agg(
            json_build_object('id', t.id, 'name', t.name)
          ) AS tags
        FROM 
          QualificationTag et
        JOIN 
          Tag t ON t.id = et.tag_id
        GROUP BY 
          et.qualification_id
      ) t ON t.qualification_id = e.id
      LEFT JOIN (
        SELECT 
          a.qualification_id,
          json_agg(
            json_build_object(
              'id', a.id, 
              'name', a.name, 
              'description', a.description, 
              'verification_url', a.verification_url, 
              'pdf_url', a.pdf_url
            )
          ) AS achievements
        FROM 
          Achievement a
        GROUP BY 
          a.qualification_id
      ) a ON a.qualification_id = e.id
      ORDER BY 
        e.id DESC;
    `
    return result as Qualification[]
  })
}
