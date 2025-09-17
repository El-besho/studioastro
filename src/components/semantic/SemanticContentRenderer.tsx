// Semantic Content Renderer Component
// Renders semantic content with entity optimization and fact-based presentation

import React, { useState, useEffect } from 'react';
import { SemanticContent, ContentOptimization } from '../../lib/semantic-content-generator';
import { NamedEntity, EntityLink, NGram, SearchIntent, InformationGap } from '../../lib/entity-optimization';
import { TopicalCoverage, HistoricalData } from '../../lib/semantic-framework';
import { 
  BookOpen, 
  Search, 
  Target, 
  TrendingUp, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SemanticContentRendererProps {
  content: SemanticContent;
  optimization?: ContentOptimization;
  showEntityAnalysis?: boolean;
  showSearchIntents?: boolean;
  showInformationGaps?: boolean;
  showTopicalCoverage?: boolean;
  showHistoricalData?: boolean;
}

export const SemanticContentRenderer: React.FC<SemanticContentRendererProps> = ({
  content,
  optimization = {
    sentenceLength: 'short',
    factDensity: 0.8,
    entityDensity: 0.6,
    ngramDensity: 0.7,
    sourceCitations: 3,
    contextualRelevance: 0.9
  },
  showEntityAnalysis = true,
  showSearchIntents = true,
  showInformationGaps = true,
  showTopicalCoverage = true,
  showHistoricalData = true
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const renderEntityAnalysis = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2" />
        Entity Analysis
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.entities.map((entity, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{entity.text}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                entity.confidence > 0.8 ? 'bg-green-100 text-green-800' :
                entity.confidence > 0.6 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {Math.round(entity.confidence * 100)}%
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Type:</span> {entity.label}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Context:</span> {entity.context.substring(0, 100)}...
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNGrams = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <BookOpen className="w-5 h-5 mr-2" />
        N-grams and Skip-grams
      </h3>
      
      <div className="space-y-4">
        {content.ngrams.map((ngram, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{ngram.text}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                {ngram.type}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Frequency:</span> {ngram.frequency}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Context:</span> {ngram.context}
            </div>
            {ngram.entities.length > 0 && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Entities:</span> {ngram.entities.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSearchIntents = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Search className="w-5 h-5 mr-2" />
        Search Intents
      </h3>
      
      <div className="space-y-4">
        {content.searchIntents.map((intent, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{intent.query}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                intent.intent === 'informational' ? 'bg-blue-100 text-blue-800' :
                intent.intent === 'navigational' ? 'bg-green-100 text-green-800' :
                intent.intent === 'transactional' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {intent.intent}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Questions:</span>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {intent.questions.map((question, qIndex) => (
                <li key={qIndex}>{question}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInformationGaps = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <AlertCircle className="w-5 h-5 mr-2" />
        Information Gaps
      </h3>
      
      <div className="space-y-4">
        {content.informationGaps.map((gap, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{gap.topic}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                gap.priority === 'high' ? 'bg-red-100 text-red-800' :
                gap.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {gap.priority} priority
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Missing Information:</span>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-2">
              {gap.missingInformation.map((info, infoIndex) => (
                <li key={infoIndex}>{info}</li>
              ))}
            </ul>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Suggestions:</span>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {gap.suggestedContent.map((suggestion, sugIndex) => (
                <li key={sugIndex}>{suggestion}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTopicalCoverage = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" />
        Topical Coverage
      </h3>
      
      <div className="space-y-4">
        <div>
          <span className="font-medium">Primary Topic:</span> {content.topicalCoverage.primaryTopic}
        </div>
        
        <div>
          <span className="font-medium">Subtopics:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {content.topicalCoverage.subtopics.map((subtopic, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                {subtopic}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <span className="font-medium">Contextual Domains:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {content.topicalCoverage.contextualDomains.map((domain, index) => (
              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                {domain}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Entity Coverage:</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${content.topicalCoverage.entityCoverage * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">
              {Math.round(content.topicalCoverage.entityCoverage * 100)}%
            </span>
          </div>
          
          <div>
            <span className="font-medium">Depth Score:</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${content.topicalCoverage.depthScore * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">
              {Math.round(content.topicalCoverage.depthScore * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistoricalData = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        Historical Data
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Performance Metrics</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>CTR:</span>
              <span>{(content.historicalData.performanceMetrics.clickThroughRate * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Dwell Time:</span>
              <span>{content.historicalData.performanceMetrics.dwellTime}s</span>
            </div>
            <div className="flex justify-between">
              <span>Bounce Rate:</span>
              <span>{(content.historicalData.performanceMetrics.bounceRate * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Conversion:</span>
              <span>{(content.historicalData.performanceMetrics.conversionRate * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Content Quality</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Fact Accuracy:</span>
              <span>{(content.historicalData.contentQuality.factAccuracy * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Comprehensiveness:</span>
              <span>{(content.historicalData.contentQuality.comprehensiveness * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Source Authority:</span>
              <span>{(content.historicalData.contentQuality.sourceAuthority * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">User Engagement</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Social Shares:</span>
              <span>{content.historicalData.userEngagement.socialShares}</span>
            </div>
            <div className="flex justify-between">
              <span>Comments:</span>
              <span>{content.historicalData.userEngagement.comments}</span>
            </div>
            <div className="flex justify-between">
              <span>Return Visits:</span>
              <span>{(content.historicalData.userEngagement.returnVisits * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFactSources = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <CheckCircle className="w-5 h-5 mr-2" />
        Fact Sources
      </h3>
      
      <div className="space-y-4">
        {content.factSources.map((source, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{source.source}</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                {Math.round(source.verifiability * 100)}% verifiable
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {source.statement}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Entities:</span> {source.entities.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="prose max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
            {content.entities.length} entities
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
            {content.ngrams.length} n-grams
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
            {content.searchIntents.length} search intents
          </span>
          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">
            {content.factSources.length} fact sources
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'content' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Content
          </button>
          {showEntityAnalysis && (
            <button
              onClick={() => setActiveTab('entities')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'entities' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Entity Analysis
            </button>
          )}
          {showSearchIntents && (
            <button
              onClick={() => setActiveTab('intents')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'intents' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Search Intents
            </button>
          )}
          {showInformationGaps && (
            <button
              onClick={() => setActiveTab('gaps')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'gaps' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Information Gaps
            </button>
          )}
          {showTopicalCoverage && (
            <button
              onClick={() => setActiveTab('coverage')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'coverage' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Topical Coverage
            </button>
          )}
          {showHistoricalData && (
            <button
              onClick={() => setActiveTab('historical')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'historical' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Historical Data
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === 'content' && renderContent()}
        {activeTab === 'entities' && (
          <div className="space-y-6">
            {renderEntityAnalysis()}
            {renderNGrams()}
            {renderFactSources()}
          </div>
        )}
        {activeTab === 'intents' && renderSearchIntents()}
        {activeTab === 'gaps' && renderInformationGaps()}
        {activeTab === 'coverage' && renderTopicalCoverage()}
        {activeTab === 'historical' && renderHistoricalData()}
      </div>
    </div>
  );
};

export default SemanticContentRenderer;