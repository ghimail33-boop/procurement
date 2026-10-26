import React, { useState, useMemo } from 'react';
import procDeadlineImage from '../../proc-deadline.png';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Scale, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';

export type ProcurementMethodKey = 
  | 'ncb-30'
  | 'ncb-21'
  | 'icb-45'
  | 'sq-15'
  | 'sq-7'
  | 'rfp-30'
  | 'eoi-15'
  | 'direct-purchase';

interface MethodTimelineConfig {
  id: ProcurementMethodKey;
  nameNepali: string;
  category: 'works' | 'goods' | 'services';
  noticeDays: number;
  preBidDaysBefore: number; // e.g. 10 days before submission
  queryDaysBefore: number; // e.g. 7 days before submission
  bidValidityDays: number; // e.g. 90 or 120
  bidSecurityDays: number; // Validity + 30 days (120 or 150)
  loiDays: number; // 7 days
  loaDays: number; // 15 days
  extensionNoticeDays: number; // 21 days before contract expiry
  legalBasis: string;
}

const TIMELINE_CONFIGS: Record<ProcurementMethodKey, MethodTimelineConfig> = {
  'ncb-30': {
    id: 'ncb-30',
    nameNepali: 'राष्ट्रिय खुला बोलपत्र (NCB - ३० दिने प्रथम पटक)',
    category: 'works',
    noticeDays: 30,
    preBidDaysBefore: 10,
    queryDaysBefore: 7,
    bidValidityDays: 90,
    bidSecurityDays: 120, // 90 + 30
    loiDays: 7,
    loaDays: 15,
    extensionNoticeDays: 21,
    legalBasis: 'सार्वजनिक खरिद ऐन दफा १४, नियमावली नियम ४९ र ६५',
  },
  'ncb-21': {
    id: 'ncb-21',
    nameNepali: 'राष्ट्रिय खुला बोलपत्र (NCB - २१ दिने दोस्रो पटक)',
    category: 'works',
    noticeDays: 21,
    preBidDaysBefore: 7,
    queryDaysBefore: 5,
    bidValidityDays: 90,
    bidSecurityDays: 120,
    loiDays: 7,
    loaDays: 15,
    extensionNoticeDays: 21,
    legalBasis: 'सार्वजनिक खरिद नियमावली नियम ४९(३)',
  },
  'icb-45': {
    id: 'icb-45',
    nameNepali: 'अन्तर्राष्ट्रिय खुला बोलपत्र (ICB - ४५ दिने प्रथम पटक)',
    category: 'works',
    noticeDays: 45,
    preBidDaysBefore: 15,
    queryDaysBefore: 10,
    bidValidityDays: 120,
    bidSecurityDays: 150, // 120 + 30
    loiDays: 7,
    loaDays: 15,
    extensionNoticeDays: 21,
    legalBasis: 'सार्वजनिक खरिद ऐन दफा १४, नियमावली नियम ४९(२)',
  },
  'sq-15': {
    id: 'sq-15',
    nameNepali: 'सिलबन्दी दरभाउपत्र (Sealed Quotation - १५ दिने प्रथम पटक)',
    category: 'goods',
    noticeDays: 15,
    preBidDaysBefore: 0, // No formal pre-bid
    queryDaysBefore: 3,
    bidValidityDays: 45,
    bidSecurityDays: 75, // 45 + 30
    loiDays: 7,
    loaDays: 7,
    extensionNoticeDays: 15,
    legalBasis: 'सार्वजनिक खरिद नियमावली नियम ८४',
  },
  'sq-7': {
    id: 'sq-7',
    nameNepali: 'सिलबन्दी दरभाउपत्र (SQ - ७ दिने दोस्रो पटक)',
    category: 'goods',
    noticeDays: 7,
    preBidDaysBefore: 0,
    queryDaysBefore: 2,
    bidValidityDays: 45,
    bidSecurityDays: 75,
    loiDays: 7,
    loaDays: 7,
    extensionNoticeDays: 15,
    legalBasis: 'सार्वजनिक खरिद नियमावली नियम ८४(२)',
  },
  'rfp-30': {
    id: 'rfp-30',
    nameNepali: 'परामर्श सेवा प्रस्ताव माग (RFP - ३० दिने)',
    category: 'services',
    noticeDays: 30,
    preBidDaysBefore: 10,
    queryDaysBefore: 7,
    bidValidityDays: 90,
    bidSecurityDays: 0, // Usually proposal validity only
    loiDays: 7,
    loaDays: 15,
    extensionNoticeDays: 21,
    legalBasis: 'सार्वजनिक खरिद ऐन दफा ३१, नियमावली नियम ७३',
  },
  'eoi-15': {
    id: 'eoi-15',
    nameNepali: 'आशयपत्र माग (EOI - १५ दिने राष्ट्रिय)',
    category: 'services',
    noticeDays: 15,
    preBidDaysBefore: 0,
    queryDaysBefore: 3,
    bidValidityDays: 60,
    bidSecurityDays: 0,
    loiDays: 7,
    loaDays: 0,
    extensionNoticeDays: 0,
    legalBasis: 'सार्वजनिक खरिद ऐन दफा ३०, नियमावली नियम ७०',
  },
  'direct-purchase': {
    id: 'direct-purchase',
    nameNepali: 'सोझै खरिद / दरभाउ (Direct Purchase - ३ देखि ७ दिन)',
    category: 'goods',
    noticeDays: 3,
    preBidDaysBefore: 0,
    queryDaysBefore: 1,
    bidValidityDays: 30,
    bidSecurityDays: 0,
    loiDays: 0,
    loaDays: 7,
    extensionNoticeDays: 7,
    legalBasis: 'सार्वजनिक खरिद ऐन दफा ४१, नियमावली नियम ८५',
  },
};

export const ProcurementTimelineCalculator: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<ProcurementMethodKey>('ncb-30');
  const [noticeDate, setNoticeDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [contractMonths, setContractMonths] = useState<number>(12);
  const [dlpMonths, setDlpMonths] = useState<number>(12);
  const [copied, setCopied] = useState<boolean>(false);

  const config = TIMELINE_CONFIGS[selectedMethod];

  // Helper to add days to a date string (YYYY-MM-DD)
  const addDays = (dateStr: string, days: number): string => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  const calculatedDates = useMemo(() => {
    const pubDate = noticeDate;
    const submissionDays = config.noticeDays;
    const submissionDate = addDays(pubDate, submissionDays);

    const preBidDate = config.preBidDaysBefore > 0 
      ? addDays(submissionDate, -config.preBidDaysBefore) 
      : 'लागू नहुने';

    const queryDeadline = config.queryDaysBefore > 0
      ? addDays(submissionDate, -config.queryDaysBefore)
      : 'लागू नहुने';

    const validityDeadline = addDays(submissionDate, config.bidValidityDays);
    const securityDeadline = config.bidSecurityDays > 0 
      ? addDays(submissionDate, config.bidSecurityDays) 
      : 'लागू नहुने';

    // Estimated evaluation time ~15 days for demo calculation
    const estLoiPublish = addDays(submissionDate, 15);
    const loiComplaintDeadline = addDays(estLoiPublish, config.loiDays);
    const loaNotice = addDays(loiComplaintDeadline, 2);
    const contractSigningDeadline = addDays(loaNotice, config.loaDays);

    // Contract completion and extension window
    const contractEndDays = contractMonths * 30;
    const estimatedContractEnd = addDays(contractSigningDeadline, contractEndDays);
    const extensionApplicationDeadline = addDays(estimatedContractEnd, -config.extensionNoticeDays);

    // DLP end
    const dlpEndDays = dlpMonths * 30;
    const dlpEnd = addDays(estimatedContractEnd, dlpEndDays);

    return {
      pubDate,
      submissionDate,
      preBidDate,
      queryDeadline,
      validityDeadline,
      securityDeadline,
      estLoiPublish,
      loiComplaintDeadline,
      loaNotice,
      contractSigningDeadline,
      estimatedContractEnd,
      extensionApplicationDeadline,
      dlpEnd
    };
  }, [noticeDate, config, contractMonths, dlpMonths]);

  const milestones = [
    {
      stage: '१. सूचना प्रकाशन मिति (Notice Publication Date)',
      days: 'Day 0',
      calculatedDate: calculatedDates.pubDate,
      legalRule: config.legalBasis,
      details: 'राष्ट्रिय दैनिक समाचारपत्र तथा e-GP प्रणालीमा प्रकाशित भएको आधिकारिक मिति।',
      highlight: true
    },
    ...(config.preBidDaysBefore > 0 ? [{
      stage: '२. प्रि-बिड बैठक (Pre-Bid Meeting)',
      days: `अन्तिम म्याद भन्दा ${config.preBidDaysBefore} दिन अगावै`,
      calculatedDate: calculatedDates.preBidDate,
      legalRule: 'नियमावली नियम ५०',
      details: 'बोलपत्रदाताहरूको जिज्ञासा, साइट निरीक्षण र प्राविधिक सर्त स्पष्ट पार्न अनिवार्य बैठक।',
      highlight: false
    }] : []),
    {
      stage: '३. स्पष्टीकरण/संशोधन (Query / Addendum Deadline)',
      days: `अन्तिम म्याद भन्दा ${config.queryDaysBefore} दिन अगावै`,
      calculatedDate: calculatedDates.queryDeadline,
      legalRule: 'नियमावली नियम ५१',
      details: 'बोलपत्र कागजात संशोधन भएमा अन्तिम म्याद भन्दा कम्तीमा ७ दिन अगावै e-GP मा सूचना राख्नुपर्छ।',
      highlight: false
    },
    {
      stage: '४. बोलपत्र पेस गर्ने तथा खोल्ने अन्तिम मिति (Submission & Opening)',
      days: `सूचना प्रकाशित भएको मितिले ${config.noticeDays}औँ दिन (दिनको १२:०० बजे पेस, १:०० बजे खोल्ने)`,
      calculatedDate: calculatedDates.submissionDate,
      legalRule: 'ऐन दफा १४, नियम ६० र ६२',
      details: 'सो दिन सार्वजनिक बिदा परेमा कार्यालय खुल्ने लगत्तै पछिल्लो कार्यदिन स्वतः अन्तिम मिति हुनेछ।',
      highlight: true
    },
    {
      stage: '५. बोलपत्र मान्य अवधि (Bid Validity Period)',
      days: `खोलेको मितिदेखि ${config.bidValidityDays} दिन`,
      calculatedDate: calculatedDates.validityDeadline,
      legalRule: 'नियमावली नियम ४०(१)',
      details: 'बोलपत्रदाता आफ्नो कबोलमा बाँधिनुपर्ने कानुनी अवधि। यस अवधिभित्र ठेक्का स्वीकृत गरिसक्नुपर्छ।',
      highlight: false
    },
    ...(config.bidSecurityDays > 0 ? [{
      stage: '६. बोलपत्र जमानत (Bid Security / Bid Bond) को न्यूनतम म्याद',
      days: `मान्य अवधि भन्दा ३० दिन बढी (${config.bidSecurityDays} दिन)`,
      calculatedDate: calculatedDates.securityDeadline,
      legalRule: 'नियमावली नियम ४०(२)',
      details: 'बैंक ग्यारेन्टीको म्याद यो मिति भन्दा कम्तीमा १ दिन पनि कम भएमा बोलपत्र स्वतः रद्द हुन्छ।',
      highlight: true
    }] : []),
    {
      stage: '७. आशयको सूचना (Letter of Intent - LOI) को उजुरी म्याद',
      days: `आशय प्रकाशित भएको मितिले ७ दिन`,
      calculatedDate: calculatedDates.loiComplaintDeadline,
      legalRule: 'ऐन दफा २७(२), नियम ६६',
      details: 'चित्त नबुझ्ने अन्य बोलपत्रदाताले कार्यालय प्रमुख समक्ष लिखित उजुरी दिने ७ दिने कानुनी विन्डो।',
      highlight: false
    },
    {
      stage: '८. सम्झौता गर्न आउने म्याद (Letter of Acceptance - LOA)',
      days: `स्वीकृति पत्र प्राप्त गरेको १५ दिनभित्र`,
      calculatedDate: calculatedDates.contractSigningDeadline,
      legalRule: 'ऐन दफा २७(३), नियम ६८',
      details: '५% कार्यसम्पादन जमानत (थप जमानत आवश्यक भए सो समेत) बुझाई सम्झौता गर्ने म्याद। नआए बिड बन्ड जफत हुन्छ।',
      highlight: true
    },
    {
      stage: '९. म्याद थपको निवेदन दिने अन्तिम म्याद (Extension Application Window)',
      days: `सम्झौताको म्याद सकिनुभन्दा कम्तीमा २१ दिन अगावै`,
      calculatedDate: config.extensionNoticeDays > 0 ? calculatedDates.extensionApplicationDeadline : 'लागू नहुने',
      legalRule: 'नियमावली नियम १२०(१)',
      details: '२१ दिन अगावै निवेदन नपरेमा सार्वजनिक निकायले म्याद थप गर्न मिल्दैन। यो अति संवेदनशील समय-सीमा हो।',
      highlight: true
    },
    {
      stage: '१०. त्रुटि सच्याउने अवधि समाप्ति (End of Defect Liability Period - DLP)',
      days: `काम सम्पन्न मितिदेखि ${dlpMonths} महिना`,
      calculatedDate: calculatedDates.dlpEnd,
      legalRule: 'नियमावली नियम १२३',
      details: 'यो मिति सकिएपछि मात्र व्यवसायीको बाँकी रहेको ५% धरौटी (Retention Money) र कार्यसम्पादन जमानत फिर्ता हुन्छ।',
      highlight: false
    }
  ];

  const handleCopyTable = () => {
    let text = `सार्वजनिक खरिद कानुनी म्याद तथा कार्यतालिका (${config.nameNepali})\n`;
    text += `सूचना प्रकाशन मिति: ${noticeDate}\n\n`;
    milestones.forEach((m) => {
      text += `${m.stage}: ${m.calculatedDate} (${m.days}) [कानुन: ${m.legalRule}]\n`;
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-sm relative overflow-hidden print:hidden">
        <div className="relative z-10 max-w-[58%]">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wide mb-1">
            <Clock className="w-4 h-4 text-blue-300" />
            <span>सार्वजनिक खरिद दिन-गणना तथा माइलस्टोन क्याल्कुलेटर</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white">
            कानूनी म्याद र क्यालेन्डर क्याल्कुलेटर (Procurement Deadline Calculator)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
            सूचना प्रकाशित मिति र खरिद विधि छान्नासाथ बोलपत्र पेस गर्ने, खोल्ने, प्रि-बिड, बोलपत्र मान्य अवधि, बैंक ग्यारेन्टी, LOI, सम्झौता र २१ दिन अगावै म्याद थपको निवेदन दिने सबै मितिहरू कानून अनुसार स्वतः गणना गर्नुहोस्।
          </p>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%]">
          <img
            src={procDeadlineImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/35 via-indigo-950/50 to-slate-900/65" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-indigo-950 via-indigo-950/40 to-transparent" />
        </div>
      </div>

      {/* Input Form Card */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 print:hidden">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>१. खरिद विधि र सूचना प्रकाशित मिति प्रविष्ट गर्नुहोस्:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* 1. Procurement Method Select */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              खरिद विधि छनोट गर्नुहोस्:
            </label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value as ProcurementMethodKey)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(TIMELINE_CONFIGS).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nameNepali}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Notice Publication Date */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              सूचना प्रकाशित मिति (ई.सं. YYYY-MM-DD):
            </label>
            <input
              type="date"
              value={noticeDate}
              onChange={(e) => setNoticeDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 3. Contract & DLP Duration */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                सम्झौता म्याद:
              </label>
              <select
                value={contractMonths}
                onChange={(e) => setContractMonths(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
              >
                <option value={3}>३ महिना</option>
                <option value={6}>६ महिना</option>
                <option value={9}>९ महिना</option>
                <option value={12}>१२ महिना (१ वर्ष)</option>
                <option value={18}>१८ महिना</option>
                <option value={24}>२४ महिना (२ वर्ष)</option>
                <option value={36}>३६ महिना (३ वर्ष)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                त्रुटि मर्मत (DLP):
              </label>
              <select
                value={dlpMonths}
                onChange={(e) => setDlpMonths(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900"
              >
                <option value={6}>६ महिना</option>
                <option value={12}>१२ महिना (१ वर्ष)</option>
                <option value={24}>२४ महिना (२ वर्ष)</option>
                <option value={36}>३६ महिना (३ वर्ष)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Legal Badge Banner */}
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-950 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-700 shrink-0" />
            <span className="font-semibold">
              कानुनी आधार: {config.legalBasis} | सूचना प्रकाशन म्याद: {config.noticeDays} दिन | बोलपत्र जमानत: {config.bidSecurityDays > 0 ? `${config.bidSecurityDays} दिन` : 'लागू नहुने'}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyTable}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-300 hover:bg-blue-100 rounded-lg text-xs font-bold text-blue-900 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'कपी भयो!' : 'तालिका कपी'}</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>प्रिन्ट / PDF (A4)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Output Schedule Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none">
        {/* Printable Official Header */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 print:bg-white print:border-b-2 print:border-black">
          <div className="text-center print:block hidden mb-4">
            <h1 className="text-lg font-bold text-black uppercase">सार्वजनिक खरिद समय-सीमा तथा माइलस्टोन कार्यतालिका</h1>
            <p className="text-xs text-black">सार्वजनिक खरिद ऐन, २०६३ तथा सार्वजनिक खरिद नियमावली, २०६४ (१६औँ संशोधनसहित)</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm print:text-black print:bg-transparent">
                {config.nameNepali}
              </span>
              <h3 className="text-base sm:text-xl font-extrabold text-slate-900 mt-1">
                गणना गरिएको कानूनी माइलस्टोन र समय-सीमा कार्यतालिका
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 print:text-black">
                सूचना प्रकाशित मिति: <strong className="text-slate-800">{noticeDate}</strong> | बोलपत्र पेस गर्ने अन्तिम मिति: <strong className="text-emerald-700">{calculatedDates.submissionDate}</strong>
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 print:hidden">
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
                १६औँ संशोधन अनुसार स्वचालित गणना
              </span>
            </div>
          </div>
        </div>

        {/* Milestones Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200 print:bg-slate-200 print:text-black">
              <tr>
                <th className="py-3 px-4">क्र.सं. तथा खरिद माइलस्टोन (Stage)</th>
                <th className="py-3 px-4">दिन गणना (Count)</th>
                <th className="py-3 px-4 text-blue-900 print:text-black">गणना गरिएको मिति (Date)</th>
                <th className="py-3 px-4">कानुनी व्यवस्था</th>
                <th className="py-3 px-4">महत्वपूर्ण निर्देशन / सतर्कता</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 print:divide-slate-300">
              {milestones.map((m, idx) => (
                <tr 
                  key={idx} 
                  className={`hover:bg-slate-50 transition-colors ${
                    m.highlight ? 'bg-blue-50/40 font-semibold' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900 print:text-black align-top">
                    {m.stage}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 print:text-black align-top whitespace-nowrap">
                    {m.days}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700 print:text-black align-top whitespace-nowrap">
                    {m.calculatedDate}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-xs print:text-black align-top">
                    {m.legalRule}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs print:text-black align-top leading-relaxed">
                    {m.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Caution Alert */}
        <div className="p-4 bg-amber-50 border-t border-amber-200 text-xs text-amber-950 flex items-start gap-2.5 print:border-black print:bg-white print:text-black">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 print:hidden" />
          <div>
            <span className="font-bold text-amber-900 print:text-black">सार्वजनिक बिदा सम्बन्धी विशेष कानुनी नियम: </span>
            <span>
              सार्वजनिक खरिद ऐनको दफा १४ अनुसार बोलपत्र पेस गर्ने वा खोल्ने अन्तिम दिन सार्वजनिक बिदा परेमा सो लगत्तै पछि कार्यालय खुल्ने पहिलो कार्यदिनको सोही समयमा बोलपत्र पेस गर्न र खोल्न सकिनेछ। तर प्रि-बिड बैठक र आशयको सूचनाको ७ दिने म्याद गणना गर्दा सार्वजनिक बिदा समेत समावेश हुन्छ।
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
