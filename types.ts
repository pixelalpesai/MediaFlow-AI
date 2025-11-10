export enum ContentType {
  LINKEDIN = 'Post LinkedIn',
  TWITTER = 'Post Twitter/X',
  INSTAGRAM = 'Post Instagram',
  THREAD = 'Thread Twitter',
  BLOG = 'Article de Blog Court'
}

export enum ContentObjective {
  AWARENESS = 'Notoriété',
  ENGAGEMENT = 'Engagement',
  CONVERSION = 'Conversion',
  EDUCATION = 'Éducation'
}

export enum GeminiModel {
  FLASH = 'gemini-2.5-flash',
  PRO = 'gemini-2.5-pro',
}

export const GeminiModelNames: { [key in GeminiModel]: string } = {
  [GeminiModel.FLASH]: 'Esteban3 AutoFlow _ By PixelAlpesAI Studio',
  [GeminiModel.PRO]: 'Esteban3 Pro - By PixelAlpesAI Studio',
};

export interface BriefData {
  contentType: ContentType;
  clientContext: string;
  subject: string;
  objective: ContentObjective;
  tone: string;
  mandatoryElements: string;
  seoKeywords?: string;
  model: GeminiModel;
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  brief: BriefData;
  generatedContent: string;
}