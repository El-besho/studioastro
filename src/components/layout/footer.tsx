

import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="bg-muted/50 text-right">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-1">
            <div className="flex justify-end">
             <Logo />
            </div>
            <p className="text-sm text-muted-foreground">
              منصة موثوقة لجميع خدمات منزلك وعملك في السعودية.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            <div>
              <h3 className="font-headline font-semibold mb-4">أهم الخدمات</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/services/air-conditioning-hvac" className="text-sm text-muted-foreground hover:text-foreground">خدمات التكييف</a>
                </li>
                <li>
                  <a href="/services/plumbing-services" className="text-sm text-muted-foreground hover:text-foreground">السباكة</a>
                </li>
                <li>
                  <a href="/services/electrical-services" className="text-sm text-muted-foreground hover:text-foreground">الكهرباء</a>
                </li>
                 <li>
                  <a href="/services" className="text-sm text-muted-foreground hover:text-foreground">المزيد...</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold mb-4">عن الشركة</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-sm text-muted-foreground hover:text-foreground">من نحن</a>
                </li>
                <li>
                  <a href="/blog" className="text-sm text-muted-foreground hover:text-foreground">المدونة</a>
                </li>
                <li>
                  <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground">تواصل معنا</a>
                </li>
                <li>
                  <a href="/join-provider" className="text-sm text-muted-foreground hover:text-foreground">انضم كمزود خدمة</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold mb-4">قانوني</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">سياسة الخصوصية</a>
                </li>
                <li>
                  <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">شروط الاستخدام</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row-reverse justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} إنقاذ. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4">
            <a href="https://twitter.com/enqaz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://facebook.com/enqaz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/enqaz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
