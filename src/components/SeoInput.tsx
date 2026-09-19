import React, { useEffect, useRef } from 'react';
import { Sparkles, RotateCcw, Flame, Search, BookOpen, ShoppingBag, Globe, FileText, CheckCircle2 } from 'lucide-react';
import { SEO_EXAMPLES } from '../data/examples';
import { ContentTypeOption, ToneOption } from '../types';

interface SeoInputProps {
  value: string;
  onChange: (val: string) => void;
  focusKeyword: string;
  onFocusKeywordChange: (val: string) => void;
  contentType: ContentTypeOption;
  onContentTypeChange: (t: ContentTypeOption) => void;
  tone: ToneOption;
  onToneChange: (tone: ToneOption) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onClear: () => void;
}

export const SeoInput: React.FC<SeoInputProps> = ({
  value,
  onChange,
  focusKeyword,
  onFocusKeywordChange,
  contentType,
  onContentTypeChange,
  tone,
  onToneChange,
  onSubmit,
  isLoading,
  onClear,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(130, textareaRef.current.scrollHeight)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isLoading && value.trim()) {
        onSubmit();
      }
    }
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <div className="relative group">
      {/* Playful animated neon border aura */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-emerald-400 to-pink-500 rounded-3xl blur-xs opacity-40 group-hover:opacity-75 transition duration-500" />

      <div className="relative bg-[#111326] rounded-2xl border border-cyan-500/40 shadow-2xl overflow-hidden transition-all duration-300">
        {/* Example Chips */}
        <div className="px-4 py-3 bg-[#0d0e1e]/90 border-b border-cyan-500/25 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center space-x-1.5 shrink-0 text-xs font-bold text-yellow-300">
            <Flame className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="tracking-wide">Beispiele testen:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            {SEO_EXAMPLES.map((ex) => (
              <button
                key={ex.id}
                id={`chip-${ex.id}`}
                type="button"
                onClick={() => {
                  onChange(ex.text);
                  if (ex.focusKeyword) onFocusKeywordChange(ex.focusKeyword);
                  if (ex.category === 'Produkt') onContentTypeChange('product');
                  else if (ex.category === 'Landingpage') onContentTypeChange('landingpage');
                  else onContentTypeChange('blog');
                }}
                className="px-2.5 py-1 text-xs rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-200 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] whitespace-nowrap transition-all cursor-pointer font-medium"
              >
                {ex.title}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input Area */}
        <div className="p-4 sm:p-5">
          <label htmlFor="raw-text-input" className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Dein Rohtext (Rechtschreibung, Groß-/Kleinschreibung & Grammatik werden korrigiert):
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {wordCount} Wörter | {charCount} Zeichen
            </span>
          </label>

          <textarea
            id="raw-text-input"
            ref={textareaRef}
            rows={5}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Füge hier deinen Entwurf oder Notizen ein... z. B.: 'wir verkaufen neue laufschuhe fuer damen die sehr bequem sind beim joggen...'"
            className="w-full bg-[#0a0b16] text-slate-100 placeholder-slate-500 rounded-xl p-3.5 border border-cyan-500/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all text-sm leading-relaxed resize-none font-sans"
          />

          {/* Optional SEO Settings Row */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-cyan-500/20">
            {/* Focus Keyword */}
            <div>
              <label htmlFor="focus-keyword-input" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Search className="w-3 h-3 text-cyan-400" />
                Fokus-Keyword (Optional)
              </label>
              <input
                id="focus-keyword-input"
                type="text"
                value={focusKeyword}
                onChange={(e) => onFocusKeywordChange(e.target.value)}
                placeholder="Auto-Erkennung oder z.B. Laufschuhe Damen"
                className="w-full bg-[#0a0b16] text-xs text-slate-200 placeholder-slate-500 rounded-lg px-2.5 py-1.5 border border-cyan-500/30 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Content Type */}
            <div>
              <label htmlFor="select-content-type" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Globe className="w-3 h-3 text-emerald-400" />
                Text-Typ / Format
              </label>
              <select
                id="select-content-type"
                value={contentType}
                onChange={(e) => onContentTypeChange(e.target.value as ContentTypeOption)}
                className="w-full bg-[#0a0b16] text-xs text-slate-200 rounded-lg px-2.5 py-1.5 border border-cyan-500/30 focus:border-cyan-400 focus:outline-none cursor-pointer"
              >
                <option value="blog">Blogartikel & Ratgeber</option>
                <option value="product">Produktbeschreibung (Shop)</option>
                <option value="landingpage">Landingpage & Website</option>
                <option value="article">Fachartikel & News</option>
                <option value="general">Allgemeiner Webtext</option>
              </select>
            </div>

            {/* Tone */}
            <div>
              <label htmlFor="select-tone" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-pink-400" />
                Tonalität & Anrede
              </label>
              <select
                id="select-tone"
                value={tone}
                onChange={(e) => onToneChange(e.target.value as ToneOption)}
                className="w-full bg-[#0a0b16] text-xs text-slate-200 rounded-lg px-2.5 py-1.5 border border-cyan-500/30 focus:border-cyan-400 focus:outline-none cursor-pointer"
              >
                <option value="professional">Professionell & Sachlich</option>
                <option value="persuasive">Verkaufsorientiert & Begeisternd</option>
                <option value="casual">Locker & Nahbar (Du-Form)</option>
                <option value="formal">Seriös & Respektvoll (Sie-Form)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="px-4 py-3 bg-[#0a0b17] border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="hidden sm:inline-block">Tipp: Drücke <kbd className="px-1.5 py-0.5 bg-black/50 border border-slate-700 rounded text-cyan-300 font-mono text-[10px]">Strg</kbd> + <kbd className="px-1.5 py-0.5 bg-black/50 border border-slate-700 rounded text-cyan-300 font-mono text-[10px]">Enter</kbd></span>
          </div>

          <div className="flex items-center space-x-2.5 ml-auto">
            {value && (
              <button
                id="btn-clear-input"
                type="button"
                onClick={onClear}
                disabled={isLoading}
                className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-pink-300 hover:bg-pink-950/20 rounded-xl transition-all flex items-center space-x-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Leeren</span>
              </button>
            )}

            <button
              id="btn-submit-seo"
              type="button"
              onClick={onSubmit}
              disabled={isLoading || !value.trim()}
              className="relative group px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase text-black bg-gradient-to-r from-cyan-400 via-emerald-400 to-pink-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>SEO-Analyse & Lektorat läuft...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black animate-pulse" />
                  <span>Text in SEO umwandeln & korrigieren</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
