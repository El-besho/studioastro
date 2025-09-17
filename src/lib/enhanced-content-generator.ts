import { QUALITY_RULES, ContentQualityValidator } from './content-quality-rules';

export interface ContentGenerationOptions {
  topic: string;
  keywords: string[];
  targetWordCount: number;
  includeExamples: boolean;
  includeStatistics: boolean;
  language: 'ar' | 'en';
  qualityThreshold: number;
}

export interface GeneratedContent {
  content: string;
  qualityScore: number;
  wordCount: number;
  appliedRules: string[];
  suggestions: string[];
}

export class EnhancedContentGenerator {
  private validator: ContentQualityValidator;
  private rules = QUALITY_RULES;

  constructor() {
    this.validator = new ContentQualityValidator();
  }

  generateContent(options: ContentGenerationOptions): GeneratedContent {
    let content = this.createBaseContent(options);
    content = this.applyAllQualityRules(content, options);
    
    const validation = this.validator.validateContent(content);
    
    if (validation.percentage < options.qualityThreshold) {
      content = this.improveContent(content, validation.recommendations);
    }

    return {
      content,
      qualityScore: validation.percentage,
      wordCount: this.countWords(content),
      appliedRules: this.getAppliedRules(content),
      suggestions: validation.recommendations
    };
  }

  private createBaseContent(options: ContentGenerationOptions): string {
    const { topic, keywords, targetWordCount } = options;
    
    let content = `# ${topic}\n\n`;
    content += `## لماذا ${topic} مهم؟\n\n`;
    content += `**الجواب**: ${topic} ضروري للحفاظ على الصحة والنظافة.\n\n`;
    content += this.generateMainSections(topic, keywords, targetWordCount);
    content += this.generateFAQSection(topic);
    
    return content;
  }

  private applyAllQualityRules(content: string, options: ContentGenerationOptions): string {
    let improvedContent = content;

    improvedContent = this.makeContentCertain(improvedContent);
    improvedContent = this.addNumericValues(improvedContent, options);
    improvedContent = this.addExamplesAfterPlurals(improvedContent);
    improvedContent = this.ensureImmediateAnswers(improvedContent);
    improvedContent = this.fixWordSequence(improvedContent);
    improvedContent = this.removeFluff(improvedContent);
    improvedContent = this.makeFirstSentencesDirect(improvedContent);
    improvedContent = this.boldImportantAnswers(improvedContent);
    improvedContent = this.convertToActiveVoice(improvedContent);
    improvedContent = this.useConcreteNouns(improvedContent);
    improvedContent = this.shortenSentences(improvedContent);
    improvedContent = this.ensureOneIdeaPerParagraph(improvedContent);
    improvedContent = this.ensureLogicalFlow(improvedContent);
    improvedContent = this.optimizeEntities(improvedContent, options.keywords);

    return improvedContent;
  }

  private makeContentCertain(content: string): string {
    const vagueReplacements = {
      'قد': 'يجب',
      'ربما': 'بالتأكيد',
      'أحياناً': 'دائماً',
      'بعض': 'جميع',
      'قليل': 'كثير',
      'ممكن': 'مؤكد',
      'يحتمل': 'يضمن'
    };
    
    let result = content;
    Object.entries(vagueReplacements).forEach(([vague, certain]) => {
      result = result.replace(new RegExp(vague, 'g'), certain);
    });
    
    return result;
  }

  private addNumericValues(content: string, options: ContentGenerationOptions): string {
    const numericEnhancements = {
      'تنظيف المكيفات': 'تنظيف المكيفات كل 3 أشهر',
      'يطيل العمر': 'يطيل العمر بنسبة 40%',
      'يحسن الكفاءة': 'يحسن الكفاءة بنسبة 25%',
      'يقلل الاستهلاك': 'يقلل الاستهلاك بنسبة 30%',
      'أدوات التنظيف': '15 أداة تنظيف أساسية',
      'طرق التنظيف': '8 طرق تنظيف فعالة',
      'أنواع البقع': '12 نوع بقع شائع',
      'مواد التنظيف': '20 مادة تنظيف آمنة'
    };
    
    let result = content;
    Object.entries(numericEnhancements).forEach(([original, enhanced]) => {
      result = result.replace(original, enhanced);
    });
    
    return result;
  }

  private addExamplesAfterPlurals(content: string): string {
    const pluralExamples = {
      'أدوات التنظيف': 'أدوات التنظيف (الإسفنج، المنظفات، الفرشاة، المكنسة، القفازات)',
      'طرق التنظيف': 'طرق التنظيف (البخار، الكيميائية، الطبيعية، الميكانيكية، الكهربائية)',
      'أنواع البقع': 'أنواع البقع (الدهون، الحبر، الطعام، الماء، الأوساخ)',
      'مواد التنظيف': 'مواد التنظيف (الصابون، الكلور، الخل، البيكربونات، الكحول)',
      'أجهزة التنظيف': 'أجهزة التنظيف (المكنسة، البخار، الغسالة، المجفف، المكواة)'
    };
    
    let result = content;
    Object.entries(pluralExamples).forEach(([plural, withExamples]) => {
      result = result.replace(plural, withExamples);
    });
    
    return result;
  }

  private ensureImmediateAnswers(content: string): string {
    const questionPattern = /(.*\؟)/g;
    return content.replace(questionPattern, (match) => {
      if (!match.includes('**الجواب**:') && !match.includes('**الإجابة**:')) {
        return match + '\n\n**الجواب**: ' + this.generateAnswer(match);
      }
      return match;
    });
  }

  private fixWordSequence(content: string): string {
    const sentences = content.split(/[.!?]/);
    const fixedSentences = sentences.map(sentence => {
      const words = sentence.trim().split(/\s+/);
      if (words.length > 0 && words[0].length > 0) {
        return sentence.trim();
      }
      return sentence;
    });
    
    return fixedSentences.join('. ');
  }

  private removeFluff(content: string): string {
    const fluffWords = ['في الواقع', 'يعتبر', 'من الأمور', 'جداً', 'بشكل كبير', 'بالتأكيد'];
    let result = content;
    
    fluffWords.forEach(fluff => {
      result = result.replace(new RegExp(fluff, 'g'), '');
    });
    
    return result;
  }

  private makeFirstSentencesDirect(content: string): string {
    const paragraphs = content.split(/\n\s*\n/);
    const directParagraphs = paragraphs.map(paragraph => {
      const firstSentence = paragraph.split(/[.!?]/)[0];
      if (firstSentence.length > 50) {
        const words = firstSentence.split(/\s+/);
        if (words.length > 15) {
          const midPoint = Math.floor(words.length / 2);
          const firstPart = words.slice(0, midPoint).join(' ');
          const secondPart = words.slice(midPoint).join(' ');
          return firstPart + '. ' + secondPart + paragraph.substring(firstSentence.length);
        }
      }
      return paragraph;
    });
    
    return directParagraphs.join('\n\n');
  }

  private boldImportantAnswers(content: string): string {
    const importantPatterns = [
      /(الجواب:.*)/g,
      /(الإجابة:.*)/g,
      /(النتيجة:.*)/g,
      /(الخلاصة:.*)/g
    ];
    
    let result = content;
    importantPatterns.forEach(pattern => {
      result = result.replace(pattern, '**$1**');
    });
    
    return result;
  }

  private convertToActiveVoice(content: string): string {
    const passiveReplacements = {
      'يتم تنظيف': 'نحن ننظف',
      'تم تنظيف': 'نظفنا',
      'كان يتم تنظيف': 'كنا ننظف',
      'سوف يتم تنظيف': 'سوف ننظف'
    };
    
    let result = content;
    Object.entries(passiveReplacements).forEach(([passive, active]) => {
      result = result.replace(new RegExp(passive, 'g'), active);
    });
    
    return result;
  }

  private useConcreteNouns(content: string): string {
    const abstractToConcrete = {
      'الجودة': 'الغبار والجراثيم',
      'الكفاءة': 'الطاقة والوقت',
      'الأداء': 'السرعة والدقة',
      'النتائج': 'الأرقام والإحصائيات'
    };
    
    let result = content;
    Object.entries(abstractToConcrete).forEach(([abstract, concrete]) => {
      result = result.replace(abstract, concrete);
    });
    
    return result;
  }

  private shortenSentences(content: string): string {
    const sentences = content.split(/[.!?]/);
    const shortSentences = sentences.map(sentence => {
      const words = sentence.trim().split(/\s+/);
      if (words.length > 20) {
        const midPoint = Math.floor(words.length / 2);
        const firstPart = words.slice(0, midPoint).join(' ');
        const secondPart = words.slice(midPoint).join(' ');
        return firstPart + '. ' + secondPart;
      }
      return sentence;
    });
    
    return shortSentences.join('. ');
  }

  private ensureOneIdeaPerParagraph(content: string): string {
    const paragraphs = content.split(/\n\s*\n/);
    const singleIdeaParagraphs = paragraphs.map(paragraph => {
      const sentences = paragraph.split(/[.!?]/);
      if (sentences.length > 3) {
        const midPoint = Math.floor(sentences.length / 2);
        const firstPart = sentences.slice(0, midPoint).join('. ');
        const secondPart = sentences.slice(midPoint).join('. ');
        return firstPart + '.\n\n' + secondPart;
      }
      return paragraph;
    });
    
    return singleIdeaParagraphs.join('\n\n');
  }

  private ensureLogicalFlow(content: string): string {
    const sections = content.split(/\n\s*##/);
    let result = sections[0];
    
    for (let i = 1; i < sections.length; i++) {
      const section = sections[i];
      if (!section.includes('أولاً') && !section.includes('1.')) {
        result += '\n\n## ' + (i) + '. ' + section;
      } else {
        result += '\n\n##' + section;
      }
    }
    
    return result;
  }

  private optimizeEntities(content: string, keywords: string[]): string {
    const locations = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'];
    const services = ['شركة', 'خدمة', 'صيانة', 'تنظيف'];
    
    let result = content;
    
    locations.forEach(location => {
      if (keywords.some(keyword => keyword.includes(location))) {
        result = result.replace(/تنظيف/g, `تنظيف ${location}`);
      }
    });
    
    services.forEach(service => {
      if (keywords.some(keyword => keyword.includes(service))) {
        result = result.replace(/تنظيف/g, `${service} تنظيف`);
      }
    });
    
    return result;
  }

  private generateMainSections(topic: string, keywords: string[], targetWordCount: number): string {
    const sections = [
      'المواد والأدوات المطلوبة',
      'خطوات التنظيف الشامل',
      'نصائح للتنظيف الآمن',
      'حلول المشاكل الشائعة',
      'نصائح للصيانة الدورية'
    ];
    
    let content = '';
    sections.forEach((section, index) => {
      content += `## ${section}\n\n`;
      content += this.generateSectionContent(section, topic, keywords);
      content += '\n\n';
    });
    
    return content;
  }

  private generateFAQSection(topic: string): string {
    const faqs = [
      `كم مرة يجب تنظيف ${topic}؟`,
      `ما هي أفضل مواد التنظيف ل${topic}؟`,
      `كيف أزيل البقع الصعبة من ${topic}؟`,
      `هل يمكن تنظيف ${topic} بنفسي؟`,
      `ما هي أسعار خدمات تنظيف ${topic}؟`
    ];
    
    let content = '## الأسئلة الشائعة\n\n';
    
    faqs.forEach(faq => {
      content += `### ${faq}\n`;
      content += `**الجواب**: ${this.generateAnswer(faq)}\n\n`;
    });
    
    return content;
  }

  private generateSectionContent(section: string, topic: string, keywords: string[]): string {
    return `محتوى مفصل ل${section} في ${topic} مع التركيز على ${keywords.join('، ')}.`;
  }

  private generateAnswer(question: string): string {
    if (question.includes('كم مرة')) {
      return 'يُنصح بالتنظيف كل 3 أشهر للحصول على أفضل النتائج.';
    }
    if (question.includes('أفضل مواد')) {
      return 'المنظفات المتخصصة والصابون اللطيف والماء الدافئ.';
    }
    if (question.includes('البقع الصعبة')) {
      return 'حسب نوع البقعة - الطعام بالصابون، الحبر بالكحول، الدهون بمنظف متخصص.';
    }
    return 'يُنصح بالاستعانة بمتخصصين للحصول على أفضل النتائج.';
  }

  private improveContent(content: string, recommendations: string[]): string {
    let improvedContent = content;
    
    recommendations.forEach(recommendation => {
      if (recommendation.includes('Be Certain')) {
        improvedContent = this.makeContentCertain(improvedContent);
      }
      if (recommendation.includes('Use Numeric Values')) {
        improvedContent = this.addNumericValues(improvedContent, {
          topic: '',
          keywords: [],
          targetWordCount: 0,
          includeExamples: true,
          includeStatistics: true,
          language: 'ar',
          qualityThreshold: 80
        });
      }
    });
    
    return improvedContent;
  }

  private countWords(content: string): number {
    return content.split(/\s+/).length;
  }

  private getAppliedRules(content: string): string[] {
    const validation = this.validator.validateContent(content);
    return validation.results
      .filter((result: any) => result.passed)
      .map((result: any) => result.rule);
  }
}

export default EnhancedContentGenerator;