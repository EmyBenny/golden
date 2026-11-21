import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { FAQ_ITEMS } from '../data/seedData';
import type { PageRoute } from '../types';

interface HelpPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const HelpPage: React.FC<HelpPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Tracking', 'Sending', 'Payments & receipts', 'Returns'];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const catMatch = activeCategory === 'All' || item.category === activeCategory;
      const textMatch =
        !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [search, activeCategory]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-24 lg:pb-16 space-y-8">
      <div className="bg-[#FFCC00] p-8 border-2 border-[#1d1d1f]">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#1d1d1f]">
          Help Centre
        </span>
        <h1 className="font-display text-4xl text-[#1d1d1f] mt-1">How can we help?</h1>
        <div className="relative mt-5 max-w-xl">
          <Search className="w-4 h-4 text-[#6b6b70] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search live tracking, receipts, geofences, offline mode..."
            className="w-full bg-white border-2 border-[#1d1d1f] pl-10 pr-4 py-3 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-extrabold border cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#1d1d1f] text-[#FFCC00] border-[#1d1d1f]'
                : 'bg-white text-[#1d1d1f] border-neutral-300 hover:border-[#1d1d1f]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="bg-white border border-neutral-200 divide-y divide-neutral-200">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#6b6b70]">
            No articles matched your query. Try clearing the search filter.
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.q} className="p-6">
              <span className="text-xs font-bold text-[#1B6CFF] uppercase tracking-wider">
                {item.category}
              </span>
              <h2 className="font-extrabold text-lg text-[#1d1d1f] mt-1">{item.q}</h2>
              <p className="text-sm text-[#6b6b70] mt-2 leading-relaxed">{item.a}</p>
            </div>
          ))
        )}
      </div>

      {/* Offline & Push Guide */}
      <div className="bg-[#1d1d1f] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-lg text-[#FFCC00]">Still stuck?</h3>
          <p className="text-sm text-neutral-300 mt-1">
            Our team replies within the hour, 24/7 — even when queued from offline mode.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 bg-[#FFCC00] text-[#1d1d1f] font-extrabold text-sm shrink-0 cursor-pointer"
        >
          Contact us
        </button>
      </div>
    </div>
  );
};
