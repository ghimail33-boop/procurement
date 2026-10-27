import React, { useState, useMemo } from 'react';
import {
  Globe,
  Layers,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Warehouse,
  ShieldCheck,
  Scale,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  BookOpen,
  HelpCircle,
  RotateCcw,
  Building2,
  Users,
  Check,
  XCircle,
  Truck,
  Ship,
  Plane,
  Anchor,
  Award,
  Search,
  Filter,
  CheckSquare,
  BadgeAlert,
  Percent,
} from 'lucide-react';
import {
  ICB_WORKFLOW_STAGES,
  INCOTERMS_2020_RULES,
  ICB_GOODS_VS_WORKS_DIFFERENCES,
  LOCAL_AGENT_GUIDELINES,
  LOCAL_AGENT_CASE_STUDIES,
  ICB_EVALUATION_SUB_STEPS,
  ICB_QUIZ_QUESTIONS,
  ICB_GLOSSARY_TERMS,
  ICB_FAQS,
  IcbStage,
  IncotermRule,
} from '../data/icbProcurementData';

interface IcbProcurementHubProps {
  initialUserMode?: 'entity' | 'bidder';
  onNavigateToLaw?: () => void;
  onNavigateToEgpGuidelines?: () => void;
}

export const IcbProcurementHub: React.FC<IcbProcurementHubProps> = ({
  initialUserMode = 'entity',
  onNavigateToLaw,
  onNavigateToEgpGuidelines,
}) => {
  // Perspective Mode: Public Entity vs Bidder
  const [viewPerspective, setViewPerspective] = useState<'entity' | 'bidder'>(initialUserMode);
  
  // Active Main Subtab
  const [activeTab, setActiveTab] = useState<
    'workflow' | 'incoterms' | 'local-agent' | 'evaluation' | 'quiz' | 'glossary-faq'
  >('workflow');

  // Stage Selector for Workflow
  const [selectedStageNo, setSelectedStageNo] = useState<number>(1);
  const activeStage: IcbStage = useMemo(() => {
    return ICB_WORKFLOW_STAGES.find((s) => s.stageNo === selectedStageNo) || ICB_WORKFLOW_STAGES[0];
  }, [selectedStageNo]);

  // Interactive Checklist State: key = `stage_${stageNo}_${type}_${idx}`
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('icb_workflow_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleChecklist = (key: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('icb_workflow_checklist', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Local Agent Checklists State
  const [agentCheckedItems, setAgentCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('icb_local_agent_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleAgentChecklist = (key: string) => {
    setAgentCheckedItems((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('icb_local_agent_checklist', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Incoterms Filters
  const [incotermCategory, setIncotermCategory] = useState<'all' | 'any-mode' | 'maritime'>('all');
  const [selectedIncotermCode, setSelectedIncotermCode] = useState<string>('CIP');
  const activeIncoterm: IncotermRule = useMemo(() => {
    return INCOTERMS_2020_RULES.find((r) => r.code === selectedIncotermCode) || INCOTERMS_2020_RULES[3];
  }, [selectedIncotermCode]);

  // Quiz State
  const [quizLevel, setQuizLevel] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  const filteredQuiz = useMemo(() => {
    if (quizLevel === 'all') return ICB_QUIZ_QUESTIONS;
    return ICB_QUIZ_QUESTIONS.filter((q) => q.level === quizLevel);
  }, [quizLevel]);

  const handleSelectQuizAnswer = (qId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowQuizResults(false);
  };

  // Glossary Search
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const filteredGlossary = useMemo(() => {
    if (!glossarySearch.trim()) return ICB_GLOSSARY_TERMS;
    const q = glossarySearch.toLowerCase();
    return ICB_GLOSSARY_TERMS.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.nepali.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q)
    );
  }, [glossarySearch]);

  // Expanded Case Studies
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>('case-1');

  // Overall workflow progress calculation
  const totalWorkflowChecklistItems = useMemo(() => {
    return ICB_WORKFLOW_STAGES.reduce((acc, stage) => {
      return acc + stage.entityChecklist.length + stage.bidderChecklist.length;
    }, 0);
  }, []);

  const completedWorkflowChecklistItems = useMemo(() => {
    return Object.values(checkedItems).filter(Boolean).length;
  }, [checkedItems]);

  const progressPercentage = Math.min(
    100,
    Math.round((completedWorkflowChecklistItems / (totalWorkflowChecklistItems || 1)) * 100)
  );

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION / BANNER                                         */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-blue-950 via-[#132c4b] to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300 relative overflow-hidden">
        {/* Subtle background graphics */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200">
                <Globe className="w-3.5 h-3.5 text-blue-300 animate-spin-slow" />
                अन्तर्राष्ट्रिय खरिद विशेष गाइड • ICB Specialist Module
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-300">Goods & Works ICB</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex flex-wrap items-center gap-2.5 text-white">
              <span>अन्तर्राष्ट्रिय स्तरको खुला बोलपत्र (ICB) विस्तृत गाइड</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                ऐन दफा १५ • नियम ३१ङ
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-blue-100/90 max-w-3xl leading-relaxed">
              विदेशी मुद्रा भुक्तानी, जटिल प्रविधि तथा ५ अर्ब माथिका निर्माणका लागि आवश्यक अन्तर्राष्ट्रिय खुला बोलपत्रका ७ विस्तृत चरणहरू, Incoterms 2020 का ११ नियम, १५ उपचरणको मूल्याङ्कन, स्थानीय एजेन्ट (दफा १४(९)/नियम ३९) र e-GP मार्फत ३० दिने आह्वान सम्बन्धी एकीकृत कानुनी तथा व्यावहारिक प्लेटफर्म।
            </p>

            {/* Quick Metrics & Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-blue-200">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>सूचना म्याद: <strong>कम्तीमा ३० दिन</strong> (पुनः आह्वान १५ दिन)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>बिड सेक्युरिटी: <strong>२% देखि ३%</strong> (USD/NPR)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-blue-300" />
                <span>LOI Standstill: <strong>७ दिन</strong> (दफा २७(२))</span>
              </div>
            </div>
          </div>

          {/* Perspective View Switcher & Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewPerspective('entity')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewPerspective === 'entity'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>सार्वजनिक निकाय View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewPerspective('bidder')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewPerspective === 'bidder'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>बोलपत्रदाता View</span>
              </button>
            </div>

            {/* Overall Progress Display */}
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/15 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-blue-200 font-medium">चेकलिस्ट समग्र प्रगति:</span>
                <span className="font-bold text-amber-300">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SUB-TABS NAVIGATION BAR                                       */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {[
            { id: 'workflow', label: 'चरणबद्ध खरिद प्रक्रिया (७ चरण)', icon: Layers },
            { id: 'incoterms', label: 'Incoterms 2020 गाइड (Goods ICB)', icon: Truck },
            { id: 'local-agent', label: 'स्थानीय एजेन्ट (Local Agent Guide)', icon: Users },
            { id: 'evaluation', label: 'मूल्याङ्कन तथा १५ उपचरण', icon: Scale },
            { id: 'quiz', label: 'अन्तरक्रियात्मक क्विज (Quiz & Scenarios)', icon: Sparkles },
            { id: 'glossary-faq', label: 'शब्दावली र सोधिने प्रश्नहरू (FAQ)', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-300' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: 7-STAGE EXPANDED ICB WORKFLOW                          */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'workflow' && (
        <div className="space-y-6">
          {/* Progress Roadmap Stepper */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ICB Lifecycle Stages (चरण १ देखि ७ सम्म)
              </span>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                दृष्टिकोण: {viewPerspective === 'entity' ? '🏛️ सार्वजनिक निकाय' : '💼 बोलपत्रदाता'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {ICB_WORKFLOW_STAGES.map((stg) => {
                const isSelected = selectedStageNo === stg.stageNo;
                return (
                  <button
                    key={stg.id}
                    onClick={() => setSelectedStageNo(stg.stageNo)}
                    className={`flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-white text-blue-900' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {stg.stageNo}
                      </span>
                      {stg.stageNo === 3 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-amber-400 text-slate-900">
                          ३० दिन
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold line-clamp-2 leading-tight">
                      {stg.titleNepali.split(':')[1]?.trim() || stg.titleNepali}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detailed View */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Header of Active Stage */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold mb-1">
                  <span>चरण {activeStage.stageNo} / ७</span>
                  <span>•</span>
                  <span>{activeStage.timelineDays}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  {activeStage.titleNepali}
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
                  {activeStage.objective}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 shrink-0 text-xs space-y-1">
                <div>
                  <span className="text-blue-200 block text-[11px]">जिम्मेवार निकाय/इकाइ:</span>
                  <span className="font-bold text-white">{activeStage.responsibleEntity}</span>
                </div>
                <div className="pt-1 border-t border-white/10">
                  <span className="text-amber-200 block text-[11px]">लागू SBD खण्ड:</span>
                  <span className="font-semibold text-white">{activeStage.sbdClauses}</span>
                </div>
              </div>
            </div>

            {/* Legal Basis Pill */}
            <div className="px-6 py-3 bg-blue-50/80 border-b border-blue-100 flex flex-wrap items-center gap-4 text-xs text-blue-900">
              <span className="font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                कानूनी आधार:
              </span>
              <span>{activeStage.legalBasisAct}</span>
              <span className="text-blue-300">|</span>
              <span>{activeStage.legalBasisRule}</span>
            </div>

            {/* Main Stage Content Grid */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Responsibilities based on View Perspective */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    {viewPerspective === 'entity' ? (
                      <>
                        <Building2 className="w-4 h-4 text-blue-700" />
                        <span>सार्वजनिक निकायले गर्नुपर्ने अनिवार्य कार्यहरू:</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4 text-amber-700" />
                        <span>बोलपत्रदाताले बुझ्नुपर्ने र गर्नुपर्ने कार्यहरू:</span>
                      </>
                    )}
                  </h3>
                  <button
                    onClick={() => setViewPerspective((p) => (p === 'entity' ? 'bidder' : 'entity'))}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline cursor-pointer"
                  >
                    {viewPerspective === 'entity' ? 'बोलपत्रदाता दृष्टिकोण हेर्नुहोस्' : 'निकाय दृष्टिकोण हेर्नुहोस्'}
                  </button>
                </div>

                <div className="space-y-2.5">
                  {(viewPerspective === 'entity'
                    ? activeStage.entityDuties
                    : activeStage.bidderDuties
                  ).map((duty, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{duty}</span>
                    </div>
                  ))}
                </div>

                {/* Practical Feature Card */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>विशेष व्यावहारिक सुविधा: {activeStage.practicalFeatures.title}</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {activeStage.practicalFeatures.description}
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive Checklists & Risks */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-emerald-700" />
                    <span>
                      {viewPerspective === 'entity' ? 'निकायगत प्रमाणीकरण चेकलिस्ट' : 'बोलपत्रदाता सबमिसन चेकलिस्ट'}
                    </span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    (अन्तरक्रियात्मक टिक लगाउनुहोस्)
                  </span>
                </div>

                <div className="space-y-2">
                  {(viewPerspective === 'entity'
                    ? activeStage.entityChecklist
                    : activeStage.bidderChecklist
                  ).map((chk, idx) => {
                    const key = `stage_${activeStage.stageNo}_${viewPerspective}_${idx}`;
                    const isChecked = !!checkedItems[key];
                    return (
                      <label
                        key={idx}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleChecklist(key)}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer"
                        />
                        <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through text-slate-500' : ''}`}>
                          {chk}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Critical Mistakes and Risks Box */}
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-900">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>सम्भावित घातक गल्तीहरू र कानुनी जोखिमहरू (Critical Risks):</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-red-800 list-disc list-inside">
                    {activeStage.criticalMistakesAndRisks.map((risk, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Section: Precedents & Required Documents */}
            <div className="border-t border-slate-200 p-6 bg-slate-50/70 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* PPMO / PPRC Precedents */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-blue-700" />
                  <span>सम्बन्धित PPMO राय तथा PPRC निर्णयहरू:</span>
                </h4>
                <div className="space-y-2.5">
                  {activeStage.ppmoOpinionsAndPprcRulings.map((prec, idx) => (
                    <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <span className="text-xs font-bold text-slate-900 block">{prec.caseTitle}</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{prec.decisionSummary}</p>
                      <span className="text-[11px] font-semibold text-blue-700 block mt-1">
                        👉 पाठ: {prec.relevance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents & Source Links */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>यस चरणमा आवश्यक मुख्य कागजातहरू:</span>
                </h4>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeStage.requiredDocuments.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{doc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500 font-medium">आधिकारिक स्रोत:</span>
                    <div className="flex flex-wrap items-center gap-2">
                      {activeStage.officialSources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline"
                        >
                          <span>{src.title}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Footer Controls */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
              <button
                disabled={selectedStageNo === 1}
                onClick={() => setSelectedStageNo((s) => Math.max(1, s - 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
              >
                <span>← अघिल्लो चरण</span>
              </button>
              <span className="text-xs font-medium text-slate-500">
                चरण {selectedStageNo} / ७
              </span>
              <button
                disabled={selectedStageNo === 7}
                onClick={() => setSelectedStageNo((s) => Math.min(7, s + 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-900 text-white hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
              >
                <span>अर्को चरण →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: INCOTERMS 2020 MODULE (11 RULES)                       */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'incoterms' && (
        <div className="space-y-6">
          {/* Incoterms Header & Filter */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wide">
                <Truck className="w-4 h-4" />
                <span>ICC Incoterms® 2020 • Goods ICB Bidding Connection</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Incoterms 2020 का सम्पूर्ण ११ नियम तथा Goods ICB SBD प्रयोग
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                अन्तर्राष्ट्रिय खरिदमा क्रेता (सार्वजनिक निकाय) र विक्रेता (आपूर्तिकर्ता) बीच ढुवानी, जोखिम हस्तान्तरण, ट्रान्जिट बीमा र भन्सार महसुलको स्पष्ट कानूनी बाँडफाँड। Goods ICB मा ITB 15.6 तथा BDS ले Incoterms 2020 स्वीकार गरेको छ।
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0 text-xs font-bold">
              <button
                onClick={() => setIncotermCategory('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  incotermCategory === 'all'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                सबै ११ नियमहरू
              </button>
              <button
                onClick={() => setIncotermCategory('any-mode')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  incotermCategory === 'any-mode'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Any Mode (७)
              </button>
              <button
                onClick={() => setIncotermCategory('maritime')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  incotermCategory === 'maritime'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sea / Inland (४)
              </button>
            </div>
          </div>

          {/* Incoterms Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {INCOTERMS_2020_RULES.filter(
              (r) => incotermCategory === 'all' || r.category === incotermCategory
            ).map((rule) => {
              const isSelected = selectedIncotermCode === rule.code;
              const isHighlight = rule.code === 'CIP' || rule.code === 'CIF';
              return (
                <button
                  key={rule.code}
                  onClick={() => setSelectedIncotermCode(rule.code)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base font-black tracking-tight">{rule.code}</span>
                    {isHighlight && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-900">
                        नेपालमा प्रमुख
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-medium line-clamp-1 opacity-90">
                    {rule.nameEnglish}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Incoterm Detailed Showcase */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold mb-1">
                  <span>Incoterms 2020 Rule</span>
                  <span>•</span>
                  <span>{activeIncoterm.category === 'any-mode' ? 'Any Mode of Transport' : 'Sea & Inland Waterway'}</span>
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
                  <span>{activeIncoterm.code} — {activeIncoterm.nameEnglish}</span>
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl">
                  {activeIncoterm.nameNepali}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 shrink-0 text-xs">
                <span className="text-amber-200 block text-[11px] font-medium">SBD Goods ICB Mapping:</span>
                <span className="text-white font-bold">{activeIncoterm.sbdClausesMapping}</span>
              </div>
            </div>

            {/* Responsibility Matrix Cards */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/60 border-b border-slate-200">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase block">डेलिभरी बिन्दु (Delivery Point)</span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">{activeIncoterm.deliveryPoint}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-amber-700 uppercase block">जोखिम सर्ने बिन्दु (Risk Transfer)</span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">{activeIncoterm.riskTransferPoint}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-blue-700 uppercase block">ढुवानी खर्च (Freight Cost)</span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">{activeIncoterm.freightResponsibility}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase block">बीमा दायित्व (Insurance)</span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">{activeIncoterm.insuranceLiability}</p>
              </div>
            </div>

            {/* Deep Guidance Sections */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-700" />
                    <span>सार्वजनिक निकायले ध्यान दिनुपर्ने विषयहरू:</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
                    {activeIncoterm.entityGuidance}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-700" />
                    <span>बोलपत्रदाताले मूल्य तयार गर्दा ध्यान दिनुपर्ने:</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                    {activeIncoterm.bidderPricingGuidance}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-slate-600" />
                    <span>नेपालको परिवेशमा यसको सम्भावित प्रयोग:</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activeIncoterm.nepalContextUsage}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>व्यवहारिक उदाहरण (Practical Scenario):</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                    {activeIncoterm.practicalExample}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Goods ICB vs Works ICB Comparative Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>Goods ICB vs Works ICB: Incoterms र कानूनी फरक</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-2">
                <h4 className="text-sm font-bold text-amber-200">
                  {ICB_GOODS_VS_WORKS_DIFFERENCES.goodsIcb.title}
                </h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  <strong>Incoterms:</strong> {ICB_GOODS_VS_WORKS_DIFFERENCES.goodsIcb.incotermsApplicability}
                </p>
                <p className="text-xs text-blue-100 leading-relaxed">
                  <strong>फोकस:</strong> {ICB_GOODS_VS_WORKS_DIFFERENCES.goodsIcb.deliveryFocus}
                </p>
                <p className="text-xs text-blue-100 leading-relaxed">
                  <strong>स्थानीय एजेन्ट:</strong> {ICB_GOODS_VS_WORKS_DIFFERENCES.goodsIcb.localAgentRole}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-2">
                <h4 className="text-sm font-bold text-emerald-300">
                  {ICB_GOODS_VS_WORKS_DIFFERENCES.worksIcb.title}
                </h4>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  <strong>Incoterms:</strong> {ICB_GOODS_VS_WORKS_DIFFERENCES.worksIcb.incotermsApplicability}
                </p>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  <strong>फोकस:</strong> {ICB_GOODS_VS_WORKS_DIFFERENCES.worksIcb.deliveryFocus}
                </p>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  <strong>स्थानीय एजेन्ट/JV:</strong> {ICB_GOODS_VS_WORKS_DIFFERENCES.worksIcb.localAgentRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: LOCAL AGENT SPECIAL SUB-MODULE                         */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'local-agent' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wide">
                <Users className="w-4 h-4" />
                <span>सार्वजनिक खरिद ऐन दफा १४(९), १४(१०) र नियम ३९</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                विदेशी बोलपत्रदाताको Local Agent: जिम्मेवारी, कागजात र सार्वजनिक निकायको कार्य
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                विदेशी कम्पनीले नेपालभित्र स्थानीय एजेन्ट नियुक्त गर्दा पालना गर्नुपर्ने कानूनी सर्तहरू, कमिसन खुलाउने दायित्व, अधिकारपत्र (PoA), प्यान दर्ता र सार्वजनिक निकायले मूल्याङ्कन तथा कार्यान्वयनमा गर्नुपर्ने जाँच।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>एजेन्ट लुकाएमा स्वतः रद्द (दफा १४(१०))</span>
              </span>
            </div>
          </div>

          {/* Statutory Legal Foundations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LOCAL_AGENT_GUIDELINES.legalBasis.map((basis, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-blue-900 block">{basis.actClause || basis.ruleClause || basis.sbdClause}</span>
                <p className="text-xs text-slate-700 leading-relaxed">{basis.description}</p>
              </div>
            ))}
          </div>

          {/* Three-Phase Responsibilities Grid: Agent vs Public Entity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Local Agent's Responsibilities */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Users className="w-4 h-4 text-amber-700" />
                <span>स्थानीय एजेन्टले पूरा गर्नुपर्ने चरणबद्ध कार्यहरू:</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                  <span className="text-xs font-bold text-amber-950 block">A. बोलपत्र पेश गर्नुअघि:</span>
                  <ul className="space-y-1 text-xs text-amber-900 list-disc list-inside">
                    {LOCAL_AGENT_GUIDELINES.agentDuties.beforeBidding.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                  <span className="text-xs font-bold text-amber-950 block">B. बोलपत्र तयार गर्ने र पेश गर्ने समयमा:</span>
                  <ul className="space-y-1 text-xs text-amber-900 list-disc list-inside">
                    {LOCAL_AGENT_GUIDELINES.agentDuties.duringSubmission.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                  <span className="text-xs font-bold text-amber-950 block">C. बोलपत्र पेश गरेपछि तथा कार्यान्वयनमा:</span>
                  <ul className="space-y-1 text-xs text-amber-900 list-disc list-inside">
                    {LOCAL_AGENT_GUIDELINES.agentDuties.afterSubmission.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Public Entity's Responsibilities */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Building2 className="w-4 h-4 text-blue-700" />
                <span>सार्वजनिक निकायले गर्नुपर्ने चरणबद्ध कार्यहरू:</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1.5">
                  <span className="text-xs font-bold text-blue-950 block">A. बोलपत्र आह्वानअघि (SBD तयारी):</span>
                  <ul className="space-y-1 text-xs text-blue-900 list-disc list-inside">
                    {LOCAL_AGENT_GUIDELINES.entityDuties.beforeInvitation.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1.5">
                  <span className="text-xs font-bold text-blue-950 block">B. बोलपत्र खोल्ने र मूल्याङ्कनको समयमा:</span>
                  <ul className="space-y-1 text-xs text-blue-900 list-disc list-inside">
                    {LOCAL_AGENT_GUIDELINES.entityDuties.duringEvaluation.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1.5">
                  <span className="text-xs font-bold text-blue-950 block">C. सम्झौता र कार्यान्वयनको समयमा:</span>
                  <ul className="space-y-1 text-xs text-blue-900 list-disc list-inside">
                    {LOCAL_AGENT_GUIDELINES.entityDuties.duringExecution.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Two Interactive Checklists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Checklist 1: For Local Agent */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-amber-700" />
                  <span>स्थानीय एजेन्टका लागि अनुपालन चेकलिस्ट (Agent Checklist)</span>
                </h3>
              </div>
              <div className="space-y-2">
                {LOCAL_AGENT_GUIDELINES.agentChecklist.map((item, idx) => {
                  const key = `agent_chk_${idx}`;
                  const isChecked = !!agentCheckedItems[key];
                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAgentChecklist(key)}
                        className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 mt-0.5 cursor-pointer"
                      />
                      <span className={`text-xs leading-relaxed ${isChecked ? 'line-through text-slate-500' : ''}`}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Checklist 2: For Public Entity */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-blue-700" />
                  <span>सार्वजनिक निकायका लागि परीक्षण चेकलिस्ट (Entity Checklist)</span>
                </h3>
              </div>
              <div className="space-y-2">
                {LOCAL_AGENT_GUIDELINES.entityChecklist.map((item, idx) => {
                  const key = `entity_agent_chk_${idx}`;
                  const isChecked = !!agentCheckedItems[key];
                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-blue-50/80 border-blue-300 text-blue-950'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAgentChecklist(key)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer"
                      />
                      <span className={`text-xs leading-relaxed ${isChecked ? 'line-through text-slate-500' : ''}`}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 6 Real-World Case Studies Accordion */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wide">
                  <Scale className="w-4 h-4" />
                  <span>व्यावहारिक कानूनी केस अध्ययनहरू • Practical Precedent Cases</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  स्थानीय एजेन्ट सम्बन्धी ६ यथार्थपरक विवाद र कानूनी निकास
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {LOCAL_AGENT_CASE_STUDIES.map((cs) => {
                const isOpen = expandedCaseId === cs.id;
                return (
                  <div
                    key={cs.id}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedCaseId(isOpen ? null : cs.id)}
                      className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        <span>{cs.title}</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-white space-y-3 text-xs leading-relaxed border-t border-slate-200">
                        <div>
                          <strong className="text-slate-900 block mb-0.5">📋 तथ्य (Facts):</strong>
                          <p className="text-slate-700">{cs.facts}</p>
                        </div>
                        <div>
                          <strong className="text-slate-900 block mb-0.5">⚖️ लागू कानूनी स्रोत (Legal Basis):</strong>
                          <p className="text-blue-800 font-semibold">{cs.legalSources}</p>
                        </div>
                        <div>
                          <strong className="text-slate-900 block mb-0.5">🔍 कानूनी विश्लेषण (Analysis):</strong>
                          <p className="text-slate-700">{cs.analysis}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
                          <strong className="block mb-0.5 font-bold">👉 सिफारिस गरिएको कानुनी कार्यवाही (Action):</strong>
                          <p>{cs.recommendedAction}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: 15 EVALUATION SUB-STEPS FOR ICB                        */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'evaluation' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wide">
                <Scale className="w-4 h-4" />
                <span>PPA दफा २५ • PPR नियम ६०-६५ • Goods ICB Section I & III</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                अन्तर्राष्ट्रिय बोलपत्र मूल्याङ्कनका १५ वटा स्पष्ट उपचरणहरू
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                e-GP अनलाइन डिक्रिप्शनदेखि सुरु भई प्रारम्भिक परीक्षण, योग्यता, प्राविधिक अनुपालन, Substantial Responsiveness, गणितीय सच्याइ, मुद्रा रूपान्तरण र प्रतिवेदन स्वीकृति सम्मका चरणबद्ध कानूनी मापदण्ड।
              </p>
            </div>
          </div>

          {/* Grid of 15 Sub-Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ICB_EVALUATION_SUB_STEPS.map((step) => (
              <div
                key={step.stepNo}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center text-xs font-extrabold">
                      {step.stepNo}
                    </span>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      {step.legalRef}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {step.objective}
                  </p>

                  <ul className="mt-2.5 space-y-1 text-xs text-slate-700 list-disc list-inside">
                    {step.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs">
                  <div className="text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <strong>उत्तीर्ण मापदण्ड:</strong> {step.passingCriteria}
                  </div>
                  <div className="text-red-800 bg-red-50 p-2 rounded-lg border border-red-200">
                    <strong>घातक जोखिम:</strong> {step.fatalPitfalls}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: MULTI-LEVEL QUIZ & CASE SCENARIOS                      */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>अन्तरक्रियात्मक ज्ञान परीक्षण • Multi-Level ICB Knowledge Checker</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                ICB, Incoterms, SBD र स्थानीय एजेन्ट सम्बन्धी बहुवैकल्पिक क्विज
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                आधारभूत (Basic), मध्यम (Intermediate) र विशेषज्ञ (Advanced) तहका १५ प्रश्नहरूको अभ्यास गरी आफ्नो ज्ञान परीक्षण गर्नुहोस्।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {(['all', 'basic', 'intermediate', 'advanced'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setQuizLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                    quizLevel === lvl
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {lvl === 'all'
                    ? 'सबै तह (१५)'
                    : lvl === 'basic'
                    ? 'प्रारम्भिक (५)'
                    : lvl === 'intermediate'
                    ? 'मध्यम (५)'
                    : 'विशेषज्ञ (५)'}
                </button>
              ))}
            </div>
          </div>

          {/* Quiz Cards */}
          <div className="space-y-4">
            {filteredQuiz.map((q, qIndex) => {
              const selectedOpt = userAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center text-xs font-extrabold shrink-0">
                        {qIndex + 1}
                      </span>
                      <span>{q.question}</span>
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize shrink-0 ${
                        q.level === 'basic'
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.level === 'intermediate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {q.level}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-100/90 border-emerald-400 text-emerald-950 font-bold';
                        } else if (optIdx === selectedOpt) {
                          btnStyle = 'bg-red-100 border-red-400 text-red-950 font-medium';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          )}
                          {isAnswered && optIdx === selectedOpt && optIdx !== q.correctIndex && (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {isAnswered && (
                    <div
                      className={`p-3.5 rounded-xl text-xs space-y-1 ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>सटीक उत्तर!</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span>कृपया सही उत्तर र व्याख्या हेर्नुहोस्:</span>
                          </>
                        )}
                        <span className="text-slate-500 font-normal">| {q.legalRef}</span>
                      </div>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reset Controls */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-600">
              हल गरिएका प्रश्नहरू: {Object.keys(userAnswers).length} / {filteredQuiz.length}
            </span>
            <button
              onClick={handleResetQuiz}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>क्विज रिसेट गर्नुहोस्</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: GLOSSARY & FREQUENTLY ASKED QUESTIONS (FAQ)            */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'glossary-faq' && (
        <div className="space-y-6">
          {/* Glossary Search & Terms */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-700" />
                  <span>अन्तर्राष्ट्रिय खरिद शब्दावली कोष (ICB Glossary)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  ICB, Incoterms तथा विदेशी खरिदमा प्रयोग हुने प्राविधिक शब्दावलीहरूको नेपाली व्याख्या
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  placeholder="शब्द खोज्नुहोस् (e.g. CIP, L/C, MAF)..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredGlossary.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs font-black text-blue-900 tracking-tight block">{item.term}</span>
                  <span className="text-xs font-semibold text-slate-700 block">{item.nepali}</span>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-200/60">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <span>अन्तर्राष्ट्रिय खरिदमा धेरै सोधिने प्रश्नहरू (ICB FAQs)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                सार्वजनिक निकाय तथा बोलपत्रदाताहरूका व्यावहारिक जिज्ञासाहरूको आधिकारिक समाधान
              </p>
            </div>

            <div className="space-y-3">
              {ICB_FAQS.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold shrink-0">
                      Q
                    </span>
                    <span>{faq.q}</span>
                  </h4>
                  <div className="text-xs sm:text-sm text-slate-700 pl-7 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
