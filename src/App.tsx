import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sparkles, Copy, Check, RotateCcw, AlertCircle, ArrowDown } from 'lucide-react';

export default function App() {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleOptimize = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/optimize-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: inputText.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Fehler bei der Text-Optimierung.');
      }

      // Use the clean optimized text
      const resultText = data.data.optimizedText || data.data.optimizedMarkdown || data.data.optimizedPlainText || '';
      setOutputText(resultText);
    } catch (err: any) {
      console.error('Optimize error:', err);
      setError(err?.message || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isLoading && inputText.trim()) {
        handleOptimize();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-6">
        {/* 1. OBEN: TEXT EINGEBEN */}
        <section className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-emerald-400 to-pink-500 rounded-2xl blur-xs opacity-30 group-hover:opacity-50 transition duration-300" />
          
          <div className="relative bg-[#111326] rounded-2xl border border-cyan-500/30 p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="input-text-area" className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Text eingeben
              </label>
              {inputText && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-slate-400 hover:text-pink-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Leeren</span>
                </button>
              )}
            </div>

            <textarea
              id="input-text-area"
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Füge hier deinen Rohtext ein... Rechtschreibung, Groß-/Kleinschreibung, Grammatik und SEO werden automatisch optimiert."
              className="w-full bg-[#090a16] text-slate-100 placeholder-slate-500 rounded-xl p-4 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all text-sm leading-relaxed resize-y font-sans"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400 hidden sm:inline">
                Tipp: <kbd className="px-1.5 py-0.5 bg-black/60 border border-slate-700 rounded text-cyan-300 text-[10px] font-mono">Strg</kbd> + <kbd className="px-1.5 py-0.5 bg-black/60 border border-slate-700 rounded text-cyan-300 text-[10px] font-mono">Enter</kbd>
              </span>

              <button
                id="btn-optimize-text"
                type="button"
                onClick={handleOptimize}
                disabled={isLoading || !inputText.trim()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-emerald-400 to-pink-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ml-auto"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Wird optimiert...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Text optimieren</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Pfeil nach unten */}
        <div className="flex justify-center">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ArrowDown className="w-4 h-4 text-emerald-400 animate-bounce" />
          </div>
        </div>

        {/* Fehleranzeige */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Hinweis</div>
              <div className="text-xs text-red-300 mt-0.5">{error}</div>
            </div>
          </div>
        )}

        {/* 2. UNTEN: FERTIGER TEXT */}
        <section className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-pink-500 rounded-2xl blur-xs opacity-30 group-hover:opacity-50 transition duration-300" />

          <div className="relative bg-[#111326] rounded-2xl border border-emerald-500/40 p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-emerald-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h2 className="text-sm font-bold text-emerald-300">
                  Fertiger Text (SEO-optimiert, Groß/Klein & Grammatik korrigiert)
                </h2>
              </div>

              {outputText && (
                <button
                  id="btn-copy-finished-text"
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Kopiert!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Kopieren</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Ausgabe-Bereich */}
            {isLoading ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-400">
                  Text wird in SEO umgewandelt, Groß-/Kleinschreibung angepasst und Grammatik korrigiert...
                </p>
              </div>
            ) : outputText ? (
              <div className="p-4 rounded-xl bg-[#090a16] border border-emerald-500/20 text-slate-100 text-sm leading-relaxed whitespace-pre-wrap font-sans min-h-[160px] select-text">
                {outputText}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-700/50 rounded-xl">
                Hier erscheint der fertige, korrigierte und SEO-optimierte Text.
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="py-4 text-center text-xs text-slate-500 border-t border-cyan-500/10 bg-[#070812]">
        SEO-Text-Optimierer • Schnell, fehlerfrei & direkt einsatzbereit
      </footer>
    </div>
  );
}
