
import { getAllTags, getPostsByTag } from '@/lib/blog';
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
import { notFound } from 'next/navigation';
import { WithContext, CollectionPage } from 'schema-dts';
import { siteConfig } from '@/config/site';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(tag => ({
    tag: encodeURIComponent(tag),
  }));
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }
  
  const jsonLd: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `مقالات تحت وسم: "${decodedTag}"`,
    description: `تصفح جميع المقالات المتعلقة بـ "${decodedTag}".`,
    url: `${siteConfig.url}/blog/tag/${tag}`,
    mainEntity: {
        '@type': 'ItemList',
        itemListElement: posts.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${siteConfig.url}/blog/${post.slug}`,
            name: post.frontmatter.title,
        }))
    }
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
            مقالات تحت وسم: "{decodedTag}"
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            تصفح جميع المقالات المتعلقة بـ "{decodedTag}".
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
                      {post.frontmatter.tags.map(currentTag => (
                        <Link key={currentTag} href={`/blog/tag/${encodeURIComponent(currentTag)}`}>
                          <Badge
                            variant={currentTag === decodedTag ? "default" : "secondary"}
                            className="font-normal hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            {currentTag}
                          </Badge>
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
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${post.frontmatter.author}`} />
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
