import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, User, Tag, ArrowRight, Clock } from 'lucide-react';
import { Post } from '../../types/blog';

interface RelatedPostsProps {
  currentPost: Post;
  allPosts: Post[];
  maxPosts?: number;
  className?: string;
}

export function RelatedPosts({ 
  currentPost, 
  allPosts, 
  maxPosts = 3, 
  className = '' 
}: RelatedPostsProps) {
  // Find related posts based on tags
  const relatedPosts = allPosts
    .filter(post => {
      // Exclude current post
      if (post.slug === currentPost.slug) return false;
      
      // Check if posts share any tags
      return post.frontmatter.tags.some(tag => 
        currentPost.frontmatter.tags.includes(tag)
      );
    })
    .sort((a, b) => {
      // Sort by number of shared tags (descending)
      const aSharedTags = a.frontmatter.tags.filter(tag => 
        currentPost.frontmatter.tags.includes(tag)
      ).length;
      const bSharedTags = b.frontmatter.tags.filter(tag => 
        currentPost.frontmatter.tags.includes(tag)
      ).length;
      
      if (aSharedTags !== bSharedTags) {
        return bSharedTags - aSharedTags;
      }
      
      // If same number of shared tags, sort by date (newest first)
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    })
    .slice(0, maxPosts);

  // If no related posts by tags, get recent posts
  const fallbackPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
    .slice(0, maxPosts);

  const postsToShow = relatedPosts.length > 0 ? relatedPosts : fallbackPosts;

  if (postsToShow.length === 0) {
    return null;
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200; // Average reading speed in Arabic
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <h2 className="font-headline text-2xl font-bold mb-2">
          {relatedPosts.length > 0 ? 'مقالات ذات صلة' : 'مقالات حديثة'}
        </h2>
        <p className="text-muted-foreground">
          {relatedPosts.length > 0 
            ? 'اكتشف المزيد من المقالات المشابهة' 
            : 'اقرأ أحدث المقالات من مدونتنا'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsToShow.map((post) => (
          <Card key={post.slug} className="group hover:shadow-xl transition-all duration-300 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.frontmatter.date).toLocaleDateString('ar-SA')}</span>
                <Clock className="h-4 w-4 ml-2" />
                <span>{getReadingTime(post.content)} دقيقة قراءة</span>
              </div>
              
              <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors line-clamp-2">
                <a href={`/blog/${post.slug}`} className="hover:underline">
                  {post.frontmatter.title}
                </a>
              </CardTitle>
              
              <CardDescription className="line-clamp-3">
                {post.frontmatter.summary}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-4">
                {post.frontmatter.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {post.frontmatter.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{post.frontmatter.tags.length - 3}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{post.frontmatter.author}</span>
                </div>
                
                <a 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline group-hover:gap-2 transition-all"
                >
                  اقرأ المزيد
                  <ArrowRight className="h-4 w-4 mr-1 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-6 text-center">
          <a
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            عرض جميع المقالات
            <ArrowRight className="h-4 w-4 mr-1" />
          </a>
        </div>
      )}
    </div>
  );
}