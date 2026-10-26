import React, { useState, useMemo } from 'react';
import delNewImage from '../../del_new.webp';
import {
  HelpCircle,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Scale,
  FileText,
  Copy,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { PROCUREMENT_DILEMMAS, ProcurementDilemma } from '../data/procurementDilemmasData';

export const ProcurementDilemmaSolverView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(PROCUREMENT_DILEMMAS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'सबै अन्योलहरू', count: PROCUREMENT_DILEMMAS.length },
    { id: 'evaluation', label: 'बोलपत्र तथा मूल्याङ्कन', count: PROCUREMENT_DILEMMAS.filter(d => d.category === 'evaluation').length },
    { id: 'pricing', label: 'दररेट तथा लागत अनुमान', count: PROCUREMENT_DILEMMAS.filter(d => d.category === 'pricing').length },
    { id: 'user-committee', label: 'उपभोक्ता समिति', count: PROCUREMENT_DILEMMAS.filter(d => d.category === 'user-committee').length },
    { id: 'extension-ld', label: 'म्याद थप र हर्जाना', count: PROCUREMENT_DILEMMAS.filter(d => d.category === 'extension-ld').length },
    { id: 'contract-admin', label: 'ठेक्का प्रशासन र भेरिएसन', count: PROCUREMENT_DILEMMAS.filter(d => d.category === 'contract-admin').length },
    { id: 'securities', label: 'जमानत तथा भुक्तानी', count: PROCUREMENT_DILEMMAS.filter(d => d.category === 'securities').length },
  ];

  const filteredDilemmas = useMemo(() => {
    return PROCUREMENT_DILEMMAS.filter(d => {
      if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          d.question.toLowerCase().includes(q) ||
          d.scenario.toLowerCase().includes(q) ||
          d.verdict.toLowerCase().includes(q) ||
          d.legalClauses.some(c => c.toLowerCase().includes(q)) ||
          d.stepByStep.some(s => s.toLowerCase().includes(q)) ||
          d.doNotDo.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white p-4 sm:py-5 sm:px-7 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-[58%]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 uppercase tracking-wide mb-0.5">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-300" />
            <span>दैनिक कार्यसम्पादनमा आइपर्ने अन्योल र कानूनी समाधान गाइड</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-white">
            व्यवहारिक समस्या समाधान गाइड (Procurement Dilemma & Case Solver)
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-300 mt-1 max-w-2xl leading-normal">
            खरिद प्रक्रियाको क्रममा आइपर्ने वास्तविक अन्योलहरू—जस्तै: एक मात्र बोलपत्र स्वीकृत गर्ने कि नगर्ने? लागत अनुमान भन्दा बढी कबोल परे के गर्ने? उपभोक्ता समितिमा मेसिन प्रयोग गर्न मिल्छ कि मिल्दैन?—को स्पष्ट निष्कर्ष, चरणबद्ध उपाय, र निर्णय टिप्पणीको नमुना।
          </p>

          {/* Quick Search */}
          <div className="mt-3 relative max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="समस्या वा शब्द खोज्नुहोस् (उदा: एक मात्र बोलपत्र, ३०%, डोजर, हर्जाना, भेरिएसन)..."
              className="w-full pl-10 pr-10 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
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

        <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%]">
          <img
            src={delNewImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/35 via-teal-950/50 to-slate-900/65" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-teal-950 via-teal-950/40 to-transparent" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-medium">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${selectedCategory === cat.id
                ? 'bg-emerald-700 text-white font-bold shadow-xs'
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

      {/* Dilemmas List */}
      <div className="space-y-4">
        {filteredDilemmas.map((dilemma) => {
          const isExpanded = expandedId === dilemma.id;
          return (
            <div
              key={dilemma.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${isExpanded ? 'border-emerald-300 shadow-md ring-1 ring-emerald-200' : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
            >
              {/* Question Header Accordion Trigger */}
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : dilemma.id)}
                className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 font-bold ${isExpanded ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                    }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        {dilemma.categoryLabel}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {dilemma.question}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {dilemma.scenario}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 p-1 text-slate-400 hover:text-slate-600">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Expanded Deep-Dive Content */}
              {isExpanded && (
                <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/30 space-y-4">
                  {/* Real-World Scenario Background */}
                  <div className="bg-slate-100/80 p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-1">
                      📋 वास्तविक कार्यक्षेत्रको अवस्था (The Problem Scenario):
                    </span>
                    <p className="italic">{dilemma.scenario}</p>
                  </div>

                  {/* Immediate Clear Verdict */}
                  <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-emerald-900 block text-sm sm:text-base">
                        ⚡ तत्काल गर्नुपर्ने स्पष्ट निष्कर्ष (Actionable Verdict):
                      </span>
                      <p className="leading-relaxed font-medium">{dilemma.verdict}</p>
                    </div>
                  </div>

                  {/* Step-by-Step Actionable Checklist */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2">
                    <span className="font-bold text-slate-900 block mb-1.5 flex items-center gap-1.5">
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                      <span>चरणबद्ध समाधान प्रक्रिया (Step-by-Step Procedure):</span>
                    </span>
                    <div className="space-y-1.5">
                      {dilemma.stepByStep.map((step, idx) => (
                        <p key={idx} className="text-slate-700 leading-relaxed pl-1">
                          {step}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Legal Clauses & Precedents */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Legal References */}
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200/80">
                      <div className="flex items-center gap-1.5 text-blue-900 font-bold mb-1.5">
                        <Scale className="w-3.5 h-3.5" />
                        <span>सम्बन्धित कानूनी दफा तथा नियमहरू:</span>
                      </div>
                      <ul className="space-y-1 text-slate-700">
                        {dilemma.legalClauses.map((clause, idx) => (
                          <li key={idx} className="list-disc list-inside">
                            {clause}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Precedent Reference */}
                    <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-200/80">
                      <div className="flex items-center gap-1.5 text-purple-900 font-bold mb-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>PPMO राय / PPRC नजिर निष्कर्ष:</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        {dilemma.ppmoPprcPrecedent}
                      </p>
                    </div>
                  </div>

                  {/* Fatal Mistake / Audit Red Flag (Do Not Do) */}
                  <div className="p-3.5 bg-rose-50/70 rounded-xl border border-rose-200 text-xs sm:text-sm text-rose-950 flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-rose-900 block mb-0.5">
                        🚨 झुक्किएर पनि गर्न नहुने गल्ती (Fatal Audit Mistake):
                      </span>
                      <p className="leading-relaxed">{dilemma.doNotDo}</p>
                    </div>
                  </div>

                  {/* Draft Minute Note Snippet (निर्णय टिप्पणीको नमुना) */}
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span>निर्णय टिप्पणीमा लेख्नुपर्ने कानूनी व्यहोरा (Sample Minute Note):</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(dilemma.minuteSnippet, `minute-${dilemma.id}`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md text-xs font-semibold text-slate-200 transition-colors"
                      >
                        {copiedId === `minute-${dilemma.id}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">कपी भयो!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>कपी गर्नुहोस्</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {dilemma.minuteSnippet}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredDilemmas.length === 0 && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-base font-bold text-slate-800">कुनै अन्योल भेटिएन</h4>
            <p className="text-xs text-slate-500 mt-1">
              तपाईंको खोजीसँग मिल्ने समस्या भेटिएन। कृपया अन्य खोज शब्द प्रयास गर्नुहोस्।
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
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
