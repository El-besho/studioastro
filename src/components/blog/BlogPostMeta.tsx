import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, User, Tag, Clock, Eye, Share2 } from 'lucide-react';
import { Post } from '../../types/blog';

interface BlogPostMetaProps {
  post: Post;
  className?: string;
}

export function BlogPostMeta({ post, className = '' }: BlogPostMetaProps) {
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200; // Average reading speed in Arabic
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  const getWordCount = (content: string) => {
    return content.split(/\s+/).length;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.frontmatter.title,
          text: post.frontmatter.summary,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Card className={`bg-muted/30 ${className}`}>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Publication Date */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">تاريخ النشر</p>
              <p className="text-xs text-muted-foreground">{formatDate(post.frontmatter.date)}</p>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-50 text-blue-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">الكاتب</p>
              <p className="text-xs text-muted-foreground">{post.frontmatter.author}</p>
            </div>
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-50 text-green-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">وقت القراءة</p>
              <p className="text-xs text-muted-foreground">{getReadingTime(post.content)} دقيقة</p>
            </div>
          </div>

          {/* Word Count */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-50 text-purple-600">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">عدد الكلمات</p>
              <p className="text-xs text-muted-foreground">{getWordCount(post.content).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">العلامات</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Share Button */}
        <div className="mt-4 pt-4 border-t">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Share2 className="h-4 w-4" />
            مشاركة المقال
          </button>
        </div>
      </CardContent>
    </Card>
  );
}