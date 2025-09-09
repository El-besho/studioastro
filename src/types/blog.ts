
export interface Heading {
    level: number;
    text: string;
    slug: string;
}

export interface PostFrontmatter {
    title: string;
    date: string;
    author: string;
    summary: string;
    image: string;
    tags: string[];
    headings: Heading[];
}

export interface Post {
    slug: string;
    frontmatter: PostFrontmatter;
    content: string;
    related?: Post[];
}
