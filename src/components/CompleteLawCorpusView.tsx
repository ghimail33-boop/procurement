import React, { useRef, useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ChevronRight, 
  Scale, 
  ShieldAlert, 
  Lightbulb, 
  Layers, 
  FileText,
  CheckCircle2,
  X,
  Sparkles,
  ExternalLink,
  AlertCircle,
  Eye,
  CheckCheck
} from 'lucide-react';
import { ACT_CHAPTERS, RULE_CHAPTERS, LawChapter } from '../data/completeLawData';
import { RULES_BY_ACT_PROVISION, ACT_BY_RULE_PROVISION } from '../data/lawProvisionIndex';
import {
  ACT_PROVISION_TEXT,
  RULE_PROVISION_TEXT,
} from '../data/lawProvisionText';
import {
  getOpinionsForAct,
  getOpinionsForRule,
  getDecisionsForAct,
  getDecisionsForRule,
  PrecedentOpinion,
  PrecedentDecision,
  OPINIONS_BY_ACT,
  OPINIONS_BY_RULE,
  DECISIONS_BY_ACT,
  DECISIONS_BY_RULE,
} from '../data/legalPrecedents';
import { PrecedentsSection } from './PrecedentsSection';
import { getAmendmentComparisonForRule } from '../data/amendmentComparisonsData';
import { AmendmentComparisonCard } from './AmendmentComparisonCard';

type LawType = 'act' | 'rules';
type ViewMode = 'all' | 'guide' | 'bare-law';

const normalizeProvisionNumber = (number: string) =>
  number.replace(/[०-९]/g, (digit) => String('०१२३४५६७८९'.indexOf(digit)));

const getProvisionText = (text: Record<string, string>, number: string) =>
  text[number] ??
  Object.entries(text).find(
    ([provisionNumber]) =>
      normalizeProvisionNumber(provisionNumber) === normalizeProvisionNumber(number)
  )?.[1];

const formatProvisionNumber = (number: string) =>
  number.replace(/[0-9]/g, (digit) => '०१२३४५६७८९'[Number(digit)]);

const getCleanNumbersFromSectionNo = (sectionNo: string): string[] => {
  const matches = sectionNo.match(/[०-९0-9]+[क-ह]?/g) ?? [];
  return matches.map((m) => normalizeProvisionNumber(m));
};

const doesSectionMatchProvision = (sectionNo: string, provisionNumber: string): boolean => {
  const normalizedTarget = normalizeProvisionNumber(provisionNumber);
  const sectionNumbers = getCleanNumbersFromSectionNo(sectionNo);
  return sectionNumbers.includes(normalizedTarget);
};

const getPrecedentsForSection = (sectionNo: string, lawType: LawType) => {
  const numbers = getCleanNumbersFromSectionNo(sectionNo);
  const opinions: PrecedentOpinion[] = [];
  const decisions: PrecedentDecision[] = [];
  const seenOpIds = new Set<string>();
  const seenDecIds = new Set<string>();

  for (const num of numbers) {
    const ops = lawType === 'act' ? getOpinionsForAct(num) : getOpinionsForRule(num);
    for (const op of ops) {
      if (!seenOpIds.has(op.id)) {
        seenOpIds.add(op.id);
        opinions.push(op);
      }
    }
    const decs = lawType === 'act' ? getDecisionsForAct(num) : getDecisionsForRule(num);
    for (const dec of decs) {
      if (!seenDecIds.has(dec.id)) {
        seenDecIds.add(dec.id);
        decisions.push(dec);
      }
    }
  }

  return { opinions, decisions };
};

const getProvisions = (text: Record<string, string>) =>
  Object.keys(text)
    .map((number) => ({ number }))
    .sort((left, right) =>
      normalizeProvisionNumber(left.number).localeCompare(
        normalizeProvisionNumber(right.number),
        'ne',
        { numeric: true }
      )
    );

const ACT_PROVISIONS = getProvisions(ACT_PROVISION_TEXT);
const RULE_PROVISIONS = getProvisions(RULE_PROVISION_TEXT);

export const CompleteLawCorpusView: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string>('all');
  const [activeLaw, setActiveLaw] = useState<LawType>('rules'); // Default to rules as user requested
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [selectedSourceNumber, setSelectedSourceNumber] = useState<string>(RULE_PROVISIONS[0].number);
  const provisionViewRef = useRef<HTMLDivElement>(null);
  const guideViewRef = useRef<HTMLDivElement>(null);

  const currentChapters = activeLaw === 'act' ? ACT_CHAPTERS : RULE_CHAPTERS;

  // Collect all unique tags for active law
  const allTags = Array.from(
    new Set(currentChapters.flatMap((ch) => ch.sections.flatMap((s) => s.tags)))
  );

  const provisions = activeLaw === 'act' ? ACT_PROVISIONS : RULE_PROVISIONS;
  const selectedSource = provisions.find(
    (provision) => normalizeProvisionNumber(provision.number) === normalizeProvisionNumber(selectedSourceNumber)
  ) ?? provisions[0];

  const selectedRelatedRules = activeLaw === 'act'
    ? RULES_BY_ACT_PROVISION[normalizeProvisionNumber(selectedSource.number)] ?? []
    : [];

  const selectedRelatedActs = activeLaw === 'rules'
    ? ACT_BY_RULE_PROVISION[normalizeProvisionNumber(selectedSource.number)] ?? []
    : [];

  const selectedProvisionText = getProvisionText(
    activeLaw === 'act' ? ACT_PROVISION_TEXT : RULE_PROVISION_TEXT,
    selectedSource.number
  );

  // Active bare provision precedents
  const activeBareOpinions = activeLaw === 'act'
    ? getOpinionsForAct(selectedSource.number)
    : getOpinionsForRule(selectedSource.number);

  const activeBareDecisions = activeLaw === 'act'
    ? getDecisionsForAct(selectedSource.number)
    : getDecisionsForRule(selectedSource.number);

  // Check if active bare provision has a simplified section using exact number matching
  const matchingSimplifiedSection = currentChapters
    .flatMap((ch) => ch.sections)
    .find((s) => doesSectionMatchProvision(s.sectionNo, selectedSource.number));

  const filteredProvisions = provisions.filter((provision) => {
    if (!searchQuery.trim()) return true;
    const query = normalizeProvisionNumber(searchQuery.trim().replace(/^(दफा|नियम)\s*/, ''));
    return normalizeProvisionNumber(provision.number).includes(query);
  });

  const selectLaw = (law: LawType) => {
    setActiveLaw(law);
    setSelectedChapterId('all');
    setActiveTag('all');
    setSelectedSourceNumber((law === 'act' ? ACT_PROVISIONS : RULE_PROVISIONS)[0].number);
  };

  const openRuleProvision = (number: string) => {
    setActiveLaw('rules');
    setSelectedSourceNumber(number);
    setViewMode('all');
    provisionViewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openActProvision = (number: string) => {
    setActiveLaw('act');
    setSelectedSourceNumber(number);
    setViewMode('all');
    provisionViewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openBareLawProvision = (sectionNo: string) => {
    const match = sectionNo.match(/[०-९0-9]+[क-ह]?/);
    if (match) {
      setSelectedSourceNumber(match[0]);
      setViewMode('all');
      provisionViewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredChapters = currentChapters.map((ch) => {
    if (selectedChapterId !== 'all' && ch.id !== selectedChapterId) {
      return null;
    }

    const matchedSections = ch.sections.filter((sec) => {
      if (activeTag !== 'all' && !sec.tags.includes(activeTag)) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const { opinions: secOps, decisions: secDecs } = getPrecedentsForSection(sec.sectionNo, activeLaw);
      const hasPrecedentMatch = secOps.some(
        (op) => op.subject.toLowerCase().includes(q) || op.opinion.toLowerCase().includes(q) || op.requestingEntity.toLowerCase().includes(q)
      ) || secDecs.some(
        (dec) => dec.subject.toLowerCase().includes(q) || dec.decision.toLowerCase().includes(q) || dec.applicant.toLowerCase().includes(q) || dec.respondent.toLowerCase().includes(q)
      );

      return (
        sec.sectionNo.toLowerCase().includes(q) ||
        sec.title.toLowerCase().includes(q) ||
        sec.officialSummary.toLowerCase().includes(q) ||
        sec.simpleExplanation.toLowerCase().includes(q) ||
        sec.complianceRule.toLowerCase().includes(q) ||
        (sec.practicalTip && sec.practicalTip.toLowerCase().includes(q)) ||
        (sec.amendmentNote && sec.amendmentNote.toLowerCase().includes(q)) ||
        (sec.relatedActSection && sec.relatedActSection.toLowerCase().includes(q)) ||
        sec.tags.some((t) => t.toLowerCase().includes(q)) ||
        hasPrecedentMatch
      );
    });

    if (matchedSections.length === 0) return null;

    return {
      ...ch,
      sections: matchedSections,
    };
  }).filter(Boolean);

  const totalSectionsCount = currentChapters.reduce((acc, ch) => acc + ch.sections.length, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wide">
            <BookOpen className="w-4 h-4" />
            <span>सार्वजनिक खरिद ऐन तथा नियमावलीको पूर्ण कानूनी गाइड संग्रह</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {activeLaw === 'rules' ? 'सार्वजनिक खरिद नियमावली, २०६४ (१६औँ संशोधनसहित)' : 'सार्वजनिक खरिद ऐन, २०६३ (संशोधनसहित)'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {activeLaw === 'rules' 
              ? 'नियमावलीका प्रमुख ६०+ नियमहरूको सरल नेपाली व्याख्या, अनिवार्य कानुनी सर्त, १६औँ संशोधनका विशेषता, व्यवहारिक सुझावहरू र १,२९५+ PPMO राय तथा २२१+ PPRC पुनरावलोकन फैसलाहरू।'
              : 'ऐनका सबै दफाहरूको आधिकारिक सारांश, सरल व्याख्या, नियमावलीका नियमहरूसँगको अन्तरसम्बन्ध र सम्बन्धित PPMO राय तथा PPRC फैसलाहरू।'}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
              🏛️ PPMO विगतका रायहरू: १,२९५+ (निर्माण, मालसामान, परामर्श, अन्य)
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 text-purple-900 border border-purple-200 text-xs font-semibold">
              ⚖️ PPRC पुनरावलोकन फैसलाहरू: २२१+
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold">
              💡 दफा र नियमहरूसँग प्रत्यक्ष अन्तरसम्बन्धित
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="नियम, दफा वा विषय खोज्नुहोस् (उदा: नियम ११०, भेरिएसन, म्याद थप)..."
            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-red-600 text-slate-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Law Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="कानूनी स्रोत छान्नुहोस्">
          <button
            type="button"
            role="tab"
            aria-selected={activeLaw === 'rules'}
            onClick={() => selectLaw('rules')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeLaw === 'rules'
                ? 'bg-red-700 text-white shadow-md shadow-red-700/20'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>नियमावलीका नियम र सरल गाइड (१६औँ संशोधन)</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono">{RULE_PROVISIONS.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeLaw === 'act'}
            onClick={() => selectLaw('act')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeLaw === 'act'
                ? 'bg-red-700 text-white shadow-md shadow-red-700/20'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>ऐनका सबै दफा र सरल गाइड</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono">{ACT_PROVISIONS.length}</span>
          </button>
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            दुवै सँगै हेर्नुहोस्
          </button>
          <button
            type="button"
            onClick={() => setViewMode('guide')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === 'guide' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            सरल गाइड मात्र
          </button>
          <button
            type="button"
            onClick={() => setViewMode('bare-law')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === 'bare-law' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            मूल कानूनी पाठ
          </button>
        </div>
      </div>

      {/* Official Bare Law Text Reader Section */}
      {(viewMode === 'all' || viewMode === 'bare-law') && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    {activeLaw === 'act' ? 'ऐनका दफा' : 'नियमावलीका नियम'} को आधिकारिक कानूनी पाठ
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  कुनै पनि व्यवस्था छानेर नेपाल राजपत्रमा प्रकाशित सक्कल पाठ पढ्न सक्नुहुन्छ।
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 self-start">
                {activeLaw === 'act' ? 'सार्वजनिक खरिद ऐन, २०६३' : 'सार्वजनिक खरिद नियमावली, २०६४'}
              </span>
            </div>

            {/* Quick Provision Buttons */}
            <div className="mt-3.5 max-h-36 overflow-y-auto pr-1">
              <div className="flex flex-wrap gap-1.5">
                {filteredProvisions.map((provision) => {
                  const isSelected =
                    normalizeProvisionNumber(provision.number) === normalizeProvisionNumber(selectedSource.number);
                  const opCount = (activeLaw === 'act' ? OPINIONS_BY_ACT : OPINIONS_BY_RULE)[normalizeProvisionNumber(provision.number)]?.length ?? 0;
                  const decCount = (activeLaw === 'act' ? DECISIONS_BY_ACT : DECISIONS_BY_RULE)[normalizeProvisionNumber(provision.number)]?.length ?? 0;
                  const totalPrecedents = opCount + decCount;
                  return (
                    <button
                      key={provision.number}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        setSelectedSourceNumber(provision.number);
                        provisionViewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`px-2.5 py-1 rounded-md border text-xs font-semibold transition-colors inline-flex items-center gap-1 ${
                        isSelected
                          ? 'bg-red-700 border-red-700 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-800'
                      }`}
                    >
                      <span>{activeLaw === 'act' ? 'दफा' : 'नियम'} {formatProvisionNumber(provision.number)}</span>
                      {totalPrecedents > 0 && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected ? 'bg-white/30 text-white' : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {totalPrecedents}
                        </span>
                      )}
                    </button>
                  );
                })}
                {filteredProvisions.length === 0 && (
                  <p className="text-xs text-slate-500 py-2">खोजसँग मिल्ने व्यवस्था भेटिएन।</p>
                )}
              </div>
            </div>
          </div>

          <div ref={provisionViewRef} className="scroll-mt-4 bg-slate-100/70 p-3 sm:p-4">
            <article className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-red-100 text-red-800 px-2.5 py-1 rounded-md">
                    {activeLaw === 'act' ? 'दफा' : 'नियम'} {formatProvisionNumber(selectedSource.number)}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    {matchingSimplifiedSection ? matchingSimplifiedSection.title : (activeLaw === 'act' ? 'ऐनको व्यवस्था' : 'नियमावलीको व्यवस्था')}
                  </h4>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {activeBareOpinions.length > 0 && (
                    <span className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">
                      🏛️ PPMO राय: {activeBareOpinions.length}
                    </span>
                  )}
                  {activeBareDecisions.length > 0 && (
                    <span className="text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-md">
                      ⚖️ PPRC फैसला: {activeBareDecisions.length}
                    </span>
                  )}
                  <span className="text-xs text-slate-500">
                    {activeLaw === 'act' ? 'नेपाल कानुन आयोग / राजपत्र' : '१६औँ संशोधन समावेश भएको मूल पाठ'}
                  </span>
                </div>
              </div>

              {selectedProvisionText ? (
                <p className="whitespace-pre-wrap break-words text-sm leading-8 text-slate-800 font-normal">
                  {selectedProvisionText}
                </p>
              ) : (
                <p role="alert" className="text-sm text-red-700">
                  यस व्यवस्थाको पाठ उपलब्ध भएन।
                </p>
              )}

              {/* Matching simplified explanation callout */}
              {matchingSimplifiedSection && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs sm:text-sm">
                  <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-bold text-blue-900 block mb-0.5">
                      💡 सरल नेपाली व्याख्या (Plain Language Meaning):
                    </span>
                    <p className="text-blue-950 leading-relaxed">{matchingSimplifiedSection.simpleExplanation}</p>
                    {matchingSimplifiedSection.practicalTip && (
                      <p className="text-blue-800 text-xs mt-2 font-medium italic bg-white/70 p-2 rounded-md border border-blue-100">
                        <span className="font-bold">व्यवहारिक सुझाव:</span> {matchingSimplifiedSection.practicalTip}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* 16th Amendment Comparison for Bare Law Provision */}
              {activeLaw === 'rules' && (() => {
                const comparison = getAmendmentComparisonForRule(selectedSource.number);
                if (!comparison) return null;
                return (
                  <div className="mt-4">
                    <AmendmentComparisonCard comparison={comparison} />
                  </div>
                );
              })()}

              {/* Related Rules when viewing Act */}
              {activeLaw === 'act' && selectedRelatedRules.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <span className="text-xs font-semibold text-slate-700">नियमावलीका सम्बन्धित नियमहरू:</span>
                  {selectedRelatedRules.map((number) => (
                    <button
                      key={number}
                      type="button"
                      onClick={() => openRuleProvision(number)}
                      className="px-2.5 py-1 rounded-md bg-white border border-amber-300 text-xs font-semibold text-amber-900 hover:bg-amber-100 shadow-xs"
                    >
                      नियम {formatProvisionNumber(number)} हेर्नुहोस्
                    </button>
                  ))}
                </div>
              )}

              {/* Related Act Sections when viewing Rules */}
              {activeLaw === 'rules' && selectedRelatedActs.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 p-3">
                  <span className="text-xs font-semibold text-slate-700">सम्बन्धित ऐनको मूल दफा:</span>
                  {selectedRelatedActs.map((number) => (
                    <button
                      key={number}
                      type="button"
                      onClick={() => openActProvision(number)}
                      className="px-2.5 py-1 rounded-md bg-white border border-red-300 text-xs font-semibold text-red-900 hover:bg-red-100 shadow-xs"
                    >
                      दफा {formatProvisionNumber(number)} हेर्नुहोस्
                    </button>
                  ))}
                </div>
              )}

              {/* Precedents (PPMO Opinions & PPRC Decisions) for Bare Law Provision */}
              {(activeBareOpinions.length > 0 || activeBareDecisions.length > 0) && (
                <div className="mt-5 pt-4 border-t border-slate-200">
                  <PrecedentsSection
                    provisionNumber={formatProvisionNumber(selectedSource.number)}
                    provisionTitle={matchingSimplifiedSection?.title}
                    lawType={activeLaw === 'act' ? 'act' : 'rule'}
                    opinions={activeBareOpinions}
                    decisions={activeBareDecisions}
                    defaultExpanded={false}
                  />
                </div>
              )}
            </article>
          </div>
        </section>
      )}

      {/* Simplified Guide & Practical Tips Section */}
      {(viewMode === 'all' || viewMode === 'guide') && (
        <div ref={guideViewRef} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span>
                  {activeLaw === 'rules' ? 'नियमावलीका नियमहरूको सरल व्याख्या तथा व्यवहारिक गाइड' : 'ऐनका दफाहरूको सरल व्याख्या तथा व्यवहारिक गाइड'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                कुल {totalSectionsCount} वटा महत्वपूर्ण व्यवस्थाहरूको बुँदागत विश्लेषण र अख्तियार/लेखापरीक्षण सतर्कता।
              </p>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full shrink-0">
              १६औँ संशोधन अनुसार अद्यावधिक
            </span>
          </div>

          {/* Chapter Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-medium">
            <button
              onClick={() => setSelectedChapterId('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedChapterId === 'all'
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              सबै परिच्छेदहरू ({currentChapters.length})
            </button>
            {currentChapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapterId(ch.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  selectedChapterId === ch.id
                    ? 'bg-red-700 text-white font-semibold shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {ch.chapterTitleNepali.split(':')[0]} ({ch.sections.length} व्यवस्था)
              </button>
            ))}
          </div>

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar text-xs">
            <span className="text-slate-500 font-medium whitespace-nowrap mr-1">मुख्य विषयवस्तु:</span>
            <button
              onClick={() => setActiveTag('all')}
              className={`px-2 py-0.5 rounded-md transition-colors whitespace-nowrap ${
                activeTag === 'all' ? 'bg-amber-100 text-amber-900 font-semibold' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              सबै विषय
            </button>
            {allTags.slice(0, 15).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`px-2 py-0.5 rounded-md transition-colors whitespace-nowrap ${
                  activeTag === t ? 'bg-amber-100 text-amber-900 font-semibold' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                #{t}
              </button>
            ))}
          </div>

          {/* Chapters & Sections List */}
          <div className="space-y-6 mt-4">
            {filteredChapters.map((ch: any) => (
              <div key={ch.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                {/* Chapter Header */}
                <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-sm">
                        {ch.sectionsCount}
                      </span>
                      <span className="text-xs font-medium text-slate-500 font-mono">
                        {ch.chapterTitleEnglish}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                      {ch.chapterTitleNepali}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 sm:max-w-md sm:text-right">
                    {ch.summary}
                  </p>
                </div>

                {/* Sections in this chapter */}
                <div className="divide-y divide-slate-100">
                  {ch.sections.map((sec: any) => {
                    const { opinions: secOpinions, decisions: secDecisions } = getPrecedentsForSection(sec.sectionNo, activeLaw);
                    const amendmentComp = activeLaw === 'rules' ? getAmendmentComparisonForRule(sec.sectionNo) : undefined;
                    return (
                    <div key={sec.sectionNo} className="p-5 sm:p-6 hover:bg-slate-50/50 transition-colors text-left space-y-3">
                      {/* Title & Section Tag */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-sm font-mono">
                            {sec.sectionNo}
                          </span>
                          <h4 className="text-base font-bold text-slate-900">
                            {sec.title}
                          </h4>
                          {sec.relatedActSection && (
                            <span className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
                              {sec.relatedActSection}
                            </span>
                          )}
                          {amendmentComp && (
                            <span className="text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                              ✨ १६औँ संशोधन भिन्नता
                            </span>
                          )}
                          {secOpinions.length > 0 && (
                            <span className="text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                              🏛️ राय: {secOpinions.length}
                            </span>
                          )}
                          {secDecisions.length > 0 && (
                            <span className="text-[11px] font-bold text-purple-900 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                              ⚖️ फैसला: {secDecisions.length}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                          {sec.tags.map((t: string) => (
                            <span key={t} className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                              #{t}
                            </span>
                          ))}
                          <button
                            type="button"
                            onClick={() => openBareLawProvision(sec.sectionNo)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-200 transition-colors ml-1"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-600" />
                            मूल पाठ
                          </button>
                        </div>
                      </div>

                      {/* 16th Amendment Comparison or Alert */}
                      {amendmentComp ? (
                        <AmendmentComparisonCard comparison={amendmentComp} />
                      ) : (
                        sec.amendmentNote && (
                          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-amber-900 block">१६औँ संशोधनको विशेष व्यवस्था:</span>
                              <p className="leading-relaxed">{sec.amendmentNote}</p>
                            </div>
                          </div>
                        )
                      )}

                      {/* 1. Official Summary */}
                      <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <span className="font-bold text-slate-900 block mb-0.5">कानूनी व्यवस्था (Legal Provision):</span>
                        {sec.officialSummary}
                      </div>

                      {/* 2. Plain Language Breakdown (सरल व्याख्या) */}
                      <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs sm:text-sm text-blue-950 flex items-start gap-2.5">
                        <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-blue-900 block mb-0.5">सरल जानकारी (What this means in plain words):</span>
                          <p className="leading-relaxed">{sec.simpleExplanation}</p>
                        </div>
                      </div>

                      {/* 3. Mandatory Rule / Caution */}
                      <div className="p-3 bg-red-50/40 rounded-xl border border-red-100 text-xs text-red-950 flex items-start gap-2.5">
                        <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-red-900 block mb-0.5">अनिवार्य पालना गर्नुपर्ने कानूनी सर्त (Compliance Rule):</span>
                          <p>{sec.complianceRule}</p>
                        </div>
                      </div>

                      {/* 4. Practical Tip / Audit Red Flag */}
                      {sec.practicalTip && (
                        <div className="text-xs text-emerald-950 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 flex items-start gap-2">
                          <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-emerald-900 block mb-0.5">व्यवहारिक सुझाव तथा लेखापरीक्षण/अख्तियार सतर्कता:</span>
                            <p className="leading-relaxed">{sec.practicalTip}</p>
                          </div>
                        </div>
                      )}

                      {/* Cross references */}
                      {activeLaw === 'act' && (() => {
                        const actNumbers = sec.sectionNo.match(/[०-९0-9]+[क-ह]?/g) ?? [];
                        const relatedRules = Array.from(new Set<string>(
                          actNumbers.flatMap((number: string) =>
                            RULES_BY_ACT_PROVISION[normalizeProvisionNumber(number)] ?? []
                          )
                        ));
                        if (relatedRules.length === 0) return null;
                        return (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-xs font-semibold text-slate-600">नियमावलीको व्यवस्था हेर्नुहोस्:</span>
                            {relatedRules.map((number) => (
                              <button
                                key={number}
                                type="button"
                                onClick={() => openRuleProvision(number)}
                                className="px-2 py-1 rounded-md bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 hover:bg-amber-100"
                              >
                                नियम {formatProvisionNumber(number)} हेर्नुहोस्
                              </button>
                            ))}
                          </div>
                        );
                      })()}

                      {activeLaw === 'rules' && (() => {
                        const ruleNumbers = sec.sectionNo.match(/[०-९0-9]+[क-ह]?/g) ?? [];
                        const relatedActs = Array.from(new Set<string>(
                          ruleNumbers.flatMap((number: string) =>
                            ACT_BY_RULE_PROVISION[normalizeProvisionNumber(number)] ?? []
                          )
                        ));
                        if (relatedActs.length === 0) return null;
                        return (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-xs font-semibold text-slate-600">ऐनको मूल दफा हेर्नुहोस्:</span>
                            {relatedActs.map((number) => (
                              <button
                                key={number}
                                type="button"
                                onClick={() => openActProvision(number)}
                                className="px-2 py-1 rounded-md bg-red-50 border border-red-200 text-xs font-semibold text-red-900 hover:bg-red-100"
                              >
                                दफा {formatProvisionNumber(number)} हेर्नुहोस्
                              </button>
                            ))}
                          </div>
                        );
                      })()}

                      {/* Linked Precedents: PPMO Opinions and PPRC Decisions */}
                      {(secOpinions.length > 0 || secDecisions.length > 0) && (
                        <div className="pt-2">
                          <PrecedentsSection
                            provisionNumber={sec.sectionNo}
                            provisionTitle={sec.title}
                            lawType={activeLaw === 'act' ? 'act' : 'rule'}
                            opinions={secOpinions}
                            decisions={secDecisions}
                            defaultExpanded={false}
                          />
                        </div>
                      )}
                    </div>
                  );
                  })}
                </div>
              </div>
            ))}

            {filteredChapters.length === 0 && (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="text-base font-bold text-slate-800">कुनै व्यवस्था भेटिएन</h4>
                <p className="text-xs text-slate-500 mt-1">
                  तपाईंको खोजी वा फिल्टरसँग मिल्ने नियम भेटिएन। कृपया खोज शब्द परिवर्तन गर्नुहोस् वा फिल्टर रिसेट गर्नुहोस्।
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedChapterId('all'); setActiveTag('all'); }}
                  className="mt-3 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded-lg transition-colors"
                >
                  फिल्टर रिसेट गर्नुहोस्
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
