
import { Badge } from '@/components/ui/badge';
import { getAllServices, getServiceCategories } from '@/lib/services';
import { ServiceGrid } from '@/components/service-grid';
import Link from 'next/link';
import { ServiceHierarchy } from '@/types/services';

export default function ServicesPage() {
    const categories = getServiceCategories();
    const servicesByCategory: Record<string, (ServiceHierarchy & { slug: string; })[]> = {};

    // Group services by category
    getAllServices().forEach(service => {
        if (!servicesByCategory[service.category]) {
            servicesByCategory[service.category] = [];
        }
        servicesByCategory[service.category].push(service);
    });


    return (
        <div className="container py-12 md:py-24">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                    <Badge className="font-headline bg-primary/10 text-primary hover:bg-primary/20">
                        جميع الخدمات
                    </Badge>
                    <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                        تصفح جميع خدماتنا
                    </h1>
                    <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        نقدم مجموعة شاملة من الخدمات لتلبية جميع احتياجات منزلك وعملك. تصفح خدماتنا المنظمة حسب الفئة أدناه.
                    </p>
                </div>
            </div>
            
            <div className="space-y-16">
                {categories.map(category => {
                    const services = servicesByCategory[category.id];
                    if (!services || services.length === 0) return null;

                    return (
                        <section key={category.id} id={category.slug}>
                             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                                <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl border-b-2 border-primary pb-2">
                                    {category.ar_name}
                                </h2>
                            </div>
                            <ServiceGrid services={services} showDescription={true} />
                        </section>
                    )
                })}
            </div>
        </div>
    );
}
