interface LocalBusinessSchemaProps {
  serviceName: string;
  cityName: string;
  serviceType: string;
  phoneNumber: string;
  address: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  openingHours: string;
}

export function LocalBusinessSchema({
  serviceName,
  cityName,
  serviceType,
  phoneNumber,
  address,
  rating,
  reviewCount,
  priceRange,
  openingHours
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `إنقاذ - ${serviceName} في ${cityName}`,
    "description": `خدمات ${serviceName} المتخصصة في ${cityName} بأعلى معايير الجودة والاحترافية`,
    "url": `https://inqadh.com/services/${serviceName.toLowerCase().replace(/\s+/g, '-')}/${cityName.toLowerCase()}`,
    "telephone": phoneNumber,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": cityName,
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": getCityCoordinates(cityName).lat,
      "longitude": getCityCoordinates(cityName).lng
    },
    "openingHours": openingHours,
    "priceRange": priceRange,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "serviceArea": {
      "@type": "City",
      "name": cityName
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `خدمات ${serviceName}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": serviceName,
            "description": `خدمات ${serviceName} في ${cityName}`,
            "provider": {
              "@type": "LocalBusiness",
              "name": "إنقاذ"
            }
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/inqadh",
      "https://www.instagram.com/inqadh",
      "https://twitter.com/inqadh"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function getCityCoordinates(cityName: string) {
  const coordinates: { [key: string]: { lat: number; lng: number } } = {
    'الرياض': { lat: 24.7136, lng: 46.6753 },
    'جدة': { lat: 21.4858, lng: 39.1925 },
    'مكة المكرمة': { lat: 21.3891, lng: 39.8579 },
    'المدينة المنورة': { lat: 24.5247, lng: 39.5692 },
    'الدمام': { lat: 26.4207, lng: 50.0888 },
    'الخبر': { lat: 26.1792, lng: 50.1971 },
    'الظهران': { lat: 26.2361, lng: 50.1033 },
    'الأحساء': { lat: 25.4297, lng: 49.5681 },
    'الطائف': { lat: 21.2703, lng: 40.4158 },
    'بريدة': { lat: 26.3260, lng: 43.9750 },
    'تبوك': { lat: 28.3998, lng: 36.5700 },
    'أبها': { lat: 18.2465, lng: 42.5056 },
    'خميس مشيط': { lat: 18.3000, lng: 42.7333 },
    'جازان': { lat: 16.8892, lng: 42.5511 },
    'نجران': { lat: 17.4917, lng: 44.1277 },
    'ينبع': { lat: 24.0897, lng: 38.0618 },
    'الجبيل': { lat: 27.0174, lng: 49.6225 },
    'حائل': { lat: 27.5114, lng: 41.6900 },
    'سكاكا': { lat: 29.9697, lng: 40.2064 },
    'عرعر': { lat: 30.9753, lng: 41.0381 }
  };

  return coordinates[cityName] || { lat: 24.7136, lng: 46.6753 }; // Default to Riyadh
}