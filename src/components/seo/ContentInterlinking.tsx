import React from 'react';

interface LinkOpportunity {
  text: string;
  url: string;
  title: string;
}

interface Props {
  content: string;
  currentPath: string;
  maxLinks?: number;
}

export const ContentInterlinking: React.FC<Props> = ({ 
  content, 
  currentPath,
  maxLinks = 5 
}) => {
  // Define linking opportunities based on keywords
  const linkOpportunities: LinkOpportunity[] = [
    // Service links
    { text: 'تكييف', url: '/services/air-conditioning-hvac', title: 'خدمات التكييف والتبريد' },
    { text: 'مكيف', url: '/services/air-conditioning-hvac', title: 'صيانة المكيفات' },
    { text: 'سباكة', url: '/services/plumbing-services', title: 'خدمات السباكة' },
    { text: 'كهرباء', url: '/services/electrical-services', title: 'خدمات الكهرباء' },
    { text: 'كهربائي', url: '/services/electrical-services', title: 'فني كهرباء' },
    { text: 'تنظيف', url: '/services/cleaning-services', title: 'خدمات التنظيف' },
    { text: 'صيانة', url: '/services/home-maintenance-repair', title: 'الصيانة العامة' },
    { text: 'دهان', url: '/services/painting-decor', title: 'خدمات الدهانات' },
    { text: 'رخام', url: '/services/marble-tiling-services', title: 'تركيب الرخام' },
    { text: 'مسابح', url: '/services/swimming-pool-services', title: 'صيانة المسابح' },
    { text: 'حدائق', url: '/services/landscaping-gardening', title: 'تنسيق الحدائق' },
    { text: 'نقل', url: '/services/moving-relocation', title: 'خدمات النقل' },
    { text: 'مكافحة', url: '/services/pest-control', title: 'مكافحة الحشرات' },
    
    // City links
    { text: 'الرياض', url: '/locations/riyadh', title: 'خدمات الرياض' },
    { text: 'جدة', url: '/locations/jeddah', title: 'خدمات جدة' },
    { text: 'مكة', url: '/locations/makkah', title: 'خدمات مكة المكرمة' },
    { text: 'المدينة', url: '/locations/medina', title: 'خدمات المدينة المنورة' },
    { text: 'الدمام', url: '/locations/dammam', title: 'خدمات الدمام' },
    { text: 'الخبر', url: '/locations/khobar', title: 'خدمات الخبر' },
    
    // Category and special pages
    { text: 'طوارئ', url: '/emergency', title: 'خدمات الطوارئ 24/7' },
    { text: 'خدمات أساسية', url: '/services/category/essential', title: 'الخدمات الأساسية' },
    { text: 'خدمات متخصصة', url: '/services/category/specialized', title: 'الخدمات المتخصصة' },
    
    // Sub-service links
    { text: 'تسرب المياه', url: '/services/plumbing-services/water-leak-detection', title: 'كشف تسربات المياه' },
    { text: 'تركيب مكيف', url: '/services/air-conditioning-hvac/ac-installation', title: 'تركيب المكيفات' },
    { text: 'صيانة مكيف', url: '/services/air-conditioning-hvac/ac-maintenance', title: 'صيانة المكيفات' },
    { text: 'تنظيف مكيف', url: '/services/air-conditioning-hvac/ac-cleaning', title: 'تنظيف المكيفات' },
    { text: 'تمديدات كهربائية', url: '/services/electrical-services/electrical-wiring', title: 'التمديدات الكهربائية' },
    { text: 'تنظيف عميق', url: '/services/cleaning-services/deep-cleaning', title: 'التنظيف العميق' },
    { text: 'تنظيف مداخن', url: '/services/restaurant-chimney-cleaning', title: 'تنظيف مداخن المطاعم' },
  ];

  const addInternalLinks = (text: string): string => {
    let modifiedText = text;
    let linksAdded = 0;
    const usedUrls = new Set<string>();
    
    // Sort by text length (longer first) to avoid partial matches
    const sortedOpportunities = [...linkOpportunities].sort((a, b) => b.text.length - a.text.length);
    
    for (const opportunity of sortedOpportunities) {
      if (linksAdded >= maxLinks) break;
      if (usedUrls.has(opportunity.url)) continue;
      if (opportunity.url === currentPath) continue;
      
      // Create regex for word boundaries in Arabic
      const regex = new RegExp(`\\b${opportunity.text}\\b`, 'gi');
      
      // Check if the text exists and isn't already linked
      if (regex.test(modifiedText)) {
        // Replace only the first occurrence
        modifiedText = modifiedText.replace(
          regex,
          (match) => {
            if (linksAdded < maxLinks && !usedUrls.has(opportunity.url)) {
              linksAdded++;
              usedUrls.add(opportunity.url);
              return `<a href="${opportunity.url}" class="text-blue-600 hover:text-blue-800 underline" title="${opportunity.title}">${match}</a>`;
            }
            return match;
          }
        );
      }
    }
    
    return modifiedText;
  };

  const linkedContent = addInternalLinks(content);

  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: linkedContent }}
    />
  );
};

// Component for adding contextual service links
export const ServiceContextLinks: React.FC<{ 
  serviceName: string;
  serviceId: string;
  cityName?: string;
}> = ({ serviceName, serviceId, cityName }) => {
  const topCities = [
    { id: 'riyadh', name: 'الرياض' },
    { id: 'jeddah', name: 'جدة' },
    { id: 'dammam', name: 'الدمام' },
    { id: 'makkah', name: 'مكة' },
  ];

  return (
    <div className="bg-blue-50 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold mb-4">
        {serviceName} في مدن أخرى
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {topCities
          .filter(city => city.name !== cityName)
          .map(city => (
            <a
              key={city.id}
              href={`/services/${serviceId}/${city.id}`}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 px-3 py-2 rounded transition"
            >
              {serviceName} في {city.name}
            </a>
          ))}
      </div>
    </div>
  );
};

// Component for category navigation
export const CategoryNavigation: React.FC = () => {
  return (
    <nav className="bg-gray-100 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold mb-4">تصفح حسب الفئة</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/services/category/essential" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <span>⚡</span> الخدمات الأساسية
        </a>
        <a href="/services/category/specialized" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <span>🏆</span> الخدمات المتخصصة
        </a>
        <a href="/emergency" className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold">
          <span>🚨</span> خدمات الطوارئ
        </a>
      </div>
    </nav>
  );
};