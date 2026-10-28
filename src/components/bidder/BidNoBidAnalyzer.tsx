import React, { useState, useMemo } from 'react';
import bidNoBidImage from '../../../bid-no-bid.png';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Calculator,
  ShieldCheck,
  Scale,
  DollarSign,
  TrendingUp,
  Percent,
  Sliders,
  RotateCcw,
  Sparkles,
  Info,
  Check,
  HelpCircle,
  Building2,
  Lock,
} from 'lucide-react';

interface CriterionItem {
  id: string;
  category: string;
  title: string;
  question: string;
  legalRef: string;
  score: number; // 1 to 10
  guidance: string;
}

const DEFAULT_CRITERIA: CriterionItem[] = [
  {
    id: 'crit-1',
    category: 'योग्यता तथा अनुभव',
    title: '१. योग्यताका सम्पूर्ण मापदण्ड पूरा हुने सुनिश्चितता',
    question: 'के तपाईंको संस्थाले SBD EQC मा तोकिएको कारोबार (AACT), समान प्रकृतिको कार्य अनुभव, वित्तीय स्रोत र उपकरण पूर्ण रूपमा पूरा गर्छ?',
    legalRef: 'EQC, ITB १९, ऐन दफा १०',
    score: 8,
    guidance: 'यदि एकल संस्थाले पूरा गर्दैन भने भरपर्दो साझेदारसँग JV गर्न सकिन्छ। योग्यता नपुग्दा प्राविधिक खाममै बोलपत्र अस्वीकृत हुन्छ।',
  },
  {
    id: 'crit-2',
    category: 'बिड क्यापासिटी र ठेक्का संख्या',
    title: '२. उपलब्ध बिड क्यापासिटी र ५ चालू ठेक्का सीमा',
    question: 'के तपाईंको बिड क्यापासिटी (7*A*N - B) यस खरिदको लागत भन्दा बढी छ र हाल ५ वटा भन्दा बढी चालू ठेक्का छैनन्?',
    legalRef: 'नियम ६५(४घ१), नियम ६५(४ङ)',
    score: 8,
    guidance: '५ वटा चालू ठेक्का नाघेको भए स्वघोषणा गर्न पाइँदैन र बोलपत्र स्वतः रद्द हुन्छ। क्यापासिटी पनि पर्याप्त हुनुपर्छ।',
  },
  {
    id: 'crit-3',
    category: 'वित्तीय सुविधा र जमानत',
    title: '३. बैंक ग्यारेन्टी सीमा र अतिरिक्त जमानत क्षमता',
    question: 'के बोलपत्र जमानत (२-३%) र सफल हुँदा कार्यसम्पादन जमानत (५% + १५% घटेमा ५०% थप) दिने बैंक सीमा/सुविधा उपलब्ध छ?',
    legalRef: 'ITB २१, ४३; ऐन दफा १३(२)(ढ१)',
    score: 7,
    guidance: 'यदि १५% भन्दा धेरै घटेर कबोल गर्ने योजना भए बैंकले थप कार्यसम्पादन जमानत जारी गर्न तयार छ/छैन पहिल्यै यकिन गर्नुहोस्।',
  },
  {
    id: 'crit-4',
    category: 'समयसीमा र हर्जाना सहनशीलता',
    title: '४. कार्य सम्पन्न समय र ढिलाइ क्षतिपूर्ति (LD) जोखिम',
    question: 'के तोकिएको कार्यतालिकाभित्र ढुवानी, जडान र निर्माण सम्पन्न गर्न सम्भव छ र अप्रत्याशित ढिलाइ भए LD (०.०५%/दिन, अधिकतम १०%) सहन सकिन्छ?',
    legalRef: 'BDS, SCC; नियम १२१',
    score: 7,
    guidance: 'समयसीमा छोटो र ढुवानी दुर्गम भए १०% सम्मको लिक्विडेटेड ड्यामेज (LD) ले सम्झौताको नाफा पूरै समाप्त पार्न सक्छ।',
  },
  {
    id: 'crit-5',
    category: 'नगद प्रवाह र भुक्तानी प्रतिष्ठा',
    title: '५. सार्वजनिक निकायको भुक्तानी प्रतिष्ठा र नगद प्रवाह',
    question: 'के उक्त सार्वजनिक निकायको विगतको भुक्तानी समयमै (३० दिनभित्र) दिने राम्रो रेकर्ड छ र ५% रिटेन्सन रोकिँदा चालु पुँजी धान्न सकिन्छ?',
    legalRef: 'SCC GCC १०; नियम १२३, १२४',
    score: 7,
    guidance: 'बजेट नभएको वा प्रशासनिक उल्झन बढी हुने निकायमा भुक्तानी रोकिँदा ब्याज खर्चले निर्माण व्यवसायी टाट पल्टिन सक्छन्।',
  },
  {
    id: 'crit-6',
    category: 'मूल्य स्थिरता र मुद्रास्फीति जोखिम',
    title: '६. मूल्य समायोजन (Price Adjustment) को व्यवस्था',
    question: 'के सम्झौतामा मूल्य समायोजन लागू हुन्छ (१२ महिना माथिको सम्झौता) वा मूल्य स्थिर (Fixed Price) रहने शर्त छ?',
    legalRef: 'ITB १५.४; ऐन दफा ५५, नियम ११९',
    score: 6,
    guidance: '१२ महिनाभन्दा कम वा मालसामान खरिदमा मूल्यवृद्धि पाइँदैन; सिमेन्ट, फलामे डण्डी, इन्धन वा कच्चा पदार्थको भाउ बढे आफैंले बेहोर्नुपर्छ।',
  },
  {
    id: 'crit-7',
    category: 'वारेन्टी तथा दायित्व',
    title: '७. वारेन्टी, बिक्रीपछिको सेवा र मर्मत दायित्व',
    question: 'के सामानको वारेन्टी अवधि, स्पेयर पार्टस् उपलब्धता र त्रुटि सच्याउने अवधि (DLP) को खर्च यथार्थपरक रूपमा गणना गरिएको छ?',
    legalRef: 'SCC GCC २७; ITB १९',
    score: 8,
    guidance: 'वारेन्टी अवधिभरको प्राविधिक जनशक्ति र पार्टपुर्जाको लागत आफ्नो कबोल दरमै समावेश गर्नुपर्छ।',
  },
  {
    id: 'crit-8',
    category: 'स्पेसिफिकेसन निष्पक्षता',
    title: '८. प्राविधिक स्पेसिफिकेसनको निष्पक्षता (Non-bias)',
    question: 'के स्पेसिफिकेसन खुला र प्रतिस्पर्धी छ कि कुनै खास प्रतिस्पर्धी/ब्रान्ड विशेषलाई मात्र मिल्ने गरी बनाइएको छ?',
    legalRef: 'ऐन दफा ४(३), १६, ४७',
    score: 8,
    guidance: 'यदि कुनै खास ब्रान्डमा झुकेको भए प्रि-बिड बैठकमा संशोधन माग्ने वा दफा ४७ बमोजिम उजुरी गर्ने विकल्प हुन्छ।',
  },
  {
    id: 'crit-9',
    category: 'स्वार्थको द्वन्द्व',
    title: '९. स्वार्थ नबाझिएको अवस्था (Conflict of Interest Free)',
    question: 'के यस खरिदको डिजाइन, लागत अनुमान वा परामर्श कार्यमा तपाईंको वा परिवारको कुनै संलग्नता छैन र स्वार्थ बाझिँदैन?',
    legalRef: 'ITB ४.३; ऐन दफा ६२(३)',
    score: 10,
    guidance: 'डिजाइन तयार गर्ने परामर्शदाता वा निकायका पदाधिकारीसँग स्वार्थ बाझिए बोलपत्र स्वतः बदर भई कालोसूचीमा सिफारिस हुन्छ।',
  },
  {
    id: 'crit-10',
    category: 'प्रतिस्पर्धा र नाफा मार्जिन',
    title: '१०. औसत अङ्क नजिक पर्ने सम्भावना र लक्षित नाफा',
    question: 'के तपाईंको दररेट औसत अङ्कसँग निकटतम हुने (नियम ६५च) र सम्पूर्ण अप्रत्यक्ष/वित्तीय खर्च कटाएर कम्तीमा ८-१२% खुद नाफा बच्ने सम्भावना छ?',
    legalRef: 'ऐन दफा २५(५क), नियम ६५च',
    score: 7,
    guidance: '३०% भन्दा बढी घटेर कबोल गरे मूल्याङ्कनबाटै हटाइन्छ। औसत नजिक रहने गरी वैज्ञानिक दररेट कबोल गर्नुपर्छ।',
  },
];

export const BidNoBidAnalyzer: React.FC = () => {
  const [criteria, setCriteria] = useState<CriterionItem[]>(DEFAULT_CRITERIA);
  const [activeTab, setActiveTab] = useState<'decision-matrix' | 'cost-formula'>('decision-matrix');

  // Cost Formula State
  const [directMaterialCost, setDirectMaterialCost] = useState<number>(10000000); // रु १ करोड
  const [freightAndCustom, setFreightAndCustom] = useState<number>(800000); // रु ८ लाख
  const [installationLabour, setInstallationLabour] = useState<number>(1200000); // रु १२ लाख
  const [bankGuaranteeCommission, setBankGuaranteeCommission] = useState<number>(150000); // रु १.५ लाख
  const [retentionCost5Percent, setRetentionCost5Percent] = useState<number>(120000); // रु १.२ लाख (ब्याज नोक्सानी)
  const [riskContingencyPercent, setRiskContingencyPercent] = useState<number>(4); // ४%
  const [targetProfitPercent, setTargetProfitPercent] = useState<number>(10); // १०%
  const [applyVat, setApplyVat] = useState<boolean>(true);

  // Score Calculation
  const { totalScore, maxScore, percentageScore, verdict } = useMemo(() => {
    const total = criteria.reduce((sum, c) => sum + c.score, 0);
    const max = criteria.length * 10;
    const pct = Math.round((total / max) * 100);

    let v: {
      type: 'go' | 'caution' | 'no-bid';
      title: string;
      color: string;
      bgColor: string;
      borderColor: string;
      description: string;
    };

    if (pct >= 75) {
      v = {
        type: 'go',
        title: '✅ बोलपत्रमा ढुक्क भई सहभागी हुनुहोस् (GO - High Probability)',
        color: 'text-emerald-800',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-400',
        description:
          'तपाईंको प्राविधिक योग्यता, वित्तीय स्रोत, बिड क्यापासिटी र नाफा मार्जिन अत्यन्त अनुकूल छ। जोखिम नियन्त्रण योग्य छ र औसत अङ्क प्रतिस्पर्धामा जित्ने उच्च सम्भावना देखिन्छ।',
      };
    } else if (pct >= 50) {
      v = {
        type: 'caution',
        title: '⚠️ सावधानीपूर्वक वा JV बनाएर मात्र सहभागी हुनुहोस् (PROCEED WITH CAUTION)',
        color: 'text-amber-800',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-400',
        description:
          'केही मापदण्ड (जस्तै बैंक सीमा, LD जोखिम वा नगद प्रवाह) मा मध्यम जोखिम देखिन्छ। बलियो साझेदारसँग संयुक्त उपक्रम (JV) बनाएर वा दररेटमा आकस्मिकता (Risk contingency) थपेर मात्र बोलपत्र पेश गर्नुहोस्।',
      };
    } else {
      v = {
        type: 'no-bid',
        title: '🛑 बोलपत्र नहाल्नुहोस् (NO-BID - High Risk of Loss / Disqualification)',
        color: 'text-red-800',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-400',
        description:
          'यो खरिदमा भाग लिँदा प्राविधिक अयोग्यता, बैंक सीमा अभाव वा अस्वाभाविक न्यून दरका कारण गम्भीर आर्थिक नोक्सानी वा कालोसूचीको जोखिम छ। आफ्नो स्रोत र ऊर्जा अन्य अनुकूल ठेक्कामा केन्द्रित गर्नुहोस्।',
      };
    }

    return { totalScore: total, maxScore: max, percentageScore: pct, verdict: v };
  }, [criteria]);

  // Pricing Calculation
  const pricingCalculations = useMemo(() => {
    const directTotal = directMaterialCost + freightAndCustom + installationLabour;
    const indirectTotal = bankGuaranteeCommission + retentionCost5Percent;
    const baseSubtotal = directTotal + indirectTotal;
    const contingencyAmount = (baseSubtotal * riskContingencyPercent) / 100;
    const costBeforeProfit = baseSubtotal + contingencyAmount;
    const profitAmount = (costBeforeProfit * targetProfitPercent) / 100;
    const taxableTotal = costBeforeProfit + profitAmount;
    const vatAmount = applyVat ? taxableTotal * 0.13 : 0;
    const grandTotal = taxableTotal + vatAmount;

    return {
      directTotal,
      indirectTotal,
      baseSubtotal,
      contingencyAmount,
      costBeforeProfit,
      profitAmount,
      taxableTotal,
      vatAmount,
      grandTotal,
    };
  }, [
    directMaterialCost,
    freightAndCustom,
    installationLabour,
    bankGuaranteeCommission,
    retentionCost5Percent,
    riskContingencyPercent,
    targetProfitPercent,
    applyVat,
  ]);

  const handleScoreChange = (id: string, score: number) => {
    setCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, score: Math.max(1, Math.min(10, score)) } : c))
    );
  };

  const handleResetScores = () => {
    setCriteria(DEFAULT_CRITERIA);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="bg-white p-1.5 sm:p-2 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('decision-matrix')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${activeTab === 'decision-matrix'
              ? 'bg-indigo-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
          >
            <Sliders className="w-4 h-4" />
            <span>१०-सूचकांक निर्णय म्याट्रिक्स (Bid / No-Bid)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cost-formula')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${activeTab === 'cost-formula'
              ? 'bg-indigo-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
          >
            <Calculator className="w-4 h-4" />
            <span>मूल्य निर्धारण सूत्र तथा लागत ब्रेकडाउन (Pricing Calculator)</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: DECISION MATRIX */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'decision-matrix' && (
        <div className="space-y-6">
          {/* Dynamic Verdict Banner */}
          <div className={`${verdict.bgColor} border-2 ${verdict.borderColor} rounded-2xl p-5 shadow-2xs`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className={`text-base sm:text-lg font-bold ${verdict.color} flex items-center gap-2`}>
                  <span>{verdict.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed max-w-3xl">
                  {verdict.description}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 text-center shadow-xs">
                  <span className="text-xs text-slate-500 font-medium">तपाईंको स्कोर: </span>
                  <span className="text-base font-extrabold text-slate-900">{percentageScore}%</span>
                  <span className="text-xs text-slate-500 ml-1 font-semibold">({totalScore}/{maxScore})</span>
                </div>
                <button
                  type="button"
                  onClick={handleResetScores}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors self-start sm:self-auto cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>रिसेट गर्नुहोस्</span>
                </button>
              </div>
            </div>
          </div>

          {/* 10 Assessment Criteria Slider Cards */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  १० मुख्य रणनीतिक प्रश्नहरूमा आफ्नो स्थिति मूल्याङ्कन गर्नुहोस्
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  प्रत्येक प्रश्नमा १ (अत्यन्त कमजोर/जोखिमपूर्ण) देखि १० (पूर्ण सुरक्षित/सक्षम) सम्म अङ्क दिनुहोस्।
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                कुल: {totalScore} / १००
              </span>
            </div>

            <div className="space-y-5">
              {criteria.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">[{item.legalRef}]</span>
                      </div>
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{item.title}</h5>
                      <p className="text-xs text-slate-700 leading-relaxed">{item.question}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <span className="text-sm font-extrabold text-indigo-900 w-12 text-right">
                        {item.score} / १०
                      </span>
                    </div>
                  </div>

                  {/* Slider Control */}
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[10px] text-slate-400 font-semibold">१ (कमजोर)</span>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={item.score}
                      onChange={(e) => handleScoreChange(item.id, Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-700"
                    />
                    <span className="text-[10px] text-slate-400 font-semibold">१० (उत्कृष्ट)</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
                    <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{item.guidance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: PRICING & COST BREAKDOWN FORMULA */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'cost-formula' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-700" />
              <span>भाग १४.२: मूल्य निर्धारणका आधारभूत सूत्र तथा लागत संरचना</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              आफ्नो कबोल मूल्य केवल लागत अनुमान हेरेर वा हचुवामा घटाएर निर्धारण नगर्नुहोस्। प्रत्यक्ष लागत, जमानत कमिसन, ५% रिटेन्सन वित्तीय लागत, ३० दिन ढिलाइको असर र कर संरचनाको वास्तविक ब्रेकडाउन गर्नुहोस्।
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-3">
              {/* Input Fields */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1.5">
                  १. लागत इनपुट प्रविष्ट गर्नुहोस्
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      प्रत्यक्ष सामग्री/निर्माण खरिद लागत (रु.):
                    </label>
                    <input
                      type="number"
                      value={directMaterialCost}
                      onChange={(e) => setDirectMaterialCost(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        ढुवानी, भन्सार तथा उतार्ने खर्च (रु.):
                      </label>
                      <input
                        type="number"
                        value={freightAndCustom}
                        onChange={(e) => setFreightAndCustom(Math.max(0, Number(e.target.value)))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        जडान, कमिसनिङ र श्रम लागत (रु.):
                      </label>
                      <input
                        type="number"
                        value={installationLabour}
                        onChange={(e) => setInstallationLabour(Math.max(0, Number(e.target.value)))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        जमानतको बैंक कमिसन तथा शुल्क (रु.):
                      </label>
                      <input
                        type="number"
                        value={bankGuaranteeCommission}
                        onChange={(e) => setBankGuaranteeCommission(Math.max(0, Number(e.target.value)))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        ५% रिटेन्सन रोकिँदाको वित्तीय ब्याज (रु.):
                      </label>
                      <input
                        type="number"
                        value={retentionCost5Percent}
                        onChange={(e) => setRetentionCost5Percent(Math.max(0, Number(e.target.value)))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        आकस्मिकता तथा जोखिम बफर (%):
                      </label>
                      <input
                        type="number"
                        value={riskContingencyPercent}
                        onChange={(e) => setRiskContingencyPercent(Math.max(0, Number(e.target.value)))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        अपेक्षित खुद नाफा मार्जिन (%):
                      </label>
                      <input
                        type="number"
                        value={targetProfitPercent}
                        onChange={(e) => setTargetProfitPercent(Math.max(0, Number(e.target.value)))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={applyVat}
                      onChange={(e) => setApplyVat(e.target.checked)}
                      className="w-4 h-4 text-indigo-700 rounded-md focus:ring-indigo-500"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      मूल्य अभिवृद्धि कर (१३% VAT) समावेश गर्ने
                    </span>
                  </label>
                </div>
              </div>

              {/* Output Breakdown */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1.5 flex items-center justify-between">
                  <span>२. वैज्ञानिक कबोल मूल्य सिमुलेशन</span>
                  <span className="text-indigo-700 font-bold">अनुपात विश्लेषण</span>
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>कुल प्रत्यक्ष लागत (Direct Costs):</span>
                    <span className="font-semibold text-slate-900">
                      रु. {pricingCalculations.directTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>अप्रत्यक्ष तथा वित्तीय लागत (Bank & Retention):</span>
                    <span className="font-semibold text-slate-900">
                      रु. {pricingCalculations.indirectTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>जोखिम बफर ({riskContingencyPercent}% Contingency):</span>
                    <span className="font-semibold text-slate-900">
                      रु. {Math.round(pricingCalculations.contingencyAmount).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>अपेक्षित नाफा ({targetProfitPercent}% Target Margin):</span>
                    <span className="font-semibold text-emerald-700">
                      रु. {Math.round(pricingCalculations.profitAmount).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {applyVat && (
                    <div className="flex items-center justify-between text-slate-600">
                      <span>१३% मूल्य अभिवृद्धि कर (VAT):</span>
                      <span className="font-semibold text-slate-900">
                        रु. {Math.round(pricingCalculations.vatAmount).toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="border-t-2 border-slate-300 pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        सिफारिस गरिएको सुरक्षित कबोल मूल्य:
                      </span>
                      <span className="text-[11px] text-slate-500">
                        (औसत अङ्क र ३०% घटेको सीमालाई ध्यानमा राख्नुहोस्)
                      </span>
                    </div>
                    <span className="text-base sm:text-lg font-extrabold text-indigo-900">
                      रु. {Math.round(pricingCalculations.grandTotal).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-[11px] text-indigo-950 leading-relaxed">
                  <strong>💡 सार्वजनिक खरिद ऐन दफा ५२घ को संरक्षण:</strong> सम्झौताका शर्त विपरीत सार्वजनिक निकायका पदाधिकारीले दबाब दिएर कुनै पनि अधिकार परित्याग गराउन पाउने छैनन्। जबर्जस्ती गराइएको परित्याग कानुनतः अमान्य हुन्छ।
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
