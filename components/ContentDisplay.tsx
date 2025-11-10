import React, { useState } from 'react';
import ShareButtons from './ShareButtons';

interface ContentDisplayProps {
  content: string;
  isLoading: boolean;
  error: string | null;
}

const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-4">
    <svg className="animate-spin h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="text-shadow-blue animate-pulse">MediaFlow AI est en pleine réflexion créative...</p>
  </div>
);

const CopyButton: React.FC<{ onCopy: () => void }> = ({ onCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    onCopy();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopyClick}
      className="absolute top-3 right-3 bg-gunmetal/50 hover:bg-gunmetal text-platinum p-2 rounded-lg transition-all duration-300 transform hover:scale-110"
      aria-label="Copier le contenu"
    >
      {isCopied ? (
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-400">
           <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
         </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25H9.75A2.25 2.25 0 0 1 7.5 4.5v0a2.25 2.25 0 0 1 2.25-2.25h3.879a2.25 2.25 0 0 1 1.985.659l2.1 2.1a2.25 2.25 0 0 1 .659 1.985v5.25a2.25 2.25 0 0 1-2.25 2.25h-3a2.25 2.25 0 0 1-2.25-2.25V7.5" />
        </svg>
      )}
    </button>
  );
};


const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, isLoading, error }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const renderFormattedContent = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return (
      <div className="text-platinum whitespace-pre-wrap font-sans text-base leading-relaxed">
        {parts.map((part, index) =>
          index % 2 === 1 ? <strong key={index} className="font-bold text-cyan-300">{part}</strong> : part
        )}
      </div>
    );
  };

  const renderBody = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <div className="text-red-400 bg-red-900/50 p-4 rounded-lg animate-fadeIn">{error}</div>;
    }
    if (content) {
      return (
        <>
          <div 
            key={content}
            className="relative bg-deep-navy/70 p-4 rounded-md flex-grow overflow-y-auto animate-fadeIn min-h-0"
          >
            <CopyButton onCopy={handleCopy} />
            {renderFormattedContent(content)}
          </div>
          <div className="animate-fadeIn">
            <ShareButtons content={content} />
          </div>
        </>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gunmetal">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>Le contenu généré apparaîtra ici.</p>
        <p className="text-xs mt-1">Remplissez le brief et lancez la magie !</p>
      </div>
    );
  };

  return (
    <div className="bg-space-cadet p-6 rounded-xl shadow-2xl h-full min-h-[500px] flex flex-col border border-white/10">
      <div className="flex items-center gap-3 mb-6 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cyan-400">
           <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 3.104 5.25 5.25m0 0-5.25 5.25M15 8.354V2.25a2.25 2.25 0 0 0-2.25-2.25H4.5A2.25 2.25 0 0 0 2.25 2.25v13.5A2.25 2.25 0 0 0 4.5 18h10.5a2.25 2.25 0 0 0 2.25-2.25V9.75M19.5 8.354h-4.5" />
        </svg>
        <h2 className="text-2xl font-heading font-bold text-cyan-400">Contenu généré</h2>
      </div>
      <div className="flex-grow flex flex-col min-h-0">
        {renderBody()}
      </div>
    </div>
  );
};

export default ContentDisplay;