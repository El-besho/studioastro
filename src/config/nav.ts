
import { Building, Info, Rss, Newspaper, Users, MapPin, Search, AlertTriangle } from "lucide-react"

export const navLinks = [
    { href: '/emergency', label: 'طوارئ 24/7', icon: AlertTriangle, className: 'text-red-600 font-bold' },
    { href: '/services', label: 'الخدمات', icon: Building },
    { href: '/locations', label: 'المواقع', icon: MapPin },
    { href: '/blog', label: 'المدونة', icon: Newspaper },
    { href: '/about', label: 'من نحن', icon: Users },
    { href: '/contact', label: 'تواصل معنا', icon: Info },
];

export const footerLinks = {
    services: [
        { href: '/services/air-conditioning-hvac', label: 'خدمات التكييف' },
        { href: '/services/plumbing-services', label: 'السباكة' },
        { href: '/services/electrical-services', label: 'الكهرباء' },
        { href: '/services/cleaning-services', label: 'التنظيف' },
        { href: '/services', label: 'المزيد...' }
    ],
    company: [
        { href: '/about', label: 'من نحن' },
        { href: '/blog', label: 'المدونة' },
        { href: '/contact', label: 'تواصل معنا' },
        { href: '/join-provider', label: 'انضم كمزود خدمة' }
    ],
    legal: [
        { href: '/privacy', label: 'سياسة الخصوصية' },
        { href: '/terms', label: 'شروط الاستخدام' }
    ]
};
