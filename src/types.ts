export interface CorrectionDetail {
  type: 'spelling' | 'capitalization' | 'grammar' | 'style';
  original: string;
  corrected: string;
  explanation: string;
}

export interface KeywordDensityItem {
  keyword: string;
  count: number;
  percentage: string;
}

export interface SeoAnalysisData {
  seoScore: number;
  scoreGrade: 'optimal' | 'gut' | 'ausbaufaehig';
  focusKeyword: string;
  secondaryKeywords: string[];
  searchIntent: 'Informativ' | 'Kommerziell' | 'Transaktional' | 'Navigational';
  keywordDensity: KeywordDensityItem[];
  metaTitle: string;
  metaDescription: string;
  suggestedSlug: string;
  h1: string;
  h2List: string[];
  callToAction?: string;
  recommendations: string[];
}

export interface TextCorrectionStats {
  spellingCount: number;
  capitalizationCount: number;
  grammarCount: number;
  details: CorrectionDetail[];
}

export interface ReadabilityStats {
  wordCount: number;
  characterCount: number;
  readingTimeMinutes: number;
  fleschGrade: string;
}

export interface SeoOptimizationResult {
  optimizedMarkdown: string;
  optimizedPlainText: string;
  corrections: TextCorrectionStats;
  seo: SeoAnalysisData;
  readability: ReadabilityStats;
  summaryOfChanges: string[];
}

export interface SeoHistoryItem {
  id: string;
  timestamp: number;
  rawText: string;
  optimizedMarkdown: string;
  focusKeyword: string;
  metaTitle: string;
  seoScore: number;
  contentType: string;
  favorite?: boolean;
}

export type ContentTypeOption = 'blog' | 'product' | 'landingpage' | 'article' | 'general';
export type ToneOption = 'professional' | 'persuasive' | 'casual' | 'formal';
