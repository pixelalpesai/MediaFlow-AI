import React from 'react';
import { HistoryItem } from '../types';

interface HistoryProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onClear: () => void;
  isLoading: boolean;
}

const HistoryLoader: React.FC = () => (
    <div className="flex-grow flex items-center justify-center h-full">
       <svg className="animate-spin h-8 w-8 text-gunmetal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
);

const History: React.FC<HistoryProps> = ({ history, onSelectItem, onClear, isLoading }) => {
  return (
    <div className="bg-space-cadet p-6 rounded-xl shadow-2xl h-full flex flex-col border border-white/10">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6-2.292m0 0A9.043 9.043 0 0 0 9 7.5a9.043 9.043 0 0 0-3 1.5m6-4.5v15" />
            </svg>
            <h2 className="text-xl font-heading font-bold text-cyan-400">Historique</h2>
        </div>
        {!isLoading && history.length > 0 && (
           <button 
             onClick={onClear}
             className="text-xs text-gunmetal hover:text-red-400 transition-all duration-300 transform hover:scale-110 inline-block"
             title="Supprimer l'historique"
           >
             Effacer
           </button>
        )}
      </div>
      
      <div className="flex-grow overflow-y-auto min-h-[400px]">
        {isLoading ? (
          <HistoryLoader />
        ) : (
           <div className="animate-fadeIn">
            {history.length === 0 ? (
                <div className="flex-grow flex items-center justify-center h-full text-center text-gunmetal text-sm">
                    <p>Vos générations passées apparaîtront ici.</p>
                </div>
            ) : (
                <ul className="space-y-2">
                    {history.map(item => (
                    <li key={item.id}>
                        <button 
                        onClick={() => onSelectItem(item)}
                        className="w-full text-left p-3 bg-gunmetal/30 hover:bg-gunmetal/60 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:-translate-y-px"
                        >
                        <p className="font-semibold text-platinum truncate">{item.brief.subject}</p>
                        <p className="text-xs text-shadow-blue">{item.brief.contentType}</p>
                        <p className="text-xs text-gunmetal mt-1">{item.timestamp}</p>
                        </button>
                    </li>
                    ))}
                </ul>
            )}
           </div>
        )}
      </div>
    </div>
  );
};

export default History;