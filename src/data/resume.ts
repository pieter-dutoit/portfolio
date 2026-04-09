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
  verification_url?: string
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

export const profile = {
  full_name: 'Pieter du Toit',
  title: 'Frontend Software Developer (React/TypeScript)',
  physical_address: 'South Africa',
  phone_number: '0432 316 018',
  photo_url: '/images/profile-pic.jpg',
  email_address: 'contact@pieterdutoit.dev'
}

export const aboutMe = [
  'Front-end developer with 5+ years of commercial experience building production web applications using React, TypeScript, and Next.js. Strong in component-driven UI, API integration, and delivering maintainable, scalable frontends in PR-reviewed teams.',
  'Comfortable improving UI consistency and applying accessibility-minded practices to ship reliable user experiences.'
]

export const socialLinks: SocialLink[] = [
  {
    id: 1,
    name: 'GitHub',
    url: 'https://github.com/pieter-dutoit',
    photo_url: '/images/github-icon.svg'
  },
  {
    id: 2,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/pieter-du-toit-dev/',
    photo_url: '/images/linkedin-icon.svg'
  }
]

export const qualifications: Qualification[] = [
  {
    id: 1,
    institution_name: 'Griffith University',
    institution_address: 'Gold Coast, QLD, Australia',
    institution_logo_url: '/images/griffith-logo.jpg',
    name: 'Master of Information Technology; Major in Software Development & Support',
    start_date: '2023-07-01',
    end_date: '2025-06-01',
    tags: [
      { id: 1, name: 'Full-stack development' },
      { id: 2, name: 'Database design' },
      { id: 3, name: 'Secure development' },
      { id: 4, name: 'Cloud hosting (Docker, Kubernetes, AWS EC2)' }
    ],
    achievements: [
      {
        id: 1,
        name: 'Graduated with distinction',
        description: 'GPA 6.88.'
      },
      {
        id: 2,
        name: 'Award for Academic Excellence (2023)',
        description: 'Recognized for academic excellence.',
        verification_url:
          'https://www.credly.com/badges/70c5f56e-a2ea-4c2f-b2a3-56bfe59b310d/linked_in?t=sfptdd'
      },
      {
        id: 3,
        name: 'Award for Academic Excellence (2024)',
        description: 'Recognized for academic excellence.',
        verification_url:
          'https://www.credly.com/badges/f0aa12b2-fbcf-440d-9f67-dbc30aee20d2/public_url'
      }
    ]
  }
]

export const jobs: Job[] = [
  {
    id: 1,
    company_name: 'Full Facing (Pty) Ltd.',
    company_address: 'Cape Town, South Africa',
    company_logo_url: '/images/full-facing-pty-ltd-logo.jpg',
    tags: [
      { id: 1, name: 'Next.js' },
      { id: 2, name: 'React' },
      { id: 3, name: 'TypeScript' },
      { id: 4, name: 'SWR' },
      { id: 5, name: 'Yup' },
      { id: 6, name: 'Strapi' },
      { id: 7, name: 'Docker' }
    ],
    roles: [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        description:
          'Developed and integrated Strapi CMS in a public-facing Next.js site, enabling marketing updates and SEO metadata (OpenGraph/JSON-LD). Built accessible custom-styled HTML inputs and used SWR with Yup to deliver large, reliable forms with fewer backend queries. Contributed to a shared API layer for consistent frontend integrations.',
        start_date: '2021-08-01',
        end_date: '2023-06-01'
      },
      {
        id: 2,
        title: 'Frontend Developer',
        description:
          'Worked in Agile sprints with planning and daily peer code reviews. Maintained frontend Docker files and debugged deployment issues. Built and integrated LMS (Lesson Desk) learner content management pages for uploads, quizzes, results, and reporting.',
        start_date: '2018-06-01',
        end_date: '2021-07-01'
      },
      {
        id: 3,
        title: 'IT Dev Intern',
        description:
          'Contributed to frontend development projects using React and JavaScript.',
        start_date: '2017-12-01',
        end_date: '2018-05-01'
      }
    ]
  }
]
