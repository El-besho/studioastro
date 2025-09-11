import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Image, Camera, Eye } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'before' | 'after' | 'process' | 'equipment';
  service: string;
}

interface ServiceGalleryProps {
  serviceName: string;
  cityName?: string;
  galleryItems?: GalleryItem[];
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'قبل الخدمة',
    description: 'حالة المكيف قبل الصيانة',
    image: '/images/services/ac-before.jpg',
    category: 'before',
    service: 'صيانة مكيفات'
  },
  {
    id: '2',
    title: 'بعد الخدمة',
    description: 'المكيف بعد الصيانة الشاملة',
    image: '/images/services/ac-after.jpg',
    category: 'after',
    service: 'صيانة مكيفات'
  },
  {
    id: '3',
    title: 'عملية التنظيف',
    description: 'تنظيف الملفات الداخلية',
    image: '/images/services/ac-cleaning.jpg',
    category: 'process',
    service: 'صيانة مكيفات'
  },
  {
    id: '4',
    title: 'المعدات المستخدمة',
    description: 'أدوات ومعدات متطورة',
    image: '/images/services/ac-equipment.jpg',
    category: 'equipment',
    service: 'صيانة مكيفات'
  },
  {
    id: '5',
    title: 'قبل الإصلاح',
    description: 'مشكلة في السباكة',
    image: '/images/services/plumbing-before.jpg',
    category: 'before',
    service: 'خدمات السباكة'
  },
  {
    id: '6',
    title: 'بعد الإصلاح',
    description: 'السباكة بعد الإصلاح',
    image: '/images/services/plumbing-after.jpg',
    category: 'after',
    service: 'خدمات السباكة'
  }
];

export function ServiceGallery({ serviceName, cityName, galleryItems = defaultGalleryItems }: ServiceGalleryProps) {
  const filteredItems = galleryItems.filter(item => 
    item.service.includes(serviceName) || serviceName.includes(item.service)
  );

  if (filteredItems.length === 0) {
    return null;
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'before': return 'bg-red-100 text-red-800';
      case 'after': return 'bg-green-100 text-green-800';
      case 'process': return 'bg-blue-100 text-blue-800';
      case 'equipment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'before': return 'قبل الخدمة';
      case 'after': return 'بعد الخدمة';
      case 'process': return 'عملية التنفيذ';
      case 'equipment': return 'المعدات';
      default: return 'معرض الصور';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Camera className="h-6 w-6 text-primary" />
          معرض الصور
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg border hover:shadow-lg transition-all duration-300">
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Image className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">صورة توضيحية</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className={getCategoryColor(item.category)}>
                    {getCategoryLabel(item.category)}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-headline text-lg font-semibold mb-2">لا توجد صور متاحة</h3>
            <p className="text-muted-foreground">
              سنقوم بإضافة صور لخدمات {serviceName} قريباً
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}