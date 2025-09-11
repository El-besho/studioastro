import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
}

export function FAQ({ faqs, title = "الأسئلة الشائعة" }: FAQProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
            >
              <summary className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer list-none">
                <span className="font-medium text-foreground pl-2">
                  {faq.question}
                </span>
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180 flex-shrink-0" />
              </summary>
              <div className="px-6 pb-4">
                <div className="border-t pt-4">
                  <p className="text-foreground/80 leading-relaxed text-right">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}