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
    'Peer Pivot Web App',
    '## About the project\n\nThe coursework project was completed as part of the Web Application Development / Programming Principles II course offered by Griffith university. The purpose was to demonstrate a solid understanding of fundamental full stack principles, and the ability to learn and apply new tools and technologies such as the ORM.\n\nThe application (Peer Pivot) is a web-based peer review platform with both learners and teachers as users. The app allows teachers to create courses and associated assessment items. Learners who enrol in the courses are assigned to student groups, and given the opportunity to complete online peer reviews.\n\n###Frontend\n\nThe frontend is built with HTML, CSS and utilises PHP''s Blade templating.\n\n![Peer Pivot Home Page Screenshot](https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/peer-pivot-ui-cf6LthHLlztH3V04PT4xKRjfoNd5s1.jpg)\n\n###Backend\n\nAn Entity Relationship Diagram (ERD) was used to model the relationships between all identified entities. The database was implemented with SQL, with queries being performed by Eloquent ORM.\n\n## Reflection\n\nOne of the project requirements was to make use of Eloquent ORM to perform all queries. Although we had been given basic examples of how to implement Eloquent, the actual project queries were fairly complex and required me to write intricate ORM queries. Prior to this project, I had only ever written queries in plain SQL and I was uncertain whether I could learn and apply ORM concepts with the limited time that I had to complete the project.\n\nI decided to take on the challenge with two key actions. Firstly, I ensured I had a robust database design and ERD. This was key, since the diagram provides a visual overview of data relations and  can help clarify how a query should be structured. This applied to both the SQL queries that I was familiar with and the ORM ones. Secondly, I decided to thoroughly review the offical Eloquent documentation and examples before starting. \n\nI believed these steps to prepare and inform myself before starting my work reduced the overall amount of time spent on the project. Having a well-design database meant the only minor design changes or adjustments were required during the coding phase. Additionally, having familiarised myself with the Eloquent documentation beforehand meant that I had a decent understanding of the tools I was using. Also, when at a roadblock, I often remembered reading something in the documentation that could solve the issue, and I was able to refer back to it.\n\nThis approach confirmed to me that taking some time for preparation at the start of a project can be highly beneficial by making the rest of the process a bit smoother. I have also started applying this approach when performing other tasks, such as freelance coding projects.\n\n',
    'https://github.com/pieter-dutoit/wad-milestone-2',
    NULL,
    '2024-09-01',
    '2024-10-01',
    'https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/peer-pivot-xkwiZKJrCmycF2e3ZBhxtSiEAXN3qi.jpg',
    1
  ),
  (
    'Minesweeper',
    '## About the project\n\nI originally built this Minesweeper game with pure JavaScript, HTML, and CSS as a fund side-project that allowed me to perform direct DOM manipulation. \n\nAfter building the base game, I decided to make the project available to other developers for collaboration over Hacktoberfest. I have since rewritten the game in TypeScript.\n\n## Reflection on the Hacktoberfest experience\n\nHacketoberfest is a yearly event where all participating developers on the GitHub platform are encouraged to make a certain number of contribution to open-source projects in return for a reward consisting of a free t-shirt and a few other items. As one of the open-source projects, the game attracted a fair amount of interest with 11 developers adding to the code base. All code changes by other developers had to be approved by myself before they could become part of the main code base. However, many developers were trying to make rushed, poor-quality contributions to obtain the Hacktoberfest goals. This meant I needed to carefully screen contributions to avoid problematic code entering the repository.\n\nTo better manage the process, I created documentation with contribution guidelines. The process required creating a GitHub "issue", explaining the purpose of each contribution. Additionally, I tested incoming code changes before accepting them. Invalid changes were declined, and any bugs or issues that were detected had to be fixed before changes were approved.\n\n![Contribution guidelines screenshot](https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/contriburting-yb2U2yceN3ouOpg62UfGbIYnRZxXm1.jpg)\n\nAlthough the approach was reasonably effective at ensuring quality contributions, some issues still made their into the code base, resulting in unexpected game behaviour in certain cases. Regardless, the project achieved its goal of fostering community collaboration.\n\n![GitHub collaborators screenshot](https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/contributors-55TfB1rgsORSJY8wR3pwDwedHpQq82.jpg)\n\nThis experience demonstrated that successful collaboration requires clear communication. The contirbution guidelines set expectations and resulted in a smoother process. Additionally, I learned the importance of reviewing others'' work as a means of quality control. Engaging with the developer community on a also exposed me to some of the challenges of teamwork and how to approach them to ensure smooth collaboration.',
    'https://github.com/pieter-dutoit/minesweeper',
    'https://minesweeper-js.netlify.app/',
    '2018-08-01',
    '2024-11-27',
    'https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/Minesweeper-pJ0xclKthrcmxnBfPnpSK3FUY4ROqY.jpg',
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
  ('blog_type'),
  ('project_type');

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
  ('Reflection', 3),
  ('Coursework', 4),
  ('Secure Dev Ops', 1),
  ('Side Project', 4);

-- Insert seed data into ProjectTag table
INSERT INTO
  ProjectTag (project_id, tag_id)
VALUES
  (1, 6),
  (1, 18),
  (1, 19),
  (1, 21),
  (1, 22),
  (1, 17),
  (1, 27),
  (2, 1),
  (2, 18),
  (2, 19),
  (2, 2),
  (2, 22),
  (2, 24),
  (2, 29);

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
    profile_id
  )
VALUES
  (
    FALSE,
    'Teamwork: Making decisions in a group assignment',
    'During my studies at Griffith University, I collaborated with a 4-person team to develop a Java-based Tetris game with advanced features like AI and multiplayer capabilities. To kickstart the project, I created a table summarizing all tasks and shared it in a Teams chat, allowing members to self-assign tasks. While this approach was logical and stress-free for me, one teammate raised concerns about fairness. This led to a group discussion where tasks were reallocated, ensuring everyone felt the workload was balanced. Reflecting on this, I learned the importance of considering diverse decision-making styles and fostering inclusivity in team dynamics.',
    '![Photo by Nick Fewings on Unsplash: https://unsplash.com/photos/black-and-brown-checkered-textile-GoXNygZlftg](https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/teamwork-photo-b4ga9RgtVMAd236kn3swuCIvYY6xuR.jpeg)\n\nDuring my studies at Griffith University, I was assigned to a 4-person team where our assignment was to write a Java-based Tetris game, with advanced features such as AI- and multi-player capabilities. The specification sheet clearly listed and categorised all sub-tasks and outcomes. The tasks varied in widely nature and included coding, drawing diagrams and writing reports. Having only met my teammates recently, we were unsure of how we would divide the workload, since we were unfamiliar with each others'' preferences for certain types of work.\n\nTo get the project going, I created a table summary of all tasks and shared the list on a Teams chat group. I asked all members to add their names next to the tasks they wished to complete. This approach suited me well, because I''m introverted with a "Thinking" approach to decision-making. This meant that in my view, this method of task assignment was stress-free, convenient, and required minimal communication, while giving members the freedom to pick the tasks they preferred.\n\nAt first, most members seemed content with selecting tasks in this way. However, one team member raised a concern over the approach, stating that it was unbalanced, because tasks were being self-assigned without consideration of other members'' preferences. Consequently, we organised an online meeting where everyone expressed their interest in specific tasks, and some tasks were re-assigned to ensure everyone felt the workload division was fair. By the end of the meeting, everyone was in agreement of the workload division.\n\nAfter the meeting, I reconsidered my approach to making decisions, and how it may affect team members. Although I thought my approach to workload division was logical and fair, it may have appeared inconsiderate to others. I realise now that others may have a "Feeling" approach to decision-making, meaning they prefer the decision-making process to be more inclusive and consider the emotional impact of decisions on others. In the future, I would still suggest my opinion regarding group decisions, but I would present it as a suggestion rather than a finalised decision. This would allow other members to voice any opinions or suggestions and let them feel more involved in the decision-making process.',
    'https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/tetris_screenshot-LhfpbUG5k4PSCmPDeF4t2fgNBYnomA.jpg',
    1
  ),
  (
    FALSE,
    'The importance of industry certifications',
    '',
    '![Guest Speaker: Presentation Screenshot](https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/guest-speaker-9OcT0gJom3KziQ7o7Be0vCku3Q8FA5.jpg)\n\nDuring trimester 2, 2024, I attended a guest lecture on Secure DevOps by by Valentine Wats, IT professional and CTO of TEMSCONS. The speaker highlighted the importance of industry qualifications in addition to a formal qualification or degree. My understanding was that university coursework establishes a solid foundation, while industry certifications (for example, an AWS platform certification) teach practical skills that employers expect from job seekers. This resonated with me since I am seeking to grow and find employment as a full stack developer in a competitive job market. Moreover, I felt that I have been neglecting sharpening my industry skills since my focus has been largely on doing well in my university studies.\n\nMotivated by the speaker''s insights, I devised a plan to start tailoring my skillset based on in-demand skills. I subscribed to the NextJS sub-reddit (the developer framework I prefer working with) so that I could see what others in my field are discussing, building or debating. Additionally, I subscribed to the TLDR newsletter that send daily summaries, highlighting important industry developments specifically for web developers. Lastly, I enrolled in a short course on JavaScript data structures and algorithms to practice the skills that employers often assess during interviews.\n\n![Udemy course: https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass](https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/udemy-course-wyzoQUd17e0Un7NwNMULmAdNDbVgG6.jpg)\n\nMy efforts have significantly boosted my awareness of industry trends and best practices. Reading reddit posts and seeing the questions, thoughts and opinions of industry professionals has made me aware of trending or preferred developer tools and platforms. For example, many express their preference for the Supabase SQL services as a DB solution, or warn against high costs associated with hosting apps on Vercel. The platform has also afforded me the opportunity to engage and share my knowledge where applicable. Additionally, the Udemy course I am completing has been helpful in preparing for interviews and raised my confidence in my abilities, while the TLDR has addressed many of the uncertainties created by AI.\n\nI have learned that there must be a balance between theoretical and practical learning to stay relevant as a developer. More specifically, I''ve learned to ensure I learn the practical skills that employers prefer candidates to have. Moreover, I''ve become aware of the benefits of engaging with your professional community as a way of learning and staying relevant in your field.',
    'https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/guest-speaker-9OcT0gJom3KziQ7o7Be0vCku3Q8FA5.jpg',
    1
  ),
  (
    FALSE,
    'Communication & Collaboration: Building the Lesson Desk Website',
    '',
    '![Lessondesk.com Courses Webpage Screenshot](https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/lessondesk-webpage-QU2Gnlm9fNH03tYcbATwlJnpvATksW.jpg)\n\nDuring my time as a frontend developer at Full Facing Pty Ltd, my manager approached me to discuss the re-development of the Lesson Desk public-facing website. I was excited at the prospect, since I would be able to rebuild it using the latest Next.js framework and libraries such as Framer Motion to implement animations. I was presented with five Figma webpage designs and asked for an ETA to implement them. Based on my availability at the time, I estimated 5 weeks. After a few days, I was presented with about 7 additional screen designs, and realised that the estimate had been for all 12 web pages, not just the initial few. I realised that I had promised an ETA that I was unlikely to meet.\n\nI immediately reached out to my manager and explained the misunderstanding, hoping to be granted an ETA extension. Unfortunately, the stakeholders were already set on the initial one. Next, I asked if any other developers had capacity to take over some of the workload. Thankfully, three other developers were willing to each take on one or two of the additional pages alongside their other sprint work.\n\nThe extra help meant that I could continue to work on the project at a reasonable pace and remain focused on details such as optimising queries, implementing smooth and performant animations, and ensuring layout responsiveness. Despite the initial misunderstanding and unexpected workload, we managed to deliver the website on time and it was approved by the stakeholders.\n\n![Full Facing / Lesson Desk Developer Team. Screenshot from Lessondesk.com](https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/deveper-team-rSM74M9jMN3FXzAuqDfmcL0F1RWSZR.jpg)\n\nThe experience has taught me the importance of communication. Rather than assuming what the manager''s expectations were, I should have asked for an clear explanation of what the project involved, which would have allowed me to determine a realistic ETA. Secondly, I have learned to ask for help. Reaching out to my manager and explaining the situation resulted in receiving help from other developers. Without them, the project would likely not have been on time.',
    'https://k3c1kebeprqu2qck.public.blob.vercel-storage.com/lessondesk-webpage-QU2Gnlm9fNH03tYcbATwlJnpvATksW.jpg',
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
  (1, 26),
  (2, 28),
  (2, 26),
  (3, 1),
  (3, 8),
  (3, 26),
  (3, 24);

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