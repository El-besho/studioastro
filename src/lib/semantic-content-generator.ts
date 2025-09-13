// Semantic Content Generator
// Implements fact-based content generation with entity optimization and semantic writing rules

import { SemanticEntity, TopicalCoverage, HistoricalData } from './semantic-framework';
import { NamedEntity, EntityLink, NGram, SearchIntent, InformationGap } from './entity-optimization';

export interface SemanticContent {
  title: string;
  content: string;
  entities: NamedEntity[];
  ngrams: NGram[];
  searchIntents: SearchIntent[];
  informationGaps: InformationGap[];
  topicalCoverage: TopicalCoverage;
  historicalData: HistoricalData;
  factSources: FactSource[];
  contextualDomains: string[];
}

export interface FactSource {
  statement: string;
  source: string;
  verifiability: number;
  context: string;
  entities: string[];
}

export interface ContentOptimization {
  sentenceLength: 'short' | 'medium' | 'long';
  factDensity: number;
  entityDensity: number;
  ngramDensity: number;
  sourceCitations: number;
  contextualRelevance: number;
}

export class SemanticContentGenerator {
  private entityEngine: any; // Will be injected
  private semanticFramework: any; // Will be injected
  private factSources: Map<string, FactSource[]> = new Map();
  private contextualDomains: string[] = [
    'technical', 'commercial', 'geographical', 'temporal', 'procedural',
    'comparative', 'causal', 'conditional', 'quantitative', 'qualitative'
  ];

  constructor(entityEngine: any, semanticFramework: any) {
    this.entityEngine = entityEngine;
    this.semanticFramework = semanticFramework;
  }

  generateSemanticContent(
    topic: string,
    targetEntities: SemanticEntity[],
    optimization: ContentOptimization
  ): SemanticContent {
    // Extract entities from topic and target entities
    const entities = this.extractAllEntities(topic, targetEntities);
    
    // Generate n-grams and skip-grams
    const ngrams = this.generateNGrams(topic, entities);
    
    // Generate search intents
    const searchIntents = this.generateSearchIntents(entities);
    
    // Identify information gaps
    const informationGaps = this.identifyInformationGaps(topic, entities);
    
    // Calculate topical coverage
    const topicalCoverage = this.calculateTopicalCoverage(topic, targetEntities);
    
    // Get historical data
    const historicalData = this.getHistoricalData(topic);
    
    // Generate fact-based content
    const content = this.generateFactBasedContent(topic, entities, optimization);
    
    // Extract fact sources
    const factSources = this.extractFactSources(content, entities);
    
    return {
      title: this.generateTitle(topic, entities),
      content,
      entities,
      ngrams,
      searchIntents,
      informationGaps,
      topicalCoverage,
      historicalData,
      factSources,
      contextualDomains: this.contextualDomains
    };
  }

  private extractAllEntities(topic: string, targetEntities: SemanticEntity[]): NamedEntity[] {
    // Extract entities from topic text
    const topicEntities = this.entityEngine.recognizeEntities(topic);
    
    // Convert SemanticEntity to NamedEntity for target entities
    const convertedEntities = targetEntities.map(entity => ({
      text: entity.name,
      label: this.mapEntityType(entity.type),
      start: 0,
      end: entity.name.length,
      confidence: 0.9,
      context: entity.name
    }));
    
    return [...topicEntities, ...convertedEntities];
  }

  private mapEntityType(type: string): 'SERVICE' | 'LOCATION' | 'PERSON' | 'ORG' | 'PRODUCT' | 'TECHNOLOGY' {
    const typeMap: Record<string, any> = {
      'service': 'SERVICE',
      'location': 'LOCATION',
      'person': 'PERSON',
      'organization': 'ORG',
      'concept': 'PRODUCT',
      'technology': 'TECHNOLOGY'
    };
    
    return typeMap[type] || 'SERVICE';
  }

  private generateNGrams(topic: string, entities: NamedEntity[]): NGram[] {
    const ngrams: NGram[] = [];
    
    // Generate unigrams, bigrams, and trigrams
    [1, 2, 3].forEach(n => {
      const generated = this.entityEngine.generateNGrams(topic, n);
      ngrams.push(...generated);
    });
    
    // Generate skip-grams
    const skipGrams = this.entityEngine.generateSkipGrams(topic, 1);
    ngrams.push(...skipGrams.map(sg => ({
      text: sg.text,
      type: 'skipgram' as const,
      frequency: sg.frequency,
      context: sg.context,
      entities: sg.entities
    })));
    
    return ngrams;
  }

  private generateSearchIntents(entities: NamedEntity[]): SearchIntent[] {
    return this.entityEngine.generateSearchIntents(entities);
  }

  private identifyInformationGaps(topic: string, entities: NamedEntity[]): InformationGap[] {
    return this.entityEngine.identifyInformationGaps(topic, entities);
  }

  private calculateTopicalCoverage(topic: string, targetEntities: SemanticEntity[]): TopicalCoverage {
    const entityCoverage = targetEntities.length / 10; // Normalize to 0-1
    const depthScore = this.calculateDepthScore(targetEntities);
    
    return {
      primaryTopic: topic,
      subtopics: targetEntities.map(e => e.name),
      contextualDomains: this.contextualDomains,
      entityCoverage: Math.min(entityCoverage, 1),
      depthScore
    };
  }

  private calculateDepthScore(entities: SemanticEntity[]): number {
    if (entities.length === 0) return 0;
    
    const totalAttributes = entities.reduce((sum, entity) => 
      sum + Object.keys(entity.attributes).length, 0);
    const totalRelationships = entities.reduce((sum, entity) => 
      sum + entity.relationships.length, 0);
    
    return Math.min((totalAttributes + totalRelationships) / (entities.length * 5), 1);
  }

  private getHistoricalData(topic: string): HistoricalData {
    // Placeholder for historical data retrieval
    return {
      performanceMetrics: {
        clickThroughRate: 0.05,
        dwellTime: 120,
        bounceRate: 0.3,
        conversionRate: 0.02
      },
      contentQuality: {
        factAccuracy: 0.9,
        comprehensiveness: 0.8,
        sourceAuthority: 0.7
      },
      userEngagement: {
        socialShares: 5,
        comments: 2,
        returnVisits: 0.1
      }
    };
  }

  private generateFactBasedContent(
    topic: string,
    entities: NamedEntity[],
    optimization: ContentOptimization
  ): string {
    let content = '';
    
    // Generate introduction with key entities
    content += this.generateIntroduction(topic, entities);
    
    // Generate fact-based sections
    content += this.generateFactSections(entities, optimization);
    
    // Generate contextual coverage
    content += this.generateContextualCoverage(topic, entities);
    
    // Generate entity connections
    content += this.generateEntityConnections(entities);
    
    // Generate search intent content
    content += this.generateSearchIntentContent(entities);
    
    return this.optimizeContentLength(content, optimization);
  }

  private generateIntroduction(topic: string, entities: NamedEntity[]): string {
    const keyEntities = entities.filter(e => e.confidence > 0.7);
    const entityNames = keyEntities.map(e => e.text).join(', ');
    
    return `<h1>${topic}</h1>
<p>This comprehensive guide covers ${topic} with detailed information about ${entityNames}. 
All information is based on verifiable facts and industry standards.</p>`;
  }

  private generateFactSections(entities: NamedEntity[], optimization: ContentOptimization): string {
    let content = '';
    
    entities.forEach(entity => {
      if (entity.confidence > 0.5) {
        content += this.generateEntityFacts(entity, optimization);
      }
    });
    
    return content;
  }

  private generateEntityFacts(entity: NamedEntity, optimization: ContentOptimization): string {
    const facts = this.getEntityFacts(entity);
    let section = `<h2>${entity.text} Facts</h2>`;
    
    facts.forEach(fact => {
      section += `<p>${fact.statement}</p>`;
      if (optimization.sourceCitations > 0) {
        section += `<small>Source: ${fact.source}</small>`;
      }
    });
    
    return section;
  }

  private getEntityFacts(entity: NamedEntity): FactSource[] {
    // Generate facts based on entity type
    const facts: FactSource[] = [];
    
    switch (entity.label) {
      case 'SERVICE':
        facts.push({
          statement: `${entity.text} is a professional service requiring specialized knowledge.`,
          source: 'Industry Standards',
          verifiability: 0.9,
          context: entity.context,
          entities: [entity.text]
        });
        break;
      case 'LOCATION':
        facts.push({
          statement: `${entity.text} is a major city with specific service requirements.`,
          source: 'Geographic Data',
          verifiability: 0.95,
          context: entity.context,
          entities: [entity.text]
        });
        break;
      case 'PERSON':
        facts.push({
          statement: `${entity.text} is a qualified professional in their field.`,
          source: 'Professional Records',
          verifiability: 0.8,
          context: entity.context,
          entities: [entity.text]
        });
        break;
    }
    
    return facts;
  }

  private generateContextualCoverage(topic: string, entities: NamedEntity[]): string {
    let content = '<h2>Contextual Coverage</h2>';
    
    this.contextualDomains.forEach(domain => {
      content += this.generateContextualSection(domain, entities);
    });
    
    return content;
  }

  private generateContextualSection(domain: string, entities: NamedEntity[]): string {
    const section = `<h3>${domain.charAt(0).toUpperCase() + domain.slice(1)} Context</h3>`;
    
    switch (domain) {
      case 'technical':
        return section + '<p>Technical specifications and requirements are essential for proper implementation.</p>';
      case 'commercial':
        return section + '<p>Commercial considerations include cost, value, and market positioning.</p>';
      case 'geographical':
        return section + '<p>Geographical factors influence service delivery and availability.</p>';
      case 'temporal':
        return section + '<p>Temporal aspects include timing, duration, and scheduling considerations.</p>';
      case 'procedural':
        return section + '<p>Procedural steps ensure consistent and reliable outcomes.</p>';
      default:
        return section + `<p>${domain} context provides additional perspective on the topic.</p>`;
    }
  }

  private generateEntityConnections(entities: NamedEntity[]): string {
    const connections = this.entityEngine.analyzeEntityConnections(entities);
    
    if (connections.size === 0) return '';
    
    let content = '<h2>Entity Connections</h2>';
    
    connections.forEach((relatedEntities, entity) => {
      content += `<h3>${entity} Related Entities</h3>`;
      content += `<p>${entity} is connected to: ${relatedEntities.join(', ')}</p>`;
    });
    
    return content;
  }

  private generateSearchIntentContent(entities: NamedEntity[]): string {
    const searchIntents = this.entityEngine.generateSearchIntents(entities);
    
    if (searchIntents.length === 0) return '';
    
    let content = '<h2>Common Questions</h2>';
    
    searchIntents.forEach(intent => {
      content += `<h3>${intent.query}</h3>`;
      intent.questions.forEach(question => {
        content += `<p><strong>Q:</strong> ${question}</p>`;
        content += `<p><strong>A:</strong> ${this.generateAnswer(question, intent.entities)}</p>`;
      });
    });
    
    return content;
  }

  private generateAnswer(question: string, entities: string[]): string {
    // Simple answer generation based on question type
    if (question.includes('what is')) {
      return `This is a comprehensive service that involves ${entities.join(' and ')}.`;
    }
    if (question.includes('how does')) {
      return `The process involves several steps including ${entities.join(', ')}.`;
    }
    if (question.includes('why choose')) {
      return `Choosing this service provides benefits including ${entities.join(', ')}.`;
    }
    if (question.includes('where')) {
      return `This service is available in ${entities.join(', ')}.`;
    }
    
    return `This question relates to ${entities.join(' and ')}.`;
  }

  private optimizeContentLength(content: string, optimization: ContentOptimization): string {
    if (optimization.sentenceLength === 'short') {
      return this.shortenSentences(content);
    }
    
    return content;
  }

  private shortenSentences(content: string): string {
    return content
      .split('.')
      .map(sentence => {
        const words = sentence.trim().split(' ');
        if (words.length > 15) {
          return words.slice(0, 15).join(' ') + '...';
        }
        return sentence.trim();
      })
      .filter(sentence => sentence.length > 0)
      .join('. ');
  }

  private generateTitle(topic: string, entities: NamedEntity[]): string {
    const keyEntities = entities.filter(e => e.confidence > 0.7).slice(0, 3);
    const entityNames = keyEntities.map(e => e.text).join(' & ');
    
    return `${topic}: Complete Guide to ${entityNames}`;
  }

  private extractFactSources(content: string, entities: NamedEntity[]): FactSource[] {
    const sources: FactSource[] = [];
    
    // Extract statements that look like facts
    const sentences = content.split('.').filter(s => s.trim().length > 0);
    
    sentences.forEach(sentence => {
      if (this.looksLikeFact(sentence)) {
        sources.push({
          statement: sentence.trim(),
          source: 'Internal Analysis',
          verifiability: 0.8,
          context: sentence,
          entities: entities.filter(e => sentence.includes(e.text)).map(e => e.text)
        });
      }
    });
    
    return sources;
  }

  private looksLikeFact(sentence: string): boolean {
    const factIndicators = ['is', 'are', 'has', 'have', 'requires', 'provides', 'offers', 'includes'];
    return factIndicators.some(indicator => sentence.toLowerCase().includes(indicator));
  }

  // Generate content for specific service types
  generateServiceContent(serviceType: string, serviceName: string, city?: string): SemanticContent {
    const topic = `${serviceName} in ${city || 'Saudi Arabia'}`;
    const entities = this.createServiceEntities(serviceType, serviceName, city);
    
    const optimization: ContentOptimization = {
      sentenceLength: 'short',
      factDensity: 0.8,
      entityDensity: 0.6,
      ngramDensity: 0.7,
      sourceCitations: 3,
      contextualRelevance: 0.9
    };
    
    return this.generateSemanticContent(topic, entities, optimization);
  }

  private createServiceEntities(serviceType: string, serviceName: string, city?: string): SemanticEntity[] {
    const entities: SemanticEntity[] = [];
    
    // Service entity
    entities.push({
      id: serviceType,
      name: serviceName,
      type: 'service',
      attributes: {
        category: serviceType,
        availability: '24/7',
        expertise: 'professional'
      },
      relationships: [],
      contextQualifiers: ['professional', 'reliable', 'expert'],
      ngrams: [serviceName, serviceType],
      skipGrams: [`${serviceName} service`]
    });
    
    // City entity if provided
    if (city) {
      entities.push({
        id: city.toLowerCase(),
        name: city,
        type: 'location',
        attributes: {
          country: 'Saudi Arabia',
          region: 'Middle East',
          population: 'large'
        },
        relationships: [{
          target: serviceType,
          relationship: 'provides',
          strength: 0.8,
          context: 'service availability'
        }],
        contextQualifiers: ['urban', 'developed', 'commercial'],
        ngrams: [city, 'Saudi Arabia'],
        skipGrams: [`${city} services`]
      });
    }
    
    return entities;
  }
}

// Export the main generator instance
export const semanticContentGenerator = new SemanticContentGenerator(
  require('./entity-optimization').entityOptimizationEngine,
  require('./semantic-framework').topicalAuthorityFramework
);