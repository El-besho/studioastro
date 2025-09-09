
import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WithContext, Blog } from 'schema-dts';
import { siteConfig } from '@/config/site';

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd: WithContext<Blog> = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `مدونة ${siteConfig.name}`,
    description: 'مقالات ونصائح وآخر الأخبار من فريق إنقاذ لمساعدتك في العناية بمنزلك وعملك.',
    url: `${siteConfig.url}/blog`,
    blogPost: posts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.frontmatter.title,
        url: `${siteConfig.url}/blog/${post.slug}`,
        datePublished: post.frontmatter.date,
        author: {
            '@type': 'Person',
            name: post.frontmatter.author,
        },
        image: `${siteConfig.url}${post.frontmatter.image}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container py-12 md:py-24 text-right">
        <div className="mb-12 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            المدونة
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            مقالات ونصائح وآخر الأخبار من فريق إنقاذ لمساعدتك في العناية بمنزلك وعملك.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <Card className="flex flex-col h-full overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <CardHeader className="p-0">
                  <div className="relative w-full h-48">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover"
                      data-ai-hint="blog post"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <div className="space-y-2">
                      <div className="flex gap-2 flex-wrap mb-2">
                          {post.frontmatter.tags.map(tag => (
                            <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
                              <Badge variant="secondary" className="font-normal hover:bg-primary/10 hover:text-primary transition-colors">{tag}</Badge>
                            </Link>
                          ))}
                      </div>
                      <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">
                          {post.frontmatter.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                          {post.frontmatter.summary}
                      </CardDescription>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${post.frontmatter.author}`} alt={post.frontmatter.author} />
                      <AvatarFallback>{post.frontmatter.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{post.frontmatter.author}</span>
                  </div>
                  <time dateTime={post.frontmatter.date}>
                    {format(new Date(post.frontmatter.date), 'd MMMM yyyy', { locale: ar })}
                  </time>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
