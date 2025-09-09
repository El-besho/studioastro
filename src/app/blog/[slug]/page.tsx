
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { MDXComponents } from '@/components/mdx-components';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { WithContext, BlogPosting } from 'schema-dts';


interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {};
  }

  const { title, summary, image, tags } = post.frontmatter;
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: `${title} | ${siteConfig.name}`,
    description: summary,
    keywords: tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: summary,
      type: 'article',
      url: url,
      images: [
        {
          url: `${siteConfig.url}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: summary,
      images: [`${siteConfig.url}${image}`],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug, true);

  if (!post) {
    notFound();
  }

  const { title, date, author, image, tags, headings, summary } = post.frontmatter;
  const { content } = post;
  
  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: summary,
    image: `${siteConfig.url}${image}`,
    datePublished: date,
    author: {
        '@type': 'Person',
        name: author
    },
     publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}/logo.png`
        }
    },

  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container max-w-6xl py-12 md:py-24 text-right">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          <aside className="hidden md:block md:col-span-1 sticky top-24 self-start">
            {headings && headings.length > 0 && <TableOfContents headings={headings} />}
          </aside>

          <div className="md:col-span-3">
            <article className="prose prose-lg dark:prose-invert mx-auto">
              <header className="mb-8 border-b pb-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Link href={`/blog/tag/${encodeURIComponent(tag)}`} key={tag}>
                      <Badge variant="outline" className="font-normal hover:bg-muted transition-colors">{tag}</Badge>
                    </Link>
                  ))}
                </div>
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                  {title}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground mt-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${author}`} alt={author}/>
                      <AvatarFallback>{author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{author}</span>
                  </div>
                  <span>•</span>
                  <time dateTime={date}>
                    {format(new Date(date), 'd MMMM yyyy', { locale: ar })}
                  </time>
                </div>
              </header>

              <div className="relative w-full h-80 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                  data-ai-hint="blog post"
                />
              </div>

              <MDXComponents code={content} />
            </article>

            {post.related && post.related.length > 0 && (
              <section className="mt-16 pt-8 border-t">
                <h2 className="font-headline text-3xl font-bold tracking-tighter mb-8 text-center">مقالات ذات صلة</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {post.related.map((relatedPost) => (
                      <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="block">
                        <Card className="flex flex-col h-full overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-transform duration-300">
                          <CardHeader className="p-0">
                            <div className="relative w-full h-40">
                              <Image
                                src={relatedPost.frontmatter.image}
                                alt={relatedPost.frontmatter.title}
                                fill
                                className="object-cover"
                                data-ai-hint="blog post"
                              />
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 flex-grow">
                            <CardTitle className="text-lg font-headline group-hover:text-primary transition-colors leading-tight">
                                {relatedPost.frontmatter.title}
                            </CardTitle>
                            <CardDescription className="text-xs text-muted-foreground mt-2">
                                {format(new Date(relatedPost.frontmatter.date), 'd MMMM yyyy', { locale: ar })}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
