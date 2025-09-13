// Content Interlinking Strategy for Cleaning Services
// Implements strategic internal linking between cleaning content

export interface ContentNode {
  id: string;
  title: string;
  url: string;
  type: 'blog' | 'service' | 'guide' | 'faq';
  keywords: string[];
  priority: number;
  relatedNodes: string[];
  inboundLinks: string[];
  outboundLinks: string[];
}

export interface InterlinkingStrategy {
  hubPages: ContentNode[];
  clusterPages: ContentNode[];
  pillarPages: ContentNode[];
  supportingPages: ContentNode[];
}

// Content nodes for cleaning services
export const cleaningContentNodes: ContentNode[] = [
  // Hub Pages (Main service pages)
  {
    id: 'cleaning-services-hub',
    title: 'خدمات التنظيف الشاملة',
    url: '/services/cleaning-services',
    type: 'service',
    keywords: ['شركة تنظيف', 'تنظيف منازل', 'شركة نظافة', 'تنظيف شقق', 'تنظيف فلل'],
    priority: 10,
    relatedNodes: ['home-deep-cleaning', 'sofa-cleaning', 'carpet-cleaning', 'water-tank-cleaning', 'window-cleaning'],
    inboundLinks: [],
    outboundLinks: ['home-deep-cleaning', 'sofa-cleaning', 'carpet-cleaning', 'water-tank-cleaning', 'window-cleaning', 'ultimate-cleaning-guide']
  },

  // Pillar Pages (Main blog posts)
  {
    id: 'ultimate-cleaning-guide',
    title: 'الدليل الشامل لتنظيف المنازل',
    url: '/blog/ultimate-home-cleaning-guide',
    type: 'blog',
    keywords: ['تنظيف منازل', 'شركة تنظيف', 'نظافة شاملة', 'نصائح تنظيف', 'تنظيف احترافي'],
    priority: 9,
    relatedNodes: ['deep-cleaning-guide', 'sofa-cleaning-guide', 'carpet-cleaning-guide', 'cleaning-services-hub'],
    inboundLinks: ['cleaning-services-hub', 'deep-cleaning-guide', 'sofa-cleaning-guide'],
    outboundLinks: ['cleaning-services-hub', 'home-deep-cleaning', 'sofa-cleaning', 'carpet-cleaning']
  },

  // Cluster Pages (Specific service pages)
  {
    id: 'home-deep-cleaning',
    title: 'تنظيف عميق للمنازل',
    url: '/services/cleaning-services/home-deep-cleaning',
    type: 'service',
    keywords: ['تنظيف عميق', 'تنظيف شامل', 'نظافة المنزل', 'تنظيف احترافي'],
    priority: 8,
    relatedNodes: ['deep-cleaning-guide', 'post-construction-cleaning', 'cleaning-services-hub'],
    inboundLinks: ['cleaning-services-hub', 'ultimate-cleaning-guide', 'deep-cleaning-guide'],
    outboundLinks: ['cleaning-services-hub', 'deep-cleaning-guide', 'post-construction-cleaning']
  },

  {
    id: 'sofa-cleaning',
    title: 'تنظيف الكنب والمجالس',
    url: '/services/cleaning-services/sofa-cleaning',
    type: 'service',
    keywords: ['تنظيف كنب', 'غسيل كنب', 'تنظيف مجالس', 'شركة تنظيف كنب'],
    priority: 7,
    relatedNodes: ['sofa-cleaning-guide', 'carpet-cleaning', 'cleaning-services-hub'],
    inboundLinks: ['cleaning-services-hub', 'ultimate-cleaning-guide', 'sofa-cleaning-guide'],
    outboundLinks: ['cleaning-services-hub', 'sofa-cleaning-guide', 'carpet-cleaning']
  },

  {
    id: 'carpet-cleaning',
    title: 'غسيل السجاد والموكيت',
    url: '/services/cleaning-services/carpet-cleaning',
    type: 'service',
    keywords: ['غسيل سجاد', 'تنظيف موكيت', 'شركة غسيل سجاد', 'تنظيف السجاد'],
    priority: 7,
    relatedNodes: ['carpet-cleaning-guide', 'sofa-cleaning', 'cleaning-services-hub'],
    inboundLinks: ['cleaning-services-hub', 'ultimate-cleaning-guide', 'carpet-cleaning-guide'],
    outboundLinks: ['cleaning-services-hub', 'carpet-cleaning-guide', 'sofa-cleaning']
  },

  {
    id: 'water-tank-cleaning',
    title: 'تنظيف خزانات المياه',
    url: '/services/cleaning-services/water-tank-cleaning',
    type: 'service',
    keywords: ['تنظيف خزانات', 'شركة تنظيف خزانات', 'غسيل خزانات المياه', 'تعقيم خزان الماء'],
    priority: 6,
    relatedNodes: ['water-tank-cleaning-guide', 'cleaning-services-hub'],
    inboundLinks: ['cleaning-services-hub', 'water-tank-cleaning-guide'],
    outboundLinks: ['cleaning-services-hub', 'water-tank-cleaning-guide']
  },

  {
    id: 'window-cleaning',
    title: 'تنظيف النوافذ والواجهات',
    url: '/services/cleaning-services/window-cleaning',
    type: 'service',
    keywords: ['تنظيف واجهات زجاج', 'شركة تنظيف واجهات', 'تنظيف زجاج المباني', 'تنظيف النوافذ'],
    priority: 6,
    relatedNodes: ['window-cleaning-guide', 'cleaning-services-hub'],
    inboundLinks: ['cleaning-services-hub', 'window-cleaning-guide'],
    outboundLinks: ['cleaning-services-hub', 'window-cleaning-guide']
  },

  {
    id: 'post-construction-cleaning',
    title: 'تنظيف ما بعد البناء',
    url: '/services/cleaning-services/post-construction-cleaning',
    type: 'service',
    keywords: ['تنظيف بعد التشطيب', 'تنظيف الفلل الجديدة', 'شركة تنظيف بعد البناء', 'تنظيف المباني الجديدة'],
    priority: 6,
    relatedNodes: ['post-construction-cleaning-guide', 'home-deep-cleaning', 'cleaning-services-hub'],
    inboundLinks: ['cleaning-services-hub', 'post-construction-cleaning-guide', 'home-deep-cleaning'],
    outboundLinks: ['cleaning-services-hub', 'post-construction-cleaning-guide', 'home-deep-cleaning']
  },

  {
    id: 'kitchen-cleaning',
    title: 'تنظيف المطابخ',
    url: '/services/cleaning-services/kitchen-cleaning',
    type: 'service',
    keywords: ['شركة تنظيف مطابخ', 'تنظيف مداخن المطاعم', 'إزالة الدهون من المطبخ', 'تنظيف المطابخ'],
    priority: 5,
    relatedNodes: ['kitchen-cleaning-guide', 'cleaning-services-hub'],
    inboundLinks: ['cleaning-services-hub', 'kitchen-cleaning-guide'],
    outboundLinks: ['cleaning-services-hub', 'kitchen-cleaning-guide']
  },

  {
    id: 'office-cleaning',
    title: 'تنظيف المكاتب',
    url: '/services/cleaning-services/office-cleaning',
    type: 'service',
    keywords: ['تنظيف مكاتب', 'شركة تنظيف مكاتب', 'نظافة المكاتب', 'تنظيف الشركات'],
    priority: 5,
    relatedNodes: ['office-cleaning-guide', 'cleaning-services-hub'],
    inboundLinks: ['cleaning-services-hub', 'office-cleaning-guide'],
    outboundLinks: ['cleaning-services-hub', 'office-cleaning-guide']
  },

  // Supporting Pages (Blog posts)
  {
    id: 'deep-cleaning-guide',
    title: 'تنظيف عميق للمنازل: دليل شامل',
    url: '/blog/deep-cleaning-guide',
    type: 'blog',
    keywords: ['تنظيف عميق', 'تنظيف عميق للمنزل', 'نظافة شاملة للشقق', 'تنظيف شامل'],
    priority: 8,
    relatedNodes: ['home-deep-cleaning', 'post-construction-cleaning', 'ultimate-cleaning-guide'],
    inboundLinks: ['home-deep-cleaning', 'ultimate-cleaning-guide', 'post-construction-cleaning'],
    outboundLinks: ['home-deep-cleaning', 'ultimate-cleaning-guide', 'post-construction-cleaning']
  },

  {
    id: 'sofa-cleaning-guide',
    title: 'كيفية تنظيف الكنب والمجالس',
    url: '/blog/sofa-cleaning-guide',
    type: 'blog',
    keywords: ['تنظيف كنب', 'غسيل كنب', 'تنظيف مجالس', 'شركة تنظيف كنب'],
    priority: 7,
    relatedNodes: ['sofa-cleaning', 'carpet-cleaning-guide', 'ultimate-cleaning-guide'],
    inboundLinks: ['sofa-cleaning', 'ultimate-cleaning-guide', 'carpet-cleaning-guide'],
    outboundLinks: ['sofa-cleaning', 'ultimate-cleaning-guide', 'carpet-cleaning-guide']
  },

  {
    id: 'carpet-cleaning-guide',
    title: 'تنظيف السجاد والموكيت: دليل شامل',
    url: '/blog/carpet-cleaning-guide',
    type: 'blog',
    keywords: ['غسيل سجاد', 'تنظيف موكيت', 'شركة غسيل سجاد', 'تنظيف السجاد'],
    priority: 7,
    relatedNodes: ['carpet-cleaning', 'sofa-cleaning-guide', 'ultimate-cleaning-guide'],
    inboundLinks: ['carpet-cleaning', 'ultimate-cleaning-guide', 'sofa-cleaning-guide'],
    outboundLinks: ['carpet-cleaning', 'ultimate-cleaning-guide', 'sofa-cleaning-guide']
  },

  {
    id: 'water-tank-cleaning-guide',
    title: 'تنظيف خزانات المياه: أهمية التنظيف الدوري',
    url: '/blog/water-tank-cleaning-guide',
    type: 'blog',
    keywords: ['تنظيف خزانات', 'شركة تنظيف خزانات', 'غسيل خزانات المياه', 'تعقيم خزان الماء'],
    priority: 6,
    relatedNodes: ['water-tank-cleaning', 'ultimate-cleaning-guide'],
    inboundLinks: ['water-tank-cleaning', 'ultimate-cleaning-guide'],
    outboundLinks: ['water-tank-cleaning', 'ultimate-cleaning-guide']
  },

  {
    id: 'window-cleaning-guide',
    title: 'تنظيف النوافذ والواجهات الزجاجية',
    url: '/blog/window-cleaning-guide',
    type: 'blog',
    keywords: ['تنظيف واجهات زجاج', 'شركة تنظيف واجهات', 'تنظيف زجاج المباني', 'تنظيف النوافذ'],
    priority: 6,
    relatedNodes: ['window-cleaning', 'ultimate-cleaning-guide'],
    inboundLinks: ['window-cleaning', 'ultimate-cleaning-guide'],
    outboundLinks: ['window-cleaning', 'ultimate-cleaning-guide']
  },

  {
    id: 'post-construction-cleaning-guide',
    title: 'تنظيف ما بعد البناء: دليل شامل',
    url: '/blog/post-construction-cleaning-guide',
    type: 'blog',
    keywords: ['تنظيف بعد التشطيب', 'تنظيف الفلل الجديدة', 'شركة تنظيف بعد البناء', 'تنظيف المباني الجديدة'],
    priority: 6,
    relatedNodes: ['post-construction-cleaning', 'home-deep-cleaning', 'ultimate-cleaning-guide'],
    inboundLinks: ['post-construction-cleaning', 'home-deep-cleaning', 'ultimate-cleaning-guide'],
    outboundLinks: ['post-construction-cleaning', 'home-deep-cleaning', 'ultimate-cleaning-guide']
  },

  {
    id: 'kitchen-cleaning-guide',
    title: 'تنظيف المطابخ وإزالة الدهون',
    url: '/blog/kitchen-cleaning-guide',
    type: 'blog',
    keywords: ['شركة تنظيف مطابخ', 'تنظيف مداخن المطاعم', 'إزالة الدهون من المطبخ', 'تنظيف المطابخ'],
    priority: 5,
    relatedNodes: ['kitchen-cleaning', 'ultimate-cleaning-guide'],
    inboundLinks: ['kitchen-cleaning', 'ultimate-cleaning-guide'],
    outboundLinks: ['kitchen-cleaning', 'ultimate-cleaning-guide']
  },

  {
    id: 'office-cleaning-guide',
    title: 'تنظيف المكاتب والشركات',
    url: '/blog/office-cleaning-guide',
    type: 'blog',
    keywords: ['تنظيف مكاتب', 'شركة تنظيف مكاتب', 'نظافة المكاتب', 'تنظيف الشركات'],
    priority: 5,
    relatedNodes: ['office-cleaning', 'ultimate-cleaning-guide'],
    inboundLinks: ['office-cleaning', 'ultimate-cleaning-guide'],
    outboundLinks: ['office-cleaning', 'ultimate-cleaning-guide']
  }
];

// Interlinking strategy implementation
export const interlinkingStrategy: InterlinkingStrategy = {
  hubPages: cleaningContentNodes.filter(node => node.priority >= 10),
  clusterPages: cleaningContentNodes.filter(node => node.priority >= 7 && node.priority < 10),
  pillarPages: cleaningContentNodes.filter(node => node.type === 'blog' && node.priority >= 7),
  supportingPages: cleaningContentNodes.filter(node => node.priority < 7)
};

// Function to generate interlinking suggestions
export const generateInterlinkingSuggestions = (currentNodeId: string): ContentNode[] => {
  const currentNode = cleaningContentNodes.find(node => node.id === currentNodeId);
  if (!currentNode) return [];

  // Find related nodes based on keywords and type
  const relatedNodes = cleaningContentNodes
    .filter(node => node.id !== currentNodeId)
    .map(node => {
      const keywordMatches = currentNode.keywords.filter(keyword =>
        node.keywords.some(nodeKeyword => 
          nodeKeyword.toLowerCase().includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(nodeKeyword.toLowerCase())
        )
      ).length;

      const typeBonus = node.type === currentNode.type ? 2 : 1;
      const priorityBonus = node.priority / 10;

      return {
        ...node,
        relevanceScore: keywordMatches * typeBonus * priorityBonus
      };
    })
    .filter(node => node.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 6);

  return relatedNodes;
};

// Function to generate contextual links
export const generateContextualLinks = (content: string, currentNodeId: string): Array<{
  text: string;
  url: string;
  context: string;
  priority: number;
}> => {
  const suggestions = generateInterlinkingSuggestions(currentNodeId);
  const contextualLinks: Array<{
    text: string;
    url: string;
    context: string;
    priority: number;
  }> = [];

  suggestions.forEach(node => {
    // Find the best keyword to link
    const bestKeyword = node.keywords.find(keyword =>
      content.toLowerCase().includes(keyword.toLowerCase())
    );

    if (bestKeyword) {
      contextualLinks.push({
        text: bestKeyword,
        url: node.url,
        context: `اقرأ المزيد عن ${node.title}`,
        priority: node.priority
      });
    }
  });

  return contextualLinks;
};

// Function to update content with interlinking
export const applyInterlinking = (content: string, currentNodeId: string): string => {
  const contextualLinks = generateContextualLinks(content, currentNodeId);
  let updatedContent = content;

  contextualLinks.forEach(link => {
    const regex = new RegExp(`\\b${link.text}\\b`, 'gi');
    updatedContent = updatedContent.replace(regex, (match) => {
      return `<a href="${link.url}" class="internal-link" data-context="${link.context}">${match}</a>`;
    });
  });

  return updatedContent;
};

// Function to analyze interlinking health
export const analyzeInterlinkingHealth = (): {
  totalNodes: number;
  totalLinks: number;
  averageLinksPerNode: number;
  orphanedNodes: string[];
  wellConnectedNodes: string[];
} => {
  const totalNodes = cleaningContentNodes.length;
  const totalLinks = cleaningContentNodes.reduce((sum, node) => sum + node.outboundLinks.length, 0);
  const averageLinksPerNode = totalLinks / totalNodes;

  const orphanedNodes = cleaningContentNodes
    .filter(node => node.inboundLinks.length === 0)
    .map(node => node.id);

  const wellConnectedNodes = cleaningContentNodes
    .filter(node => node.inboundLinks.length >= 3 && node.outboundLinks.length >= 3)
    .map(node => node.id);

  return {
    totalNodes,
    totalLinks,
    averageLinksPerNode,
    orphanedNodes,
    wellConnectedNodes
  };
};

// Function to generate interlinking report
export const generateInterlinkingReport = () => {
  const health = analyzeInterlinkingHealth();
  
  return {
    summary: {
      totalNodes: health.totalNodes,
      totalLinks: health.totalLinks,
      averageLinksPerNode: Math.round(health.averageLinksPerNode * 100) / 100,
      healthScore: Math.round((health.wellConnectedNodes.length / health.totalNodes) * 100)
    },
    recommendations: [
      ...(health.orphanedNodes.length > 0 ? [`${health.orphanedNodes.length} صفحة بدون روابط واردة`] : []),
      ...(health.averageLinksPerNode < 3 ? ['زيادة عدد الروابط الداخلية'] : []),
      ...(health.wellConnectedNodes.length < health.totalNodes * 0.7 ? ['تحسين الربط بين الصفحات'] : [])
    ],
    orphanedNodes: health.orphanedNodes,
    wellConnectedNodes: health.wellConnectedNodes
  };
};

export default {
  cleaningContentNodes,
  interlinkingStrategy,
  generateInterlinkingSuggestions,
  generateContextualLinks,
  applyInterlinking,
  analyzeInterlinkingHealth,
  generateInterlinkingReport
};