import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 border-b border-white/10">
      <h1 className="text-4xl md:text-5xl font-heading font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
        MediaFlow AI
      </h1>
      <p className="text-shadow-blue mt-2">
        Générateur de Contenu par <span className="font-semibold text-gray-300">MediaLab Marseille</span>
      </p>
    </header>
  );
};

export default Header;