import React, { useState } from 'react';
import { History, Star, Trash2, ArrowUpRight, Search, Clock, TrendingUp } from 'lucide-react';
import { SeoHistoryItem } from '../types';

interface SeoHistorySectionProps {
  items: SeoHistoryItem[];
  onSelectItem: (item: SeoHistoryItem) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onClearHistory: () => void;
}

export const SeoHistorySection: React.FC<SeoHistorySectionProps> = ({
  items,
  onSelectItem,
  onToggleFavorite,
  onDeleteItem,
  onClearHistory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFavorites, setFilterFavorites] = useState(false);

  if (items.length === 0) return null;

  const filteredItems = items.filter((item) => {
    if (filterFavorites && !item.favorite) return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.focusKeyword.toLowerCase().includes(q) ||
      item.rawText.toLowerCase().includes(q) ||
      item.metaTitle.toLowerCase().includes(q)
    );
  });

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="relative rounded-2xl border border-cyan-500/25 bg-[#101224] p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-3">
        <div className="flex items-center space-x-2">
          <History className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-white tracking-wide">
            Verlauf deiner SEO-Optimierungen ({items.length})
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setFilterFavorites(!filterFavorites)}
            className={`px-2.5 py-1 text-xs rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
              filterFavorites
                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                : 'bg-[#090a16] text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <Star className={`w-3 h-3 ${filterFavorites ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            <span>Favoriten</span>
          </button>

          <button
            type="button"
            onClick={onClearHistory}
            className="text-xs text-slate-500 hover:text-pink-400 transition-colors cursor-pointer"
          >
            Verlauf leeren
          </button>
        </div>
      </div>

      {/* Search Input */}
      {items.length > 3 && (
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Im SEO-Verlauf suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#080914] text-xs text-slate-200 rounded-lg pl-8 pr-3 py-1.5 border border-cyan-500/20 focus:outline-none focus:border-cyan-400"
          />
        </div>
      )}

      {/* Items list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-[#090a16] border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {formatDate(item.timestamp)}
                </span>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                    Score {item.seoScore}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(item.id)}
                    className="p-1 hover:text-yellow-400 text-slate-500 cursor-pointer"
                  >
                    <Star className={`w-3.5 h-3.5 ${item.favorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1 hover:text-pink-400 text-slate-500 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-xs font-bold text-slate-200 mb-1 truncate">
                "{item.focusKeyword}"
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {item.rawText}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-cyan-500/10 flex justify-end">
              <button
                type="button"
                onClick={() => onSelectItem(item)}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Wiederherstellen</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
