import React, { useState } from 'react';
import {
  Copy,
  Check,
  TrendingUp,
  FileText,
  Search,
  CheckCheck,
  Smartphone,
  Monitor,
  AlertCircle,
  Sparkles,
  ArrowRight,
  BarChart2,
  Clock,
  SpellCheck,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SeoOptimizationResult } from '../types';

interface SeoResultViewProps {
  result: SeoOptimizationResult;
  originalText: string;
}

export const SeoResultView: React.FC<SeoResultViewProps> = ({ result, originalText }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [textFormat, setTextFormat] = useState<'rendered' | 'plain' | 'markdown'>('rendered');
  const [serpDevice, setSerpDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeSubTab, setActiveSubTab] = useState<'none' | 'serp' | 'corrections' | 'keywords'>('serp');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const { seo, corrections, readability, summaryOfChanges } = result;

  const totalErrorsFixed =
    corrections.spellingCount + corrections.capitalizationCount + corrections.grammarCount;

  const titleLen = seo.metaTitle.length;
  const isTitleIdeal = titleLen >= 45 && titleLen <= 65;
  const descLen = seo.metaDescription.length;
  const isDescIdeal = descLen >= 120 && descLen <= 165;

  return (
    <div className="space-y-4">
      {/* MAIN OUTPUT CONTAINER - IMMEDIATELY BELOW THE INPUT */}
      <div className="relative rounded-2xl border-2 border-emerald-500/50 bg-[#111326] shadow-[0_0_35px_rgba(16,185,129,0.2)] overflow-hidden">
        {/* Header Bar */}
        <div className="px-4 py-3.5 bg-[#0b0d1a] border-b border-emerald-500/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Ausgabe: Fertiger SEO-Text & Lektorat</span>
            </h3>
          </div>

          {/* Quick Copy & Format Buttons */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#070812] border border-cyan-500/30 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setTextFormat('rendered')}
                className={`px-2.5 py-1 rounded cursor-pointer transition-all ${
                  textFormat === 'rendered'
                    ? 'bg-cyan-500 text-black font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Formatiert
              </button>
              <button
                type="button"
                onClick={() => setTextFormat('plain')}
                className={`px-2.5 py-1 rounded cursor-pointer transition-all ${
                  textFormat === 'plain'
                    ? 'bg-cyan-500 text-black font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Reintext
              </button>
              <button
                type="button"
                onClick={() => setTextFormat('markdown')}
                className={`px-2.5 py-1 rounded cursor-pointer transition-all ${
                  textFormat === 'markdown'
                    ? 'bg-cyan-500 text-black font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Markdown
              </button>
            </div>

            <button
              id="btn-copy-main-output"
              type="button"
              onClick={() =>
                handleCopy(
                  textFormat === 'plain'
                    ? result.optimizedPlainText
                    : result.optimizedMarkdown,
                  'main'
                )
              }
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
            >
              {copiedType === 'main' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Kopiert!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-black" />
                  <span>Text kopieren</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Badges Row: Directly confirms Spelling, Capitalization, Grammar & SEO */}
        <div className="px-4 py-2 bg-[#0d0f20] border-b border-cyan-500/20 flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold">
            <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Groß-/Kleinschreibung: <strong>{corrections.capitalizationCount} angepasst</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-950/60 border border-pink-500/40 text-pink-300 font-semibold">
            <CheckCheck className="w-3.5 h-3.5 text-pink-400" />
            <span>Rechtschreibung: <strong>{corrections.spellingCount} korrigiert</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 font-semibold">
            <CheckCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Grammatik & Satzbau: <strong>{corrections.grammarCount} optimiert</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>SEO-Score: <strong>{seo.seoScore}/100 ({seo.scoreGrade})</strong></span>
          </div>

          <div className="ml-auto text-[11px] font-mono text-slate-400">
            {readability.wordCount} Wörter • ca. {readability.readingTimeMinutes} Min. Lesezeit
          </div>
        </div>

        {/* THE OPTIMIZED TEXT ITSELF */}
        <div className="p-5 sm:p-7 bg-[#111326]">
          {textFormat === 'rendered' && (
            <div className="space-y-4 text-slate-200 text-sm leading-relaxed">
              {result.optimizedMarkdown.split('\n\n').map((block, i) => {
                if (block.startsWith('# ')) {
                  return (
                    <h1
                      key={i}
                      className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-pink-300 pb-2 border-b border-cyan-500/30"
                    >
                      {block.replace('# ', '')}
                    </h1>
                  );
                }
                if (block.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-lg font-bold text-cyan-300 pt-2 flex items-center gap-2">
                      <span className="w-1.5 h-5 bg-cyan-400 rounded-full inline-block" />
                      {block.replace('## ', '')}
                    </h2>
                  );
                }
                if (block.startsWith('### ')) {
                  return (
                    <h3 key={i} className="text-base font-semibold text-emerald-300 pt-1">
                      {block.replace('### ', '')}
                    </h3>
                  );
                }
                if (block.startsWith('- ') || block.startsWith('* ')) {
                  const items = block.split('\n');
                  return (
                    <ul key={i} className="space-y-1.5 pl-4 border-l-2 border-emerald-500/40">
                      {items.map((it, j) => (
                        <li key={j} className="text-slate-300">
                          {it.replace(/^[-*]\s+/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-slate-200 leading-relaxed font-sans">
                    {block}
                  </p>
                );
              })}
            </div>
          )}

          {textFormat === 'plain' && (
            <div className="relative">
              <pre className="p-4 rounded-xl bg-[#080913] border border-cyan-500/20 text-xs sm:text-sm font-sans text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
                {result.optimizedPlainText}
              </pre>
            </div>
          )}

          {textFormat === 'markdown' && (
            <div className="relative">
              <pre className="p-4 rounded-xl bg-[#080913] border border-cyan-500/20 text-xs sm:text-sm font-mono text-cyan-200 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
                {result.optimizedMarkdown}
              </pre>
            </div>
          )}

          {/* Quick summary checkmarks */}
          <div className="mt-6 pt-4 border-t border-cyan-500/20">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Automatische Verbesserungen an diesem Text:
            </div>
            <ul className="text-xs text-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {summaryOfChanges.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DETAILS ACCORDION TABS: SERP, KORREKTUREN, KEYWORDS */}
        <div className="border-t border-cyan-500/30 bg-[#0c0e1e]">
          <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <span>Zusätzliche SEO-Details anzeigen:</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveSubTab(activeSubTab === 'serp' ? 'none' : 'serp')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeSubTab === 'serp'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Google SERP Vorschau</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab(activeSubTab === 'corrections' ? 'none' : 'corrections')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeSubTab === 'corrections'
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/50'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <SpellCheck className="w-3.5 h-3.5 text-pink-400" />
                <span>Fehlerliste ({totalErrorsFixed})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab(activeSubTab === 'keywords' ? 'none' : 'keywords')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeSubTab === 'keywords'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Keywords & Ranking-Tipps</span>
              </button>
            </div>
          </div>

          {/* SUB-PANEL: GOOGLE SERP */}
          {activeSubTab === 'serp' && (
            <div className="p-4 sm:p-5 border-t border-cyan-500/20 bg-[#090b17] space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  Google SERP Snippet
                </span>
                <div className="flex items-center bg-[#070812] border border-cyan-500/30 rounded-lg p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setSerpDevice('desktop')}
                    className={`px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer ${
                      serpDevice === 'desktop' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400'
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setSerpDevice('mobile')}
                    className={`px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer ${
                      serpDevice === 'mobile' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    Mobil
                  </button>
                </div>
              </div>

              {/* Google Box */}
              <div
                className={`p-4 rounded-xl bg-white text-slate-900 shadow-xl border border-slate-200 ${
                  serpDevice === 'mobile' ? 'max-w-md mx-auto' : 'w-full'
                }`}
              >
                <div className="flex items-center space-x-2 text-xs mb-1">
                  <div className="w-4 h-4 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-[9px] font-bold text-cyan-600">
                    G
                  </div>
                  <div className="truncate">
                    <span className="font-medium text-slate-800">DeineWebsite.de</span>
                    <span className="text-slate-500"> › blog › {seo.suggestedSlug}</span>
                  </div>
                </div>

                <h4 className="text-base text-[#1a0dab] hover:underline font-medium cursor-pointer line-clamp-1">
                  {seo.metaTitle}
                </h4>

                <p className="text-xs sm:text-sm text-[#4d5156] leading-normal mt-1 line-clamp-2">
                  {seo.metaDescription}
                </p>
              </div>

              {/* Title & Description Details with copy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#111326] border border-cyan-500/30 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300">Meta-Title</span>
                    <span
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isTitleIdeal
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {titleLen}/60 Zeichen ({isTitleIdeal ? 'Optimal' : 'Prüfen'})
                    </span>
                  </div>
                  <p className="text-slate-300 font-medium">{seo.metaTitle}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(seo.metaTitle, 'metatitle')}
                    className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                  >
                    {copiedType === 'metatitle' ? '✓ Titel kopiert' : 'Titel kopieren'}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#111326] border border-cyan-500/30 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300">Meta-Description</span>
                    <span
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isDescIdeal
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {descLen}/155 Zeichen ({isDescIdeal ? 'Optimal' : 'Prüfen'})
                    </span>
                  </div>
                  <p className="text-slate-300 font-medium">{seo.metaDescription}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(seo.metaDescription, 'metadesc')}
                    className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                  >
                    {copiedType === 'metadesc' ? '✓ Description kopiert' : 'Description kopieren'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUB-PANEL: FEHLERLISTE */}
          {activeSubTab === 'corrections' && (
            <div className="p-4 sm:p-5 border-t border-cyan-500/20 bg-[#090b17] space-y-3 animate-in fade-in duration-200">
              <span className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                <SpellCheck className="w-3.5 h-3.5" />
                Detaillierte Vorher-Nachher Korrekturen ({totalErrorsFixed})
              </span>

              {corrections.details && corrections.details.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[350px] overflow-y-auto pr-1">
                  {corrections.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#111326] border border-pink-500/20 flex flex-col justify-between gap-1.5 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            detail.type === 'capitalization'
                              ? 'bg-cyan-500/20 text-cyan-300'
                              : detail.type === 'spelling'
                              ? 'bg-pink-500/20 text-pink-300'
                              : 'bg-purple-500/20 text-purple-300'
                          }`}
                        >
                          {detail.type === 'capitalization'
                            ? 'Groß/Klein'
                            : detail.type === 'spelling'
                            ? 'Rechtschr.'
                            : 'Grammatik'}
                        </span>
                        <div className="flex items-center gap-1.5 font-mono">
                          <span className="line-through text-red-400 bg-red-950/40 px-1 rounded">
                            {detail.original}
                          </span>
                          <ArrowRight className="w-3 h-3 text-slate-500" />
                          <span className="text-emerald-300 font-bold bg-emerald-950/40 px-1 rounded">
                            {detail.corrected}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 italic">
                        {detail.explanation}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Keine weiteren Einzelkorrekturen erforderlich.</p>
              )}
            </div>
          )}

          {/* SUB-PANEL: KEYWORDS & TIPPS */}
          {activeSubTab === 'keywords' && (
            <div className="p-4 sm:p-5 border-t border-cyan-500/20 bg-[#090b17] space-y-4 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block mb-2">
                  Keywords & Suchintention ({seo.searchIntent})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 text-xs font-bold bg-cyan-500 text-black rounded-lg">
                    ★ {seo.focusKeyword} (Fokus-Keyword)
                  </span>
                  {seo.secondaryKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs bg-[#111326] border border-cyan-500/30 text-cyan-200 rounded-lg"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-3 rounded-xl bg-[#111326] border border-purple-500/20 space-y-1.5">
                <span className="text-xs font-bold text-yellow-300 block">
                  Ranking-Tipps für diesen Text:
                </span>
                <ul className="text-xs text-slate-300 space-y-1">
                  {seo.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
