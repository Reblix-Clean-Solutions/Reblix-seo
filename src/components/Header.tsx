import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-cyan-500/20 bg-[#0c0d18]/90 backdrop-blur-md sticky top-0 z-30 shadow-[0_4px_20px_rgba(6,182,212,0.1)]">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#131528] border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-wide bg-gradient-to-r from-cyan-300 via-emerald-300 to-pink-400 bg-clip-text text-transparent">
              SEO-Text-Optimierer
            </h1>
          </div>
        </div>
        <div className="text-xs text-slate-400 hidden sm:block font-medium">
          SEO-Optimierung • Groß-/Kleinschreibung • Grammatik & Rechtschreibung
        </div>
      </div>
    </header>
  );
};
