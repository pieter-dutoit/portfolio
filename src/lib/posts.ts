import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  stack: string[];
  thumbnail: string;
};

export type PostMeta = PostFrontmatter & {
  fileName: string;
};

export type PostListItem = Omit<PostMeta, "fileName">;

const postsDirectory = path.join(process.cwd(), "src/content/posts");

function normalizeArray(value: unknown, fieldName: string, fileName: string) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  throw new Error(
    `Post ${fileName} is missing a valid ${fieldName} array or comma-separated string.`
  );
}

function parsePostFile(fileName: string): PostMeta {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  const slugFromFile = fileName.replace(/\.mdx$/, "");

  const title = data.title ? String(data.title) : null;
  const slug = data.slug ? String(data.slug) : slugFromFile;
  const date = data.date ? String(data.date) : null;
  const excerpt = data.excerpt ? String(data.excerpt) : null;
  const thumbnail = data.thumbnail ? String(data.thumbnail) : null;

  if (!title || !date || !excerpt || !thumbnail) {
    throw new Error(
      `Post ${fileName} is missing required frontmatter (title, date, excerpt, thumbnail).`
    );
  }

  if (slug !== slugFromFile) {
    throw new Error(
      `Post ${fileName} frontmatter slug must match the filename. Expected "${slugFromFile}".`
    );
  }

  const tags = normalizeArray(data.tags, "tags", fileName);
  const stack = normalizeArray(data.stack, "stack", fileName);

  if (tags.length === 0 || stack.length === 0) {
    throw new Error(
      `Post ${fileName} must include at least one tag and one stack item.`
    );
  }

  return {
    title,
    slug,
    date,
    excerpt,
    tags,
    stack,
    thumbnail,
    fileName,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"));

  const posts = fileNames.map(parsePostFile);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): PostMeta | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
