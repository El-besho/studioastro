
'use client';

import { WithContext, ItemList } from "schema-dts";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CategorizedQueries, QueryIntent, TaggedQuery } from '@/types/queries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';

interface TrendingQueriesProps {
  queries: CategorizedQueries;
  title?: string;
}

const intentMap: { [key in QueryIntent]: { label: string; icon: string } } = {
  best: { label: '⭐ الأفضل', icon: '⭐' },
  pricing: { label: '💰 أسعار', icon: '💰' },
  offers: { label: '🎁 عروض', icon: '🎁' },
  reviews: { label: '📝 آراء', icon: '📝' },
  emergency: { label: '⚡ طارئة', icon: '⚡' },
  guarantees: { label: '🛡️ ضمانات', icon: '🛡️' },
  location: { label: '📍 موقع', icon: '📍' },
  process: { label: '⚙️ طريقة', icon: '⚙️' },
  attribute: { label: '🔧 صفة', icon: '🔧' },
  brand: { label: '🏢 شركة', icon: '🏢' },
  general: { label: 'عام', icon: '🔍' },
};


export function TrendingQueries({ queries, title }: TrendingQueriesProps) {
  const intents = Object.keys(queries).filter(intent => queries[intent as QueryIntent] && queries[intent as QueryIntent]!.length > 0) as QueryIntent[];

  if (intents.length === 0) {
    return null;
  }
  
  const pageTitle = title || "الاستعلامات الأكثر بحثاً";

  const getDefaultTab = () => {
    if (intents.includes('best')) return 'best';
    if (intents.includes('pricing')) return 'pricing';
    if (intents.length > 0) return intents[0];
    return '';
  }

  const allQueries: TaggedQuery[] = Object.values(queries).flat();

  const jsonLd: WithContext<ItemList> = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageTitle,
    itemListElement: allQueries.map((q, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: q.query,
      url: `${siteConfig.url}${q.url}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section aria-labelledby="popular-queries">
        <header>
          <h2 id="popular-queries" className="font-headline text-2xl font-bold tracking-tighter mb-6">
            {pageTitle}
          </h2>
        </header>

        <Tabs defaultValue={getDefaultTab()} className="w-full" dir="rtl">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 h-auto flex-wrap">
            {intents.map((intent) => (
                intentMap[intent] && (
                    <TabsTrigger key={intent} value={intent}>
                        <span className="hidden sm:inline-block ml-1">{intentMap[intent].icon}</span>
                        {intentMap[intent].label}
                    </TabsTrigger>
                )
            ))}
          </TabsList>

          {intents.map((intent) => (
            <TabsContent key={intent} value={intent} className="mt-4">
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={intent}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3"
                        role="tabpanel"
                    >
                        {queries[intent]?.map((q, index) => (
                        <Link
                            key={`${intent}-${index}`}
                            href={q.url}
                            className="p-3 text-sm text-center font-medium bg-muted/50 border rounded-lg hover:bg-accent/10 hover:border-primary/20 hover:text-primary transition-colors duration-200"
                        >
                            {q.query}
                        </Link>
                        ))}
                    </motion.div>
                 </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </>
  );
}
