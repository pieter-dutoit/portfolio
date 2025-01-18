-- Drop all tables
DROP TABLE IF EXISTS BlogTag;

DROP TABLE IF EXISTS Blog;

DROP TABLE IF EXISTS JobTag;

DROP TABLE IF EXISTS Role;

DROP TABLE IF EXISTS Job;

DROP TABLE IF EXISTS ProjectTag;

DROP TABLE IF EXISTS ProjectImage;

DROP TABLE IF EXISTS Image;

DROP TABLE IF EXISTS Project;

DROP TABLE IF EXISTS SocialLink;

DROP TABLE IF EXISTS Achievement;

DROP TABLE IF EXISTS QualificationTag;

DROP TABLE IF EXISTS Qualification;

DROP TABLE IF EXISTS Tag;

DROP TABLE IF EXISTS Category;

DROP TABLE IF EXISTS Profile;

-- Profile table
CREATE TABLE
  IF NOT EXISTS Profile (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    photo_url TEXT,
    title VARCHAR(255),
    email_address VARCHAR(255),
    physical_address TEXT,
    about_me TEXT
  );

-- SocialLink table
CREATE TABLE
  IF NOT EXISTS SocialLink (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    name VARCHAR(255),
    photo_url TEXT,
    profile_id INTEGER NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES Profile (id) ON DELETE CASCADE
  );

-- Project table
CREATE TABLE
  IF NOT EXISTS Project (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    overview TEXT,
    description TEXT,
    repo_url TEXT,
    demo_url TEXT,
    start_date DATE,
    end_date DATE,
    cover_image_url TEXT,
    profile_id INTEGER NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES Profile (id) ON DELETE CASCADE
  );

-- Image table
CREATE TABLE
  IF NOT EXISTS Image (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    alt TEXT
  );

-- ProjectImage table
CREATE TABLE
  IF NOT EXISTS ProjectImage (
    project_id INTEGER NOT NULL,
    image_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, image_id),
    FOREIGN KEY (project_id) REFERENCES Project (id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES Image (id) ON DELETE CASCADE
  );

-- Category table
CREATE TABLE
  IF NOT EXISTS Category (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);

-- Tag table
CREATE TABLE
  IF NOT EXISTS Tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES Category (id) ON DELETE SET NULL
  );

-- ProjectTag table
CREATE TABLE
  IF NOT EXISTS ProjectTag (
    project_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, tag_id),
    FOREIGN KEY (project_id) REFERENCES Project (id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tag (id) ON DELETE CASCADE
  );

-- Job table
CREATE TABLE
  IF NOT EXISTS Job (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    company_address TEXT,
    company_logo_url TEXT,
    profile_id INTEGER NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES Profile (id) ON DELETE CASCADE
  );

-- Role table
CREATE TABLE
  IF NOT EXISTS Role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    job_id INTEGER NOT NULL,
    FOREIGN KEY (job_id) REFERENCES Job (id) ON DELETE CASCADE
  );

-- JobTag table
CREATE TABLE
  IF NOT EXISTS JobTag (
    job_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (job_id, tag_id),
    FOREIGN KEY (job_id) REFERENCES Job (id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tag (id) ON DELETE CASCADE
  );

-- Blog table
CREATE TABLE
  IF NOT EXISTS Blog (
    id SERIAL PRIMARY KEY,
    draft BOOLEAN DEFAULT TRUE,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image_url TEXT,
    profile_id INTEGER NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES Profile (id) ON DELETE CASCADE
  );

-- BlogTag table
CREATE TABLE
  IF NOT EXISTS BlogTag (
    blog_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (blog_id, tag_id),
    FOREIGN KEY (blog_id) REFERENCES Blog (id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tag (id) ON DELETE CASCADE
  );

-- Qualification table
CREATE TABLE
  IF NOT EXISTS Qualification (
    id SERIAL PRIMARY KEY,
    institution_name VARCHAR(255) NOT NULL,
    institution_address TEXT,
    institution_logo_url TEXT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    profile_id INTEGER NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES Profile (id) ON DELETE CASCADE
  );

-- QualificationTag table
CREATE TABLE
  IF NOT EXISTS QualificationTag (
    qualification_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (qualification_id, tag_id),
    FOREIGN KEY (qualification_id) REFERENCES Qualification (id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tag (id) ON DELETE CASCADE
  );

-- Achievement table
CREATE TABLE
  IF NOT EXISTS Achievement (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    verification_url TEXT,
    pdf_url TEXT,
    qualification_id INTEGER NOT NULL,
    FOREIGN KEY (qualification_id) REFERENCES Qualification (id) ON DELETE CASCADE
  );