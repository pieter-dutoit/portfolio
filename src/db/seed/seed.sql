-- Insert seed data into Profile table
INSERT INTO
  Profile (
    full_name,
    photo_url,
    title,
    email_address,
    physical_address,
    about_me
  )
VALUES
  (
    'Pieter du Toit',
    'https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/portfolio-profile-pic-y0raZkDkwI5lBJcHiPR14EfLyRih6z.jpg',
    'Software Developer',
    'pdut8901@gmail.com',
    'Broadbeach, QLD, Australia',
    'I am a dedicated, dependable and innovate software developer who takes pride in developing high-quality applications. When presented with complex work, I''m skilled at identifying the tasks that need to be performed to deliver a high-caliber product that meets stakeholder requirements, and complete them on time. Furthermore, I always challenge myself to find the most creative and efficient solution to any challenges I face.\n\nMy passion for software development comes from it''s potential to develop unique and create solutions to a variety of problems. Combined with my prior work experience as a web developer, this has motivated me to pursue a related degree. Not only has the university experience provided me with a stronger foundational understanding of software development, it has challenged me to think critically about a wider range of IT concepts and developed the confidence to take on technically challenging roles. My goal is to enable myself to make valuable contributions to meaningful projects. In the future, I hope to look back and take pride in having contributed to the success of such projects.\n\nA unique strength of mine is the ability to develop a good understanding of new concepts in relatively short amount of time, which allows me to find robust solutions to complex problems. Additionally, I am skilled at finding a large variety of possible solutions to problems, comparing them, evaluating their suitability, and selecting the most appropriate solution.'
  );

-- Insert seed data into SocialLink table
INSERT INTO
  SocialLink (url, name, photo_url, profile_id)
VALUES
  (
    'https://github.com/pieter-dutoit',
    'GitHub',
    'https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/github-KcziGG1bT2H75SNHGdX7T3YN23xXdL.svg',
    1
  ),
  (
    'https://www.linkedin.com/in/pieter-du-toit-8901/',
    'LinkedIn',
    'https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/linkedin-szuSGuHltgpTyW0WHLzAVQdkM61FOk.svg',
    1
  );

-- Insert seed data into Project table
INSERT INTO
  Project (
    title,
    overview,
    description,
    repo_url,
    demo_url,
    start_date,
    end_date,
    cover_image_url,
    profile_id
  )
VALUES
  (
    'Project Alpha',
    'Overview of Project Alpha',
    'Detailed description of Project Alpha',
    'https://github.com/johndoe/project-alpha',
    'https://project-alpha.com',
    '2022-01-01',
    '2022-06-01',
    'https://example.com/project-alpha.jpg',
    1
  );

-- Insert seed data into Image table
INSERT INTO
  Image (url, alt)
VALUES
  ('https://example.com/image1.jpg', 'Image 1'),
  ('https://example.com/image2.jpg', 'Image 2');

-- Insert seed data into ProjectImage table
INSERT INTO
  ProjectImage (project_id, image_id)
VALUES
  (1, 1),
  (1, 2);

-- Insert seed data into Category table
INSERT INTO
  Category (name)
VALUES
  ('technical_skill'),
  ('soft_skill'),
  ('blog_type');

-- Insert seed data into Tag table
INSERT INTO
  Tag (name, category_id)
VALUES
  ('JavaScript', 1),
  ('TypeScript', 1),
  ('Node.js', 1),
  ('Java', 1),
  ('Python', 1),
  ('PHP', 1),
  ('React', 1),
  ('Next.js', 1),
  ('Express', 1),
  ('Swing', 1),
  ('React Native', 1),
  ('Expo', 1),
  ('Tailwind CSS', 1),
  ('Docker', 1),
  ('Kubernetes', 1),
  ('AWS EC2', 1),
  ('SQL', 1),
  ('HTML', 1),
  ('CSS', 1),
  ('Software Testing', 1),
  ('Database Design', 1),
  ('Web Development', 1),
  ('Software Development Lifecycle (SDLC)', 1),
  ('Teamwork', 2),
  ('Decision-making', 2),
  ('Reflection', 3);

-- Insert seed data into ProjectTag table
INSERT INTO
  ProjectTag (project_id, tag_id)
VALUES
  (1, 1),
  (1, 2);

-- Insert seed data into Job table
INSERT INTO
  Job (
    company_name,
    company_address,
    company_logo_url,
    profile_id
  )
VALUES
  (
    'Full Facing (Pty) Ltd.',
    'Cape Town, South Africa',
    'https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/full-facing-pty-ltd-logo-0XFxDdszhdhR5MaXAgFATDOlynHFJl.jpg',
    1
  );

-- Insert seed data into Role table
INSERT INTO
  Role (title, description, start_date, end_date, job_id)
VALUES
  (
    'Senior Front-End Engineer',
    'Developed new features of the Lesson Desk e-learning platform as part of a front-end development team.\n\nGained valuable development experience with modern web frameworks and libraries such as Next.js, Framer Motion and Styled Components.\n\nCollaborated with marketing and UX teams to deliver engaging, user-friendly websites.\n\nAchieved significant SEO and performance enhancements for the platform''s media-rich public-facing website, as measured by Google Lighthouse. This helped optimise user experience and search engine visibility.',
    '2021-08-01',
    '2023-06-01',
    1
  ),
  (
    'Front-End Engineer',
    'Contributed to frontend projects within the Lesson Desk e-learning platform, built on a micro-services architecture, which included a custom UI library, and both learner and manager platforms.\n\nIntegrated the frontend with backend services through a REST API.\n\nGained valuable skills in agile sprints, teamwork, and collaboration, and an understanding of the software development lifecycle (SDLC).',
    '2018-06-01',
    '2021-07-01',
    1
  ),
  (
    'IT Dev Intern',
    'Contributed to frontend development projects using React.js and modern JavaScript techniques.\n\nEnhanced and maintained legacy code using JavaScript, jQuery, HTML & CSS.',
    '2017-12-01',
    '2018-05-01',
    1
  );

-- Insert seed data into JobTag table
INSERT INTO
  JobTag (job_id, tag_id)
VALUES
  (1, 1),
  (1, 7),
  (1, 8),
  (1, 18),
  (1, 19);

-- Insert seed data into Blog table
INSERT INTO
  Blog (
    draft,
    title,
    excerpt,
    content,
    cover_image_url,
    published_at,
    updated_at,
    profile_id
  )
VALUES
  (
    FALSE,
    'Teamwork: Making decisions in a group assignment',
    'During my studies at Griffith University, I collaborated with a 4-person team to develop a Java-based Tetris game with advanced features like AI and multiplayer capabilities. To kickstart the project, I created a table summarizing all tasks and shared it in a Teams chat, allowing members to self-assign tasks. While this approach was logical and stress-free for me, one teammate raised concerns about fairness. This led to a group discussion where tasks were reallocated, ensuring everyone felt the workload was balanced. Reflecting on this, I learned the importance of considering diverse decision-making styles and fostering inclusivity in team dynamics.',
    'During my studies at Griffith University, I was assigned to a 4-person team where our assignment was to write a Java-based Tetris game, with advanced features such as AI- and multi-player capabilities. The specification sheet clearly listed and categorised all sub-tasks and outcomes. The tasks varied in widely nature and included coding, drawing diagrams and writing reports. Having only met my teammates recently, we were unsure of how we would divide the workload, since we were unfamiliar with each others'' preferences for certain types of work.\n\nTo get the project going, I created a table summary of all tasks and shared the list on a Teams chat group. I asked all members to add their names next to the tasks they wished to complete. This approach suited me well, because I''m introverted with a "Thinking" approach to decision-making. This meant that in my view, this method of task assignment was stress-free, convenient, and required minimal communication, while giving members the freedom to pick the tasks they preferred.\n\nAt first, most members seemed content with selecting tasks in this way. However, one team member raised a concern over the approach, stating that it was unbalanced, because tasks were being self-assigned without consideration of other members'' preferences. Consequently, we organised an online meeting where everyone expressed their interest in specific tasks, and some tasks were re-assigned to ensure everyone felt the workload division was fair. By the end of the meeting, everyone was in agreement of the workload division.\n\nAfter the meeting, I reconsidered my approach to making decisions, and how it may affect team members. Although I thought my approach to workload division was logical and fair, it may have appeared inconsiderate to others. I realise now that others may have a "Feeling" approach to decision-making, meaning they prefer the decision-making process to be more inclusive and consider the emotional impact of decisions on others. In the future, I would still suggest my opinion regarding group decisions, but I would present it as a suggestion rather than a finalised decision. This would allow other members to voice any opinions or suggestions and let them feel more involved in the decision-making process.',
    'https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/tetris_screenshot-LhfpbUG5k4PSCmPDeF4t2fgNBYnomA.jpg',
    1
  );

-- Insert seed data into BlogTag table
INSERT INTO
  BlogTag (blog_id, tag_id)
VALUES
  (1, 4),
  (1, 10),
  (1, 20),
  (1, 24),
  (1, 25),
  (1, 26);

-- Insert seed data into Qualification table
INSERT INTO
  Qualification (
    institution_name,
    institution_address,
    institution_logo_url,
    name,
    description,
    start_date,
    end_date,
    profile_id
  )
VALUES
  (
    'Griffith University',
    'Gold Coast, QLD, Australia',
    'https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/griffith-logo%20copy-eKhRkRXuzFsLJjz0H9W8RCF5VLM5qb.jpg', -- Replace with logo URL if available
    'Master of Information Technology; Major in Software Development & Support',
    'Expected Graduation: July 2025',
    '2023-07-01',
    NULL,
    1
  );

-- Insert seed data into Achievements table
INSERT INTO
  Achievement (
    name,
    description,
    verification_url,
    pdf_url,
    qualification_id
  )
VALUES
  (
    'Griffith Award for Academic Excellence – 2023',
    'Received the award for maintaining a GPA of 7 (on a scale of 1 to 7)',
    'https://www.credly.com/badges/70c5f56e-a2ea-4c2f-b2a3-56bfe59b310d/linked_in?t=sfptdd',
    NULL,
    1
  );

-- Insert seed data into QualificationTag table
INSERT INTO
  QualificationTag (qualification_id, tag_id)
VALUES
  (1, 4),
  (1, 5),
  (1, 6),
  (1, 14),
  (1, 15),
  (1, 16),
  (1, 17);