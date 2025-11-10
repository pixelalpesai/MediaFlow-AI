import { GoogleGenAI } from "@google/genai";
import { BriefData } from '../types';
import { SYSTEM_PROMPT } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const formatUserPrompt = (brief: BriefData): string => {
  return `
Voici le brief pour la génération de contenu :

**Type** : ${brief.contentType}
**Client** : ${brief.clientContext}
**Sujet** : ${brief.subject}
**Objectif** : ${brief.objective}
**Ton** : ${brief.tone}
**Éléments obligatoires** : ${brief.mandatoryElements || 'Aucun'}
${brief.seoKeywords ? `**Mots-clés SEO** : ${brief.seoKeywords}` : ''}
`;
};

const parseGeneratedContent = (rawContent: string): string => {
  const contentMarker = '📝 CONTENU :';
  const startIndex = rawContent.indexOf(contentMarker);

  if (startIndex === -1) {
    return rawContent.trim(); // Fallback if marker is not found
  }

  let content = rawContent.substring(startIndex + contentMarker.length);

  // Find the end of the content block by looking for the next section marker
  const nextSectionMarkers = [
    '🎯 OBJECTIF :',
    '📊 PERFORMANCE ATTENDUE :',
    '💡 NOTE :',
    '🎨 SUGGESTION VISUELLE :'
  ];

  let endIndex = -1;

  for (const marker of nextSectionMarkers) {
    const markerIndex = content.indexOf(marker);
    if (markerIndex !== -1) {
      if (endIndex === -1 || markerIndex < endIndex) {
        endIndex = markerIndex;
      }
    }
  }

  if (endIndex !== -1) {
    content = content.substring(0, endIndex);
  }

  return content.trim();
};

export const generateContent = async (brief: BriefData): Promise<string> => {
  try {
    const userPrompt = formatUserPrompt(brief);
    const fullPrompt = `${SYSTEM_PROMPT}\n\n---\n\n${userPrompt}`;

    const response = await ai.models.generateContent({
      model: brief.model,
      contents: fullPrompt,
    });
    
    const parsedContent = parseGeneratedContent(response.text);
    return parsedContent;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
};