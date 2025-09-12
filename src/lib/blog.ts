
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, Heading } from '../types/blog';
import { VFile } from 'vfile';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

function getHeadings(content: string): Heading[] {
  const file = new VFile({value: content});
  const tree = unified().use(remarkParse).parse(file);
  const headings: Heading[] = [];

  visit(tree, 'heading', (node: any) => {
    if (node.depth === 2 || node.depth === 3) {
      const text = node.children.map((child: any) => child.value).join('');
      const slug = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      headings.push({
        level: node.depth,
        text: text,
        slug: slug,
      });
    }
  });

  return headings;
}

async function processMarkdownToHtml(content: string): Promise<string> {
  const file = new VFile({value: content});
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(file);
  
  return result.toString();
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string, withRelated = false): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const headings = getHeadings(content);
  data.headings = headings;

  // Process Markdown to HTML
  const htmlContent = await processMarkdownToHtml(content);

  const post: Post = { 
      slug: realSlug, 
      frontmatter: data as Post['frontmatter'],
      content: htmlContent
  };

  if (withRelated) {
    const allPosts = await getAllPosts();
    const relatedPosts = allPosts.filter((p: any) => {
        if (p.slug === realSlug) {
            return false;
        }
        return p.frontmatter.tags.some((tag: any) => post.frontmatter.tags.includes(tag));
    }).slice(0, 3);
    post.related = relatedPosts;
  }

  return post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
        const realSlug = slug.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // Process Markdown to HTML
        const htmlContent = await processMarkdownToHtml(content);
        
        return { 
          slug: realSlug, 
          frontmatter: data as Post['frontmatter'],
          content: htmlContent
        }
    })
  );
  return posts.sort((post1, post2) => (new Date(post1.frontmatter.date) > new Date(post2.frontmatter.date) ? -1 : 1));
}

export async function getAllTags(): Promise<string[]> {
    const allPosts = await getAllPosts();
    const allTags = new Set<string>();
    allPosts.forEach(post => {
        post.frontmatter.tags.forEach(tag => {
            allTags.add(tag);
        });
    });
    return Array.from(allTags);
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
    const allPosts = await getAllPosts();
    const decodedTag = decodeURIComponent(tag);
    return allPosts.filter(post => post.frontmatter.tags.includes(decodedTag));
}
