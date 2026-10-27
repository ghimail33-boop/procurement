import React, { useState, useMemo } from 'react';
import {
  UtensilsCrossed,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  ShieldAlert,
  FileText,
  Clock,
  Warehouse,
  Coins,
  BadgeAlert,
  HelpCircle,
  RotateCcw,
  Plus,
  Trash2,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface RationItem {
  id: string;
  name: string;
  unit: string;
  qty: number;
  marketRate: number; // जिल्ला दररेट / लागत अनुमान दर
  quotedRate: number; // आपूर्तिकर्ताको कबोल दर
}

const DEFAULT_RATION_ITEMS: RationItem[] = [
  { id: 'item-1', name: 'मन्सुली चामल (प्रथम स्तर)', unit: 'के.जी.', qty: 50000, marketRate: 85, quotedRate: 82 },
  { id: 'item-2', name: 'रहरको दाल (नमुना अनुरुप)', unit: 'के.जी.', qty: 8000, marketRate: 175, quotedRate: 180 },
  { id: 'item-3', name: 'तोरीको खानेतेल (NS चिन्ह)', unit: 'लिटर', qty: 6000, marketRate: 260, quotedRate: 255 },
  { id: 'item-4', name: 'चिनी (सेतो दानादार)', unit: 'के.जी.', qty: 4000, marketRate: 105, quotedRate: 110 },
  { id: 'item-5', name: 'आयोडिनयुक्त नुन', unit: 'के.जी.', qty: 2500, marketRate: 26, quotedRate: 25 },
  { id: 'item-6', name: 'खसी/बोकाको ताजा मासु', unit: 'के.जी.', qty: 5000, marketRate: 950, quotedRate: 980 },
  { id: 'item-7', name: 'गहुँको पिठो (मैदा/आटा)', unit: 'के.जी.', qty: 10000, marketRate: 65, quotedRate: 68 },
  { id: 'item-8', name: 'चियापत्ती (CTC)', unit: 'के.जी.', qty: 800, marketRate: 420, quotedRate: 440 },
];

export const RationProcurementHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'simulator' | 'annual-cycle' | 'eligibility' | 'advance-storage' | 'cash-emergency' | 'strategic-tips'
  >('simulator');

  // Simulator State
  const [items, setItems] = useState<RationItem[]>(DEFAULT_RATION_ITEMS);
  const [newItemName, setNewItemName] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('के.जी.');
  const [newItemQty, setNewItemQty] = useState<number>(1000);
  const [newItemMarketRate, setNewItemMarketRate] = useState<number>(100);
  const [newItemQuotedRate, setNewItemQuotedRate] = useState<number>(100);

  // Calculations
  const calculations = useMemo(() => {
    let totalEstCost = 0;
    let totalQuotedCost = 0;
    let excessiveCount = 0;
    const itemAnalysis = items.map((item) => {
      const itemEstTotal = item.qty * item.marketRate;
      const itemQuotedTotal = item.qty * item.quotedRate;
      totalEstCost += itemEstTotal;
      totalQuotedCost += itemQuotedTotal;

      const diff = item.quotedRate - item.marketRate;
      const percentOver = item.marketRate > 0 ? (diff / item.marketRate) * 100 : 0;
      const isOver100Percent = percentOver > 100;
      if (isOver100Percent) excessiveCount++;

      return {
        ...item,
        itemEstTotal,
        itemQuotedTotal,
        diff,
        percentOver,
        isOver100Percent,
      };
    });

    const overallDiff = totalQuotedCost - totalEstCost;
    const overallPercent = totalEstCost > 0 ? (overallDiff / totalEstCost) * 100 : 0;
    const isFatalCancellationRisk = excessiveCount >= 2;

    return {
      totalEstCost,
      totalQuotedCost,
      overallDiff,
      overallPercent,
      excessiveCount,
      isFatalCancellationRisk,
      itemAnalysis,
    };
  }, [items]);

  const handleUpdateItemRate = (id: string, field: 'marketRate' | 'quotedRate' | 'qty', val: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: Math.max(0, val) } : it))
    );
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) {
      alert('कम्तीमा एउटा राशन सामग्री हुनुपर्छ।');
      return;
    }
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem: RationItem = {
      id: `item-${Date.now()}`,
      name: newItemName.trim(),
      unit: newItemUnit,
      qty: newItemQty,
      marketRate: newItemMarketRate,
      quotedRate: newItemQuotedRate,
    };
    setItems((prev) => [...prev, newItem]);
    setNewItemName('');
    setNewItemQty(1000);
    setNewItemMarketRate(100);
    setNewItemQuotedRate(100);
  };

  const handleResetSimulator = () => {
    setItems(DEFAULT_RATION_ITEMS);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
              <UtensilsCrossed className="w-4 h-4" />
              <span>विशेष खरिद मार्गदर्शन • Ration Procurement Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
              <span>राशन खरिद तथा सिदा आपूर्ति व्यवस्था</span>
              <span className="text-xs bg-amber-600/80 text-white px-2.5 py-0.5 rounded-full font-medium">
                ऐन दफा ४२ • नियम ८८–९३
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-3xl leading-relaxed">
              नेपाली सेना, नेपाल प्रहरी, सशस्त्र प्रहरी बल, कारागारका कैदीबन्दी, अस्पतालका बिरामी र पशुपन्छीका लागि खाद्यान्न आपूर्ति सम्बन्धी विशेष कानुनी व्यवस्था, वार्षिक चक्र (माघ १ देखि लागू), २५% गोदाम पेश्की र नियम ८९(६) बमोजिम १००% बढी दररेटमा बोलपत्र रद्द हुने जोखिम सिमुलेटर।
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 p-3.5 rounded-xl text-center shrink-0">
            <span className="text-xs text-amber-200 block font-medium">वार्षिक खरिद चक्र</span>
            <span className="text-base font-bold text-white">माघ १ – पौष मसान्त</span>
            <span className="text-[11px] text-amber-300 block mt-0.5">मूल्यवृद्धि नदिइने (Fixed Price)</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white p-1.5 sm:p-2 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {[
            { id: 'simulator', label: 'दररेट तथा १००% बढी जोखिम सिमुलेटर (Rule 89(6))', icon: Calculator },
            { id: 'annual-cycle', label: 'वार्षिक खरिद चक्र र समयतालिका', icon: Clock },
            { id: 'eligibility', label: 'योग्यता, औद्योगिक उत्पादन र नमूना (SBD)', icon: ShieldCheck },
            { id: 'advance-storage', label: '२५% पेश्की र गोदाम भण्डारण (नियम ९१-९२)', icon: Warehouse },
            { id: 'cash-emergency', label: 'नगद राशन विकल्प र अन्न अभाव समन्वय', icon: Coins },
            { id: 'strategic-tips', label: 'आपूर्तिकर्ताका लागि १० रणनीतिक सुझाव', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${isActive
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SUBTAB 1: SIMULATOR & RULE 89(6) RISK CHECKER */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {/* Statutory Rule Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <span className="font-bold block text-sm text-amber-950 mb-0.5">
                सार्वजनिक खरिद नियमावली, २०६४ को नियम ८९(६) को अनिवार्य कानुनी सतर्कता:
              </span>
              बोलपत्रदाताले <strong>दुई वा दुईभन्दा बढी उपभोग्य सामग्री (आइटम)</strong> को दररेट प्रचलित बजार मूल्य (स्वीकृत लागत अनुमान) को <strong>१०० प्रतिशत भन्दा बढी (दोब्बरभन्दा बढी)</strong> कबोल गरेमा मूल्याङ्कन समितिले त्यस्तो बोलपत्र <strong>रद्द गर्न सिफारिस गर्न सक्नेछ</strong>। तल आफ्नो दररेट प्रविष्ट गरी यो जोखिम तुरुन्त परीक्षण गर्नुहोस्।
            </div>
          </div>

          {/* Cancellation Alert if Triggered */}
          {calculations.isFatalCancellationRisk && (
            <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-5 text-red-950 shadow-sm animate-pulse">
              <div className="flex items-start gap-3.5">
                <BadgeAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-red-700 flex items-center gap-2">
                    <span>⚠️ खरिद कारबाही रद्द हुने उच्च जोखिम (Rule 89(6) Triggered!)</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-red-800 mt-1">
                    तपाईंले कबोल गरेका सामग्रीहरूमध्ये <strong>{calculations.excessiveCount} वटा आइटम</strong> को दररेट प्रचलित बजार मूल्यभन्दा १००% भन्दा बढी छ। नियमावली अनुसार २ वा सोभन्दा बढी आइटममा यस्तो देखिएमा <strong>मूल्याङ्कन समितिले तपाईंको सम्पूर्ण बोलपत्र रद्द गरी खारेज गर्न सक्छ!</strong> कृपया ती आइटमहरूको दररेट बजार दरको परिधिभित्र समायोजन गर्नुहोस्।
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                कुल लागत अनुमान (बजार दर)
              </span>
              <span className="text-lg sm:text-xl font-bold text-slate-900 block mt-1">
                रु. {calculations.totalEstCost.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">जिल्ला राशन दररेट समिति स्वीकृत</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                तपाईंको कुल कबोल रकम
              </span>
              <span className="text-lg sm:text-xl font-bold text-amber-700 block mt-1">
                रु. {calculations.totalQuotedCost.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] font-medium text-slate-600 block mt-0.5">
                {calculations.overallPercent >= 0
                  ? `+${calculations.overallPercent.toFixed(2)}% अनुमान भन्दा बढी`
                  : `${calculations.overallPercent.toFixed(2)}% अनुमान भन्दा घटी`}
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                नियम ८९(६) १००% बढी आइटम
              </span>
              <span
                className={`text-lg sm:text-xl font-bold block mt-1 ${calculations.excessiveCount >= 2
                  ? 'text-red-600'
                  : calculations.excessiveCount === 1
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                  }`}
              >
                {calculations.excessiveCount} वटा आइटम
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                {calculations.excessiveCount >= 2
                  ? '🔴 रद्द हुने अवस्था (२ वा बढी)'
                  : calculations.excessiveCount === 1
                    ? '🟡 चेतावनी (थप १ वटा बढे रद्द)'
                    : '🟢 सुरक्षित (नियम पालना)'}
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                २५% गोदाम पेश्की रकम (नियम ९२)
              </span>
              <span className="text-lg sm:text-xl font-bold text-emerald-700 block mt-1">
                रु. {Math.round(calculations.totalQuotedCost * 0.25).toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">७ महिना मान्य बैंक ग्यारेन्टी आवश्यक</span>
            </div>
          </div>

          {/* Interactive Ration Items Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>अनुसूची-७ ढाँचा: राशन सामग्री, परिमाण तथा कबोल दररेट तालिका</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  प्रत्येक सामग्रीको स्वीकृत बजार दर र तपाईंले कबोल गर्ने दररेट सम्पादन गर्नुहोस्।
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetSimulator}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors self-start sm:self-auto cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>पुनः सुरु गर्नुहोस् (Reset)</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-semibold text-[11px] sm:text-xs">
                    <th className="p-3 w-12 text-center">क्र.सं.</th>
                    <th className="p-3">सामग्रीको विवरण</th>
                    <th className="p-3 w-20">इकाई</th>
                    <th className="p-3 w-28 text-right">वार्षिक परिमाण</th>
                    <th className="p-3 w-32 text-right">बजार दर (रु.)</th>
                    <th className="p-3 w-36 text-right">कबोल दर (रु.)</th>
                    <th className="p-3 w-32 text-right">कुल कबोल रकम</th>
                    <th className="p-3 w-32 text-center">दर फरक %</th>
                    <th className="p-3 w-16 text-center">कार्य</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {calculations.itemAnalysis.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50 transition-colors ${item.isOver100Percent ? 'bg-red-50/70 font-medium' : ''
                        }`}
                    >
                      <td className="p-3 text-center text-slate-400 font-medium">{idx + 1}</td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-900 block">{item.name}</span>
                        {item.isOver100Percent && (
                          <span className="text-[10px] text-red-600 font-bold flex items-center gap-1 mt-0.5">
                            <AlertTriangle className="w-3 h-3" /> नियम ८९(६) उल्लंघन: बजार दर भन्दा १००% भन्दा बढी!
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-600">{item.unit}</td>
                      <td className="p-3 text-right">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => handleUpdateItemRate(item.id, 'qty', Number(e.target.value))}
                          className="w-24 text-right px-2 py-1 border border-slate-200 rounded-md text-xs focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                        />
                      </td>
                      <td className="p-3 text-right">
                        <input
                          type="number"
                          value={item.marketRate}
                          onChange={(e) => handleUpdateItemRate(item.id, 'marketRate', Number(e.target.value))}
                          className="w-24 text-right px-2 py-1 border border-slate-200 rounded-md text-xs focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                        />
                      </td>
                      <td className="p-3 text-right">
                        <input
                          type="number"
                          value={item.quotedRate}
                          onChange={(e) => handleUpdateItemRate(item.id, 'quotedRate', Number(e.target.value))}
                          className={`w-28 text-right px-2 py-1 border rounded-md text-xs font-semibold focus:ring-1 focus:outline-hidden ${item.isOver100Percent
                            ? 'border-red-400 text-red-700 bg-red-50 focus:ring-red-500'
                            : 'border-slate-300 text-slate-900 focus:ring-amber-500'
                            }`}
                        />
                      </td>
                      <td className="p-3 text-right font-bold text-slate-800">
                        रु. {item.itemQuotedTotal.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${item.percentOver > 100
                            ? 'bg-red-100 text-red-700 border border-red-300 animate-pulse'
                            : item.percentOver > 20
                              ? 'bg-amber-100 text-amber-800'
                              : item.percentOver < 0
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                        >
                          {item.percentOver > 0 ? `+${item.percentOver.toFixed(1)}%` : `${item.percentOver.toFixed(1)}%`}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                          title="हटाउनुहोस्"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300 text-xs sm:text-sm">
                    <td colSpan={4} className="p-3 text-right">
                      कुल योग (Total Evaluation Amount):
                    </td>
                    <td className="p-3 text-right text-slate-600">
                      रु. {calculations.totalEstCost.toLocaleString('en-IN')}
                    </td>
                    <td colSpan={2} className="p-3 text-right text-amber-900 text-sm sm:text-base font-extrabold">
                      रु. {calculations.totalQuotedCost.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-center">
                      <span className="text-xs text-slate-700 font-semibold">
                        {calculations.overallPercent >= 0
                          ? `+${calculations.overallPercent.toFixed(1)}%`
                          : `${calculations.overallPercent.toFixed(1)}%`}
                      </span>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddItem} className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center gap-2.5 text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 text-amber-700" /> नयाँ राशन सामग्री थप्नुहोस्:
              </span>
              <input
                type="text"
                placeholder="सामग्रीको नाम (उदा: आलु)"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white flex-1 min-w-[140px] focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
              />
              <input
                type="text"
                placeholder="इकाई"
                value={newItemUnit}
                onChange={(e) => setNewItemUnit(e.target.value)}
                className="w-16 px-2 py-1.5 border border-slate-200 rounded-lg bg-white text-center focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
              />
              <input
                type="number"
                placeholder="परिमाण"
                value={newItemQty}
                onChange={(e) => setNewItemQty(Number(e.target.value))}
                className="w-24 px-2 py-1.5 border border-slate-200 rounded-lg bg-white text-right focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
              />
              <input
                type="number"
                placeholder="बजार दर"
                value={newItemMarketRate}
                onChange={(e) => setNewItemMarketRate(Number(e.target.value))}
                className="w-24 px-2 py-1.5 border border-slate-200 rounded-lg bg-white text-right focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
              />
              <input
                type="number"
                placeholder="कबोल दर"
                value={newItemQuotedRate}
                onChange={(e) => setNewItemQuotedRate(Number(e.target.value))}
                className="w-24 px-2 py-1.5 border border-slate-200 rounded-lg bg-white text-right focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-lg transition-colors cursor-pointer"
              >
                थप्नुहोस्
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUBTAB 2: ANNUAL CYCLE & TIMELINE */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'annual-cycle' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-700" />
              <span>राशन खरिदको वार्षिक क्यालेन्डर र चरणबद्ध चक्र</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              राशन खरिद अन्य सामान्य खरिद जस्तो आर्थिक वर्षको सुरु वा बीचमा नभई विशेष कानुनी व्यवस्था अनुसार <strong>हरेक वर्ष माघ १ गतेदेखि पौष मसान्तसम्म</strong> को वार्षिक चक्रमा सञ्चालन हुन्छ।
            </p>

            <div className="relative border-l-2 border-amber-300 ml-4 pl-6 space-y-8">
              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-600 ring-4 ring-amber-100" />
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  चरण १ • हरेक वर्ष चैत मसान्तभित्र
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  लागत अनुमान तयारी तथा जिल्लास्तरीय समितिबाट स्वीकृति [नियम ८८]
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  राशन व्यवस्था गर्नुपर्ने सुरक्षा निकाय वा अस्पतालका प्रमुखले राशन दरबन्दी अनुसार आवश्यक परिमाण यकिन गरी प्रमुख जिल्ला अधिकारी (CDO) को अध्यक्षतामा गठित समितिबाट बजार दर र नेपाल राष्ट्र बैंकको उपभोक्ता मूल्य सूचकांकका आधारमा लागत अनुमान स्वीकृत गराउँछन्।
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-600 ring-4 ring-amber-100" />
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  चरण २ • लागत अनुमान स्वीकृत भएको ७ दिनभित्र
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  तालुक कार्यालय तथा PPMO लाई जानकारी [नियम ८८(४)]
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  स्वीकृत लागत अनुमानको प्रतिलिपि तालुक मन्त्रालय/विभाग र सार्वजनिक खरिद अनुगमन कार्यालय (PPMO) मा अनिवार्य पठाइन्छ।
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-600 ring-4 ring-amber-100" />
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  चरण ३ • असोज/कार्तिक – मंसिर
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  बोलपत्र आह्वान तथा फाराम बिक्री [नियम ८९(१)-(३)]
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  नयाँ आपूर्तिकर्ताले माघ १ गतेदेखि अनिवार्य राशन सिदा आपूर्ति गर्ने गरी कम्तीमा २१ दिनको म्याद दिई राष्ट्रिय पत्रिका वा e-GP मार्फत बोलपत्र आह्वान गरिन्छ। बोलपत्र फाराम सम्बन्धित कार्यालयका अतिरिक्त जिल्ला प्रशासन कार्यालय र कोलेनिकाबाट समेत बिक्री गरिन्छ।
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-600 ring-4 ring-amber-100" />
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  चरण ४ • पुष १५ भित्र
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  मूल्याङ्कन, आशयको सूचना, कार्यसम्पादन जमानत र सम्झौता [नियम ८९, ९१]
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  अनुसूची-७ बमोजिम तुलनात्मक तालिका तयार गरी न्यूनतम मूल्याङ्कित प्रभावग्राही बोलपत्रदातासँग सम्झौता गरिन्छ। ७ दिनको आशय सूचना पश्चात् कबोल अङ्कको ५% कार्यसम्पादन जमानत (कम्तीमा १३ महिना मान्य) दाखिला गराई सम्झौता सम्पन्न हुन्छ।
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  चरण ५ • माघ १ देखि अर्को वर्षको पौष मसान्तसम्म
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  राशन सिदा आपूर्ति, २५% पेश्की र मासिक भुक्तानी [नियम ९२]
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  माघ १ गते बिहानदेखि नयाँ आपूर्तिकर्ताले तोकिएको स्थानमा दैनिक राशन आपूर्ति सुरु गर्छन्। ७ महिना मान्य बैंक ग्यारेन्टी दिएर २५% पेश्की लिन सकिन्छ। मासिक बिलबाट ५०% पेश्की कट्टा गरी भुक्तानी हुन्छ। चालु आर्थिक वर्षको असारसम्म पहिलो पेश्की फर्स्यौट भएपछि श्रावणमा दोस्रो २५% पेश्की लिन पाइन्छ।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUBTAB 3: ELIGIBILITY & SBD REQUIREMENTS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'eligibility' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>कानुनी योग्यता र कागजात (Legal Criteria)</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  <span><strong>नेपाली नागरिक मात्र योग्य:</strong> राशन खरिद सम्झौता नेपाली नागरिक, फर्म वा नेपालमा दर्ता भएको कम्पनीसँग मात्र गर्न सकिन्छ (नियम ८९(२))।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  <span>फर्म/कम्पनी दर्ता प्रमाणपत्र, स्थायी लेखा नम्बर (PAN) र मूल्य अभिवृद्धि कर (VAT) दर्ता।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  <span>आन्तरिक राजस्व कार्यालयबाट पछिल्लो आर्थिक वर्षको कर चुक्ता प्रमाणपत्र (Tax Clearance Certificate)।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  <span>अदालतबाट फौजदारी सजाय नपाएको, कालोसूचीमा नपरेको र स्वार्थ नबाझिएको लिखित स्वघोषणा।</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-700" />
                <span>वित्तीय तथा औद्योगिक क्षमता (Financial & Industrial SBD)</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  <span><strong>न्यूनतम वार्षिक कारोबार:</strong> विगत ३ वर्षको कारोबारमध्ये कुनै १ वर्षको सबैभन्दा राम्रो कारोबार लागत अनुमानको कम्तीमा <strong>५० प्रतिशत</strong> हुनुपर्ने।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  <span><strong>औद्योगिक उत्पादन प्रमाणपत्र:</strong> खानेतेल, बिस्कुट, कन्डेन्स मिल्क, पिठो, वनस्पति घ्यू जस्ता प्रशोधित खाद्य सामग्रीको हकमा उद्योगले विगत ३ वर्षदेखि लागत अनुमानको कम्तीमा २५% बराबर उत्पादन गरी सार्वजनिक निकायमा आपूर्ति गरेको प्रमाण संलग्न हुनुपर्ने।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  <span><strong>नेपाल गुणस्तर चिन्ह (NS Mark):</strong> BDS मा तोकिएका औद्योगिक उत्पादनहरूमा अनिवार्य गुणस्तर चिन्ह प्रमाणपत्र।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  <span><strong>लाहाछापयुक्त खाद्य नमूना:</strong> तोकिएका सामग्रीहरूको ५०० देखि १००० ग्रामको सिलबन्दी नमूना पेश गर्नुपर्ने।</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUBTAB 4: 25% ADVANCE & WAREHOUSE STORAGE PLEDGE */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'advance-storage' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Warehouse className="w-5 h-5 text-amber-700" />
              <span>२५% पेश्की, गोदाम भण्डारण र भुक्तानी व्यवस्था [नियम ९२]</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              राशन आपूर्तिकर्तालाई खाद्यान्न संकलन र ढुवानी सहजीकरणका लागि सार्वजनिक खरिद नियमावलीले विशेष पेश्की सुविधा उपलब्ध गराएको छ।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                <span className="text-xs font-bold text-amber-800 uppercase block">प्रथम किस्ता २५% पेश्की</span>
                <p className="text-xs text-amber-950 mt-1 leading-relaxed">
                  सम्झौता भएपछि कबोल अङ्कको <strong>२५ प्रतिशतसम्म पेश्की</strong> वाणिज्य बैंकको कम्तीमा <strong>७ महिना मान्य</strong> अवधिको बैंक जमानत दाखिला गरी लिन सकिन्छ।
                </p>
              </div>

              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
                <span className="text-xs font-bold text-blue-800 uppercase block">गोदाम मौज्दात अनिवार्य शर्त</span>
                <p className="text-xs text-blue-950 mt-1 leading-relaxed">
                  पेश्की रकम लिएको बराबरको खाद्यान्न आपूर्तिकर्ताले आफ्नो गोदाममा <strong>अनिवार्य मौज्दात</strong> राख्नुपर्छ। सार्वजनिक निकायले जुनसुकै बेला गोदाम निरीक्षण गर्न सक्छ।
                </p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                <span className="text-xs font-bold text-emerald-800 uppercase block">दोस्रो किस्ता २५% (साउनमा)</span>
                <p className="text-xs text-emerald-950 mt-1 leading-relaxed">
                  पहिलो पेश्की असार मसान्तभित्र मासिक बिलको ५०% कट्टा गरी फर्स्यौट भएपछि नयाँ आर्थिक वर्षको <strong>श्रावणमा पुनः कबोल अङ्कको २५%</strong> पेश्की लिन पाइन्छ (पौष मसान्तसम्म असुल हुने)।
                </p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-900 leading-relaxed">
              <strong>⚠️ सम्झौता भङ्ग भएमा पेश्की असुल नियम:</strong> यदि आपूर्तिकर्ताले गुणस्तरहीन राशन आपूर्ति गरी वा सेवा बन्द गरी सम्झौता भङ्ग भएमा बाँकी पेश्की रकममा <strong>वार्षिक १० प्रतिशतका दरले ब्याज थप गरी ३० दिनभित्र</strong> असुल गरिनेछ। नबुझाएमा सरकारी बाँकी सरह असुल उपर गरी ५% कार्यसम्पादन जमानत जफत हुन्छ।
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUBTAB 5: CASH RATION & EMERGENCY GRAINS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'cash-emergency' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-700" />
                <span>नगदमा राशन दिने वैकल्पिक व्यवस्था [नियम ९३]</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                भौगोलिक विकटता, प्राकृतिक विपद् वा राशन आपूर्ति सम्झौता हुन नसकेको अवस्थामा सार्वजनिक निकायले कर्मचारी, जवान वा बिरामीलाई नगदमा सिदा उपलब्ध गराउन सक्छ:
              </p>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  <span>स्वीकृत लागत अनुमानमा उल्लिखित दररेटबाट <strong>मूल्य अभिवृद्धि कर (VAT) र आपूर्तिकर्ताको मुनाफा कट्टा गरी</strong> खुद नगद सिदा वितरण गरिन्छ।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  <span>नगद सिदा दिइएको अवधिमा आपूर्तिकर्तालाई कुनै प्रकारको भुक्तानी वा क्षतिपूर्ति दाबी गर्न छुट हुँदैन।</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-blue-700" />
                <span>स्थानीय बजारमा अन्न अभाव भएमा प्रजिअको भूमिका [नियम ८९(८)]</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                यदि सम्बन्धित जिल्लामा खाद्यान्न वा अन्नको चरम अभाव भई आपूर्तिकर्ताले स्थानीय रूपमा संकलन गर्न नसकेमा:
              </p>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                  <span><strong>प्रमुख जिल्ला अधिकारी (CDO) ले</strong> खाद्य व्यवस्था तथा व्यापार कम्पनी वा अन्य जिल्लाका निकायसँग समन्वय गरी अन्न खरिद र ढुवानीका लागि <strong>इजाजतपत्र/पास</strong> दिलाइदिनुपर्नेछ।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                  <span>आपूर्तिकर्ताले आपूर्ति अवरुद्ध हुने बहाना बनाउन पाउँदैन; जिल्ला प्रशासनको सहजीकरणमा अन्य जिल्लाबाट आपूर्ति जारी राख्नुपर्छ।</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SUBTAB 6: STRATEGIC TIPS FOR RATION BIDDERS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'strategic-tips' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700" />
              <span>राशन बोलपत्रदाताका लागि १० रणनीतिक तथा व्यावसायिक सुझाव</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {[
                {
                  no: 1,
                  title: 'मूल्यवृद्धि नदिइने जोखिमको मूल्य निर्धारण',
                  desc: 'सम्झौता अवधिभर (माघदेखि पौष) बजार मूल्य जति बढे पनि मूल्य समायोजन पाइँदैन। तसर्थ दररेट कबोल गर्दा मौसमी उतारचढाव र मुद्रास्फीतिको जोखिम अनिवार्य समावेश गर्नुहोस्।',
                },
                {
                  no: 2,
                  title: 'नियम ८९(६) को १००% बढी दररेटबाट बच्नुहोस्',
                  desc: 'कुनै २ वटा आइटममा पनि बजार दरभन्दा दोब्बर दर राखेमा तपाईंको बोलपत्र सिधै खारेज हुन सक्छ। हरेक आइटमको दररेट यथार्थपरक राख्नुहोस्।',
                },
                {
                  no: 3,
                  title: 'औद्योगिक उत्पादन र गुणस्तर चिन्हको अग्रिम तयारी',
                  desc: 'तेल, बिस्कुट, घ्यू, पिठो जस्ता वस्तुमा कम्तीमा २५% उत्पादन आपूर्ति गरेको औद्योगिक प्रमाणपत्र र NS Mark नभए प्राविधिक रूपमै असफल भइन्छ।',
                },
                {
                  no: 4,
                  title: 'लाहाछापयुक्त खाद्य नमूना (Sample Testing)',
                  desc: '५०० देखि १००० ग्रामको सिलबन्दी नमूना अनिवार्य पेश गर्नुहोस्। नमूना पेश नगरे निकायले दिएको नमूना स्वीकार गरेको मानिन्छ जुन महँगो पर्न सक्छ।',
                },
                {
                  no: 5,
                  title: '२५% पेश्की र गोदाम भण्डारण क्षमता',
                  desc: 'पेश्की लिए बराबरको खाद्यान्न आफ्नो गोदाममा नराखे सम्झौता भङ्ग भई १०% ब्याजसहित असुल हुन्छ। सुरक्षित र व्यवस्थित गोदाम सुनिश्चित गर्नुहोस्।',
                },
                {
                  no: 6,
                  title: 'जवान संख्याको ५०% सम्म घटबढ सहनशीलता',
                  desc: 'सुरक्षा निकायको सरुवा, तालिम वा अपरेशनका कारण राशन उपभोग गर्ने संख्या ५०% सम्म घटबढ हुन सक्छ। सोही कबोल दरमा आपूर्ति गर्नुपर्ने दायित्व बुझ्नुहोस्।',
                },
                {
                  no: 7,
                  title: 'ढुवानी अवरोध र बफर स्टक व्यवस्थापन',
                  desc: 'वर्षायाम, बाढीपहिरो वा सडक अवरोध हुँदा पनि राशन आपूर्ति रोकिनु हुँदैन। कम्तीमा १५ देखि ३० दिनको बफर स्टक केन्द्रमा राख्नुहोस्।',
                },
                {
                  no: 8,
                  title: 'अस्वाभाविक न्यून दर (Unbalanced Low Bidding) बाट बच्नुहोस्',
                  desc: 'अति न्यून दर कबोल गरेमा निकायले स्पष्टीकरण माग्न सक्छ र ८% थप कार्यसम्पादन जमानत माग गर्न सक्छ। काम गर्न नसके धरौटी जफत हुन्छ।',
                },
                {
                  no: 9,
                  title: 'मासिक बिलबाट ५०% पेश्की कट्टा नगद प्रवाह',
                  desc: 'मासिक भुक्तानीबाट ५०% पेश्की कट्टा हुने हुँदा नगद प्रवाह (Cash Flow) को योजना पहिल्यै बनाउनुहोस् ताकि चालु पुँजीको अभाव नहोस्।',
                },
                {
                  no: 10,
                  title: 'दफा ५२घ को कानुनी सुरक्षा',
                  desc: 'सम्झौताका शर्त विपरीत सार्वजनिक निकायका पदाधिकारीले दबाब दिएर अधिकार परित्याग गराउन पाउँदैनन्। यस्तो जबर्जस्ती परित्याग कानुनतः अमान्य हुन्छ।',
                },
              ].map((tip) => (
                <div key={tip.no} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {tip.no}
                  </span>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{tip.title}</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tip.desc}</p>
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
