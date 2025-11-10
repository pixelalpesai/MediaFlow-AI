import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-4 border-t border-white/10 mt-8">
      <p className="text-sm text-gunmetal">
        &copy; {new Date().getFullYear()} MediaFlow AI by PixelAlpesAI for MediaLab. Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;