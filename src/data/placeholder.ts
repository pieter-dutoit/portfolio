export interface Tag {
  id: number | string
  name: string
  category_name?: string
}

export interface SocialLink {
  id: number | string
  name: string
  url: string
  photo_url: string
}

export interface QualificationAchievement {
  id: number | string
  name: string
  description: string
  verification_url: string
}

export interface Qualification {
  id: number | string
  institution_name: string
  institution_address: string
  institution_logo_url: string
  name: string
  start_date: string
  end_date?: string
  tags: Tag[]
  achievements: QualificationAchievement[]
}

export interface JobRole {
  id: number | string
  title: string
  description: string
  start_date: string
  end_date?: string
}

export interface Job {
  id: number | string
  company_name: string
  company_address: string
  company_logo_url: string
  tags: Tag[]
  roles: JobRole[]
}

export interface Project {
  id: string
  title: string
  tags: Tag[]
  cover_image_url: string
  description?: string
  start_date?: string
  end_date?: string
  repo_url?: string
  demo_url?: string
}

export const profile = {
  full_name: 'Your Name',
  title: 'Frontend Engineer',
  physical_address: 'City, Country',
  photo_url: '/window.svg',
  email_address: 'hello@example.com'
}

export const aboutMe = [
  'This is placeholder copy while the site is being refactored away from a database-driven setup.',
  'Replace this with a short bio that highlights your focus, values, and the kind of work you enjoy.'
]

export const socialLinks: SocialLink[] = [
  {
    id: 1,
    name: 'GitHub',
    url: 'https://example.com',
    photo_url: '/globe.svg'
  },
  {
    id: 2,
    name: 'LinkedIn',
    url: 'https://example.com',
    photo_url: '/file.svg'
  }
]

export const qualifications: Qualification[] = [
  {
    id: 1,
    institution_name: 'Example University',
    institution_address: 'City, Country',
    institution_logo_url: '/next.svg',
    name: 'B.Sc. Computer Science; Major in Software Engineering',
    start_date: '2018-01-01',
    end_date: '2021-12-01',
    tags: [
      { id: 1, name: 'Honors' },
      { id: 2, name: 'Full-time' }
    ],
    achievements: [
      {
        id: 1,
        name: "Dean's List",
        description: 'Recognized for consistent academic performance and community involvement.',
        verification_url: 'https://example.com'
      }
    ]
  }
]

export const jobs: Job[] = [
  {
    id: 1,
    company_name: 'Acme Studio',
    company_address: 'Remote',
    company_logo_url: '/vercel.svg',
    tags: [
      { id: 1, name: 'Frontend' },
      { id: 2, name: 'Design Systems' }
    ],
    roles: [
      {
        id: 1,
        title: 'Frontend Engineer',
        description:
          'Placeholder summary of responsibilities, impact, and the kind of problems solved.',
        start_date: '2022-02-01',
        end_date: '2024-06-01'
      },
      {
        id: 2,
        title: 'UI Engineer',
        description:
          'Another placeholder role description highlighting collaboration and delivery outcomes.',
        start_date: '2020-08-01',
        end_date: '2022-01-01'
      }
    ]
  }
]

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Placeholder Project One',
    tags: [
      { id: 1, name: 'Product Build', category_name: 'project_type' },
      { id: 2, name: 'UI Engineering' }
    ],
    cover_image_url: '/window.svg',
    description:
      'Short placeholder description for the project detail view. Replace with real project highlights and outcomes.',
    start_date: '2023-01-01',
    end_date: '2023-06-01',
    repo_url: 'https://example.com',
    demo_url: 'https://example.com'
  },
  {
    id: 'project-2',
    title: 'Placeholder Project Two',
    tags: [{ id: 3, name: 'Experiment', category_name: 'project_type' }],
    cover_image_url: '/globe.svg',
    description: 'Second placeholder entry for layout and spacing coverage.',
    start_date: '2022-03-01',
    end_date: '2022-08-01'
  }
]
