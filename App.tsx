import React, { useState, useCallback, useEffect } from 'react';
import { BriefData, ContentType, ContentObjective, GeminiModel, HistoryItem } from './types';
import { generateContent } from './services/geminiService';
import Header from './components/Header';
import BriefForm from './components/BriefForm';
import ContentDisplay from './components/ContentDisplay';
import Footer from './components/Footer';
import History from './components/History';

const App: React.FC = () => {
  const [brief, setBrief] = useState<BriefData>({
    contentType: ContentType.LINKEDIN,
    clientContext: '',
    subject: '',
    objective: ContentObjective.ENGAGEMENT,
    tone: '',
    mandatoryElements: '',
    seoKeywords: '',
    model: GeminiModel.FLASH,
  });

  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    // Component mount animation
    const timer = setTimeout(() => setIsMounted(true), 100);

    // Load history from localStorage
    try {
      const storedHistory = localStorage.getItem('mediaFlowHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage:", error);
      localStorage.removeItem('mediaFlowHistory');
    } finally {
      setIsHistoryLoading(false);
    }
    return () => clearTimeout(timer);
  }, []);

  const performGeneration = useCallback(async (briefToGenerate: BriefData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent('');

    try {
      const content = await generateContent(briefToGenerate);
      setGeneratedContent(content);

      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        timestamp: new Date().toLocaleString('fr-FR'),
        brief: briefToGenerate,
        generatedContent: content,
      };

      setHistory(prevHistory => {
        const updatedHistory = [newHistoryItem, ...prevHistory].slice(0, 50); // Keep last 50
        localStorage.setItem('mediaFlowHistory', JSON.stringify(updatedHistory));
        return updatedHistory;
      });

    } catch (err) {
      setError('Une erreur est survenue lors de la génération du contenu. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await performGeneration(brief);
  }, [brief, performGeneration]);

  const handleGenerateTestArticle = useCallback(async () => {
    const testBrief: BriefData = {
      contentType: ContentType.BLOG,
      clientContext: 'Une PME innovante dans le secteur de la tech',
      subject: "L'importance de l'intelligence artificielle pour les PME en 2024",
      objective: ContentObjective.EDUCATION,
      tone: 'Informatif, accessible et encourageant',
      mandatoryElements: 'Mentionner les gains de productivité et la compétitivité.',
      seoKeywords: 'IA, PME, transformation digitale, innovation',
      model: GeminiModel.FLASH,
    };
    setBrief(testBrief);
    await performGeneration(testBrief);
  }, [performGeneration]);

  const handleSelectHistoryItem = useCallback((item: HistoryItem) => {
    setBrief(item.brief);
    setGeneratedContent(item.generatedContent);
    setError(null);
  }, []);

  const handleClearHistory = useCallback(() => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer tout l'historique ?")) {
      setHistory([]);
      localStorage.removeItem('mediaFlowHistory');
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-deep-navy text-platinum font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <aside className="lg:col-span-1">
            <History 
              history={history}
              onSelectItem={handleSelectHistoryItem}
              onClear={handleClearHistory}
              isLoading={isHistoryLoading}
            />
          </aside>
          <div className="lg:col-span-2">
            <BriefForm 
              brief={brief} 
              setBrief={setBrief} 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              onGenerateTest={handleGenerateTestArticle}
            />
          </div>
          <div className="lg:col-span-2">
            <ContentDisplay 
              content={generatedContent} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;