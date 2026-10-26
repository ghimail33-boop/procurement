import React, { useState, useMemo } from 'react';
import {
  BookA,
  Search,
  Filter,
  Lightbulb,
  Scale,
  AlertTriangle,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
  FileCheck2,
  X
} from 'lucide-react';
import { PROCUREMENT_GLOSSARY, GlossaryTerm } from '../data/procurementGlossaryData';

export const ProcurementGlossaryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  const categories = [
    { id: 'all', label: 'सबै शब्दावली', count: PROCUREMENT_GLOSSARY.length },
    { id: 'evaluation', label: 'बोलपत्र तथा मूल्याङ्कन', count: PROCUREMENT_GLOSSARY.filter(t => t.category === 'evaluation').length },
    { id: 'contract', label: 'ठेक्का प्रशासन र सम्झौता', count: PROCUREMENT_GLOSSARY.filter(t => t.category === 'contract').length },
    { id: 'security', label: 'जमानत तथा भुक्तानी', count: PROCUREMENT_GLOSSARY.filter(t => t.category === 'security').length },
    { id: 'methods', label: 'खरिद विधि तथा कागजात', count: PROCUREMENT_GLOSSARY.filter(t => t.category === 'methods').length },
    { id: 'governance', label: 'संस्थागत तथा आचरण', count: PROCUREMENT_GLOSSARY.filter(t => t.category === 'governance').length },
  ];

  // Distinct first letters for quick alphabet index
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    PROCUREMENT_GLOSSARY.forEach(term => {
      const firstLetter = term.termEnglish.charAt(0).toUpperCase();
      if (firstLetter) letters.add(firstLetter);
    });
    return Array.from(letters).sort();
  }, []);

  const filteredTerms = useMemo(() => {
    return PROCUREMENT_GLOSSARY.filter(term => {
      if (selectedCategory !== 'all' && term.category !== selectedCategory) return false;
      if (selectedLetter !== 'all' && term.termEnglish.charAt(0).toUpperCase() !== selectedLetter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          term.termEnglish.toLowerCase().includes(q) ||
          term.termNepali.toLowerCase().includes(q) ||
          term.shortDefinition.toLowerCase().includes(q) ||
          term.detailedExplanation.toLowerCase().includes(q) ||
          term.practicalExample.toLowerCase().includes(q) ||
          term.legalReference.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'evaluation':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'contract':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'security':
        return 'bg-purple-50 text-purple-900 border-purple-200';
      case 'methods':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200';
      case 'governance':
      default:
        return 'bg-rose-50 text-rose-900 border-rose-200';
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wide mb-1">
          <BookA className="w-4 h-4 text-blue-300" />
          <span>सार्वजनिक खरिद पारिभाषिक शब्दावली तथा व्यवहारिक शब्दकोश</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white">
          खरिद शब्दावली कोष (Procurement Layman Dictionary)
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          खरिद प्रक्रियामा बारम्बार प्रयोग हुने जटिल कानुनी, वित्तीय र प्राविधिक शब्दहरू (जस्तै: Substantially Responsive, Front Loading, Two-Envelope, Liquidated Damages आदि) को सरल नेपाली व्याख्या, व्यवहारिक उदाहरण र कानुनी आधार।
        </p>

        {/* Quick Search */}
        <div className="mt-5 relative max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="अंग्रेजी वा नेपाली शब्द, दफा वा विषय खोज्नुहोस् (उदा: Substantially Responsive, Front Loading, LD)..."
            className="w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Alphabet bar */}
      <div className="space-y-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-medium">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setSelectedLetter('all'); }}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${selectedCategory === cat.id
                  ? 'bg-blue-700 text-white font-bold shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* A-Z Alphabetical Quick Jump */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar text-xs">
          <span className="text-slate-400 font-semibold mr-1">वर्णानुक्रम:</span>
          <button
            onClick={() => setSelectedLetter('all')}
            className={`px-2 py-0.5 rounded-md transition-colors ${selectedLetter === 'all'
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            सबै
          </button>
          {availableLetters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors font-mono font-bold ${selectedLetter === letter
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredTerms.map((term) => (
          <div
            key={term.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header: English, Nepali, Category */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getCategoryColor(term.category)}`}>
                      {term.categoryLabel}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {term.legalReference}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                    {term.termEnglish}
                  </h3>
                  <p className="text-xs font-semibold text-blue-700">
                    {term.termNepali}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(`${term.termEnglish} (${term.termNepali}): ${term.shortDefinition}\n\nव्याख्या: ${term.detailedExplanation}\nउदाहरण: ${term.practicalExample}`, term.id)}
                  title="विवरण कपी गर्नुहोस्"
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                >
                  {copiedId === term.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* 1. Layman Definition */}
              <div className="mt-3 p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs sm:text-sm text-blue-950 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-blue-900 block mb-0.5">सरल परिभाषा (Plain Meaning):</span>
                  <p className="leading-relaxed">{term.shortDefinition}</p>
                </div>
              </div>

              {/* 2. Detailed Explanation */}
              <div className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-0.5">विस्तृत बुझाइ (Concept Breakdown):</span>
                <p>{term.detailedExplanation}</p>
              </div>

              {/* 3. Practical Example */}
              <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-800">
                <span className="font-bold text-slate-900 block mb-0.5">🛠️ व्यवहारिक उदाहरण (Practical Example):</span>
                <p className="italic leading-relaxed">{term.practicalExample}</p>
              </div>
            </div>

            {/* Bottom Audit Alert */}
            <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-xs text-amber-900 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-950">लेखापरीक्षण/अख्तियार सतर्कता: </span>
                <span>{term.auditProTip}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredTerms.length === 0 && (
          <div className="col-span-full bg-white p-8 rounded-2xl border border-slate-200 text-center">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-base font-bold text-slate-800">कुनै शब्दावली भेटिएन</h4>
            <p className="text-xs text-slate-500 mt-1">
              तपाईंको खोजी वा फिल्टरसँग मिल्ने शब्द भेटिएन। कृपया खोज शब्द परिवर्तन गर्नुहोस्।
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedLetter('all'); }}
              className="mt-3 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded-lg transition-colors"
            >
              फिल्टर रिसेट गर्नुहोस्
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
