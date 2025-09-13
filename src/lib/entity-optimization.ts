// Entity-Focused Optimization System
// Implements Named Entity Recognition, Linking, and Semantic Connections

export interface NamedEntity {
  text: string;
  label: 'PERSON' | 'ORG' | 'GPE' | 'EVENT' | 'FAC' | 'PRODUCT' | 'SERVICE' | 'LOCATION' | 'TECHNOLOGY';
  start: number;
  end: number;
  confidence: number;
  context: string;
}

export interface EntityLink {
  entity: NamedEntity;
  targetUrl: string;
  anchorText: string;
  relevance: number;
  context: string;
}

export interface NGram {
  text: string;
  type: 'unigram' | 'bigram' | 'trigram' | 'skipgram';
  frequency: number;
  context: string;
  entities: string[];
}

export interface SkipGram {
  text: string;
  skip: number;
  frequency: number;
  context: string;
  entities: string[];
}

export interface SearchIntent {
  query: string;
  intent: 'informational' | 'navigational' | 'transactional' | 'commercial';
  entities: string[];
  questions: string[];
  context: string;
}

export interface InformationGap {
  topic: string;
  missingInformation: string[];
  priority: 'high' | 'medium' | 'low';
  suggestedContent: string[];
  entities: string[];
}

export class EntityOptimizationEngine {
  private entities: Map<string, NamedEntity> = new Map();
  private ngrams: Map<string, NGram> = new Map();
  private skipGrams: Map<string, SkipGram> = new Map();
  private entityLinks: Map<string, EntityLink[]> = new Map();

  // Named Entity Recognition
  recognizeEntities(text: string): NamedEntity[] {
    const entities: NamedEntity[] = [];
    
    // Service-related entities
    const servicePatterns = [
      { pattern: /\b(air conditioning|AC|HVAC)\b/gi, label: 'SERVICE' as const },
      { pattern: /\b(repair|maintenance|installation|cleaning)\b/gi, label: 'SERVICE' as const },
      { pattern: /\b(Riyadh|Jeddah|Dammam|Mecca|Medina)\b/gi, label: 'LOCATION' as const },
      { pattern: /\b(technician|engineer|specialist|expert)\b/gi, label: 'PERSON' as const },
      { pattern: /\b(company|corporation|business|firm)\b/gi, label: 'ORG' as const },
      { pattern: /\b(emergency|urgent|24\/7)\b/gi, label: 'EVENT' as const },
      { pattern: /\b(unit|system|equipment|device)\b/gi, label: 'PRODUCT' as const },
      { pattern: /\b(smart|digital|automated|AI)\b/gi, label: 'TECHNOLOGY' as const }
    ];

    servicePatterns.forEach(({ pattern, label }) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const entity: NamedEntity = {
          text: match[0],
          label,
          start: match.index,
          end: match.index + match[0].length,
          confidence: this.calculateConfidence(match[0], label),
          context: this.extractContext(text, match.index, match[0].length)
        };
        entities.push(entity);
        this.entities.set(entity.text.toLowerCase(), entity);
      }
    });

    return entities;
  }

  private calculateConfidence(text: string, label: string): number {
    // Simple confidence calculation based on text characteristics
    let confidence = 0.5;
    
    if (text.length > 3) confidence += 0.1;
    if (text.includes(' ')) confidence += 0.1;
    if (label === 'SERVICE' && /[A-Z]/.test(text)) confidence += 0.2;
    if (label === 'LOCATION' && /^[A-Z]/.test(text)) confidence += 0.2;
    
    return Math.min(confidence, 1);
  }

  private extractContext(text: string, start: number, length: number): string {
    const contextStart = Math.max(0, start - 50);
    const contextEnd = Math.min(text.length, start + length + 50);
    return text.substring(contextStart, contextEnd);
  }

  // Entity Linking
  linkEntities(entities: NamedEntity[], baseUrl: string): EntityLink[] {
    const links: EntityLink[] = [];
    
    entities.forEach(entity => {
      const targetUrl = this.generateTargetUrl(entity, baseUrl);
      const anchorText = this.generateAnchorText(entity);
      const relevance = this.calculateRelevance(entity, targetUrl);
      
      if (relevance > 0.3) { // Only link if relevance is above threshold
        const link: EntityLink = {
          entity,
          targetUrl,
          anchorText,
          relevance,
          context: entity.context
        };
        links.push(link);
        
        // Store in entity links map
        const entityKey = entity.text.toLowerCase();
        if (!this.entityLinks.has(entityKey)) {
          this.entityLinks.set(entityKey, []);
        }
        this.entityLinks.get(entityKey)!.push(link);
      }
    });
    
    return links;
  }

  private generateTargetUrl(entity: NamedEntity, baseUrl: string): string {
    switch (entity.label) {
      case 'SERVICE':
        return `${baseUrl}/services/${this.slugify(entity.text)}`;
      case 'LOCATION':
        return `${baseUrl}/locations/${this.slugify(entity.text)}`;
      case 'ORG':
        return `${baseUrl}/about`;
      case 'PERSON':
        return `${baseUrl}/team`;
      default:
        return `${baseUrl}/search?q=${encodeURIComponent(entity.text)}`;
    }
  }

  private generateAnchorText(entity: NamedEntity): string {
    // Generate contextual anchor text variations
    const variations: Record<string, string[]> = {
      'SERVICE': [entity.text, `learn about ${entity.text}`, `${entity.text} services`],
      'LOCATION': [entity.text, `services in ${entity.text}`, `${entity.text} area`],
      'ORG': [entity.text, `our company`, `about us`],
      'PERSON': [entity.text, `our team`, `expert ${entity.text}`]
    };
    
    const entityVariations = variations[entity.label] || [entity.text];
    return entityVariations[0]; // Return first variation, can be randomized
  }

  private calculateRelevance(entity: NamedEntity, targetUrl: string): number {
    let relevance = 0.5;
    
    // Higher relevance for service and location entities
    if (entity.label === 'SERVICE' || entity.label === 'LOCATION') {
      relevance += 0.3;
    }
    
    // Higher confidence = higher relevance
    relevance += entity.confidence * 0.2;
    
    return Math.min(relevance, 1);
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // N-gram and Skip-gram Generation
  generateNGrams(text: string, n: number = 2): NGram[] {
    const words = text.toLowerCase().split(/\s+/);
    const ngrams: NGram[] = [];
    
    for (let i = 0; i <= words.length - n; i++) {
      const ngramText = words.slice(i, i + n).join(' ');
      const frequency = this.calculateFrequency(ngramText, text);
      const context = this.extractNGramContext(text, i, n);
      const entities = this.extractEntitiesFromNGram(ngramText);
      
      const ngram: NGram = {
        text: ngramText,
        type: n === 1 ? 'unigram' : n === 2 ? 'bigram' : 'trigram',
        frequency,
        context,
        entities
      };
      
      ngrams.push(ngram);
      this.ngrams.set(ngramText, ngram);
    }
    
    return ngrams;
  }

  generateSkipGrams(text: string, skip: number = 1): SkipGram[] {
    const words = text.toLowerCase().split(/\s+/);
    const skipGrams: SkipGram[] = [];
    
    for (let i = 0; i < words.length - skip - 1; i++) {
      const skipGramText = `${words[i]} ${words[i + skip + 1]}`;
      const frequency = this.calculateFrequency(skipGramText, text);
      const context = this.extractSkipGramContext(text, i, skip);
      const entities = this.extractEntitiesFromSkipGram(skipGramText);
      
      const skipGram: SkipGram = {
        text: skipGramText,
        skip,
        frequency,
        context,
        entities
      };
      
      skipGrams.push(skipGram);
      this.skipGrams.set(skipGramText, skipGram);
    }
    
    return skipGrams;
  }

  private calculateFrequency(ngram: string, text: string): number {
    const regex = new RegExp(ngram.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  }

  private extractNGramContext(text: string, startIndex: number, n: number): string {
    const words = text.split(/\s+/);
    const contextStart = Math.max(0, startIndex - 3);
    const contextEnd = Math.min(words.length, startIndex + n + 3);
    return words.slice(contextStart, contextEnd).join(' ');
  }

  private extractSkipGramContext(text: string, startIndex: number, skip: number): string {
    const words = text.split(/\s+/);
    const contextStart = Math.max(0, startIndex - 2);
    const contextEnd = Math.min(words.length, startIndex + skip + 3);
    return words.slice(contextStart, contextEnd).join(' ');
  }

  private extractEntitiesFromNGram(ngram: string): string[] {
    const entities: string[] = [];
    const words = ngram.split(' ');
    
    words.forEach(word => {
      if (this.entities.has(word.toLowerCase())) {
        entities.push(word);
      }
    });
    
    return entities;
  }

  private extractEntitiesFromSkipGram(skipGram: string): string[] {
    return this.extractEntitiesFromNGram(skipGram);
  }

  // Search Intent Generation
  generateSearchIntents(entities: NamedEntity[]): SearchIntent[] {
    const intents: SearchIntent[] = [];
    
    entities.forEach(entity => {
      const questions = this.generateQuestionsForEntity(entity);
      const intent = this.classifyIntent(entity, questions);
      
      intents.push({
        query: entity.text,
        intent,
        entities: [entity.text],
        questions,
        context: entity.context
      });
    });
    
    return intents;
  }

  private generateQuestionsForEntity(entity: NamedEntity): string[] {
    const questions: string[] = [];
    
    switch (entity.label) {
      case 'SERVICE':
        questions.push(
          `What is ${entity.text}?`,
          `How does ${entity.text} work?`,
          `Why choose ${entity.text}?`,
          `What are the benefits of ${entity.text}?`
        );
        break;
      case 'LOCATION':
        questions.push(
          `Where is ${entity.text}?`,
          `What services are available in ${entity.text}?`,
          `How to find ${entity.text}?`,
          `What are the best ${entity.text} services?`
        );
        break;
      case 'PERSON':
        questions.push(
          `Who is ${entity.text}?`,
          `What does ${entity.text} do?`,
          `How to contact ${entity.text}?`,
          `What are ${entity.text}'s qualifications?`
        );
        break;
      case 'ORG':
        questions.push(
          `What is ${entity.text}?`,
          `What services does ${entity.text} offer?`,
          `How to contact ${entity.text}?`,
          `What makes ${entity.text} different?`
        );
        break;
    }
    
    return questions;
  }

  private classifyIntent(entity: NamedEntity, questions: string[]): 'informational' | 'navigational' | 'transactional' | 'commercial' {
    if (entity.label === 'SERVICE' && questions.some(q => q.includes('how to') || q.includes('what is'))) {
      return 'informational';
    }
    
    if (entity.label === 'LOCATION' && questions.some(q => q.includes('where'))) {
      return 'navigational';
    }
    
    if (entity.label === 'SERVICE' && questions.some(q => q.includes('choose') || q.includes('benefits'))) {
      return 'commercial';
    }
    
    if (questions.some(q => q.includes('contact') || q.includes('how to'))) {
      return 'transactional';
    }
    
    return 'informational';
  }

  // Information Gap Analysis
  identifyInformationGaps(content: string, entities: NamedEntity[]): InformationGap[] {
    const gaps: InformationGap[] = [];
    
    entities.forEach(entity => {
      const missingInfo = this.findMissingInformation(content, entity);
      if (missingInfo.length > 0) {
        gaps.push({
          topic: entity.text,
          missingInformation: missingInfo,
          priority: this.calculateGapPriority(entity, missingInfo),
          suggestedContent: this.suggestContentForGap(entity, missingInfo),
          entities: [entity.text]
        });
      }
    });
    
    return gaps;
  }

  private findMissingInformation(content: string, entity: NamedEntity): string[] {
    const missing: string[] = [];
    const contentLower = content.toLowerCase();
    
    // Check for common information types based on entity label
    switch (entity.label) {
      case 'SERVICE':
        if (!contentLower.includes('how') && !contentLower.includes('process')) {
          missing.push('process explanation');
        }
        if (!contentLower.includes('benefit') && !contentLower.includes('advantage')) {
          missing.push('benefits and advantages');
        }
        if (!contentLower.includes('cost') && !contentLower.includes('price')) {
          missing.push('pricing information');
        }
        break;
      case 'LOCATION':
        if (!contentLower.includes('address') && !contentLower.includes('location')) {
          missing.push('specific address');
        }
        if (!contentLower.includes('service') && !contentLower.includes('available')) {
          missing.push('available services');
        }
        if (!contentLower.includes('contact') && !contentLower.includes('phone')) {
          missing.push('contact information');
        }
        break;
      case 'PERSON':
        if (!contentLower.includes('qualification') && !contentLower.includes('experience')) {
          missing.push('qualifications and experience');
        }
        if (!contentLower.includes('specializ') && !contentLower.includes('expertise')) {
          missing.push('specialization areas');
        }
        break;
    }
    
    return missing;
  }

  private calculateGapPriority(entity: NamedEntity, missingInfo: string[]): 'high' | 'medium' | 'low' {
    const highPriorityKeywords = ['process', 'benefit', 'cost', 'contact', 'address'];
    const hasHighPriority = missingInfo.some(info => 
      highPriorityKeywords.some(keyword => info.includes(keyword))
    );
    
    if (hasHighPriority) return 'high';
    if (missingInfo.length > 2) return 'medium';
    return 'low';
  }

  private suggestContentForGap(entity: NamedEntity, missingInfo: string[]): string[] {
    const suggestions: string[] = [];
    
    missingInfo.forEach(info => {
      switch (info) {
        case 'process explanation':
          suggestions.push(`Add a step-by-step process for ${entity.text}`);
          break;
        case 'benefits and advantages':
          suggestions.push(`Include benefits and advantages of ${entity.text}`);
          break;
        case 'pricing information':
          suggestions.push(`Add pricing details for ${entity.text}`);
          break;
        case 'specific address':
          suggestions.push(`Include specific address for ${entity.text}`);
          break;
        case 'available services':
          suggestions.push(`List available services in ${entity.text}`);
          break;
        case 'contact information':
          suggestions.push(`Add contact details for ${entity.text}`);
          break;
        case 'qualifications and experience':
          suggestions.push(`Include qualifications and experience for ${entity.text}`);
          break;
        case 'specialization areas':
          suggestions.push(`Add specialization areas for ${entity.text}`);
          break;
      }
    });
    
    return suggestions;
  }

  // Entity Connection Analysis
  analyzeEntityConnections(entities: NamedEntity[]): Map<string, string[]> {
    const connections = new Map<string, string[]>();
    
    entities.forEach(entity => {
      const relatedEntities = entities
        .filter(e => e.text !== entity.text)
        .filter(e => this.areEntitiesRelated(entity, e))
        .map(e => e.text);
      
      if (relatedEntities.length > 0) {
        connections.set(entity.text, relatedEntities);
      }
    });
    
    return connections;
  }

  private areEntitiesRelated(entity1: NamedEntity, entity2: NamedEntity): boolean {
    // Simple relatedness check based on context overlap
    const context1 = entity1.context.toLowerCase();
    const context2 = entity2.context.toLowerCase();
    
    const commonWords = context1.split(' ')
      .filter(word => context2.includes(word))
      .filter(word => word.length > 3);
    
    return commonWords.length > 2;
  }

  // Get all stored data
  getAllEntities(): NamedEntity[] {
    return Array.from(this.entities.values());
  }

  getAllNGrams(): NGram[] {
    return Array.from(this.ngrams.values());
  }

  getAllSkipGrams(): SkipGram[] {
    return Array.from(this.skipGrams.values());
  }

  getEntityLinks(entityText: string): EntityLink[] {
    return this.entityLinks.get(entityText.toLowerCase()) || [];
  }
}

// Export the main engine instance
export const entityOptimizationEngine = new EntityOptimizationEngine();