
import { notFound } from 'next/navigation';
import { getServicesByCategory, getCategoryBySlug, getServiceCategories } from '@/lib/services';
import { ServiceGrid } from '@/components/service-grid';
import { Badge } from '@/components/ui/badge';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = getServiceCategories();
  return categories.map(category => ({
    slug: category.slug,
  }));
}

export default function ServiceCategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const services = getServicesByCategory(params.slug);

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <Badge className="font-headline bg-primary/10 text-primary hover:bg-primary/20">
            فئة الخدمات
          </Badge>
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
            {category.ar_name}
          </h1>
          <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            تصفح جميع الخدمات ضمن فئة "{category.ar_name}".
          </p>
        </div>
      </div>
      <ServiceGrid services={services} showDescription={true} />
    </div>
  );
}
