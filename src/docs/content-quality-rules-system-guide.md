# نظام قواعد الجودة الـ14 - دليل المطورين

## نظرة عامة على النظام

نظام قواعد الجودة الـ14 هو إطار عمل شامل لضمان جودة المحتوى في جميع المقالات والخدمات. تم تطويره خصيصاً لخدمات التنظيف ومكافحة الآفات في السعودية.

## قواعد الجودة الـ14

### 1. Be Certain (كن متأكداً)
**الوصف**: استخدم لغة واضحة ومحددة بدلاً من التعبيرات الغامضة.

**مثال صحيح**:
```markdown
تنظيف السجاد بالبخار يقتل 99.9% من البكتيريا والجراثيم.
```

**مثال خاطئ**:
```markdown
تنظيف السجاد بالبخار قد يساعد في قتل بعض البكتيريا.
```

**التطبيق في الكود**:
```typescript
// في ملف content-quality-rules.ts
export const qualityRules = {
  beCertain: {
    description: "استخدم لغة واضحة ومحددة",
    examples: {
      good: "يقتل 99.9% من البكتيريا",
      bad: "قد يساعد في قتل بعض البكتيريا"
    },
    validation: (text: string) => {
      const vagueWords = ['قد', 'ربما', 'أحياناً', 'بعض', 'قليل'];
      return !vagueWords.some(word => text.includes(word));
    }
  }
};
```

### 2. Use Numeric Values (استخدم القيم الرقمية)
**الوصف**: استخدم الأرقام والإحصائيات المحددة لتعزيز المصداقية.

**مثال صحيح**:
```markdown
تنظيف المكيفات كل 3 أشهر يطيل عمرها بنسبة 40%.
```

**مثال خاطئ**:
```markdown
تنظيف المكيفات بانتظام يطيل عمرها.
```

**التطبيق في الكود**:
```typescript
export const numericValues = {
  description: "استخدم الأرقام والإحصائيات المحددة",
  patterns: [
    /\d+%/g,  // النسب المئوية
    /\d+\s*ريال/g,  // الأسعار
    /\d+\s*ساعة/g,  // الوقت
    /\d+\s*مرة/g  // التكرار
  ],
  validation: (text: string) => {
    return this.patterns.some(pattern => pattern.test(text));
  }
};
```

### 3. Examples After Plural Nouns (أمثلة بعد الأسماء الجمع)
**الوصف**: قدم أمثلة محددة بعد ذكر الأسماء الجمع.

**مثال صحيح**:
```markdown
أدوات التنظيف (الإسفنج، المنظفات، الفرشاة) ضرورية للتنظيف الفعال.
```

**مثال خاطئ**:
```markdown
أدوات التنظيف ضرورية للتنظيف الفعال.
```

### 4. Immediate Answers (إجابات فورية)
**الوصف**: قدم الإجابة مباشرة في بداية الفقرة.

**مثال صحيح**:
```markdown
**الجواب**: يجب تنظيف المكيفات كل 3 أشهر للحفاظ على كفاءتها.
```

**مثال خاطئ**:
```markdown
هناك عدة عوامل تؤثر على تكرار تنظيف المكيفات، ومن بينها...
```

### 5. Proper Word Sequence (ترتيب الكلمات الصحيح)
**الوصف**: استخدم ترتيب الكلمات المنطقي والواضح.

**مثال صحيح**:
```markdown
تنظيف المكيفات بالبخار عالي الضغط يزيل الأوساخ العميقة.
```

**مثال خاطئ**:
```markdown
بالبخار عالي الضغط تنظيف المكيفات يزيل الأوساخ العميقة.
```

### 6. Cut the Fluff (اقطع الحشو)
**الوصف**: تجنب الكلمات والعبارات غير الضرورية.

**مثال صحيح**:
```markdown
تنظيف المكيفات مهم.
```

**مثال خاطئ**:
```markdown
في الواقع، تنظيف المكيفات يعتبر من الأمور المهمة جداً.
```

### 7. Direct First Sentences (الجمل الأولى المباشرة)
**الوصف**: ابدأ الفقرات بجمل مباشرة وواضحة.

**مثال صحيح**:
```markdown
تنظيف المكيفات يطيل عمرها.
```

**مثال خاطئ**:
```markdown
عندما نتحدث عن صيانة المكيفات، فإن تنظيفها يطيل عمرها.
```

### 8. Bold Answers (الإجابات بالخط العريض)
**الوصف**: استخدم الخط العريض للإجابات المهمة.

**مثال صحيح**:
```markdown
**الجواب**: تنظيف المكيفات كل 3 أشهر ضروري.
```

### 9. Active Voice (الصوت الفعال)
**الوصف**: استخدم الصوت الفعال بدلاً من المبني للمجهول.

**مثال صحيح**:
```markdown
نحن ننظف المكيفات بانتظام.
```

**مثال خاطئ**:
```markdown
يتم تنظيف المكيفات بانتظام.
```

### 10. Concrete Nouns (الأسماء الملموسة)
**الوصف**: استخدم أسماء ملموسة بدلاً من المجردة.

**مثال صحيح**:
```markdown
تنظيف المكيفات يزيل الغبار والجراثيم.
```

**مثال خاطئ**:
```markdown
تنظيف المكيفات يحسن الجودة.
```

### 11. Short Sentences (الجمل القصيرة)
**الوصف**: استخدم جمل قصيرة وواضحة.

**مثال صحيح**:
```markdown
تنظيف المكيفات مهم. يطيل عمرها. يحسن كفاءتها.
```

**مثال خاطئ**:
```markdown
تنظيف المكيفات مهم لأنه يطيل عمرها ويحسن كفاءتها ويقلل استهلاك الطاقة.
```

### 12. One Idea Per Paragraph (فكرة واحدة لكل فقرة)
**الوصف**: ركز على فكرة واحدة في كل فقرة.

**مثال صحيح**:
```markdown
تنظيف المكيفات يطيل عمرها.

تنظيف المكيفات يحسن كفاءتها.
```

### 13. Logical Flow (التدفق المنطقي)
**الوصف**: نظم المحتوى بترتيب منطقي.

**مثال صحيح**:
```markdown
1. أهمية تنظيف المكيفات
2. طرق تنظيف المكيفات
3. نصائح للصيانة
```

### 14. Entity Optimization (تحسين الكيانات)
**الوصف**: استخدم الكلمات المفتاحية والكيانات المهمة.

**مثال صحيح**:
```markdown
تنظيف مكيفات الرياض، شركة تنظيف مكيفات جدة، صيانة مكيفات الدمام
```

## تطبيق القواعد في النظام

### 1. ملف قواعد الجودة
```typescript
// src/lib/content-quality-rules.ts
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
}

export const qualityRules: QualityRule[] = [
  {
    id: 'be-certain',
    name: 'Be Certain',
    description: 'استخدم لغة واضحة ومحددة',
    examples: {
      good: 'يقتل 99.9% من البكتيريا',
      bad: 'قد يساعد في قتل بعض البكتيريا'
    },
    validation: (text: string) => {
      const vagueWords = ['قد', 'ربما', 'أحياناً', 'بعض', 'قليل'];
      return !vagueWords.some(word => text.includes(word));
    },
    weight: 10
  },
  // ... باقي القواعد
];
```

### 2. مكون التحقق من الجودة
```typescript
// src/components/seo/ContentValidator.tsx
import { qualityRules } from '@/lib/content-quality-rules';

export const ContentValidator = ({ content }: { content: string }) => {
  const validateContent = (text: string) => {
    const results = qualityRules.map(rule => ({
      rule: rule.name,
      passed: rule.validation(text),
      weight: rule.weight
    }));
    
    const totalScore = results.reduce((sum, result) => 
      sum + (result.passed ? result.weight : 0), 0
    );
    
    const maxScore = qualityRules.reduce((sum, rule) => sum + rule.weight, 0);
    
    return {
      score: totalScore,
      maxScore,
      percentage: (totalScore / maxScore) * 100,
      results
    };
  };

  const validation = validateContent(content);
  
  return (
    <div className="content-validator">
      <h3>نتائج التحقق من الجودة</h3>
      <div className="score">
        النتيجة: {validation.percentage.toFixed(1)}%
      </div>
      <div className="rules">
        {validation.results.map((result, index) => (
          <div key={index} className={`rule ${result.passed ? 'passed' : 'failed'}`}>
            {result.rule}: {result.passed ? '✅' : '❌'}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 3. مولد المحتوى المحسن
```typescript
// src/lib/enhanced-content-generator.ts
import { qualityRules } from './content-quality-rules';

export class ContentGenerator {
  private rules = qualityRules;
  
  generateContent(topic: string, keywords: string[]): string {
    let content = this.createBaseContent(topic, keywords);
    
    // تطبيق القواعد
    content = this.applyQualityRules(content);
    
    return content;
  }
  
  private applyQualityRules(content: string): string {
    let improvedContent = content;
    
    // تطبيق قاعدة Be Certain
    improvedContent = this.makeContentCertain(improvedContent);
    
    // تطبيق قاعدة Numeric Values
    improvedContent = this.addNumericValues(improvedContent);
    
    // تطبيق قاعدة Examples After Plural Nouns
    improvedContent = this.addExamplesAfterPlurals(improvedContent);
    
    // ... تطبيق باقي القواعد
    
    return improvedContent;
  }
  
  private makeContentCertain(content: string): string {
    const vagueReplacements = {
      'قد': 'يجب',
      'ربما': 'بالتأكيد',
      'أحياناً': 'دائماً',
      'بعض': 'جميع',
      'قليل': 'كثير'
    };
    
    let result = content;
    Object.entries(vagueReplacements).forEach(([vague, certain]) => {
      result = result.replace(new RegExp(vague, 'g'), certain);
    });
    
    return result;
  }
  
  private addNumericValues(content: string): string {
    // إضافة إحصائيات وأرقام محددة
    const numericEnhancements = {
      'تنظيف المكيفات': 'تنظيف المكيفات كل 3 أشهر',
      'يطيل العمر': 'يطيل العمر بنسبة 40%',
      'يحسن الكفاءة': 'يحسن الكفاءة بنسبة 25%'
    };
    
    let result = content;
    Object.entries(numericEnhancements).forEach(([original, enhanced]) => {
      result = result.replace(original, enhanced);
    });
    
    return result;
  }
}
```

## دليل المطورين

### 1. إضافة قاعدة جودة جديدة
```typescript
// في ملف content-quality-rules.ts
export const newRule: QualityRule = {
  id: 'new-rule',
  name: 'New Rule',
  description: 'وصف القاعدة الجديدة',
  examples: {
    good: 'مثال صحيح',
    bad: 'مثال خاطئ'
  },
  validation: (text: string) => {
    // منطق التحقق
    return true;
  },
  weight: 5
};
```

### 2. تحديث مكون التحقق
```typescript
// إضافة القاعدة الجديدة إلى المصفوفة
export const qualityRules: QualityRule[] = [
  // ... القواعد الموجودة
  newRule
];
```

### 3. اختبار القواعد
```typescript
// src/tests/content-quality.test.ts
import { qualityRules } from '@/lib/content-quality-rules';

describe('Content Quality Rules', () => {
  test('Be Certain rule validation', () => {
    const goodText = 'تنظيف المكيفات يقتل 99.9% من البكتيريا';
    const badText = 'تنظيف المكيفات قد يساعد في قتل بعض البكتيريا';
    
    const beCertainRule = qualityRules.find(rule => rule.id === 'be-certain');
    
    expect(beCertainRule?.validation(goodText)).toBe(true);
    expect(beCertainRule?.validation(badText)).toBe(false);
  });
});
```

## أفضل الممارسات

### 1. تنظيم الملفات
```
src/
├── lib/
│   ├── content-quality-rules.ts
│   └── enhanced-content-generator.ts
├── components/
│   └── seo/
│       ├── ContentValidator.tsx
│       └── ContentOptimizer.tsx
└── tests/
    └── content-quality.test.ts
```

### 2. التوثيق
- وثق كل قاعدة جودة بوضوح
- قدم أمثلة صحيحة وخاطئة
- اشرح كيفية تطبيق كل قاعدة

### 3. الاختبار
- اختبر كل قاعدة جودة بشكل منفصل
- اختبر التكامل بين القواعد
- اختبر الأداء مع المحتوى الكبير

### 4. الصيانة
- راجع القواعد بانتظام
- حدث الأمثلة حسب الحاجة
- راقب أداء النظام

## الخلاصة

نظام قواعد الجودة الـ14 يوفر إطار عمل شامل لضمان جودة المحتوى. باتباع هذا الدليل، يمكن للمطورين:

1. فهم كل قاعدة جودة بوضوح
2. تطبيق القواعد في الكود
3. إضافة قواعد جديدة
4. اختبار وصيانة النظام

هذا النظام يضمن أن جميع المحتوى المنتج يلبي أعلى معايير الجودة والاحترافية.