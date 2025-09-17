import { describe, test, expect } from 'vitest';
import { QUALITY_RULES, ContentQualityValidator } from '../lib/content-quality-rules';

describe('Content Quality Rules', () => {
  const validator = new ContentQualityValidator();

  describe('Be Certain Rule', () => {
    test('should pass with certain language', () => {
      const goodText = 'تنظيف المكيفات يقتل 99.9% من البكتيريا والجراثيم';
      const beCertainRule = QUALITY_RULES.find(rule => rule.id === 'be-certain');
      
      expect(beCertainRule?.validation(goodText)).toBe(true);
    });

    test('should fail with vague language', () => {
      const badText = 'تنظيف المكيفات قد يساعد في قتل بعض البكتيريا';
      const beCertainRule = QUALITY_RULES.find(rule => rule.id === 'be-certain');
      
      expect(beCertainRule?.validation(badText)).toBe(false);
    });
  });

  describe('Use Numeric Values Rule', () => {
    test('should pass with numeric values', () => {
      const goodText = 'تنظيف المكيفات كل 3 أشهر يطيل عمرها بنسبة 40%';
      const numericRule = QUALITY_RULES.find(rule => rule.id === 'use-numeric-values');
      
      expect(numericRule?.validation(goodText)).toBe(true);
    });

    test('should fail without numeric values', () => {
      const badText = 'تنظيف المكيفات بانتظام يطيل عمرها';
      const numericRule = QUALITY_RULES.find(rule => rule.id === 'use-numeric-values');
      
      expect(numericRule?.validation(badText)).toBe(false);
    });
  });

  describe('Examples After Plural Nouns Rule', () => {
    test('should pass with examples after plural nouns', () => {
      const goodText = 'أدوات التنظيف (الإسفنج، المنظفات، الفرشاة) ضرورية للتنظيف الفعال';
      const examplesRule = QUALITY_RULES.find(rule => rule.id === 'examples-after-plural-nouns');
      
      expect(examplesRule?.validation(goodText)).toBe(true);
    });

    test('should fail without examples after plural nouns', () => {
      const badText = 'أدوات التنظيف ضرورية للتنظيف الفعال';
      const examplesRule = QUALITY_RULES.find(rule => rule.id === 'examples-after-plural-nouns');
      
      expect(examplesRule?.validation(badText)).toBe(false);
    });
  });

  describe('Immediate Answers Rule', () => {
    test('should pass with immediate answers', () => {
      const goodText = '**الجواب**: يجب تنظيف المكيفات كل 3 أشهر للحفاظ على كفاءتها';
      const immediateRule = QUALITY_RULES.find(rule => rule.id === 'immediate-answers');
      
      expect(immediateRule?.validation(goodText)).toBe(true);
    });

    test('should fail without immediate answers', () => {
      const badText = 'هناك عدة عوامل تؤثر على تكرار تنظيف المكيفات، ومن بينها...';
      const immediateRule = QUALITY_RULES.find(rule => rule.id === 'immediate-answers');
      
      expect(immediateRule?.validation(badText)).toBe(false);
    });
  });

  describe('Active Voice Rule', () => {
    test('should pass with active voice', () => {
      const goodText = 'نحن ننظف المكيفات بانتظام';
      const activeVoiceRule = QUALITY_RULES.find(rule => rule.id === 'active-voice');
      
      expect(activeVoiceRule?.validation(goodText)).toBe(true);
    });

    test('should fail with passive voice', () => {
      const badText = 'يتم تنظيف المكيفات بانتظام';
      const activeVoiceRule = QUALITY_RULES.find(rule => rule.id === 'active-voice');
      
      expect(activeVoiceRule?.validation(badText)).toBe(false);
    });
  });

  describe('Concrete Nouns Rule', () => {
    test('should pass with concrete nouns', () => {
      const goodText = 'تنظيف المكيفات يزيل الغبار والجراثيم';
      const concreteRule = QUALITY_RULES.find(rule => rule.id === 'concrete-nouns');
      
      expect(concreteRule?.validation(goodText)).toBe(true);
    });

    test('should fail with abstract nouns', () => {
      const badText = 'تنظيف المكيفات يحسن الجودة';
      const concreteRule = QUALITY_RULES.find(rule => rule.id === 'concrete-nouns');
      
      expect(concreteRule?.validation(badText)).toBe(false);
    });
  });

  describe('Short Sentences Rule', () => {
    test('should pass with short sentences', () => {
      const goodText = 'تنظيف المكيفات مهم. يطيل عمرها. يحسن كفاءتها.';
      const shortRule = QUALITY_RULES.find(rule => rule.id === 'short-sentences');
      
      expect(shortRule?.validation(goodText)).toBe(true);
    });

    test('should fail with long sentences', () => {
      const badText = 'تنظيف المكيفات مهم لأنه يطيل عمرها ويحسن كفاءتها ويقلل استهلاك الطاقة ويحسن جودة الهواء الداخلي';
      const shortRule = QUALITY_RULES.find(rule => rule.id === 'short-sentences');
      
      expect(shortRule?.validation(badText)).toBe(false);
    });
  });

  describe('Bold Answers Rule', () => {
    test('should pass with bold answers', () => {
      const goodText = '**الجواب**: تنظيف المكيفات كل 3 أشهر ضروري';
      const boldRule = QUALITY_RULES.find(rule => rule.id === 'bold-answers');
      
      expect(boldRule?.validation(goodText)).toBe(true);
    });

    test('should fail without bold answers', () => {
      const badText = 'الجواب: تنظيف المكيفات كل 3 أشهر ضروري';
      const boldRule = QUALITY_RULES.find(rule => rule.id === 'bold-answers');
      
      expect(boldRule?.validation(badText)).toBe(false);
    });
  });

  describe('Entity Optimization Rule', () => {
    test('should pass with location entities', () => {
      const goodText = 'تنظيف مكيفات الرياض، شركة تنظيف مكيفات جدة، صيانة مكيفات الدمام';
      const entityRule = QUALITY_RULES.find(rule => rule.id === 'entity-optimization');
      
      expect(entityRule?.validation(goodText)).toBe(true);
    });

    test('should fail without entities', () => {
      const badText = 'تنظيف المكيفات في المدن المختلفة';
      const entityRule = QUALITY_RULES.find(rule => rule.id === 'entity-optimization');
      
      expect(entityRule?.validation(badText)).toBe(false);
    });
  });

  describe('Content Quality Validator', () => {
    test('should validate content and return results', () => {
      const content = `
        # تنظيف المكيفات
        
        **الجواب**: تنظيف المكيفات كل 3 أشهر ضروري للحفاظ على كفاءتها.
        
        أدوات التنظيف (الإسفنج، المنظفات، الفرشاة) ضرورية للتنظيف الفعال.
        
        تنظيف المكيفات يقتل 99.9% من البكتيريا والجراثيم.
        
        نحن ننظف المكيفات بانتظام.
        
        تنظيف المكيفات يزيل الغبار والجراثيم.
      `;

      const results = validator.validateContent(content);
      
      expect(results).toHaveProperty('score');
      expect(results).toHaveProperty('maxScore');
      expect(results).toHaveProperty('percentage');
      expect(results).toHaveProperty('results');
      expect(results).toHaveProperty('recommendations');
      
      expect(results.score).toBeGreaterThan(0);
      expect(results.maxScore).toBeGreaterThan(0);
      expect(results.percentage).toBeGreaterThan(0);
      expect(results.results).toHaveLength(QUALITY_RULES.length);
    });

    test('should generate recommendations for failed rules', () => {
      const content = 'تنظيف المكيفات قد يساعد في تحسين الجودة';
      
      const results = validator.validateContent(content);
      
      expect(results.recommendations).toBeInstanceOf(Array);
      expect(results.recommendations.length).toBeGreaterThan(0);
    });

    test('should get rules by category', () => {
      const criticalRules = validator.getRulesByCategory('critical');
      const structuralRules = validator.getRulesByCategory('structural');
      const additionalRules = validator.getRulesByCategory('additional');
      
      expect(criticalRules).toHaveLength(4);
      expect(structuralRules).toHaveLength(4);
      expect(additionalRules).toHaveLength(6);
    });

    test('should get rule by ID', () => {
      const beCertainRule = validator.getRuleById('be-certain');
      const nonExistentRule = validator.getRuleById('non-existent');
      
      expect(beCertainRule).toBeDefined();
      expect(beCertainRule?.id).toBe('be-certain');
      expect(nonExistentRule).toBeUndefined();
    });
  });

  describe('Rule Categories', () => {
    test('should have correct number of rules in each category', () => {
      const criticalRules = QUALITY_RULES.filter(rule => rule.category === 'critical');
      const structuralRules = QUALITY_RULES.filter(rule => rule.category === 'structural');
      const additionalRules = QUALITY_RULES.filter(rule => rule.category === 'additional');
      
      expect(criticalRules).toHaveLength(4);
      expect(structuralRules).toHaveLength(4);
      expect(additionalRules).toHaveLength(6);
    });

    test('should have correct weights for each category', () => {
      const criticalRules = QUALITY_RULES.filter(rule => rule.category === 'critical');
      const structuralRules = QUALITY_RULES.filter(rule => rule.category === 'structural');
      const additionalRules = QUALITY_RULES.filter(rule => rule.category === 'additional');
      
      // Critical rules should have higher weights
      criticalRules.forEach(rule => {
        expect(rule.weight).toBeGreaterThanOrEqual(8);
      });
      
      // Structural rules should have medium weights
      structuralRules.forEach(rule => {
        expect(rule.weight).toBeGreaterThanOrEqual(6);
        expect(rule.weight).toBeLessThan(8);
      });
      
      // Additional rules should have lower weights
      additionalRules.forEach(rule => {
        expect(rule.weight).toBeLessThan(6);
      });
    });
  });

  describe('Rule Examples', () => {
    test('should have valid examples for all rules', () => {
      QUALITY_RULES.forEach(rule => {
        expect(rule.examples).toBeDefined();
        expect(rule.examples.good).toBeDefined();
        expect(rule.examples.bad).toBeDefined();
        expect(rule.examples.good.length).toBeGreaterThan(0);
        expect(rule.examples.bad.length).toBeGreaterThan(0);
      });
    });

    test('should have working validation functions', () => {
      QUALITY_RULES.forEach(rule => {
        expect(typeof rule.validation).toBe('function');
        
        // Test that validation function works with examples
        const goodResult = rule.validation(rule.examples.good);
        const badResult = rule.validation(rule.examples.bad);
        
        expect(typeof goodResult).toBe('boolean');
        expect(typeof badResult).toBe('boolean');
      });
    });
  });
});