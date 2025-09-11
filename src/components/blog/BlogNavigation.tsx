import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight, Home, List } from 'lucide-react';
import { Post } from '../../types/blog';

interface BlogNavigationProps {
  currentPost: Post;
  allPosts: Post[];
  className?: string;
}

export function BlogNavigation({ currentPost, allPosts, className = '' }: BlogNavigationProps) {
  const currentIndex = allPosts.findIndex(post => post.slug === currentPost.slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {/* Previous Post */}
      <div className="flex-1">
        {previousPost ? (
          <Card className="group hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">المقال السابق</p>
                  <a 
                    href={`/blog/${previousPost.slug}`}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2 block"
                  >
                    {previousPost.frontmatter.title}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="opacity-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">لا يوجد مقال سابق</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Blog Home */}
      <div className="flex-shrink-0">
        <Card className="group hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <a 
              href="/blog"
              className="flex items-center gap-3"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Home className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">جميع المقالات</p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  المدونة
                </p>
              </div>
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Next Post */}
      <div className="flex-1">
        {nextPost ? (
          <Card className="group hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-xs text-muted-foreground mb-1">المقال التالي</p>
                  <a 
                    href={`/blog/${nextPost.slug}`}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2 block"
                  >
                    {nextPost.frontmatter.title}
                  </a>
                </div>
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                  <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="opacity-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="text-right flex-1">
                  <p className="text-xs text-muted-foreground">لا يوجد مقال تالي</p>
                </div>
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted">
                  <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}