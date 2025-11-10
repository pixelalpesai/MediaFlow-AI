import React from 'react';
import { BriefData, ContentType, ContentObjective, GeminiModel, GeminiModelNames } from '../types';

interface BriefFormProps {
  brief: BriefData;
  setBrief: React.Dispatch<React.SetStateAction<BriefData>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onGenerateTest: () => void;
}

const BriefForm: React.FC<BriefFormProps> = ({ brief, setBrief, onSubmit, isLoading, onGenerateTest }) => {
  
  const handleChange = <T,>(field: keyof BriefData, value: T) => {
    setBrief(prev => ({ ...prev, [field]: value }));
  };

  const inputStyles = "bg-gunmetal/30 border border-gunmetal text-platinum text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors duration-300";

  return (
    <div className="bg-space-cadet p-6 rounded-xl shadow-2xl h-full border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cyan-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        <h2 className="text-2xl font-heading font-bold text-cyan-400">Rédigez votre brief</h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="model" className="block mb-2 text-sm font-medium text-shadow-blue">Modèle IA</label>
          <select
            id="model"
            value={brief.model}
            onChange={(e) => handleChange('model', e.target.value as GeminiModel)}
            className={inputStyles}
          >
            {Object.values(GeminiModel).map(modelValue => (
              <option key={modelValue} value={modelValue}>
                {GeminiModelNames[modelValue]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contentType" className="block mb-2 text-sm font-medium text-shadow-blue">Type de contenu</label>
          <select
            id="contentType"
            value={brief.contentType}
            onChange={(e) => handleChange('contentType', e.target.value as ContentType)}
            className={inputStyles}
          >
            {Object.values(ContentType).map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="clientContext" className="block mb-2 text-sm font-medium text-shadow-blue">Client et contexte</label>
          <textarea
            id="clientContext"
            rows={3}
            value={brief.clientContext}
            onChange={(e) => handleChange('clientContext', e.target.value)}
            className={inputStyles}
            placeholder="Ex: TechFlow SaaS (startup B2B, outils de productivité)"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block mb-2 text-sm font-medium text-shadow-blue">Sujet ou angle principal</label>
          <textarea
            id="subject"
            rows={3}
            value={brief.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            className={inputStyles}
            placeholder="Ex: Lancement de la nouvelle fonctionnalité d'automatisation"
            required
          />
        </div>
        <div>
          <label htmlFor="objective" className="block mb-2 text-sm font-medium text-shadow-blue">Objectif</label>
          <select
            id="objective"
            value={brief.objective}
            onChange={(e) => handleChange('objective', e.target.value as ContentObjective)}
            className={inputStyles}
          >
            {Object.values(ContentObjective).map(obj => <option key={obj} value={obj}>{obj}</option>)}
          </select>
        </div>
         <div>
          <label htmlFor="tone" className="block mb-2 text-sm font-medium text-shadow-blue">Ton souhaité</label>
          <input
            type="text"
            id="tone"
            value={brief.tone}
            onChange={(e) => handleChange('tone', e.target.value)}
            className={inputStyles}
            placeholder="Ex: Professionnel mais accessible, focus ROI"
            required
          />
        </div>
        <div>
          <label htmlFor="mandatoryElements" className="block mb-2 text-sm font-medium text-shadow-blue">Éléments obligatoires à inclure (optionnel)</label>
          <input
            type="text"
            id="mandatoryElements"
            value={brief.mandatoryElements}
            onChange={(e) => handleChange('mandatoryElements', e.target.value)}
            className={inputStyles}
            placeholder="Ex: Mentionner '30% de temps gagné'"
          />
        </div>
        {brief.contentType === ContentType.BLOG && (
          <div>
            <label htmlFor="seoKeywords" className="block mb-2 text-sm font-medium text-shadow-blue">Mots-clés SEO (optionnel)</label>
            <input
              type="text"
              id="seoKeywords"
              value={brief.seoKeywords}
              onChange={(e) => handleChange('seoKeywords', e.target.value)}
              className={inputStyles}
              placeholder="Ex: productivité, automatisation, saas"
            />
          </div>
        )}
        <div className="pt-2 space-y-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center disabled:bg-gunmetal disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center justify-center transform hover:scale-105 hover:-translate-y-1"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Générer le contenu'}
          </button>
          <button
            type="button"
            onClick={onGenerateTest}
            disabled={isLoading}
            className="w-full text-shadow-blue bg-transparent border border-gunmetal hover:bg-gunmetal/30 hover:text-platinum focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
          >
            Générer un article de test
          </button>
        </div>
      </form>
    </div>
  );
};

export default BriefForm;