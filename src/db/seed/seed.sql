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
    'John Doe',
    'https://example.com/photo.jpg',
    'Software Engineer',
    'john.doe@example.com',
    '123 Main St, Anytown, USA',
    'Passionate software engineer with 10 years of experience.'
  );

-- Insert seed data into SocialLink table
INSERT INTO
  SocialLink (url, name, photo_url, profile_id)
VALUES
  (
    'https://twitter.com/johndoe',
    'Twitter',
    'https://example.com/twitter.jpg',
    1
  ),
  (
    'https://linkedin.com/in/johndoe',
    'LinkedIn',
    'https://example.com/linkedin.jpg',
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
  Category (name, description)
VALUES
  (
    'Web Development',
    'Projects related to web development.'
  );

-- Insert seed data into Tag table
INSERT INTO
  Tag (name, description, category_id)
VALUES
  ('JavaScript', 'JavaScript related projects', 1),
  ('React', 'React related projects', 1);

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
    role,
    start_date,
    end_date,
    description,
    company_logo_url,
    profile_id
  )
VALUES
  (
    'Tech Corp',
    '456 Tech St, Silicon Valley, USA',
    'Senior Developer',
    '2018-01-01',
    '2021-12-31',
    'Worked on various web development projects.',
    'https://example.com/tech-corp-logo.jpg',
    1
  );

-- Insert seed data into JobTag table
INSERT INTO
  JobTag (job_id, tag_id)
VALUES
  (1, 1),
  (1, 2);

-- Insert seed data into Blog table
INSERT INTO
  Blog (
    draft,
    title,
    excerpt,
    content,
    cover_image_url,
    profile_id
  )
VALUES
  (
    FALSE,
    'My First Blog Post',
    'This is an excerpt of my first blog post.',
    'This is the content of my first blog post.',
    'https://example.com/blog-cover.jpg',
    1
  );

-- Insert seed data into BlogTag table
INSERT INTO
  BlogTag (blog_id, tag_id)
VALUES
  (1, 1),
  (1, 2);