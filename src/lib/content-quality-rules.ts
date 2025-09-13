// Content Quality Rules - 14 Core Instructions
// These rules are MANDATORY constraints, not suggestions

export interface ContentQualityRules {
  // CRITICAL RULES (Must implement first)
  rule2_BeCertain: boolean; // Eliminate all opinion-based language
  rule4_UseNumericValues: boolean; // Always include specific numbers
  rule7_ExamplesAfterPluralNouns: boolean; // Never leave plural nouns unqualified
  rule12_ImmediateAnswers: boolean; // Provide direct responses without delay
  
  // STRUCTURAL RULES (Implement for clarity)
  rule1_ProperWordSequence: boolean; // Main information first
  rule3_CutTheFluff: boolean; // Eliminate unnecessary words
  rule9_DirectFirstSentences: boolean; // Address headings immediately
  rule13_BoldAnswers: boolean; // Emphasize key information, not search terms
  
  // ADDITIONAL RULES
  rule5_ActiveVoice: boolean; // Use active voice consistently
  rule6_ConcreteNouns: boolean; // Replace abstract concepts with concrete terms
  rule8_ShortSentences: boolean; // Keep sentences under 20 words
  rule10_OneIdeaPerParagraph: boolean; // Single concept per paragraph
  rule11_LogicalFlow: boolean; // Present information in logical sequence
  rule14_EntityOptimization: boolean; // Optimize for semantic entities
}

export const MANDATORY_RULES: ContentQualityRules = {
  // CRITICAL RULES
  rule2_BeCertain: true,
  rule4_UseNumericValues: true,
  rule7_ExamplesAfterPluralNouns: true,
  rule12_ImmediateAnswers: true,
  
  // STRUCTURAL RULES
  rule1_ProperWordSequence: true,
  rule3_CutTheFluff: true,
  rule9_DirectFirstSentences: true,
  rule13_BoldAnswers: true,
  
  // ADDITIONAL RULES
  rule5_ActiveVoice: true,
  rule6_ConcreteNouns: true,
  rule8_ShortSentences: true,
  rule10_OneIdeaPerParagraph: true,
  rule11_LogicalFlow: true,
  rule14_EntityOptimization: true
};

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

export default {
  MANDATORY_RULES,
  VALIDATION_COMMANDS,
  QUALITY_CHECKLIST,
  COMMON_MISTAKES,
  CONTENT_QUALITY_PROTOCOL,
  EXAMPLE_TRANSFORMATIONS,
  CLEANING_SERVICES_RULES
};