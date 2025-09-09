

export type QueryIntent = 'pricing' | 'best' | 'location' | 'offers' | 'guarantees' | 'emergency' | 'reviews' | 'process' | 'attribute' | 'brand' | 'general';

export interface TaggedQuery {
  query: string;
  url: string;
  service: string;
  subService?: string;
  location?: string;
  intent: QueryIntent;
}

export type CategorizedQueries = {
  [key in QueryIntent]?: TaggedQuery[];
};
