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
  slug?: string
  name: string
  description?: string
  verification_url?: string
  pdf_url?: string
}

export interface Qualification {
  id: number | string
  institution_name: string
  institution_url?: string
  institution_same_as?: string[]
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
  achievements: string[]
  start_date: string
  end_date?: string
}

export interface Job {
  id: number | string
  company_name: string
  company_url?: string
  company_same_as?: string[]
  company_address?: string
  company_logo_url: string
  tags: Tag[]
  roles: JobRole[]
}

export const profile = {
  full_name: 'Pieter du Toit',
  title: 'Frontend Developer (React & TypeScript)',
  experience_summary: '5 years, 7 months building production apps',
  qualification: 'Master of IT · Distinction',
  qualification_detail: 'Software Development. Griffith University',
  physical_address: 'South Africa',
  phone_number: '0432 316 018',
  photo_url: '/images/profile-pic-background-blur.png',
  email_address: 'contact@pieterdutoit.dev'
}

export const aboutMe = [
  'I’m a frontend software engineer with 5+ years of commercial experience using React, TypeScript and Next.js. My work spans learning management platforms and CMS-backed websites, with additional experience in server-side development and relational database design.',
  'In my current role at Fourfifty, I develop customer-facing features for user verification and CMS-managed content, and resolve production reliability issues. I completed a Master of Information Technology with distinction at Griffith University, receiving its Gold Coast postgraduate ICT prize for the highest graduating GPA in an ICT master’s degree.'
]

export const socialLinks: SocialLink[] = [
  {
    id: 1,
    name: 'GitHub',
    url: 'https://github.com/pieter-dutoit',
    photo_url: '/images/icons/github-icon.svg'
  },
  {
    id: 2,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/pieter-du-toit-dev/',
    photo_url: '/images/icons/linkedin-icon.svg'
  }
]

export const qualifications: Qualification[] = [
  {
    id: 1,
    institution_name: 'Griffith University',
    institution_url: 'https://www.griffith.edu.au/',
    institution_same_as: [
      'https://www.linkedin.com/school/griffith-university/'
    ],
    institution_address: 'Gold Coast, QLD, Australia',
    institution_logo_url: '/images/logos/griffith-logo.jpg',
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
        id: 4,
        slug: 'griffith-ict-prize-2026',
        name: 'School of ICT Postgraduate Programs Prize — Gold Coast (2026)',
        description:
          'Graduated with distinction (GPA 6.88). Awarded for the highest graduating GPA in an ICT master’s degree.',
        pdf_url:
          '/images/awards/pieter-du-toit-griffith-university-ict-postgraduate-programs-prize-2026.pdf'
      },
      {
        id: 3,
        name: 'Award for Academic Excellence (2024)',
        verification_url:
          'https://www.credly.com/badges/f0aa12b2-fbcf-440d-9f67-dbc30aee20d2/public_url'
      },
      {
        id: 2,
        name: 'Award for Academic Excellence (2023)',
        verification_url:
          'https://www.credly.com/badges/70c5f56e-a2ea-4c2f-b2a3-56bfe59b310d/linked_in?t=sfptdd'
      }
    ]
  }
]

export const jobs: Job[] = [
  {
    id: 2,
    company_name: 'Fourfifty',
    company_url: 'https://www.fourfifty.io/',
    company_same_as: ['https://www.linkedin.com/company/fourfifty/'],
    company_logo_url: '/images/logos/fourfifty-logo.jpeg',
    tags: [
      { id: 1, name: 'React' },
      { id: 2, name: 'TypeScript' },
      { id: 3, name: 'Next.js' },
      { id: 4, name: 'Directus' }
    ],
    roles: [
      {
        id: 4,
        title: 'Software Engineer (Frontend)',
        description:
          'I build customer-facing frontend features at Fourfifty, including verification flows, CMS-managed content and embedded game experiences.',
        achievements: [
          'Implemented SMS verification across gameplay, profile updates and communication preferences, including API integration, resend cooldowns, error recovery and marketing consent handling.',
          'Built CMS-controlled scratchcard theming, allowing content editors to change artwork, colours and messaging across claim, game and result screens without frontend code changes.',
          'Resolved animation and embedded-game lifecycle issues involving Lottie, WebAssembly and Unity WebGL, and preserved user sessions during temporary backend network failures.',
          'Built CMS-driven article publishing with pagination, dynamic XML sitemaps, crawl controls and JSON-LD structured metadata.'
        ],
        start_date: '2026-06-01'
      }
    ]
  },
  {
    id: 1,
    company_name: 'Full Facing (Pty) Ltd.',
    company_address: 'Cape Town, South Africa',
    company_logo_url: '/images/logos/full-facing-pty-ltd-logo.jpg',
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
          'I built frontend features and contributed to shared integrations, with a focus on complex forms and content publishing.',
        achievements: [
          'Built complex forms using SWR and Yup, combining data fetching, form state and input validation to keep the interface responsive and reduce unnecessary backend requests.',
          'Helped develop and maintain a shared API layer for consistent integration across frontend applications.',
          'Integrated Strapi into a Next.js website so the marketing team could publish articles and manage Open Graph and structured metadata.',
          'Built custom-styled form fields using native HTML inputs to retain their built-in behaviour.'
        ],
        start_date: '2021-08-01',
        end_date: '2023-06-01'
      },
      {
        id: 2,
        title: 'Frontend Developer',
        description:
          'I worked on Lesson Desk’s learning management features and contributed to the team’s development and deployment process.',
        achievements: [
          'Built and integrated Lesson Desk learning management features for content uploads, quiz scheduling, viewing results and exporting reports.',
          'Contributed to sprint planning and daily peer code reviews, and helped resolve deployment issues by maintaining frontend Dockerfiles.'
        ],
        start_date: '2018-06-01',
        end_date: '2021-07-01'
      },
      {
        id: 3,
        title: 'IT Dev Intern',
        description: 'I joined Full Facing as an IT Dev Intern.',
        achievements: [
          'Contributed to frontend development using React and JavaScript.'
        ],
        start_date: '2017-12-01',
        end_date: '2018-05-01'
      }
    ]
  }
]
