import { FAQ } from '../../types/services';

interface FAQSchemaProps {
  faqs: FAQ[];
  serviceName: string;
}

export function FAQSchema({ faqs, serviceName }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData, null, 2)
      }}
    />
  );
}