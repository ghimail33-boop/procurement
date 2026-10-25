import React, { useState, useMemo } from 'react';
import { 
  Scale, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Filter, 
  Search, 
  Building2, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  FileText,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { PrecedentOpinion, PrecedentDecision } from '../data/legalPrecedents';

interface PrecedentsSectionProps {
  provisionTitle?: string;
  provisionNumber: string;
  lawType: 'act' | 'rule';
  opinions: PrecedentOpinion[];
  decisions: PrecedentDecision[];
  defaultExpanded?: boolean;
}

export const PrecedentsSection: React.FC<PrecedentsSectionProps> = ({
  provisionTitle,
  provisionNumber,
  lawType,
  opinions,
  decisions,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const [activeTab, setActiveTab] = useState<'opinions' | 'decisions'>('opinions');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOpinion, setSelectedOpinion] = useState<PrecedentOpinion | null>(null);
  const [selectedDecision, setSelectedDecision] = useState<PrecedentDecision | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const totalCount = opinions.length + decisions.length;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredOpinions = useMemo(() => {
    return opinions.filter((op) => {
      if (selectedCategory !== 'all' && op.categoryKey !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          op.subject.toLowerCase().includes(q) ||
          op.opinion.toLowerCase().includes(q) ||
          op.requestingEntity.toLowerCase().includes(q) ||
          op.date.includes(q)
        );
      }
      return true;
    });
  }, [opinions, selectedCategory, searchQuery]);

  const filteredDecisions = useMemo(() => {
    return decisions.filter((dec) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          dec.subject.toLowerCase().includes(q) ||
          dec.decision.toLowerCase().includes(q) ||
          dec.use.toLowerCase().includes(q) ||
          dec.applicant.toLowerCase().includes(q) ||
          dec.respondent.toLowerCase().includes(q) ||
          dec.type.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [decisions, searchQuery]);

  if (totalCount === 0) {
    return null;
  }

  const getCategoryBadgeClass = (categoryKey: string) => {
    switch (categoryKey) {
      case 'construction':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'goods':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'services':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'misc':
      default:
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
  };

  const getDecisionTypeBadge = (type: string) => {
    if (type.includes('बदर') || type.includes('रद्द')) {
      return {
        bg: 'bg-rose-50 text-rose-800 border-rose-200',
        icon: AlertCircle,
        label: 'निर्णय बदर / पुनर्मूल्याङ्कन',
      };
    }
    if (type.includes('खारेज')) {
      return {
        bg: 'bg-slate-100 text-slate-700 border-slate-200',
        icon: XCircle,
        label: 'निवेदन खारेज',
      };
    }
    return {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: CheckCircle2,
      label: type || 'अन्य फैसला',
    };
  };

  return (
    <div className="rounded-xl border border-indigo-200/80 bg-linear-to-r from-indigo-50/40 via-purple-50/20 to-white overflow-hidden shadow-xs">
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-indigo-50/60 transition-colors"
      >
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                नजिर तथा व्यावहारिक रायहरू (Precedents & Guidance)
              </span>
              <span className="text-[11px] font-semibold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-mono">
                कुल {totalCount} वटा
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {lawType === 'act' ? `दफा ${provisionNumber}` : `नियम ${provisionNumber}`} सँग सम्बन्धित PPMO का विगतका राय र PPRC का पुनरावलोकन फैसलाहरू।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold">
            {opinions.length > 0 && (
              <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-md">
                🏛️ PPMO राय: {opinions.length}
              </span>
            )}
            {decisions.length > 0 && (
              <span className="bg-purple-100 text-purple-900 border border-purple-200 px-2.5 py-1 rounded-md">
                ⚖️ PPRC फैसला: {decisions.length}
              </span>
            )}
          </div>
          <div className="p-1 rounded-md bg-white border border-slate-200 text-slate-500">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* Expanded Body */}
      {isExpanded && (
        <div className="border-t border-indigo-100 p-3 sm:p-5 bg-white/95 space-y-4">
          {/* Sub Navigation (PPMO Opinions vs PPRC Decisions) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('opinions')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'opinions'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>🏛️ PPMO का विगतका रायहरू</span>
                <span className="bg-white/20 px-1.5 py-0.2 rounded-full font-mono text-[10px]">
                  {opinions.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('decisions')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'decisions'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>⚖️ PPRC पुनरावलोकन फैसलाहरू</span>
                <span className="bg-white/20 px-1.5 py-0.2 rounded-full font-mono text-[10px]">
                  {decisions.length}
                </span>
              </button>
            </div>

            {/* In-tab Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="नजिर वा विषय खोज्नुहोस्..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-600 text-slate-900"
              />
            </div>
          </div>

          {/* Category Filter Pills (When on Opinions tab) */}
          {activeTab === 'opinions' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-500 font-medium whitespace-nowrap">खरिद क्षेत्र:</span>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                सबै ({opinions.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('construction')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors whitespace-nowrap ${
                  selectedCategory === 'construction'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                निर्माण ({opinions.filter((o) => o.categoryKey === 'construction').length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('goods')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors whitespace-nowrap ${
                  selectedCategory === 'goods'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                मालसामान ({opinions.filter((o) => o.categoryKey === 'goods').length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('services')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors whitespace-nowrap ${
                  selectedCategory === 'services'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100'
                }`}
              >
                परामर्श ({opinions.filter((o) => o.categoryKey === 'services').length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('misc')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors whitespace-nowrap ${
                  selectedCategory === 'misc'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                अन्य/विविध ({opinions.filter((o) => o.categoryKey === 'misc').length})
              </button>
            </div>
          )}

          {/* Content: Opinions List */}
          {activeTab === 'opinions' && (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredOpinions.map((op) => (
                <article
                  key={op.id}
                  className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-indigo-300 hover:shadow-xs transition-all space-y-2.5 text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getCategoryBadgeClass(op.categoryKey)}`}>
                        {op.category}
                      </span>
                      {op.date && (
                        <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {op.date}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500 font-mono">
                        राय नं. {op.no}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(`${op.subject}\n\nराय:\n${op.opinion}`, op.id)}
                      className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md self-start sm:self-auto"
                    >
                      {copiedId === op.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">कपी गरियो!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>कपी</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Requesting Entity */}
                  {op.requestingEntity && (
                    <div className="flex items-center gap-1.5 text-xs text-indigo-900 font-semibold">
                      <Building2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{op.requestingEntity}</span>
                    </div>
                  )}

                  {/* Subject Query */}
                  <div className="text-xs text-slate-800 leading-relaxed font-medium bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-0.5">माग भएको रायको विषय:</span>
                    {op.subject}
                  </div>

                  {/* PPMO Binding Opinion */}
                  <div className="text-xs text-slate-800 leading-relaxed bg-amber-50/70 p-3 rounded-lg border border-amber-200/80">
                    <span className="font-bold text-amber-950 block mb-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      सार्वजनिक खरिद अनुगमन कार्यालय (PPMO) को राय:
                    </span>
                    <p className="whitespace-pre-wrap">{op.opinion}</p>
                  </div>

                  {/* Cross references */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                    {op.act && <span>ऐन: <strong className="text-slate-700">{op.act}</strong></span>}
                    {op.rule && <span>नियमावली: <strong className="text-slate-700">{op.rule}</strong></span>}
                  </div>
                </article>
              ))}

              {filteredOpinions.length === 0 && (
                <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500">खोजसँग मिल्ने कुनै PPMO राय भेटिएन।</p>
                </div>
              )}
            </div>
          )}

          {/* Content: Decisions List */}
          {activeTab === 'decisions' && (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredDecisions.map((dec) => {
                const badge = getDecisionTypeBadge(dec.type);
                const BadgeIcon = badge.icon;
                return (
                  <article
                    key={dec.id}
                    className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-purple-300 hover:shadow-xs transition-all space-y-2.5 text-left"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold bg-purple-100 text-purple-900 border border-purple-200 px-2 py-0.5 rounded-md font-mono">
                          PPRC फैसला नं. {dec.no}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border ${badge.bg}`}>
                          <BadgeIcon className="w-3 h-3 shrink-0" />
                          {badge.label}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(`${dec.use}\n\nफैसला:\n${dec.decision}`, dec.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md self-start sm:self-auto"
                      >
                        {copiedId === dec.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">कपी गरियो!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>कपी</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Parties */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-lg border border-slate-200">
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 block">निवेदक (Applicant):</span>
                        <span className="text-slate-900 font-medium">{dec.applicant || '—'}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 block">विपक्षी (Respondent):</span>
                        <span className="text-slate-900 font-medium">{dec.respondent || '—'}</span>
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="text-xs text-slate-700">
                      <span className="font-bold text-slate-900">विवादको विषय: </span>
                      {dec.subject}
                    </div>

                    {/* Key Legal Takeaway / Principle */}
                    {dec.use && (
                      <div className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-200/80 text-xs text-indigo-950">
                        <span className="font-bold text-indigo-900 block mb-0.5 flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-indigo-700" />
                          कायम भएको कानूनी सिद्धान्त (Legal Principle Applied):
                        </span>
                        <p className="leading-relaxed font-medium">{dec.use}</p>
                      </div>
                    )}

                    {/* Decision Full Text */}
                    <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-200/70 text-xs text-purple-950">
                      <span className="font-bold text-purple-900 block mb-0.5">पुनरावलोकन समितिको फैसला / आदेश:</span>
                      <p className="leading-relaxed whitespace-pre-wrap">{dec.decision}</p>
                    </div>

                    {/* Law references */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                      {dec.act && <span>ऐन: <strong className="text-slate-700">{dec.act}</strong></span>}
                      {dec.rule && <span>नियमावली: <strong className="text-slate-700">{dec.rule}</strong></span>}
                    </div>
                  </article>
                );
              })}

              {filteredDecisions.length === 0 && (
                <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500">खोजसँग मिल्ने कुनै PPRC फैसला भेटिएन।</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
