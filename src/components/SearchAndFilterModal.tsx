import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Layers, 
  BookOpen, 
  FileCheck2, 
  ClipboardList, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { 
  PROCUREMENT_METHODS, 
  PROCUREMENT_STAGES, 
  COMPLIANCE_CHECKLIST_MASTER, 
  KEY_LEGAL_CLAUSES, 
  OFFICIAL_SCHEDULES 
} from '../data/procurementData';
import { ACT_CHAPTERS, RULE_CHAPTERS } from '../data/completeLawData';
import { PROCUREMENT_GLOSSARY } from '../data/procurementGlossaryData';
import { PROCUREMENT_DILEMMAS } from '../data/procurementDilemmasData';
import { PROCUREMENT_TEMPLATES } from '../data/templatesData';
import { ProcurementType } from '../types/procurement';
import { 
  HelpCircle, 
  BookA, 
  FileText 
} from 'lucide-react';

const SEARCH_TERM_ALIASES: Record<string, string[]> = {
  'कालोसूची': ['कालोसूची', 'blacklisting'],
  'धरौटी जफत': ['धरौटी', 'जफत', 'जमानत'],
  'भेरिएसन': ['भेरिएसन', 'variation'],
  'सवारी साधन भाडा': ['सवारी', 'भाडा'],
  'उपभोक्ता समिति': ['उपभोक्ता', 'समिति'],
  'औसत अङ्क नजिक': ['औसत', 'अङ्क'],
  '३०% घटेको': ['३०%'],
  '५ वटा ठेक्का सीमा': ['५', 'ठेक्का'],
  'भेरिएसन सीमा': ['भेरिएसन'],
  'रिटेन्सन मनी ५%': ['रिटेन्सन'],
  'एकल बोलपत्र': ['एकल', 'एउटा'],
  'प्रि-बिड बैठक': ['प्रि-बिड', 'बैठक'],
  'म्याद थप': ['म्याद', 'थप'],
  'मोबिलाइजेसन पेश्की': ['मोबिलाइजेसन', 'पेश्की'],
};

const searchableText = (value: unknown): string => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value).toLocaleLowerCase();
  }
  if (Array.isArray(value)) {
    return value.map(searchableText).join(' ');
  }
  if (value && typeof value === 'object') {
    return Object.values(value).map(searchableText).join(' ');
  }
  return '';
};

const matchesSearch = (value: unknown, term: string): boolean => {
  const normalizedTerm = term.normalize('NFC').toLocaleLowerCase();
  const text = searchableText(value).normalize('NFC');
  const terms = SEARCH_TERM_ALIASES[normalizedTerm] ?? normalizedTerm.split(/\s+/).filter(Boolean);
  return terms.every((part) => text.includes(part));
};

interface SearchAndFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (category: 'method' | 'stage' | 'checklist' | 'clause' | 'schedule' | 'dilemma' | 'glossary' | 'template', id: string) => void;
}

export const SearchAndFilterModal: React.FC<SearchAndFilterModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ProcurementType | 'all'>('all');
  const [selectedThreshold, setSelectedThreshold] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedContentType, setSelectedContentType] = useState<'all' | 'methods' | 'clauses' | 'checklists' | 'schedules' | 'dilemmas' | 'glossary' | 'templates'>('all');

  // Quick preset keywords for quick search
  const quickSearches = [
    'कालोसूची',
    'धरौटी जफत',
    'भेरिएसन',
    'सवारी साधन भाडा',
    'उपभोक्ता समिति',
    '३०% घटेको',
    '५ वटा ठेक्का सीमा',
    'औसत अङ्क नजिक',
    'मोबिलाइजेसन पेश्की',
    'म्याद थप',
    'एकल बोलपत्र',
    'प्रि-बिड बैठक',
    'रिटेन्सन मनी ५%',
    'कार्यस्थल सूचना पाटी',
  ];

  // Filtering Logic
  const filteredResults = useMemo(() => {
    const term = searchTerm.trim().toLocaleLowerCase();

    // 1. Filter Methods
    const matchedMethods = (selectedContentType === 'all' || selectedContentType === 'methods')
      ? PROCUREMENT_METHODS.filter((m) => {
          // Category filter
          if (selectedType !== 'all' && !m.category.includes(selectedType)) return false;

          // Threshold filter
          if (selectedThreshold === 'under-15lakh' && (m.minAmount && m.minAmount > 1500000)) return false;
          if (selectedThreshold === '15lakh-20lakh' && m.id !== 'sealed-quotation' && m.id !== 'direct-procurement') return false;
          if (selectedThreshold === '20lakh-2crore' && m.minAmount && m.minAmount > 20000000) return false;
          if (selectedThreshold === '2crore-5arab' && m.maxAmount && m.maxAmount < 20000000) return false;
          if (selectedThreshold === 'above-5arab' && (!m.maxAmount || m.maxAmount < 5000000000)) return false;

          // Text search
          if (!term) return true;
          return matchesSearch(m, term);
        })
      : [];

    // 2. Filter Legal Clauses & Act / Rule Sections
    const allClausesList = [
      ...KEY_LEGAL_CLAUSES,
      ...ACT_CHAPTERS.flatMap((ch) =>
        ch.sections.map((s) => ({
          id: s.sectionNo,
          lawType: ch.lawType,
          clauseNumber: s.sectionNo,
          title: s.title,
          summary: s.simpleExplanation || s.officialSummary,
          category: 'general' as const,
          tags: s.tags,
        }))
      ),
      ...RULE_CHAPTERS.flatMap((ch) =>
        ch.sections.map((s) => ({
          id: s.sectionNo,
          lawType: ch.lawType,
          clauseNumber: s.sectionNo,
          title: s.title,
          summary: s.simpleExplanation || s.officialSummary,
          category: 'general' as const,
          tags: s.tags,
        }))
      ),
    ];

    // Deduplicate by clauseNumber
    const uniqueClauses = Array.from(new Map(allClausesList.map(c => [c.clauseNumber, c])).values());

    const matchedClauses = (selectedContentType === 'all' || selectedContentType === 'clauses')
      ? uniqueClauses.filter((c) => {
          if (selectedType !== 'all' && c.category !== 'general' && !c.category.includes(selectedType)) return false;
          if (!term) return true;
          return matchesSearch(c, term);
        })
      : [];

    // 3. Filter Checklists
    const matchedChecklists = (selectedContentType === 'all' || selectedContentType === 'checklists')
      ? COMPLIANCE_CHECKLIST_MASTER.filter((chk) => {
          if (selectedType !== 'all' && !chk.procurementTypes.includes(selectedType)) return false;
          if (selectedStage !== 'all' && chk.stageId !== selectedStage) return false;
          if (!term) return true;
          return matchesSearch(chk, term);
        })
      : [];

    // 4. Filter Stages
    const matchedStages = (selectedContentType === 'all')
      ? PROCUREMENT_STAGES.filter((s) => {
          if (selectedStage !== 'all' && s.id !== selectedStage) return false;
          if (!term) return true;
          return matchesSearch(s, term);
        })
      : [];

    // 5. Filter Schedules
    const matchedSchedules = (selectedContentType === 'all' || selectedContentType === 'schedules')
      ? OFFICIAL_SCHEDULES.filter((sch) => {
          if (!term) return true;
          return matchesSearch(sch, term);
        })
      : [];

    // 6. Filter Practical Dilemmas & Cases (समस्या समाधान तथा नजिर)
    const matchedDilemmas = (selectedContentType === 'all' || selectedContentType === 'dilemmas')
      ? PROCUREMENT_DILEMMAS.filter((d) => {
          if (!term) return true;
          return matchesSearch(d, term);
        })
      : [];

    // 7. Filter Procurement Glossary (शब्दावली कोष)
    const matchedGlossary = (selectedContentType === 'all' || selectedContentType === 'glossary')
      ? PROCUREMENT_GLOSSARY.filter((g) => {
          if (!term) return true;
          return matchesSearch(g, term);
        })
      : [];

    // 8. Filter Templates (कागजात तथा टिप्पणी ढाँचाहरू)
    const matchedTemplates = (selectedContentType === 'all' || selectedContentType === 'templates')
      ? PROCUREMENT_TEMPLATES.filter((t) => {
          if (!term) return true;
          return matchesSearch(t, term);
        })
      : [];

    const totalCount =
      matchedMethods.length +
      matchedClauses.length +
      matchedChecklists.length +
      matchedStages.length +
      matchedSchedules.length +
      matchedDilemmas.length +
      matchedGlossary.length +
      matchedTemplates.length;

    return {
      methods: matchedMethods,
      clauses: matchedClauses,
      checklists: matchedChecklists,
      stages: matchedStages,
      schedules: matchedSchedules,
      dilemmas: matchedDilemmas,
      glossary: matchedGlossary,
      templates: matchedTemplates,
      totalCount,
    };
  }, [searchTerm, selectedType, selectedThreshold, selectedStage, selectedContentType]);

  if (!isOpen) return null;

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedThreshold('all');
    setSelectedStage('all');
    setSelectedContentType('all');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-16 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Modal Header & Main Search Input */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="खोज्नुहोस्: शब्द (उदा: भेरिएसन, औसत अङ्क), दफा, नियम, विधि वा कागजात..."
                className="w-full pl-10 pr-10 py-2.5 text-sm sm:text-base bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 text-slate-900 shadow-xs placeholder:text-slate-400"
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs">
            <span className="text-slate-600 font-medium whitespace-nowrap mr-1">प्रचलित खोज:</span>
            {quickSearches.map((preset) => (
              <button
                key={preset}
                onClick={() => setSearchTerm(preset)}
                className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:border-red-300 hover:text-red-700 text-slate-600 whitespace-nowrap transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3 sm:px-5 border-b border-slate-200 bg-white grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {/* Filter 1: Procurement Type */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">खरिदको प्रकार</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 focus:ring-1 focus:ring-red-600 focus:outline-hidden"
            >
              <option value="all">सबै प्रकारहरू</option>
              <option value="works">निर्माण कार्य (Works)</option>
              <option value="goods">मालसामान (Goods)</option>
              <option value="consulting">परामर्श सेवा (Consulting)</option>
              <option value="services">गैर-परामर्श सेवा (Services)</option>
            </select>
          </div>

          {/* Filter 2: Threshold Range */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">आर्थिक सीमा (रकम)</label>
            <select
              value={selectedThreshold}
              onChange={(e) => setSelectedThreshold(e.target.value)}
              className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 focus:ring-1 focus:ring-red-600 focus:outline-hidden"
            >
              <option value="all">सबै रकम सीमा</option>
              <option value="under-15lakh">रु १५ लाख सम्म (सोझै खरिद)</option>
              <option value="15lakh-20lakh">रु १५ - २० लाख (दरभाउपत्र)</option>
              <option value="20lakh-2crore">रु २० लाख - २ करोड (१ खाम)</option>
              <option value="2crore-5arab">रु २ करोड - ५ अर्ब (२ खाम स्वदेशी)</option>
              <option value="above-5arab">रु ५ अर्ब माथि (अन्तर्राष्ट्रिय)</option>
            </select>
          </div>

          {/* Filter 3: Process Stage */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">प्रक्रियागत चरण</label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 focus:ring-1 focus:ring-red-600 focus:outline-hidden"
            >
              <option value="all">सबै चरणहरू</option>
              <option value="stage-1">१. पूर्वतयारी र योजना</option>
              <option value="stage-2">२. लागत अनुमान र स्वीकृति</option>
              <option value="stage-3">३. बोलपत्र कागजात र आह्वान</option>
              <option value="stage-4">४. बोलपत्र दाखिला र खोल्ने</option>
              <option value="stage-5">५. बोलपत्र परीक्षण र मूल्याङ्कन</option>
              <option value="stage-6">६. आशयको सूचना र सम्झौता</option>
              <option value="stage-7">७. कार्यान्वयन, भेरिएसन र भुक्तानी</option>
            </select>
          </div>

          {/* Filter 4: Content Category */}
          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">विषय क्षेत्र</label>
            <div className="flex items-center gap-1">
              <select
                value={selectedContentType}
                onChange={(e) => setSelectedContentType(e.target.value as any)}
                className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 focus:ring-1 focus:ring-red-600 focus:outline-hidden"
              >
                <option value="all">सबै विषयवस्तु</option>
                <option value="methods">खरिद विधिहरू</option>
                <option value="clauses">ऐन/नियमावली दफा</option>
                <option value="checklists">चेकलिस्ट बुँदाहरू</option>
                <option value="schedules">अनुसूची फारामहरू</option>
              </select>
              {(searchTerm || selectedType !== 'all' || selectedThreshold !== 'all' || selectedStage !== 'all' || selectedContentType !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-md shrink-0"
                  title="फिल्टर रिसेट"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Metadata Summary */}
        <div className="px-4 py-2 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            फेला परेका नतिजा: <span className="font-semibold text-slate-900 tabular-nums">{filteredResults.totalCount}</span> वटा
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <span>विधि: {filteredResults.methods.length}</span>
            <span>दफा: {filteredResults.clauses.length}</span>
            <span>चेकलिस्ट: {filteredResults.checklists.length}</span>
            <span>चरण: {filteredResults.stages.length}</span>
            <span>अनुसूची: {filteredResults.schedules.length}</span>
          </div>
        </div>

        {/* Scrollable Results Area */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-6 flex-1">
          {filteredResults.totalCount === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Search className="w-10 h-10 mx-auto text-slate-300 mb-3" />
              <p className="text-base font-medium text-slate-700">तपाईंले खोज्नुभएको विषय भेटिएन</p>
              <p className="text-xs text-slate-600 mt-1">
                कृपया फरक शब्द, दफा नम्बर वा माथिको फिल्टर रिसेट गरी पुनः प्रयास गर्नुहोस्।
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
              >
                सबै फिल्टरहरू हटाउनुहोस्
              </button>
            </div>
          ) : (
            <>
              {/* Group 1: Procurement Methods */}
              {filteredResults.methods.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                    <Layers className="w-4 h-4 text-red-700" />
                    <span>खरिद विधिहरू ({filteredResults.methods.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredResults.methods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => {
                          onSelectResult('method', method.id);
                          onClose();
                        }}
                        className="p-3 rounded-lg border border-slate-200 hover:border-red-400 hover:bg-red-50/30 transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-slate-900 group-hover:text-red-700 transition-colors">
                            {method.nameNepali}
                          </h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600 shrink-0 font-medium">
                            {method.badgeTag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{method.summary}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-600 mt-2 pt-2 border-t border-slate-100">
                          <span>ऐन: {method.legalActSection}</span>
                          <span className="flex items-center gap-1 text-red-700 font-medium">
                            पूर्ण विवरण <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 2: Legal Clauses */}
              {filteredResults.clauses.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>ऐन तथा नियमावलीका मुख्य दफाहरू ({filteredResults.clauses.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredResults.clauses.map((clause) => (
                      <div
                        key={clause.id}
                        onClick={() => {
                          onSelectResult('clause', clause.id);
                          onClose();
                        }}
                        className="p-3 rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm">
                            {clause.clauseNumber}
                          </span>
                          <span className="text-[11px] text-slate-600 uppercase">
                            {clause.lawType === 'act' ? 'खरिद ऐन' : 'नियमावली'}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 mt-1.5 group-hover:text-amber-800 transition-colors">
                          {clause.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{clause.summary}</p>
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          {clause.tags.map((t) => (
                            <span key={t} className="text-[10px] text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 3: Compliance Checklists */}
              {filteredResults.checklists.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                    <FileCheck2 className="w-4 h-4 text-emerald-700" />
                    <span>अनुपालन चेकलिस्ट बुँदाहरू ({filteredResults.checklists.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                    {filteredResults.checklists.slice(0, 10).map((chk) => (
                      <div
                        key={chk.id}
                        onClick={() => {
                          onSelectResult('checklist', chk.id);
                          onClose();
                        }}
                        className="p-3 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-2.5 text-left"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-slate-900">{chk.text}</p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-0.5">
                            <span className="font-mono text-emerald-800 font-semibold">{chk.legalRef}</span>
                            {chk.notes && <span>· {chk.notes}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredResults.checklists.length > 10 && (
                      <div className="p-2.5 text-center bg-slate-50 text-xs text-slate-600">
                        र थप {filteredResults.checklists.length - 10} वटा चेकलिस्ट बुँदाहरू... (पूर्ण हेर्न अनुपालन चेकलिस्ट ट्याबमा जानुहोस्)
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Group 4: Procurement Stages */}
              {filteredResults.stages.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                    <ClipboardList className="w-4 h-4 text-indigo-700" />
                    <span>प्रक्रियागत चरणहरू ({filteredResults.stages.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredResults.stages.map((stage) => (
                      <div
                        key={stage.id}
                        onClick={() => {
                          onSelectResult('stage', stage.id);
                          onClose();
                        }}
                        className="p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group text-left"
                      >
                        <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                          {stage.stageNo}. {stage.titleNepali}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{stage.description}</p>
                        <div className="text-[11px] text-slate-600 mt-2 pt-2 border-t border-slate-100">
                          कानुनी आधार: {stage.legalBasis}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 5: Official Schedules */}
              {filteredResults.schedules.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                    <ClipboardList className="w-4 h-4 text-blue-700" />
                    <span>अनुसूची तथा कानूनी ढाँचाहरू ({filteredResults.schedules.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredResults.schedules.map((sch) => (
                      <div
                        key={sch.id}
                        onClick={() => {
                          onSelectResult('schedule', sch.id);
                          onClose();
                        }}
                        className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group text-left"
                      >
                        <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-sm">
                          {sch.scheduleNumber}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 mt-1.5 group-hover:text-blue-800 transition-colors">
                          {sch.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1">{sch.description}</p>
                        <span className="text-[11px] text-slate-600 mt-2 block font-mono">{sch.ruleReference}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 6: Practical Case Dilemmas & Verdicts (समस्या समाधान तथा नजिर) */}
              {filteredResults.dilemmas.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                    <HelpCircle className="w-4 h-4 text-purple-700" />
                    <span>व्यवहारिक समस्या समाधान र नजिरहरू ({filteredResults.dilemmas.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredResults.dilemmas.map((dil) => (
                      <div
                        key={dil.id}
                        onClick={() => {
                          onSelectResult('dilemma', dil.id);
                          onClose();
                        }}
                        className="p-3 rounded-lg border border-purple-200 hover:border-purple-400 hover:bg-purple-50/30 transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-sm">
                            {dil.categoryLabel}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {dil.legalClauses[0]}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 mt-1.5 group-hover:text-purple-800 transition-colors">
                          {dil.question}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{dil.scenario}</p>
                        <div className="text-[11px] text-emerald-800 font-semibold mt-2 pt-2 border-t border-purple-100 flex items-center justify-between">
                          <span className="line-clamp-1">निकास: {dil.verdict}</span>
                          <ArrowRight className="w-3 h-3 text-purple-700 shrink-0 ml-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 7: Procurement Glossary (शब्दावली कोष) */}
              {filteredResults.glossary.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                    <BookA className="w-4 h-4 text-emerald-700" />
                    <span>पारिभाषिक शब्दावली कोष ({filteredResults.glossary.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredResults.glossary.map((term) => (
                      <div
                        key={term.id}
                        onClick={() => {
                          onSelectResult('glossary', term.id);
                          onClose();
                        }}
                        className="p-3 rounded-lg border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-emerald-900 group-hover:text-emerald-700">
                            {term.termNepali}
                          </span>
                          <span className="text-[10px] text-slate-500 italic">
                            {term.termEnglish}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 mt-1 line-clamp-2">{term.shortDefinition}</p>
                        <div className="text-[11px] text-slate-500 mt-2 pt-1 border-t border-emerald-100 font-mono">
                          {term.legalReference}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group 8: Draft Templates & Notesheets (निर्णय र टिप्पणीका ढाँचाहरू) */}
              {filteredResults.templates.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                    <FileText className="w-4 h-4 text-red-700" />
                    <span>कागजात तथा टिप्पणीका ढाँचाहरू ({filteredResults.templates.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredResults.templates.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        onClick={() => {
                          onSelectResult('template', tmpl.id);
                          onClose();
                        }}
                        className="p-3 rounded-lg border border-red-200 hover:border-red-400 hover:bg-red-50/30 transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded-sm">
                            {tmpl.category === 'notesheet' ? 'टिप्पणी र आदेश' : tmpl.category}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {tmpl.formatTypes.join(', ')}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 mt-1.5 group-hover:text-red-700 transition-colors">
                          {tmpl.titleNepali}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{tmpl.description}</p>
                        <div className="text-[11px] text-slate-500 mt-2 pt-1 border-t border-red-100 font-mono">
                          {tmpl.legalReference}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>सुझाव: खोज्नका लागि किबोर्डमा <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded-sm font-mono text-slate-700">/</kbd> वा <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded-sm font-mono text-slate-700">ESC</kbd> थिच्नुहोस्।</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-md transition-colors"
          >
            बन्द गर्नुहोस्
          </button>
        </div>
      </div>
    </div>
  );
};
