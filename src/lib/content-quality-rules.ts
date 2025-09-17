// Content Quality Rules - 14 Core Instructions
// These rules are MANDATORY constraints, not suggestions
// For detailed documentation, see: src/docs/content-quality-rules-system-guide.md

export interface ContentQualityRules {
  // CRITICAL RULES (Must implement first)
  rule1_BeCertain: boolean; // Eliminate all opinion-based language
  rule2_UseNumericValues: boolean; // Always include specific numbers
  rule3_ExamplesAfterPluralNouns: boolean; // Never leave plural nouns unqualified
  rule4_ImmediateAnswers: boolean; // Provide direct responses without delay
  
  // STRUCTURAL RULES (Implement for clarity)
  rule5_ProperWordSequence: boolean; // Main information first
  rule6_CutTheFluff: boolean; // Eliminate unnecessary words
  rule7_DirectFirstSentences: boolean; // Address headings immediately
  rule8_BoldAnswers: boolean; // Emphasize key information, not search terms
  
  // ADDITIONAL RULES
  rule9_ActiveVoice: boolean; // Use active voice consistently
  rule10_ConcreteNouns: boolean; // Replace abstract concepts with concrete terms
  rule11_ShortSentences: boolean; // Keep sentences under 20 words
  rule12_OneIdeaPerParagraph: boolean; // Single concept per paragraph
  rule13_LogicalFlow: boolean; // Present information in logical sequence
  rule14_EntityOptimization: boolean; // Optimize for semantic entities
}

// Individual Rule Interface for Validation
export interface QualityRule {
  id: string;
  name: string;
  description: string;
  examples: {
    good: string;
    bad: string;
  };
  validation: (text: string) => boolean;
  weight: number;
  category: 'critical' | 'structural' | 'additional';
}

export const MANDATORY_RULES: ContentQualityRules = {
  // CRITICAL RULES
  rule1_BeCertain: true,
  rule2_UseNumericValues: true,
  rule3_ExamplesAfterPluralNouns: true,
  rule4_ImmediateAnswers: true,
  
  // STRUCTURAL RULES
  rule5_ProperWordSequence: true,
  rule6_CutTheFluff: true,
  rule7_DirectFirstSentences: true,
  rule8_BoldAnswers: true,
  
  // ADDITIONAL RULES
  rule9_ActiveVoice: true,
  rule10_ConcreteNouns: true,
  rule11_ShortSentences: true,
  rule12_OneIdeaPerParagraph: true,
  rule13_LogicalFlow: true,
  rule14_EntityOptimization: true
};

// Individual Quality Rules with Validation Logic
export const QUALITY_RULES: QualityRule[] = [
  {
    id: 'be-certain',
    name: 'Be Certain',
    description: 'استخدم لغة واضحة ومحددة بدلاً من التعبيرات الغامضة',
    examples: {
      good: 'تنظيف السجاد بالبخار يقتل 99.9% من البكتيريا والجراثيم',
      bad: 'تنظيف السجاد بالبخار قد يساعد في قتل بعض البكتيريا'
    },
    validation: (text: string) => {
      const vagueWords = ['قد', 'ربما', 'أحياناً', 'بعض', 'قليل', 'ممكن', 'يحتمل'];
      return !vagueWords.some(word => text.includes(word));
    },
    weight: 10,
    category: 'critical'
  },
  {
    id: 'use-numeric-values',
    name: 'Use Numeric Values',
    description: 'استخدم الأرقام والإحصائيات المحددة لتعزيز المصداقية',
    examples: {
      good: 'تنظيف المكيفات كل 3 أشهر يطيل عمرها بنسبة 40%',
      bad: 'تنظيف المكيفات بانتظام يطيل عمرها'
    },
    validation: (text: string) => {
      const numericPatterns = [
        /\d+%/g,  // النسب المئوية
        /\d+\s*ريال/g,  // الأسعار
        /\d+\s*ساعة/g,  // الوقت
        /\d+\s*مرة/g,  // التكرار
        /\d+\s*دقيقة/g,  // الدقائق
        /\d+\s*سنة/g  // السنوات
      ];
      return numericPatterns.some(pattern => pattern.test(text));
    },
    weight: 10,
    category: 'critical'
  },
  {
    id: 'examples-after-plural-nouns',
    name: 'Examples After Plural Nouns',
    description: 'قدم أمثلة محددة بعد ذكر الأسماء الجمع',
    examples: {
      good: 'أدوات التنظيف (الإسفنج، المنظفات، الفرشاة) ضرورية للتنظيف الفعال',
      bad: 'أدوات التنظيف ضرورية للتنظيف الفعال'
    },
    validation: (text: string) => {
      const pluralNouns = ['أدوات', 'طرق', 'أنواع', 'مواد', 'أجهزة', 'خدمات'];
      const hasExamples = /\([^)]+\)/.test(text);
      return !pluralNouns.some(noun => text.includes(noun) && !hasExamples);
    },
    weight: 8,
    category: 'critical'
  },
  {
    id: 'immediate-answers',
    name: 'Immediate Answers',
    description: 'قدم الإجابة مباشرة في بداية الفقرة',
    examples: {
      good: '**الجواب**: يجب تنظيف المكيفات كل 3 أشهر للحفاظ على كفاءتها',
      bad: 'هناك عدة عوامل تؤثر على تكرار تنظيف المكيفات، ومن بينها...'
    },
    validation: (text: string) => {
      return text.includes('**الجواب**:') || text.includes('**الإجابة**:');
    },
    weight: 8,
    category: 'critical'
  },
  {
    id: 'proper-word-sequence',
    name: 'Proper Word Sequence',
    description: 'استخدم ترتيب الكلمات المنطقي والواضح',
    examples: {
      good: 'تنظيف المكيفات بالبخار عالي الضغط يزيل الأوساخ العميقة',
      bad: 'بالبخار عالي الضغط تنظيف المكيفات يزيل الأوساخ العميقة'
    },
    validation: (text: string) => {
      // Check for proper Arabic sentence structure
      const sentences = text.split(/[.!?]/);
      return sentences.every(sentence => {
        const words = sentence.trim().split(/\s+/);
        return words.length > 0 && words[0].length > 0;
      });
    },
    weight: 6,
    category: 'structural'
  },
  {
    id: 'cut-the-fluff',
    name: 'Cut the Fluff',
    description: 'تجنب الكلمات والعبارات غير الضرورية',
    examples: {
      good: 'تنظيف المكيفات مهم',
      bad: 'في الواقع، تنظيف المكيفات يعتبر من الأمور المهمة جداً'
    },
    validation: (text: string) => {
      const fluffWords = ['في الواقع', 'يعتبر', 'من الأمور', 'جداً', 'بشكل كبير'];
      return !fluffWords.some(word => text.includes(word));
    },
    weight: 6,
    category: 'structural'
  },
  {
    id: 'direct-first-sentences',
    name: 'Direct First Sentences',
    description: 'ابدأ الفقرات بجمل مباشرة وواضحة',
    examples: {
      good: 'تنظيف المكيفات يطيل عمرها',
      bad: 'عندما نتحدث عن صيانة المكيفات، فإن تنظيفها يطيل عمرها'
    },
    validation: (text: string) => {
      const paragraphs = text.split(/\n\s*\n/);
      return paragraphs.every(paragraph => {
        const firstSentence = paragraph.split(/[.!?]/)[0];
        return firstSentence.length < 50; // Short, direct sentences
      });
    },
    weight: 6,
    category: 'structural'
  },
  {
    id: 'bold-answers',
    name: 'Bold Answers',
    description: 'استخدم الخط العريض للإجابات المهمة',
    examples: {
      good: '**الجواب**: تنظيف المكيفات كل 3 أشهر ضروري',
      bad: 'الجواب: تنظيف المكيفات كل 3 أشهر ضروري'
    },
    validation: (text: string) => {
      return text.includes('**') && text.includes('**');
    },
    weight: 6,
    category: 'structural'
  },
  {
    id: 'active-voice',
    name: 'Active Voice',
    description: 'استخدم الصوت الفعال بدلاً من المبني للمجهول',
    examples: {
      good: 'نحن ننظف المكيفات بانتظام',
      bad: 'يتم تنظيف المكيفات بانتظام'
    },
    validation: (text: string) => {
      const passivePatterns = ['يتم', 'تم', 'كان يتم', 'سوف يتم'];
      return !passivePatterns.some(pattern => text.includes(pattern));
    },
    weight: 4,
    category: 'additional'
  },
  {
    id: 'concrete-nouns',
    name: 'Concrete Nouns',
    description: 'استخدم أسماء ملموسة بدلاً من المجردة',
    examples: {
      good: 'تنظيف المكيفات يزيل الغبار والجراثيم',
      bad: 'تنظيف المكيفات يحسن الجودة'
    },
    validation: (text: string) => {
      const abstractWords = ['الجودة', 'الكفاءة', 'الأداء', 'النتائج'];
      const concreteWords = ['الغبار', 'الجراثيم', 'الأوساخ', 'البكتيريا'];
      return concreteWords.some(word => text.includes(word));
    },
    weight: 4,
    category: 'additional'
  },
  {
    id: 'short-sentences',
    name: 'Short Sentences',
    description: 'استخدم جمل قصيرة وواضحة',
    examples: {
      good: 'تنظيف المكيفات مهم. يطيل عمرها. يحسن كفاءتها',
      bad: 'تنظيف المكيفات مهم لأنه يطيل عمرها ويحسن كفاءتها ويقلل استهلاك الطاقة'
    },
    validation: (text: string) => {
      const sentences = text.split(/[.!?]/);
      return sentences.every(sentence => {
        const words = sentence.trim().split(/\s+/);
        return words.length <= 20; // Short sentences
      });
    },
    weight: 4,
    category: 'additional'
  },
  {
    id: 'one-idea-per-paragraph',
    name: 'One Idea Per Paragraph',
    description: 'ركز على فكرة واحدة في كل فقرة',
    examples: {
      good: 'تنظيف المكيفات يطيل عمرها.\n\nتنظيف المكيفات يحسن كفاءتها',
      bad: 'تنظيف المكيفات يطيل عمرها ويحسن كفاءتها ويقلل استهلاك الطاقة'
    },
    validation: (text: string) => {
      const paragraphs = text.split(/\n\s*\n/);
      return paragraphs.length > 1; // Multiple paragraphs
    },
    weight: 4,
    category: 'additional'
  },
  {
    id: 'logical-flow',
    name: 'Logical Flow',
    description: 'نظم المحتوى بترتيب منطقي',
    examples: {
      good: '1. أهمية تنظيف المكيفات\n2. طرق تنظيف المكيفات\n3. نصائح للصيانة',
      bad: 'طرق تنظيف المكيفات\nنصائح للصيانة\nأهمية تنظيف المكيفات'
    },
    validation: (text: string) => {
      const logicalMarkers = ['أولاً', 'ثانياً', 'ثالثاً', '1.', '2.', '3.'];
      return logicalMarkers.some(marker => text.includes(marker));
    },
    weight: 4,
    category: 'additional'
  },
  {
    id: 'entity-optimization',
    name: 'Entity Optimization',
    description: 'استخدم الكلمات المفتاحية والكيانات المهمة',
    examples: {
      good: 'تنظيف مكيفات الرياض، شركة تنظيف مكيفات جدة، صيانة مكيفات الدمام',
      bad: 'تنظيف المكيفات في المدن المختلفة'
    },
    validation: (text: string) => {
      const entities = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة', 'شركة', 'خدمة'];
      return entities.some(entity => text.includes(entity));
    },
    weight: 4,
    category: 'additional'
  }
];

// Validation Commands
export const VALIDATION_COMMANDS = {
  FACT_CHECK: 'Verify all statements are definitive, not opinion-based',
  NUMBER_SCAN: 'Ensure specific quantities replace vague terms',
  EXAMPLE_VERIFY: 'Confirm all plural nouns have concrete examples',
  STRUCTURE_AUDIT: 'Check word sequence prioritizes main information',
  ANSWER_SPEED: 'Validate immediate response to questions/headings'
};

// 8-Point Quality Checklist
export const QUALITY_CHECKLIST = [
  'All statements are factual and definitive',
  'Specific numbers replace vague terms',
  'Plural nouns have concrete examples',
  'Main information appears first',
  'Unnecessary words eliminated',
  'Headings addressed immediately',
  'Key information emphasized with bold',
  'Immediate answers provided'
];

// 8 Common Mistakes to Eliminate
export const COMMON_MISTAKES = [
  'Opinion-based language ("might be", "could be", "seems to")',
  'Vague quantities ("several", "many", "some")',
  'Unqualified plural nouns ("methods", "techniques", "ways")',
  'Buried main information',
  'Unnecessary filler words',
  'Delayed heading responses',
  'Emphasizing search terms instead of answers',
  'Indirect responses to questions'
];

// Content Quality Protocol
export const CONTENT_QUALITY_PROTOCOL = {
  PRE_WRITING_ANALYSIS: [
    'Identify topic context',
    'Identify relevant entities',
    'Choose appropriate verbs',
    'Plan numeric values',
    'Plan concrete examples'
  ],
  
  CONTENT_GENERATION: [
    'Apply all 14 rules simultaneously',
    'Use active voice',
    'Include specific numbers',
    'Provide concrete examples',
    'Structure main information first'
  ],
  
  POST_WRITING_VALIDATION: [
    'Run 8-point quality checklist',
    'Execute validation commands',
    'Eliminate common mistakes',
    'Verify rule compliance'
  ]
};

// Example Transformations
export const EXAMPLE_TRANSFORMATIONS = {
  BEFORE: "There are several ways to improve your website's performance and you should consider these methods...",
  AFTER: "Website performance improves through 5 proven methods: optimizing images, minimizing HTTP requests, enabling browser caching, reducing server response time, and compressing CSS files."
};

// Cleaning Services Specific Rules
export const CLEANING_SERVICES_RULES = {
  NUMERIC_VALUES: {
    'several methods': '5 proven methods',
    'many benefits': '12 key benefits',
    'various types': '8 specific types',
    'different tools': '15 essential tools',
    'multiple steps': '7 detailed steps'
  },
  
  CONCRETE_EXAMPLES: {
    'cleaning methods': 'steam cleaning, dry cleaning, wet cleaning, vacuum cleaning, and sanitizing',
    'cleaning tools': 'vacuum cleaner, microfiber cloths, steam mop, scrub brushes, and disinfectant spray',
    'cleaning areas': 'kitchen, bathroom, living room, bedroom, and office',
    'cleaning products': 'all-purpose cleaner, glass cleaner, floor cleaner, disinfectant, and degreaser'
  },
  
  DEFINITIVE_LANGUAGE: {
    'might be effective': 'is 95% effective',
    'could help': 'reduces bacteria by 99.9%',
    'seems to work': 'eliminates 100% of stains',
    'may improve': 'increases efficiency by 40%'
  }
};

// Content Quality Validator Class
export class ContentQualityValidator {
  private rules: QualityRule[] = QUALITY_RULES;

  validateContent(content: string): {
    score: number;
    maxScore: number;
    percentage: number;
    results: Array<{
      rule: string;
      passed: boolean;
      weight: number;
      category: string;
    }>;
    recommendations: string[];
  } {
    const results = this.rules.map(rule => ({
      rule: rule.name,
      passed: rule.validation(content),
      weight: rule.weight,
      category: rule.category
    }));

    const totalScore = results.reduce((sum, result) => 
      sum + (result.passed ? result.weight : 0), 0
    );
    
    const maxScore = this.rules.reduce((sum, rule) => sum + rule.weight, 0);
    
    const recommendations = this.generateRecommendations(results, content);

    return {
      score: totalScore,
      maxScore,
      percentage: (totalScore / maxScore) * 100,
      results,
      recommendations
    };
  }

  private generateRecommendations(results: any[], content: string): string[] {
    const recommendations: string[] = [];
    
    results.forEach(result => {
      if (!result.passed) {
        const rule = this.rules.find(r => r.name === result.rule);
        if (rule) {
          recommendations.push(`${rule.name}: ${rule.description}`);
        }
      }
    });

    return recommendations;
  }

  getRuleById(id: string): QualityRule | undefined {
    return this.rules.find(rule => rule.id === id);
  }

  getRulesByCategory(category: 'critical' | 'structural' | 'additional'): QualityRule[] {
    return this.rules.filter(rule => rule.category === category);
  }
}

// Export default with all utilities
export default {
  MANDATORY_RULES,
  QUALITY_RULES,
  VALIDATION_COMMANDS,
  QUALITY_CHECKLIST,
  COMMON_MISTAKES,
  CONTENT_QUALITY_PROTOCOL,
  EXAMPLE_TRANSFORMATIONS,
  CLEANING_SERVICES_RULES,
  ContentQualityValidator
};