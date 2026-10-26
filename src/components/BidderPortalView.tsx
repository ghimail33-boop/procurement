import React, { useMemo, useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  ShieldCheck,
  Scale,
  ArrowRight,
  HelpCircle,
  Clock,
  Download,
  ExternalLink,
  ChevronRight,
  CheckSquare,
  FileCheck2,
  Sparkles,
  Building2,
  Layers,
  Search,
  BookOpen,
  Printer,
  RotateCcw,
  Check,
  XCircle,
  TrendingUp,
  FileSpreadsheet,
  ShoppingBag,
  Award,
  Truck,
  Percent,
  Sliders,
  Users,
  GraduationCap,
  PackageCheck,
  ShieldAlert,
  FileWarning,
} from 'lucide-react';
import { BiddingFormsGenerator } from './BiddingFormsGenerator';
import {
  SBD_DOCUMENTS_LIST,
  BIDDER_PRECEDENT_CASES,
  SbdDocumentItem,
  BidderPrecedentCase,
} from '../data/sbdRepositoryData';
import {
  FATAL_BIDDER_MISTAKES,
  FATAL_MISTAKES_CATEGORIES,
  PRE_BID_RISK_AUDIT_ITEMS,
  FatalBidderMistake,
  RiskAuditItem,
} from '../data/bidderMistakesData';

interface BidderPortalViewProps {
  onSwitchToEntityMode?: () => void;
  onNavigateToLaw?: () => void;
  onNavigateToEgpGuidelines?: () => void;
  initialSubTab?:
    | 'overview'
    | 'eligibility'
    | 'goods-guide'
    | 'services-guide'
    | 'fatal-mistakes'
    | 'forms'
    | 'checklist'
    | 'egp-guide'
    | 'review'
    | 'sbd-hub';
}

export const BidderPortalView: React.FC<BidderPortalViewProps> = ({
  onSwitchToEntityMode,
  onNavigateToLaw,
  onNavigateToEgpGuidelines,
  initialSubTab = 'overview',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<string>(initialSubTab);

  // -------------------------------------------------------------
  // 1. Eligibility & Capacity Self-Assessment Calculator State
  // -------------------------------------------------------------
  const [calcEstimateAmount, setCalcEstimateAmount] = useState<number>(30000000); // रु ३ करोड
  const [calcBidAmount, setCalcBidAmount] = useState<number>(24500000); // रु २ करोड ४५ लाख
  const [calcAactRequired, setCalcAactRequired] = useState<number>(24000000); // रु २ करोड ४० लाख (८०%)
  const [turnoverCount, setTurnoverCount] = useState<number>(5);
  const [turnoverYears, setTurnoverYears] = useState<number[]>([
    26000000, 29000000, 22000000, 18000000, 15000000, 12000000, 10000000,
  ]);
  const [similarWorkRequired, setSimilarWorkRequired] = useState<number>(24000000);
  const [maxCompletedSimilarWork, setMaxCompletedSimilarWork] = useState<number>(26000000);
  const [ongoingContractsCount, setOngoingContractsCount] = useState<number>(3); // Max 5 limit
  const [remainingLiabilityB, setRemainingLiabilityB] = useState<number>(15000000); // Remaining work in ongoing contracts
  const [contractDurationN, setContractDurationN] = useState<number>(1.5); // Years
  const [showFiveContractRules, setShowFiveContractRules] = useState<boolean>(false);

  // AACT Calculation: Best 3 years out of entered turnovers
  const activeTurnovers = useMemo(() => {
    return turnoverYears.slice(0, turnoverCount);
  }, [turnoverYears, turnoverCount]);

  const { avgBest3Turnover, best3Indices, isAactEligible } = useMemo(() => {
    const indexed = activeTurnovers.map((val, idx) => ({ val, idx }));
    indexed.sort((a, b) => b.val - a.val);
    const top3 = indexed.slice(0, 3);
    const top3Indices = new Set(top3.map((item) => item.idx));
    const avg = top3.reduce((sum, item) => sum + item.val, 0) / Math.max(top3.length, 1);
    return {
      avgBest3Turnover: avg,
      best3Indices: top3Indices,
      isAactEligible: avg >= calcAactRequired,
    };
  }, [activeTurnovers, calcAactRequired]);

  // Similar work eligibility
  const isSimilarWorkEligible = maxCompletedSimilarWork >= similarWorkRequired;

  // 5 Ongoing contracts limit check (16th Amendment)
  const isOngoingContractsEligible = ongoingContractsCount < 5;

  // Bid Capacity Formula: (A * N * 3) - B
  const maxA = useMemo(() => Math.max(...activeTurnovers, 0), [activeTurnovers]);
  const bidCapacity = useMemo(() => {
    const capacity = maxA * contractDurationN * 3 - remainingLiabilityB;
    return Math.max(capacity, 0);
  }, [maxA, contractDurationN, remainingLiabilityB]);

  const isBidCapacityEligible = bidCapacity >= calcEstimateAmount;

  // Additional Performance Security check (if bid is below 85% of estimate)
  const percentBelowEstimate = useMemo(() => {
    if (calcEstimateAmount <= 0) return 0;
    return ((calcEstimateAmount - calcBidAmount) / calcEstimateAmount) * 100;
  }, [calcEstimateAmount, calcBidAmount]);

  const additionalSecurityCalculation = useMemo(() => {
    const normalSecurity = calcBidAmount * 0.05;
    if (percentBelowEstimate <= 15) {
      return {
        isBelow15: false,
        normalSecurity,
        additionalSecurity: 0,
        totalSecurity: normalSecurity,
        note: 'लागत अनुमान भन्दा १५% सम्म मात्र घटेको हुनाले सामान्य ५% कार्यसम्पादन जमानत मात्र लाग्नेछ।',
      };
    } else {
      const eightyFivePercentOfEstimate = calcEstimateAmount * 0.85;
      const difference = eightyFivePercentOfEstimate - calcBidAmount;
      const additionalSecurity = difference * 0.5;
      return {
        isBelow15: true,
        normalSecurity,
        additionalSecurity,
        totalSecurity: normalSecurity + additionalSecurity,
        note: `लागत अनुमानको ८५% (रु ${eightyFivePercentOfEstimate.toLocaleString('ne-NP')}) भन्दा रु ${difference.toLocaleString('ne-NP')} ले घटेको हुनाले नियम ६५(४) बमोजिम ५०% थप धरौटी (रु ${additionalSecurity.toLocaleString('ne-NP')}) लाग्नेछ।`,
      };
    }
  }, [percentBelowEstimate, calcEstimateAmount, calcBidAmount]);

  const overallEligibility =
    isAactEligible &&
    isSimilarWorkEligible &&
    isOngoingContractsEligible &&
    isBidCapacityEligible;

  // -------------------------------------------------------------
  // 1B. Goods & Catalogue Shopping Calculator State
  // -------------------------------------------------------------
  const [catOriginalPrice, setCatOriginalPrice] = useState<number>(3500000); // रु ३५ लाख
  const [catDiscountPercent, setCatDiscountPercent] = useState<number>(8.5); // ८.५%
  const [catQuantity, setCatQuantity] = useState<number>(2); // २ थान
  const [catDeliveryCost, setCatDeliveryCost] = useState<number>(45000); // ढुवानी
  const [catApplyVat, setCatApplyVat] = useState<boolean>(true);

  // Goods Liquidated Damages (LD) Calculator
  const [goodsContractAmount, setGoodsContractAmount] = useState<number>(5000000); // रु ५० लाख
  const [goodsDelayDays, setGoodsDelayDays] = useState<number>(20); // २० दिन

  const catDiscountAmountPerUnit = useMemo(() => {
    return (catOriginalPrice * catDiscountPercent) / 100;
  }, [catOriginalPrice, catDiscountPercent]);

  const catNetUnitPrice = useMemo(() => {
    return catOriginalPrice - catDiscountAmountPerUnit;
  }, [catOriginalPrice, catDiscountAmountPerUnit]);

  const catTotalTaxable = useMemo(() => {
    return catNetUnitPrice * catQuantity + catDeliveryCost;
  }, [catNetUnitPrice, catQuantity, catDeliveryCost]);

  const catVatAmount = useMemo(() => {
    return catApplyVat ? catTotalTaxable * 0.13 : 0;
  }, [catApplyVat, catTotalTaxable]);

  const catGrandTotal = useMemo(() => {
    return catTotalTaxable + catVatAmount;
  }, [catTotalTaxable, catVatAmount]);

  const catTotalSavings = useMemo(() => {
    return catDiscountAmountPerUnit * catQuantity;
  }, [catDiscountAmountPerUnit, catQuantity]);

  // LD Calculations (0.05% per day, max 10%)
  const goodsLdDaily = useMemo(() => {
    return goodsContractAmount * 0.0005;
  }, [goodsContractAmount]);

  const goodsLdTotalRaw = useMemo(() => {
    return goodsLdDaily * goodsDelayDays;
  }, [goodsLdDaily, goodsDelayDays]);

  const goodsLdMaxCap = useMemo(() => {
    return goodsContractAmount * 0.10;
  }, [goodsContractAmount]);

  const goodsLdEffective = useMemo(() => {
    return Math.min(goodsLdTotalRaw, goodsLdMaxCap);
  }, [goodsLdTotalRaw, goodsLdMaxCap]);

  const goodsLdPercent = useMemo(() => {
    return goodsContractAmount > 0 ? (goodsLdEffective / goodsContractAmount) * 100 : 0;
  }, [goodsLdEffective, goodsContractAmount]);

  // -------------------------------------------------------------
  // 1C. Consulting & Services Calculator State
  // -------------------------------------------------------------
  const [qcbsTechScore, setQcbsTechScore] = useState<number>(82); // ८२ अंक (०-१००)
  const [qcbsBidderFinancial, setQcbsBidderFinancial] = useState<number>(2500000); // रु २५ लाख
  const [qcbsLowestFinancial, setQcbsLowestFinancial] = useState<number>(2100000); // रु २१ लाख
  const [qcbsRatio, setQcbsRatio] = useState<'80-20' | '70-30' | '90-10'>('80-20');

  // Non-Consulting Services (Labor & SSF)
  const [serviceStaffCount, setServiceStaffCount] = useState<number>(4);
  const [serviceBaseSalary, setServiceBaseSalary] = useState<number>(17300); // नेपाल सरकार न्यूनतम पारिश्रमिक
  const [serviceAllowance, setServiceAllowance] = useState<number>(2000);
  const [serviceIncludeBonus, setServiceIncludeBonus] = useState<boolean>(true);
  const [serviceIncludeSsf, setServiceIncludeSsf] = useState<boolean>(true);

  const qcbsCalculations = useMemo(() => {
    let techWeight = 80;
    let finWeight = 20;
    if (qcbsRatio === '70-30') {
      techWeight = 70;
      finWeight = 30;
    } else if (qcbsRatio === '90-10') {
      techWeight = 90;
      finWeight = 10;
    }

    const techWeighted = (qcbsTechScore * techWeight) / 100;
    const finScore =
      qcbsBidderFinancial > 0 && qcbsLowestFinancial > 0
        ? (qcbsLowestFinancial / qcbsBidderFinancial) * 100
        : 0;
    const finWeighted = (finScore * finWeight) / 100;
    const combinedScore = techWeighted + finWeighted;

    return {
      techWeight,
      finWeight,
      techWeighted,
      finScore,
      finWeighted,
      combinedScore,
    };
  }, [qcbsTechScore, qcbsBidderFinancial, qcbsLowestFinancial, qcbsRatio]);

  const serviceCalculations = useMemo(() => {
    const basicPlusAllowance = serviceBaseSalary + serviceAllowance;
    const ssfEmployerCost = serviceIncludeSsf ? serviceBaseSalary * 0.20 : 0;
    const festivalCost = serviceIncludeBonus ? serviceBaseSalary / 12 : 0;
    const monthlyCostPerPerson = basicPlusAllowance + ssfEmployerCost + festivalCost;
    const totalMonthlyCost = monthlyCostPerPerson * serviceStaffCount;
    const isBelowStatutoryMinimum = serviceBaseSalary < 17300;

    return {
      basicPlusAllowance,
      ssfEmployerCost,
      festivalCost,
      monthlyCostPerPerson,
      totalMonthlyCost,
      isBelowStatutoryMinimum,
    };
  }, [serviceStaffCount, serviceBaseSalary, serviceAllowance, serviceIncludeBonus, serviceIncludeSsf]);

  // -------------------------------------------------------------
  // 2. Pre-Bid 30-Point Checklist State
  // -------------------------------------------------------------
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('bidder_prebid_checklist_30');
      if (saved) return JSON.parse(saved);
    } catch { }
    return {
      'check-1': true,
      'check-2': true,
      'check-3': true,
      'check-6': true,
      'check-7': true,
      'check-13': true,
      'check-19': true,
      'check-25': true,
    };
  });

  const checklistSections = useMemo(
    () => [
      {
        id: 'sec-legal',
        title: '१. योग्यता तथा कानूनी कागजात रुजु (Legal & Statutory)',
        items: [
          { id: 'check-1', text: 'कम्पनी/फर्म दर्ता प्रमाणपत्र तथा चालू आर्थिक वर्षसम्मको अद्यावधिक नवीकरण पत्र संलग्न छ।', required: true },
          { id: 'check-2', text: 'मूल्य अभिवृद्धि कर (VAT) वा स्थायी लेखा नम्बर (PAN) दर्ता प्रमाणपत्र संलग्न छ।', required: true },
          { id: 'check-3', text: 'पछिल्लो आर्थिक वर्ष (२०८०/८१ वा पछिल्लो) को कर चुक्ता प्रमाणपत्र (Tax Clearance) संलग्न छ।', required: true },
          { id: 'check-4', text: 'सार्वजनिक खरिद अनुगमन कार्यालय (PPMO) को कालोसूचीमा नपरेको लिखित स्वघोषणा पत्र संलग्न छ।', required: true },
          { id: 'check-5', text: 'खरिद प्रक्रियामा स्वार्थ नबाझिएको (No Conflict of Interest) सम्बन्धी स्वघोषणा पत्र संलग्न छ।', required: true },
          { id: 'check-6', text: 'खरिद नियमावली नियम ६५(४घ) बमोजिम नेपालभर ५ वटा भन्दा बढी चालू खरिद सम्झौता नरहेको स्वघोषणा छ।', required: true },
        ],
      },
      {
        id: 'sec-financial',
        title: '२. बैंक जमानत तथा वित्तीय स्रोत (Bank Guarantee & Credit Line)',
        items: [
          { id: 'check-7', text: 'बोलपत्र जमानत (Bid Security) तोकिएको हुबहु ढाँचामा वाणिज्य बैंकबाट जारी भएको छ।', required: true },
          { id: 'check-8', text: 'बैंक ग्यारेन्टीको म्याद बोलपत्रको मान्य अवधिभन्दा कम्तीमा ३० दिन बढी (९० दिन भए १२० दिन) छ।', required: true },
          { id: 'check-9', text: 'ग्यारेन्टीमा हितग्राही कार्यालयको नाम, ठेक्का नं. र रकम अङ्क र अक्षर दुवैमा स्पष्ट मिलेको छ।', required: true },
          { id: 'check-10', text: 'नगद धरौटी जम्मा गरिएको भए कार्यालयको आधिकारिक धरौटी खातामा दाखिला भएको सक्कल बैंक भौचर छ।', required: true },
          { id: 'check-11', text: 'ऋण सुविधा प्रतिबद्धता पत्र (Line of Credit - Form FIN-5) वाणिज्य बैंकबाट बिना सर्त जारी छ।', required: false },
          { id: 'check-12', text: 'विदेशी बैंकको जमानत भएमा नेपालको क वर्गको वाणिज्य बैंकबाट जारी काउन्टर ग्यारेन्टी संलग्न छ।', required: false },
        ],
      },
      {
        id: 'sec-jv-poa',
        title: '३. संयुक्त उपक्रम (JV) र अख्तियारी (Power of Attorney)',
        items: [
          { id: 'check-13', text: 'कम्पनीको सञ्चालक समिति वा साझेदारहरूबाट अधिकृत प्रतिनिधिलाई दिइएको वारिसनामा (Power of Attorney) छ।', required: true },
          { id: 'check-14', text: 'वारिसनामा पत्रमा सम्बन्धित ठेक्काको स्पष्ट नाम, ठेक्का नं. र हस्ताक्षरकर्ताको दस्तखत प्रमाणित छ।', required: true },
          { id: 'check-15', text: 'JV भएमा मूल साझेदार (Lead Partner) को शेयर कम्तीमा ४०% र अन्य साझेदारको कम्तीमा २५% छ (नियम ३१ख)।', required: false },
          { id: 'check-16', text: 'JV सम्झौतामा साझेदारहरू संयुक्त तथा व्यक्तिगत रूपमा (Jointly & Severally) पूर्ण जिम्मेवार रहने सर्त छ।', required: false },
          { id: 'check-17', text: 'JV का सबै साझेदारहरूको कम्पनी दर्ता, कर चुक्ता, र कालोसूची नपरेको स्वघोषणा छुट्टाछुट्टै संलग्न छ।', required: false },
          { id: 'check-18', text: 'संयुक्त उपक्रमको नाम (JV Name) र आधिकारिक लेटरप्याड/छाप बोलपत्र फारामहरूमा स्पष्ट प्रयोग भएको छ।', required: false },
        ],
      },
      {
        id: 'sec-technical-price',
        title: '४. प्राविधिक तथा आर्थिक प्रस्ताव (Technical & BOQ)',
        items: [
          { id: 'check-19', text: 'प्राविधिक बोलपत्र पत्र (Letter of Technical Bid) मा अधिकृत व्यक्तिको हस्ताक्षर र कम्पनीको छाप छ।', required: true },
          { id: 'check-20', text: 'आर्थिक बोलपत्र पत्र (Letter of Price Bid) मा कबुल अङ्क अङ्क र अक्षर दुवैमा मिलेको छ।', required: true },
          { id: 'check-21', text: 'BOQ का कुनै पनि आइटम खाली नराखी सबै आइटममा दररेट स्पष्ट भरिएको छ (दर ० वा खाली छैन)।', required: true },
          { id: 'check-22', text: 'यदि कुनै छुट (Discount) प्रस्ताव गरिएको भए बोलपत्र पत्रमै प्रतिशत र रकम स्पष्ट खुलाइएको छ।', required: false },
          { id: 'check-23', text: 'माग गरिएका मुख्य जनशक्ति (Key Personnel) र निर्माण उपकरणहरूको विवरण तालिका रितपूर्वक भरिएको छ।', required: true },
          { id: 'check-24', text: 'मालसामानको हकमा उत्पादकको आधिकारिकता पत्र (Manufacturer Authorization) र क्याटलग छ।', required: false },
        ],
      },
      {
        id: 'sec-egp-upload',
        title: '५. e-GP पोर्टल सबमिसन तथा डिजिटल हस्ताक्षर (e-GP & Token)',
        items: [
          { id: 'check-25', text: 'अपलोड गरिने सबै फाइलहरू PDF फर्म्याटमा र पढ्न सकिने गरी स्पष्ट स्क्यान गरिएका छन् (साइज लिमिटभित्र)।', required: true },
          { id: 'check-26', text: 'डिजिटल हस्ताक्षर (Token / DSC) को म्याद बाँकी रहेको र कम्प्युटरमा PKI कम्पोनेन्ट परीक्षण गरिएको छ।', required: true },
          { id: 'check-27', text: 'दुई खाम (1S2E) बोलपत्रमा प्राविधिक खाममा मूल्य (Price) को कुनै अंश नपरेको यकिन गरिएको छ।', required: true },
          { id: 'check-28', text: 'e-GP बाट प्राप्त मूल BOQ एक्सल फाइलको फर्म्याट र नाम नफेरी दररेट सेभ गरी अपलोड गरिएको छ।', required: true },
          { id: 'check-29', text: 'अन्तिम बिड सबमिट गरी बिड सबमिसन ह्यास (Submission Hash Slip) र कन्फर्मेसन डाउनलोड गरिएको छ।', required: true },
          { id: 'check-30', text: 'बोलपत्र संशोधन वा फिर्ता गर्नुपर्ने भए बोलपत्र पेश गर्ने अन्तिम समय अगावै e-GP बाट गरिएको छ।', required: false },
        ],
      },
    ],
    []
  );

  const totalCheckItems = useMemo(
    () => checklistSections.reduce((sum, sec) => sum + sec.items.length, 0),
    [checklistSections]
  );

  const checkedCount = useMemo(
    () => Object.values(checkedItems).filter(Boolean).length,
    [checkedItems]
  );

  const checklistProgressPercent = Math.round(
    (checkedCount / Math.max(totalCheckItems, 1)) * 100
  );

  const handleToggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('bidder_prebid_checklist_30', JSON.stringify(next));
      } catch { }
      return next;
    });
  };

  const handleResetChecklist = () => {
    if (window.confirm('के तपाईं चेकलिस्टका सम्पूर्ण टिकहरू हटाएर रिसेट गर्न चाहनुहुन्छ?')) {
      setCheckedItems({});
      try {
        localStorage.removeItem('bidder_prebid_checklist_30');
      } catch { }
    }
  };

  // -------------------------------------------------------------
  // 3. SBD Repository Browser State
  // -------------------------------------------------------------
  const [sbdCategoryFilter, setSbdCategoryFilter] = useState<string>('all');
  const [sbdSearchQuery, setSbdSearchQuery] = useState<string>('');
  const [selectedSbdForModal, setSelectedSbdForModal] = useState<SbdDocumentItem | null>(null);

  const filteredSbds = useMemo(() => {
    return SBD_DOCUMENTS_LIST.filter((doc) => {
      const matchesCat = sbdCategoryFilter === 'all' || doc.category === sbdCategoryFilter;
      const q = sbdSearchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        doc.titleNepali.toLowerCase().includes(q) ||
        doc.titleEnglish.toLowerCase().includes(q) ||
        doc.fileName.toLowerCase().includes(q) ||
        doc.biddingMethod.toLowerCase().includes(q) ||
        doc.thresholdNepali.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [sbdCategoryFilter, sbdSearchQuery]);

  // Precedent Cases state
  const [precedentSearch, setPrecedentSearch] = useState<string>('');
  const filteredPrecedents = useMemo(() => {
    const q = precedentSearch.trim().toLowerCase();
    if (!q) return BIDDER_PRECEDENT_CASES;
    return BIDDER_PRECEDENT_CASES.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.applicant.toLowerCase().includes(q) ||
        c.respondent.toLowerCase().includes(q) ||
        c.keyLegalIssue.toLowerCase().includes(q) ||
        c.lessonForBidders.toLowerCase().includes(q)
    );
  }, [precedentSearch]);

  // -------------------------------------------------------------
  // 4. Fatal Bidder Mistakes & Risk Auditor State
  // -------------------------------------------------------------
  const [mistakeCategoryFilter, setMistakeCategoryFilter] = useState<string>('all');
  const [mistakeSearchQuery, setMistakeSearchQuery] = useState<string>('');
  const [expandedMistakeId, setExpandedMistakeId] = useState<string | null>('mistake-bg-1day-short');

  // Bid Security Validity Calculator State
  const [bgSubmissionDays, setBgSubmissionDays] = useState<number>(90); // बोलपत्र मान्य अवधि: ९० वा १२० दिन
  const [bgEstimateAmt, setBgEstimateAmt] = useState<number>(25000000); // रु २ करोड ५० लाख
  const [bgSecurityRate, setBgSecurityRate] = useState<number>(2.5); // २.५%

  // Calculated values for Bid Security
  const bgCalculations = useMemo(() => {
    const requiredSecurityDays = bgSubmissionDays + 30; // नियम ५० अनुसार +३० दिन
    const safeRecommendedDays = bgSubmissionDays + 35; // १ दिनको पासोबाट जोगिन +५ दिन थप
    const minSecurityAmount = (bgEstimateAmt * bgSecurityRate) / 100;
    return {
      requiredSecurityDays,
      safeRecommendedDays,
      minSecurityAmount,
    };
  }, [bgSubmissionDays, bgEstimateAmt, bgSecurityRate]);

  // Risk Audit Checklist State
  const [auditCheckedItems, setAuditCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('bidder_prebid_risk_audit');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      'audit-1': true,
      'audit-2': true,
      'audit-3': true,
      'audit-4': true,
    };
  });

  const handleToggleAudit = (id: string) => {
    setAuditCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('bidder_prebid_risk_audit', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleResetAudit = () => {
    if (window.confirm('के तपाईं जोखिम अडिटका सबै चेकहरू रिसेट गर्न चाहनुहुन्छ?')) {
      setAuditCheckedItems({});
      try {
        localStorage.removeItem('bidder_prebid_risk_audit');
      } catch {}
    }
  };

  const auditCompletedCount = useMemo(() => {
    return PRE_BID_RISK_AUDIT_ITEMS.filter((item) => auditCheckedItems[item.id]).length;
  }, [auditCheckedItems]);

  const auditPercent = useMemo(() => {
    return Math.round((auditCompletedCount / PRE_BID_RISK_AUDIT_ITEMS.length) * 100);
  }, [auditCompletedCount]);

  const auditRiskLevel = useMemo(() => {
    if (auditCompletedCount === PRE_BID_RISK_AUDIT_ITEMS.length) return 'safe';
    if (auditCompletedCount >= 7) return 'medium';
    return 'high';
  }, [auditCompletedCount]);

  const filteredFatalMistakes = useMemo(() => {
    return FATAL_BIDDER_MISTAKES.filter((m) => {
      const matchesCat = mistakeCategoryFilter === 'all' || m.category === mistakeCategoryFilter;
      const q = mistakeSearchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.subtleMistake.toLowerCase().includes(q) ||
        m.legalConsequence.toLowerCase().includes(q) ||
        m.legalReference.toLowerCase().includes(q) ||
        m.safePreventionProtocol.toLowerCase().includes(q) ||
        m.precedentReference.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [mistakeCategoryFilter, mistakeSearchQuery]);

  // Dynamic top banner replacing main banner based on activeSubTab
  const renderTopBanner = () => {
    const renderSwitchBtn = () => {
      if (!onSwitchToEntityMode) return null;
      return (
        <button
          type="button"
          onClick={onSwitchToEntityMode}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          title="सार्वजनिक निकाय मोडमा फर्कनुहोस्"
        >
          <Building2 className="w-4 h-4 text-emerald-300" />
          <span>सार्वजनिक निकाय मोडमा जानुहोस्</span>
        </button>
      );
    };

    if (activeSubTab === 'goods-guide') {
      return (
        <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-300 mb-1.5">
                <ShoppingBag className="w-4 h-4" />
                <span>मालसामान खरिद तथा क्याटलग सपिङ सहयोगी • Goods & Catalogue Shopping Hub</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                मालसामान आपूर्ति तथा क्याटलग सपिङ (दफा ४१क र नियम ८५क)
              </h1>
              <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-3xl leading-relaxed">
                उत्पादक तथा अधिकृत बिक्रेताहरूका लागि क्याटलग सूचीकरण, अधिकतम छुट रणनीति, प्राविधिक स्पेसिफिकेसन कम्प्लायन्स, उत्पादकको आधिकारिकता पत्र (MAF), र डेलिभरी/LD क्याल्कुलेटर।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveSubTab('forms')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>क्याटलग र MAF फाराम भर्नुहोस्</span>
              </button>
              {renderSwitchBtn()}
            </div>
          </div>
        </div>
      );
    }

    if (activeSubTab === 'services-guide') {
      return (
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-1.5">
                <Award className="w-4 h-4" />
                <span>परामर्श सेवा तथा गैर-परामर्श सेवा सहयोगी • Consulting & Services Hub</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                परामर्श सेवा (EOI, RFP, QCBS) तथा गैर-परामर्श सेवा (SSF & श्रम ऐन)
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100/90 mt-1 max-w-3xl leading-relaxed">
                परामर्शदाताहरूको EOI सर्टलिस्टिङ, RFP प्राविधिक प्रस्ताव तयारी, QCBS (८०:२०) संयुक्त स्कोर क्याल्कुलेटर, र सुरक्षा/सरसफाइ सेवामा न्यूनतम पारिश्रमिक तथा SSF अनुपालन।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveSubTab('forms')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-500 hover:bg-indigo-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>TECH-4 र TECH-6 CV ढाँचा भर्नुहोस्</span>
              </button>
              {renderSwitchBtn()}
            </div>
          </div>
        </div>
      );
    }

    if (activeSubTab === 'fatal-mistakes') {
      return (
        <div className="bg-gradient-to-r from-rose-950 via-red-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-300 mb-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>बोलपत्रदाता सचेतना केन्द्र • Fatal Bid Disqualification Pitfalls & Risk Auditor</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                बोलपत्र बदर (Non-Responsive) हुनसक्ने १५ घातक गल्तीहरू र पूर्व-पेश जोखिम अडिट
              </h1>
              <p className="text-xs sm:text-sm text-rose-100/90 mt-1 max-w-3xl leading-relaxed">
                हेर्दा सामान्य लाग्ने तर बोलपत्रलाई सिधै रद्द गराउने कानूनी, प्राविधिक र प्रक्रियागत छिद्रहरूको विस्तृत विश्लेषण, बैंक ग्यारेन्टी म्याद क्याल्कुलेटर, र बिड सबमिट गर्नुअघिको अनिवार्य १०-बुँदे जोखिम अडिट।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 border border-white/20 text-rose-100 flex items-center gap-1.5 shadow-xs">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>१५ स्थापित कानूनी पासोहरू</span>
              </span>
              {renderSwitchBtn()}
            </div>
          </div>
        </div>
      );
    }

    if (activeSubTab === 'forms') {
      return (
        <div className="bg-gradient-to-r from-blue-900 via-[#173b63] to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>PPMO Standard Bidding Documents (SBD) • Section IV</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                बोलपत्र फाराम तथा आधिकारिक ढाँचा जेनेरेटर
              </h1>
              <p className="text-xs sm:text-sm text-blue-100/90 mt-1.5 max-w-2xl leading-relaxed">
                सार्वजनिक खरिद अनुगमन कार्यालय (PPMO) का SBDs (Works, Goods, Services, SQ) अनुसार बोलपत्रदाताहरूले पेश गर्नुपर्ने फारामहरू आफ्ना विवरण भरी तुरुन्तै प्रिन्ट वा कपी गर्नुहोस्।
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="text-xs bg-white/10 border border-white/20 text-blue-100 px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-300" />
                २५+ आधिकारिक फारामहरू उपलब्ध
              </span>
              {renderSwitchBtn()}
            </div>
          </div>
        </div>
      );
    }

    // Default Main Banner for 'overview' and all other tabs
    return (
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>बोलपत्रदाता विशेष कर्नर • Bidder's Dedicated Portal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
              <span>सार्वजनिक खरिद बोलपत्रदाता सहयोगी</span>
              <span className="text-xs bg-emerald-700/80 text-white px-2.5 py-0.5 rounded-full font-medium">
                Bidder Mode
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
              निर्माण व्यवसायी, आपूर्तिकर्ता तथा परामर्शदाताहरूका लागि योग्यता स्व-मूल्याङ्कन, SBD का फाराम जेनेरेटर, e-GP बिडिङ गाइड, र पुनरावलोकन सम्बन्धी एकीकृत सहयोगी सुविधा।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {renderSwitchBtn()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Dynamic Header Replacing Main Banner by Active Sub-Tab */}
      {renderTopBanner()}

      {/* Navigation Sub-Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {[
            { id: 'overview', label: 'ड्यासबोर्ड मुख्य पृष्ठ', icon: Layers },
            { id: 'eligibility', label: 'के म योग्य छु? (निर्माण कार्य)', icon: Calculator },
            { id: 'goods-guide', label: 'मालसामान तथा क्याटलग सपिङ', icon: ShoppingBag },
            { id: 'services-guide', label: 'परामर्श तथा सेवा खरिद', icon: Award },
            { id: 'fatal-mistakes', label: 'घातक गल्तीहरू र जोखिम अडिट', icon: ShieldAlert },
            { id: 'forms', label: 'बोलपत्र फाराम जेनेरेटर (SBD Sec IV)', icon: FileText },
            { id: 'checklist', label: 'बिड पेश गर्नुपूर्वको ३०-बुँदे चेकलिस्ट', icon: CheckSquare },
            { id: 'egp-guide', label: 'e-GP बिडिङ गाइड (निर्देशिका)', icon: FileCheck2 },
            { id: 'review', label: 'पुनरावलोकन तथा उजुरी (दफा ४७/४९)', icon: Scale },
            { id: 'sbd-hub', label: 'SBD कागजात भण्डार (Download)', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${isActive
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: OVERVIEW DASHBOARD */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Stats & Action Cards: Key Bidder Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Card 1: Works Eligibility */}
            <div
              onClick={() => setActiveSubTab('eligibility')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                योग्यता स्व-मूल्याङ्कन (निर्माण कार्य)
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                AACT, समान प्रकृतिको काम, बिड क्षमता र ५ ठेक्काको सीमा जाँच्नुहोस्।
              </p>
              <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                <span>हिसाब गर्नुहोस्</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Goods & Catalogue Shopping */}
            <div
              onClick={() => setActiveSubTab('goods-guide')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                मालसामान तथा क्याटलग सपिङ
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                दफा ४१(क) क्याटलग छुट रणनीति, MAF नियम, प्राविधिक स्पेसिफिकेसन र LD।
              </p>
              <div className="mt-3 flex items-center text-xs font-semibold text-teal-700">
                <span>सपिङ गाइड र क्याल्कुलेटर</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Consulting & Services */}
            <div
              onClick={() => setActiveSubTab('services-guide')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-800 transition-colors">
                परामर्श तथा सेवा खरिद
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                EOI सर्टलिस्टिङ, RFP प्राविधिक प्रस्ताव, QCBS क्याल्कुलेटर र SSF।
              </p>
              <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                <span>QCBS स्कोर र नियमहरू</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Fatal Mistakes & Risk Audit */}
            <div
              onClick={() => setActiveSubTab('fatal-mistakes')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-rose-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-800 transition-colors">
                घातक गल्तीहरू र जोखिम अडिट
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                १ दिन म्याद कम हुने, ससर्त FIN-5, e-GP पासवर्ड लगायत १५ घातक पासो र अडिट।
              </p>
              <div className="mt-3 flex items-center text-xs font-semibold text-rose-700">
                <span>जोखिम जाँच्नुहोस् (१५ पासोहरू)</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 5: Forms Generator */}
            <div
              onClick={() => setActiveSubTab('forms')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                बोलपत्र फाराम जेनेरेटर (SBD)
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Letter of Bid, MAF, JV, Bid Bond, FIN-5, क्याटलग प्रस्ताव लगायत १९ फारामहरू।
              </p>
              <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                <span>ढाँचा भर्नुहोस् र छाप्नुहोस्</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 5: Pre-Bid 30-Point Checklist */}
            <div
              onClick={() => setActiveSubTab('checklist')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                पूर्व-तयारी ३०-बुँदे चेकलिस्ट
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                बिड गैर-जिम्मेवार हुनबाट जोगिन ३० वटा अनिवार्य कानूनी बुँदाहरू र नजिरहरू।
              </p>
              <div className="mt-3 flex items-center text-xs font-semibold text-amber-700">
                <span>रुजु गर्नुहोस् ({checklistProgressPercent}%)</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 6: SBD Downloads */}
            <div
              onClick={() => setActiveSubTab('sbd-hub')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-800 transition-colors">
                PPMO SBD कागजात भण्डार
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Works, Goods, Services, SQ का १६ आधिकारिक Word/PDF कागजातहरू।
              </p>
              <div className="mt-3 flex items-center text-xs font-semibold text-purple-700">
                <span>कागजात डाउनलोड गर्नुहोस्</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Bidder Essential Highlights: 16th Amendment & Rule 65 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>१६औँ संशोधन अनुसार बोलपत्रदाताले ध्यान दिनुपर्ने मुख्य कानूनी प्रावधानहरू</span>
              </div>
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    १
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">५ वटा चालू खरिद सम्झौताको सीमा (नियम ६५(४घ))</strong>
                    नेपालभर ५ वटा भन्दा बढी चालू ठेक्का भएका निर्माण व्यवसायीले नयाँ खरिद सम्झौता गर्न पाउने छैनन्। बोलपत्रसाथ ५ वटा भन्दा बढी चालू सम्झौता नरहेको स्वघोषणा पेश गर्नुपर्छ।
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    २
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">रु ५ करोडसम्म योग्यता बिना (नियम ६५(१))</strong>
                    रु ५ करोडसम्मको निर्माण कार्यमा योग्यताका आधार (AACT, समान काम) नतोकी योग्यता बिनाको खुला प्रतिस्पर्धा गर्न सकिने व्यवस्था।
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ३
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-semibold">१५% भन्दा बढी घटेमा अतिरिक्त कार्यसम्पादन जमानत (नियम ६५(४))</strong>
                    लागत अनुमान भन्दा १५% भन्दा बढी घटेको (८५% भन्दा कम) खण्डमा सो फरक रकमको ५०% बराबर थप कार्यसम्पादन जमानत बुझाउनु पर्नेछ।
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>बोलपत्र बदर (Non-Responsive) हुने मुख्य ५ वटा सामान्य गल्तीहरू</span>
              </div>
              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                <div className="p-3 rounded-xl bg-red-50/60 border border-red-200/80 text-red-950">
                  <strong className="font-semibold block text-red-900">१. बैंक जमानतको म्याद १ दिन भए पनि कम हुनु</strong>
                  बोलपत्रको मान्य अवधि (Valid Period) भन्दा कम्तीमा ३० दिन बढी म्याद नभएको बैंक ग्यारेन्टी पेश भएमा बोलपत्र सिधै गैर-जिम्मेवार भई बदर हुन्छ।
                </div>

                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-amber-950">
                  <strong className="font-semibold block text-amber-900">२. JV मा Lead Partner वा Member को शेयर नपुग्नु</strong>
                  नियम ३१ख अनुसार Lead Partner को न्यूनतम ४०% र अन्य साझेदारको कम्तीमा २५% शेयर हुनुपर्छ। सो भन्दा कम भएमा जे.भी. अयोग्य हुन्छ।
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800">
                  <strong className="font-semibold block text-slate-900">३. अद्यावधिक कर चुक्ता (Tax Clearance) पेश नहुनु</strong>
                  म्याद नाघेको वा अघिल्लो वर्षको कर चुक्ता पेश भएमा र म्यादभित्र पेश गरेको प्रमाण नभएमा बोलपत्र प्राविधिक रूपमै अनुत्तीर्ण हुन्छ।
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800">
                  <strong className="font-semibold block text-slate-900">४. BOQ मा दररेट खाली छोडिनु वा दररेट अक्षरमा नखुल्नु</strong>
                  BOQ को कुनै आइटममा दररेट नभरी छाड्दा वा अङ्क र अक्षरमा फरक परी गम्भीर द्विविधा सिर्जना हुँदा मूल्याङ्कनमा समस्या पर्छ।
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: ELIGIBILITY & CAPACITY SELF-ASSESSMENT */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'eligibility' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  बोलपत्रदाता योग्यता तथा क्षमता स्व-मूल्याङ्कन क्याल्कुलेटर
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  SBD Section III (Evaluation & Qualification Criteria) र खरिद नियमावली नियम ६५ अनुसार आफ्नो योग्यता जाँच्नुहोस्
                </p>
              </div>

              <div
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 ${overallEligibility
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
              >
                {overallEligibility ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>तपाईं यस बोलपत्रमा योग्य देखिनुहुन्छ</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>केही शर्तहरूमा ध्यान दिनुपर्ने देखिन्छ</span>
                  </>
                )}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  लागत अनुमान रकम (भ्याट बाहेक रु.)
                </label>
                <input
                  type="number"
                  value={calcEstimateAmount}
                  onChange={(e) => setCalcEstimateAmount(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-500">
                  रु. {calcEstimateAmount.toLocaleString('ne-NP')}
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  तपाईंको प्रस्तावित कबुल रकम (भ्याट बाहेक रु.)
                </label>
                <input
                  type="number"
                  value={calcBidAmount}
                  onChange={(e) => setCalcBidAmount(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-500">
                  रु. {calcBidAmount.toLocaleString('ne-NP')} (लागत अनुमान भन्दा{' '}
                  {percentBelowEstimate.toFixed(1)}% {percentBelowEstimate >= 0 ? 'घटेको' : 'बढेको'})
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 block">
                    हाल चलिरहेका (Ongoing) ठेक्काहरूको संख्या
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowFiveContractRules(!showFiveContractRules)}
                    className="text-[10px] text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    नियम हेर्नुहोस्
                  </button>
                </div>
                <input
                  type="number"
                  min="0"
                  max="15"
                  value={ongoingContractsCount}
                  onChange={(e) => setOngoingContractsCount(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-500">
                  अधिकतम सीमा: ५ वटा (१६औँ संशोधन नियम ६५(४घ))
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  माग गरिएको न्यूनतम वार्षिक कारोबार (AACT रु.)
                </label>
                <input
                  type="number"
                  value={calcAactRequired}
                  onChange={(e) => setCalcAactRequired(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-500">
                  रु. {calcAactRequired.toLocaleString('ne-NP')}
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  समान प्रकृतिको कामको आवश्यकता (रु.)
                </label>
                <input
                  type="number"
                  value={similarWorkRequired}
                  onChange={(e) => setSimilarWorkRequired(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-500">
                  रु. {similarWorkRequired.toLocaleString('ne-NP')} (सामान्यतया ८०%)
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  तपाईंले सम्पन्न गरेको १ ठूलो कामको रकम (रु.)
                </label>
                <input
                  type="number"
                  value={maxCompletedSimilarWork}
                  onChange={(e) => setMaxCompletedSimilarWork(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-500">
                  रु. {maxCompletedSimilarWork.toLocaleString('ne-NP')}
                </span>
              </div>
            </div>

            {/* 5 Ongoing Contracts Detailed Guide Drawer */}
            {showFiveContractRules && (
              <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs space-y-2">
                <div className="font-bold text-sm flex items-center gap-1.5 text-blue-900">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>५ वटा चालू ठेक्काको सीमा सम्बन्धी १६औँ संशोधनका मुख्य व्यवस्थाहरू:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed">
                  <li><strong>गणना हुने ठेक्का:</strong> रु ५ करोडभन्दा माथिका सार्वजनिक निकायहरूसँग भएका सम्पूर्ण चालू सम्झौताहरू।</li>
                  <li><strong>गणना नहुने ठेक्का:</strong> रु ५ करोड मुनिका खरिद सम्झौताहरू यस ५ वटाको सीमाभित्र गणना हुँदैनन् (नियम ६५(४घ) को प्रतिबन्धात्मक वाक्यांश)।</li>
                  <li><strong>सम्पन्न भएका काम:</strong> कार्यसम्पन्न प्रतिवेदन (Work Completion Certificate) जारी भइसकेका र केवल डिफेक्ट लायबिलिटी (DLP) मा रहेका ठेक्का गणना हुँदैनन्।</li>
                  <li><strong>गलत स्वघोषणा गरेमा:</strong> बोलपत्र रद्द हुनुका साथै धरौटी जफत हुने र १ देखि ३ वर्षसम्म कालोसूचीमा सिफारिस गरिनेछ।</li>
                </ul>
              </div>
            )}

            {/* Turnovers for AACT (Past 5-7 Years) */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  विगतका आर्थिक वर्षहरूको कारोबार रकम (उत्कृष्ट ३ वर्ष स्वतः छनौट हुनेछ):
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">वर्ष संख्या:</span>
                  {[5, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTurnoverCount(num)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg cursor-pointer ${turnoverCount === num
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                    >
                      {num} वर्ष
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {activeTurnovers.map((amt, idx) => {
                  const isTop3 = best3Indices.has(idx);
                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border transition-all ${isTop3
                        ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400'
                        : 'bg-slate-50 border-slate-200'
                        }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                        <span>वर्ष {idx + 1}</span>
                        {isTop3 && (
                          <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-sm">
                            Best 3
                          </span>
                        )}
                      </div>
                      <input
                        type="number"
                        value={amt}
                        onChange={(e) => {
                          const next = [...turnoverYears];
                          next[idx] = Number(e.target.value);
                          setTurnoverYears(next);
                        }}
                        className="w-full text-xs font-bold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bid Capacity Sub-Inputs */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                <span>बोलपत्र क्षमता (Assessed Available Bid Capacity Formula: A * N * 3 - B)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600 block">
                    विगत ५/१० वर्षको अधिकतम वार्षिक कारोबार (A):
                  </label>
                  <div className="text-xs font-bold text-slate-900 bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                    रु. {maxA.toLocaleString('ne-NP')}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600 block">
                    ठेक्काको निर्माण अवधि वर्षमा (N):
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={contractDurationN}
                    onChange={(e) => setContractDurationN(Number(e.target.value))}
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600 block">
                    चालू ठेक्काहरूमा बाँकी कामको दायित्व रकम (B रु.):
                  </label>
                  <input
                    type="number"
                    value={remainingLiabilityB}
                    onChange={(e) => setRemainingLiabilityB(Number(e.target.value))}
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Results Grid Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. AACT Result */}
              <div
                className={`p-4 rounded-xl border ${isAactEligible
                  ? 'bg-emerald-50/60 border-emerald-200'
                  : 'bg-red-50/60 border-red-200'
                  }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>१. औसत वार्षिक कारोबार (AACT)</span>
                  {isAactEligible ? (
                    <span className="text-emerald-700 font-bold">योग्य ✓</span>
                  ) : (
                    <span className="text-red-700 font-bold">अयोग्य ✗</span>
                  )}
                </div>
                <div className="text-sm font-bold text-slate-900">
                  रु. {Math.round(avgBest3Turnover).toLocaleString('ne-NP')}
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  न्यूनतम आवश्यकता: रु. {calcAactRequired.toLocaleString('ne-NP')}
                </p>
              </div>

              {/* 2. Similar Work Result */}
              <div
                className={`p-4 rounded-xl border ${isSimilarWorkEligible
                  ? 'bg-emerald-50/60 border-emerald-200'
                  : 'bg-red-50/60 border-red-200'
                  }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>२. समान प्रकृतिको काम अनुभव</span>
                  {isSimilarWorkEligible ? (
                    <span className="text-emerald-700 font-bold">योग्य ✓</span>
                  ) : (
                    <span className="text-red-700 font-bold">अयोग्य ✗</span>
                  )}
                </div>
                <div className="text-sm font-bold text-slate-900">
                  रु. {maxCompletedSimilarWork.toLocaleString('ne-NP')}
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  न्यूनतम आवश्यकता: रु. {similarWorkRequired.toLocaleString('ne-NP')}
                </p>
              </div>

              {/* 3. Bid Capacity Result */}
              <div
                className={`p-4 rounded-xl border ${isBidCapacityEligible
                  ? 'bg-emerald-50/60 border-emerald-200'
                  : 'bg-red-50/60 border-red-200'
                  }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>३. बोलपत्र क्षमता (Bid Capacity)</span>
                  {isBidCapacityEligible ? (
                    <span className="text-emerald-700 font-bold">पर्याप्त ✓</span>
                  ) : (
                    <span className="text-red-700 font-bold">अपर्याप्त ✗</span>
                  )}
                </div>
                <div className="text-sm font-bold text-slate-900">
                  रु. {Math.round(bidCapacity).toLocaleString('ne-NP')}
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  लागत अनुमान रु. {calcEstimateAmount.toLocaleString('ne-NP')} भन्दा बढी हुनुपर्छ।
                </p>
              </div>

              {/* 4. 5 Ongoing Contracts Result */}
              <div
                className={`p-4 rounded-xl border ${isOngoingContractsEligible
                  ? 'bg-emerald-50/60 border-emerald-200'
                  : 'bg-red-50/60 border-red-200'
                  }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>४. चालू ठेक्काको संख्या (नियम ६५)</span>
                  {isOngoingContractsEligible ? (
                    <span className="text-emerald-700 font-bold">योग्य ({ongoingContractsCount}/५) ✓</span>
                  ) : (
                    <span className="text-red-700 font-bold">सीमा नाघेको ({ongoingContractsCount}) ✗</span>
                  )}
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {ongoingContractsCount} वटा चालू ठेक्का
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  १६औँ संशोधन अनुसार ५ भन्दा बढी चालू सम्झौता भएमा नयाँ सम्झौता गर्न पाइँदैन।
                </p>
              </div>
            </div>

            {/* Additional Performance Security Notice */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-slate-800">
                  कार्यसम्पादन जमानत (Performance Security) हिसाब विवरण:
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  {additionalSecurityCalculation.note}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-slate-500 block">कुल बुझाउनुपर्ने जमानत:</span>
                <span className="text-sm font-bold text-slate-900">
                  रु. {Math.round(additionalSecurityCalculation.totalSecurity).toLocaleString('ne-NP')}
                </span>
                {additionalSecurityCalculation.isBelow15 && (
                  <span className="text-[10px] text-amber-700 block font-semibold">
                    (५% सामान्य: रु. {Math.round(additionalSecurityCalculation.normalSecurity).toLocaleString('ne-NP')} + ५०% थप: रु. {Math.round(additionalSecurityCalculation.additionalSecurity).toLocaleString('ne-NP')})
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: GOODS & CATALOGUE SHOPPING HUB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'goods-guide' && (
        <div className="space-y-8">
          {/* 1. Catalogue Shopping Law, Listing & Discount Calculator */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800">
                  <Sparkles className="w-4 h-4" />
                  <span>खण्ड १: क्याटलग सपिङ कानूनी कार्यविधि (PPA दफा ४१क र PPR नियम ८५क)</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  उत्पादक वा अधिकृत बिक्रेताको सूचीकरण र छुट प्रस्ताव रणनीति
                </h3>
              </div>
              <span className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full font-semibold">
                PPR नियम ८५ (क)
              </span>
            </div>

            {/* Explanatory cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[10px]">
                    १
                  </span>
                  <span>क्याटलग सपिङ के हो?</span>
                </div>
                <p className="text-slate-600">
                  सवारी साधन, हेभी इक्विपमेन्ट, कम्प्युटर/ल्यापटप, स्वास्थ्य उपकरण, फर्निचर, औजार आदि उत्पादकले बजारमा सार्वजनिक मूल्य सूची (MRP/Price List) कायम गरेका सामानहरूमा छुट लिएर गरिने विशेष खरिद विधि हो।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[10px]">
                    २
                  </span>
                  <span>सूचीकरण (Listing) प्रक्रिया</span>
                </div>
                <p className="text-slate-600">
                  सार्वजनिक निकायले राष्ट्रिय पत्रिका वा e-GP मा कम्तीमा १५/२१ दिनको म्याद दिई सूचीकरण आह्वान गर्दा आधिकारिक डिलरशिप, अद्यावधिक क्याटलग र उत्पादकद्वारा प्रमाणित आधिकारिक मूल्य सूचीसहित निवेदन पेश गर्नुपर्छ।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[10px]">
                    ३
                  </span>
                  <span>छनौटको सिद्धान्त (Maximum Discount)</span>
                </div>
                <p className="text-slate-600">
                  नियम ८५क(४) बमोजिम सार्वजनिक निकायले क्याटलग मूल्यमा <strong className="text-slate-900">सबैभन्दा बढी प्रतिशत छुट (Maximum Discount)</strong> कबुल गर्ने सूचीकृत बिक्रेतासँग खरिद सम्झौता गर्नुपर्छ। मूल्य सूची आर्थिक वर्षभरि बढाउन पाइँदैन।
                </p>
              </div>
            </div>

            {/* Interactive Catalogue Shopping Discount Calculator */}
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Calculator className="w-4 h-4 text-teal-700" />
                <span>क्याटलग सपिङ छुट, खुद लागत तथा कर क्याल्कुलेटर (Interactive Simulator)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    क्याटलग / MRP मूल्य प्रति इकाई (रु.)
                  </label>
                  <input
                    type="number"
                    value={catOriginalPrice}
                    onChange={(e) => setCatOriginalPrice(Number(e.target.value))}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-500">
                    रु. {catOriginalPrice.toLocaleString('ne-NP')}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    प्रस्तावित छुट प्रतिशत (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={catDiscountPercent}
                    onChange={(e) => setCatDiscountPercent(Number(e.target.value))}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-500">
                    छुट: {catDiscountPercent}% (प्रति इकाई रु. {Math.round(catDiscountAmountPerUnit).toLocaleString('ne-NP')})
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    माग संख्या / परिमाण (Quantity)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={catQuantity}
                    onChange={(e) => setCatQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-500">
                    कुल परिमाण: {catQuantity} थान/सेट
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    ढुवानी/जडान लागत (रु.)
                  </label>
                  <input
                    type="number"
                    value={catDeliveryCost}
                    onChange={(e) => setCatDeliveryCost(Number(e.target.value))}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-teal-600 focus:outline-hidden"
                  />
                  <label className="flex items-center gap-1.5 text-[11px] text-slate-600 mt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={catApplyVat}
                      onChange={(e) => setCatApplyVat(e.target.checked)}
                      className="rounded-sm text-teal-700"
                    />
                    <span>१३% भ्याट लागू हुने</span>
                  </label>
                </div>
              </div>

              {/* Calculator Output Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200">
                  <span className="text-[11px] font-semibold text-teal-800 block">
                    प्रति इकाई खुद मूल्य (Net Unit Price)
                  </span>
                  <span className="text-base sm:text-lg font-bold text-teal-950 mt-0.5 block">
                    रु. {Math.round(catNetUnitPrice).toLocaleString('ne-NP')}
                  </span>
                  <span className="text-[10px] text-teal-700">
                    (क्याटलग मूल्यमा {catDiscountPercent}% छुट पश्चात)
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-[11px] font-semibold text-emerald-800 block">
                    निकायलाई कुल छुट/बचत (Total Savings)
                  </span>
                  <span className="text-base sm:text-lg font-bold text-emerald-950 mt-0.5 block">
                    रु. {Math.round(catTotalSavings).toLocaleString('ne-NP')}
                  </span>
                  <span className="text-[10px] text-emerald-700">
                    (कुल {catQuantity} थानमा प्राप्त छुट रकम)
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-600 block">
                    करयोग्य रकम र १३% भ्याट
                  </span>
                  <span className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 block">
                    रु. {Math.round(catVatAmount).toLocaleString('ne-NP')}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    (करयोग्य रकम: रु. {Math.round(catTotalTaxable).toLocaleString('ne-NP')})
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-white shadow-sm">
                  <span className="text-[11px] font-medium text-teal-300 block">
                    अन्तिम भुक्तानी योग्य मूल्य (Grand Total)
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white mt-0.5 block">
                    रु. {Math.round(catGrandTotal).toLocaleString('ne-NP')}
                  </span>
                  <span className="text-[10px] text-slate-300">
                    (सामान, ढुवानी र १३% भ्याट सहित)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Technical Specifications Compliance & Common Pitfalls */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-800">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>खण्ड २: प्राविधिक स्पेसिफिकेसन कम्प्लायन्स (Technical Specifications Compliance)</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  आपूर्तिकर्ता प्राविधिक मूल्याङ्कनमा असफल हुनबाट जोगिने सुनौला नियमहरू
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSubTab('forms')}
                className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Compliance Sheet ढाँचा प्रयोग गर्नुहोस्</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Do's and Don'ts comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-red-800 uppercase tracking-wider">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>❌ आपूर्तिकर्ताका ५ घातक गल्तीहरू (Disqualification Pitfalls)</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span><strong>केवल "Comply" मात्र लेख्नु:</strong> स्पेसिफिकेसनका प्रत्येक बुँदामा केवल "Comply" लेखेर आफ्नो प्रस्तावित सामानको ब्रान्ड, मोडल र वास्तविक मान नखुलाउनु।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span><strong>क्याटलग/ब्रोसरको पृष्ठ नं. नखुलाउनु:</strong> प्राविधिक मूल्याङ्कन समितिले रुजु गर्न सक्ने गरी क्याटलगको Page No. र Clause No. उल्लेख नगर्नु।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span><strong>विचलन (Deviation) लुकाउनु:</strong> बोलपत्रमा माग गरिएको क्षमता भन्दा कम क्षमताको सामानलाई झुक्याएर Comply लेख्दा बदर हुनु।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span><strong>गुणस्तर प्रमाणपत्र (ISO/CE/NS) छुटाउनु:</strong> मान्यता प्राप्त प्रयोगशालाको टेस्ट रिपोर्ट वा स्ट्यान्डर्ड प्रमाणपत्र संलग्न नगर्नु।</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>✓ सफल आपूर्तिकर्ताले पालना गर्नुपर्ने विधि (Best Practices)</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>ठ्याक्कै प्राविधिक मान लेख्नुहोस्:</strong> उदाहरणका लागि '100 kVA' माग भएकोमा 'Offered: 100 kVA, 11/0.4 kV, Copper Wound' स्पष्ट उल्लेख गर्नुहोस्।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>ब्रोसरको पृष्ठ नम्बर खुलाउनुहोस्:</strong> 'Brochure Page 4, Section 2.1' स्पष्ट किटान गरी हाइलाइट गर्नुहोस्।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>उत्पादकको आधिकारिक ब्रोसर मात्र प्रयोग गर्नुहोस्:</strong> थर्ड-पार्टी वा इन्टरनेटबाट साभार गरिएको अनधिकृत विवरण पत्र नराख्नुहोस्।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span><strong>वारेन्टी र स्पेयर पार्ट्स समय तालिका:</strong> कम्तीमा १ देखि ३ वर्ष वारेन्टी र ५ देखि ७ वर्ष स्पेयर पार्ट्स सहयोगको लिखित कागजात संलग्न गर्नुहोस्।</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Manufacturer's Authorization Form (MAF) Guide */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-800">
                  <ShieldCheck className="w-4 h-4" />
                  <span>खण्ड ३: उत्पादकको आधिकारिकता पत्र (Manufacturer's Authorization Form - MAF)</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  सवारी साधन, कम्प्युटर तथा उपकरण खरिदमा MAF को कानूनी अनिवार्यता
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSubTab('forms')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-purple-100 text-purple-900 hover:bg-purple-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>MAF ढाँचा तयार गर्नुहोस् (SBD Sec IV)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-purple-700 font-bold block">१. कुन खरिदमा अनिवार्य?</span>
                <p className="text-slate-600 leading-relaxed">
                  सवारी साधन, कम्प्युटर/सर्भर, मेशिनरी, ल्याब उपकरण, हेभी इक्विपमेन्ट तथा ब्रान्डेड मालसामान खरिदमा MAF अनिवार्य हुन्छ।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-purple-700 font-bold block">२. मूल उत्पादकको प्रत्यक्ष पत्र</span>
                <p className="text-slate-600 leading-relaxed">
                  स्थानीय खुद्रा बिक्रेताले दिएको पत्र मान्य हुँदैन। विदेशी वा स्वदेशी मूल उत्पादक कम्पनी वा आधिकारिक राष्ट्रिय वितरकबाट जारी भएको हुनुपर्छ।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-purple-700 font-bold block">३. वारेन्टी र सेवा प्रतिबद्धता</span>
                <p className="text-slate-600 leading-relaxed">
                  यदि बोलपत्रदाताले सम्झौता पालना गर्न नसकेमा उत्पादक स्वयंले सम्झौताका सम्पूर्ण वारेन्टी र स्पेयर पार्ट्स दायित्व पूरा गर्ने प्रत्याभूति हुनुपर्छ।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-purple-700 font-bold block">४. अस्वीकृत हुने जोखिम</span>
                <p className="text-slate-600 leading-relaxed">
                  त्रुटिपूर्ण, मिति नखुलेको वा सर्तसहितको MAF पेश भएमा खरिद ऐनको दफा २३ बमोजिम बोलपत्र तत्काल गैर-जिम्मेवार (Non-Responsive) ठहरिन्छ।
                </p>
              </div>
            </div>
          </div>

          {/* 4. Goods Delivery, Liquidated Damages (LD) & Performance Security */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                  <Clock className="w-4 h-4" />
                  <span>खण्ड ४: डेलिभरी अवधि र लिक्विडेटेड ड्यामेज (LD) क्याल्कुलेटर</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  समयमै सामान आपूर्ति नगर्दा लाग्ने कानूनी हर्जाना (नियम १२१)
                </h3>
              </div>
              <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full font-semibold">
                प्रति दिन ०.०५% (बढीमा १०%)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* LD Inputs */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="text-xs font-bold text-slate-800">
                  हर्जाना हिसाब गर्न विवरण प्रविष्ट गर्नुहोस्:
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      कुल सम्झौता रकम (भ्याट सहित रु.)
                    </label>
                    <input
                      type="number"
                      value={goodsContractAmount}
                      onChange={(e) => setGoodsContractAmount(Number(e.target.value))}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-amber-600 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-500">
                      रु. {goodsContractAmount.toLocaleString('ne-NP')}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      सामान आपूर्तिमा भएको ढिलाइ (दिन)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={goodsDelayDays}
                      onChange={(e) => setGoodsDelayDays(Math.max(0, Number(e.target.value)))}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-amber-600 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-500">
                      ढिलाइ अवधि: {goodsDelayDays} दिन
                    </span>
                  </div>
                </div>
              </div>

              {/* LD Outputs */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center justify-between">
                  <span>हर्जाना (Liquidated Damages) नतिजा:</span>
                  <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-sm">
                    {goodsLdPercent.toFixed(2)}% कट्टा
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-amber-200/60 pb-1.5">
                    <span>दैनिक कट्टा हुने दर (०.०५%):</span>
                    <strong className="text-slate-900">रु. {Math.round(goodsLdDaily).toLocaleString('ne-NP')} / दिन</strong>
                  </div>
                  <div className="flex justify-between border-b border-amber-200/60 pb-1.5">
                    <span>कुल कट्टा हुने LD रकम ({goodsDelayDays} दिनको):</span>
                    <strong className="text-amber-950 text-sm">रु. {Math.round(goodsLdEffective).toLocaleString('ne-NP')}</strong>
                  </div>
                  <div className="flex justify-between border-b border-amber-200/60 pb-1.5">
                    <span>अधिकतम १०% सीमा रकम:</span>
                    <strong className="text-slate-900">रु. {Math.round(goodsLdMaxCap).toLocaleString('ne-NP')}</strong>
                  </div>
                </div>

                {goodsLdPercent >= 10 ? (
                  <div className="p-2.5 rounded-xl bg-red-100 text-red-900 text-[11px] font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-700" />
                    <span>गम्भीर चेतावनी: १०% अधिकतम सीमा पुगेको छ। सार्वजनिक निकायले खरिद सम्झौता रद्द गरी धरौटी जफत गर्न र कालोसूचीमा सिफारिस गर्न सक्छ!</span>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    नोट: डेलिभरी अवधिभित्र सामान आपूर्ति गर्न नसके म्याद थपको औपचारिक निवेदन दिई LD मिनाहा वा वैधानिक म्याद थप गराउनु बुद्धिमानी हुन्छ।
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: CONSULTING & SERVICES HUB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'services-guide' && (
        <div className="space-y-8">
          {/* 1. QCBS Interactive Combined Score Calculator */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-800">
                  <Calculator className="w-4 h-4" />
                  <span>खण्ड १: QCBS (गुणस्तर तथा लागतमा आधारित) संयुक्त स्कोर क्याल्कुलेटर</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  प्राविधिक अंक र आर्थिक कबुल रकमको संयुक्त स्कोर सिम्युलेटर
                </h3>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-800 border border-indigo-200 px-3 py-1 rounded-full font-semibold">
                खरिद नियमावली नियम ७९
              </span>
            </div>

            {/* Formula Explanation Banner */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block font-semibold mb-1">
                कानूनी मूल्याङ्कन सूत्र: S = (St × T/100) + [(Fm / F) × 100 × P/100]
              </strong>
              यहाँ <code className="bg-white px-1.5 py-0.5 rounded-sm border border-slate-200 text-slate-900 font-semibold">St</code> = तपाईंको प्राविधिक अंक,{' '}
              <code className="bg-white px-1.5 py-0.5 rounded-sm border border-slate-200 text-slate-900 font-semibold">Fm</code> = सबैभन्दा न्यून आर्थिक प्रस्ताव रकम,{' '}
              <code className="bg-white px-1.5 py-0.5 rounded-sm border border-slate-200 text-slate-900 font-semibold">F</code> = तपाईंको आर्थिक कबुल रकम,{' '}
              <code className="bg-white px-1.5 py-0.5 rounded-sm border border-slate-200 text-slate-900 font-semibold">T</code> = प्राविधिक भार (८०%),{' '}
              <code className="bg-white px-1.5 py-0.5 rounded-sm border border-slate-200 text-slate-900 font-semibold">P</code> = आर्थिक भार (२०%)।
            </div>

            {/* QCBS Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-indigo-50/40 p-4 sm:p-5 rounded-2xl border border-indigo-100">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  तपाईंको प्राविधिक अंक (St - १०० मा)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={qcbsTechScore}
                  onChange={(e) => setQcbsTechScore(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-indigo-600 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-500">
                  प्राविधिक योग्यता: {qcbsTechScore} / १००
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  तपाईंको आर्थिक कबुल रकम (F - रु.)
                </label>
                <input
                  type="number"
                  value={qcbsBidderFinancial}
                  onChange={(e) => setQcbsBidderFinancial(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-indigo-600 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-500">
                  रु. {qcbsBidderFinancial.toLocaleString('ne-NP')}
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  न्यूनतम आर्थिक कबुल रकम (Fm - रु.)
                </label>
                <input
                  type="number"
                  value={qcbsLowestFinancial}
                  onChange={(e) => setQcbsLowestFinancial(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-indigo-600 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-500">
                  रु. {qcbsLowestFinancial.toLocaleString('ne-NP')}
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  अङ्कभार अनुपात (Ratio)
                </label>
                <select
                  value={qcbsRatio}
                  onChange={(e) => setQcbsRatio(e.target.value as any)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-indigo-600 focus:outline-hidden"
                >
                  <option value="80-20">८०% प्राविधिक / २०% आर्थिक (मानक)</option>
                  <option value="70-30">७०% प्राविधिक / ३०% आर्थिक</option>
                  <option value="90-10">९०% प्राविधिक / १०% आर्थिक (विशिष्ट)</option>
                </select>
                <span className="text-[10px] text-slate-500">
                  SBD अनुसार निर्धारित भार
                </span>
              </div>
            </div>

            {/* QCBS Output Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-600 block">
                  प्राविधिक भारित अंक ({qcbsCalculations.techWeight}%)
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 block">
                  {qcbsCalculations.techWeighted.toFixed(2)} अंक
                </span>
                <span className="text-[10px] text-slate-500">
                  ({qcbsTechScore} × {qcbsCalculations.techWeight} / १००)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-600 block">
                  आर्थिक भारित अंक ({qcbsCalculations.finWeight}%)
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 block">
                  {qcbsCalculations.finWeighted.toFixed(2)} अंक
                </span>
                <span className="text-[10px] text-slate-500">
                  (आर्थिक अनुपात: {qcbsCalculations.finScore.toFixed(1)}%)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200">
                <span className="text-[11px] font-semibold text-indigo-800 block">
                  कुल संयुक्त स्कोर (Combined Score)
                </span>
                <span className="text-base sm:text-xl font-extrabold text-indigo-950 mt-0.5 block">
                  {qcbsCalculations.combinedScore.toFixed(2)} / १००
                </span>
                <span className="text-[10px] text-indigo-700">
                  (उच्चतम संयुक्त स्कोर ल्याउनेले ठेक्का पाउँछ)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-medium text-indigo-300 block">
                    रणनीतिक सल्लाह (Bidder Strategy)
                  </span>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                    {qcbsCalculations.techWeighted > 65
                      ? 'तपाईंको प्राविधिक अंक निकै बलियो छ! आर्थिक प्रस्ताव प्रतिस्पर्धी भन्दा केही बढी भए पनि सम्झौता जित्ने प्रबल सम्भावना छ।'
                      : 'प्राविधिक अंक कमजोर हुँदा आर्थिक रकम धेरै घटाए पनि संयुक्त स्कोरमा जित्न कठिन हुन सक्छ। प्राविधिक गुणस्तरमा जोड दिनुहोस्।'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. EOI Shortlisting & Qualification Guidelines */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-800">
                  <GraduationCap className="w-4 h-4" />
                  <span>खण्ड २: परामर्श सेवा EOI (आशयपत्र) सर्टलिस्टिङ कार्यविधि</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  दफा ३० अनुसार उत्कृष्ट ३ देखि ६ फर्मभित्र पर्ने रणनीति
                </h3>
              </div>
              <span className="text-xs bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1 rounded-full font-semibold">
                खरिद ऐन दफा ३० र नियम ७०
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>१. योग्यता तथा संस्थाको हैसियत</span>
                  <span className="text-purple-700 font-bold bg-purple-100 px-2 py-0.5 rounded-sm">४० - ५०%</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  <li>कम्पनी/फर्म दर्ता र स्थापना वर्ष (Firm Standing)</li>
                  <li>अद्यावधिक कर चुक्ता प्रमाणपत्र</li>
                  <li>विगत ३ वर्षको औसत वार्षिक कारोबार (AACT)</li>
                  <li>कार्यालय पूर्वाधार र आन्तरिक व्यवस्थापकीय क्षमता</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>२. कार्यानुभव (Experience)</span>
                  <span className="text-purple-700 font-bold bg-purple-100 px-2 py-0.5 rounded-sm">४० - ५०%</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  <li>समान प्रकृतिका परामर्श कार्य सम्पन्न गरेको संख्या</li>
                  <li>विगत ७ वर्षभित्र सम्पन्न आयोजनाको कार्यसम्पादन प्रमाणपत्र</li>
                  <li>नेपाल सरकार वा दातृ निकाय (WB/ADB) को आयोजना अनुभव</li>
                  <li>भौगोलिक तथा स्थानीय परिवेशको अनुभव</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs leading-relaxed">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>३. मुख्य जनशक्ति क्षमता</span>
                  <span className="text-purple-700 font-bold bg-purple-100 px-2 py-0.5 rounded-sm">१० - १५%</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  <li>संस्थामा उपलब्ध स्थायी र सम्बद्ध विज्ञहरूको रोस्टर</li>
                  <li>सम्बन्धित विषयमा स्नातकोत्तर वा विद्यावारिधि योग्यता</li>
                  <li>काउन्सिल दर्ता र पेशागत तालिम प्रमाणपत्रहरू</li>
                  <li>JV को हकमा लिड पार्टनर कम्तीमा ५०% र अन्य २५%</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. RFP Technical Proposal Preparation (TECH-4 & TECH-6) */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800">
                  <FileText className="w-4 h-4" />
                  <span>खण्ड ३: RFP प्राविधिक प्रस्ताव (Technical Proposal) तयारीका स्वर्ण नियम</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  TECH-4 कार्यविधि र TECH-6 मुख्य विज्ञको व्यक्तिगत विवरण (CV) प्रमाणीकरण
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSubTab('forms')}
                className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>फाराम जेनेरेटरमा CV ढाँचा हेर्नुहोस्</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs leading-relaxed">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-teal-700" />
                  <span>TECH-4: कार्यविधि, दृष्टिकोण र कार्यतालिका (Methodology & Work Plan)</span>
                </div>
                <p className="text-slate-600">
                  TOR (Terms of Reference) लाई जस्ताको तस्तै कपी-पेस्ट नगरी आयोजनाको वास्तविक समस्या, समाधानको नवीन प्राविधिक विधि (Software/Drone/GIS), फिल्ड सर्भे योजना, र महिना अनुसारको Milestones स्पष्ट प्रस्तुत गर्नुहोस्।
                </p>
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-[11px] font-semibold">
                  सुझाव: प्राविधिक प्रस्तावमा कम्तीमा ७० वा ७५ वा ८० न्यूनतम उत्तीर्णाङ्क प्राप्त नगरे आर्थिक खाम खोल्न कानूनतः पाइँदैन।
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <div className="font-bold text-amber-950 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>TECH-6: मुख्य विज्ञको CV र Exclusivity सम्बन्धी संवेदनशील नियम</span>
                </div>
                <p className="text-slate-700">
                  मुख्य विज्ञको बायोडाटामा सम्बन्धित विज्ञ स्वयंको सक्कल हस्ताक्षर अनिवार्य छ। साथै, <strong className="text-slate-900">यदि एउटै मुख्य विज्ञले दुई वा बढी प्रतिस्पर्धी फर्मलाई CV दिएको प्रमाणित भएमा</strong> दुवै फर्महरूको प्रस्ताव बदर वा अंक शून्य हुने जोखिम रहन्छ।
                </p>
                <div className="p-3 rounded-xl bg-white border border-amber-300 text-slate-800 text-[11px]">
                  विज्ञसँग 'यो आयोजनाका लागि मेरो CV केवल यस फर्मलाई मात्र प्रयोग गर्न दिएको छु' भन्ने Exclusivity & Availability Statement अनिवार्य गराउनुहोस्।
                </div>
              </div>
            </div>
          </div>

          {/* 4. Non-Consulting Services: Labor Act & SSF Compliance Calculator */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800">
                  <Users className="w-4 h-4" />
                  <span>खण्ड ४: गैर-परामर्श सेवा (सुरक्षा, सरसफाइ, सवारी) र श्रम ऐन / SSF अनुपालन</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  न्यूनतम पारिश्रमिक भन्दा कम दररेट हाल्दा बोलपत्र स्वतः बदर हुने कानूनी व्यवस्था
                </h3>
              </div>
              <span className="text-xs bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1 rounded-full font-semibold">
                श्रम ऐन २०७४ र PPRC नजिर
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Labor & SSF Inputs */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-800">
                  सेवा जनशक्ति तथा पारिश्रमिक विवरण:
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      जनशक्ति संख्या (श्रमिक/गार्ड संख्या)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={serviceStaffCount}
                      onChange={(e) => setServiceStaffCount(Math.max(1, Number(e.target.value)))}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-rose-600 focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      आधारभूत न्यूनतम मासिक पारिश्रमिक (नेपाल सरकार तोकेको रु १७,३००)
                    </label>
                    <input
                      type="number"
                      value={serviceBaseSalary}
                      onChange={(e) => setServiceBaseSalary(Number(e.target.value))}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-rose-600 focus:outline-hidden"
                    />
                    {serviceCalculations.isBelowStatutoryMinimum && (
                      <span className="text-[10px] text-red-600 font-bold block">
                        चेतावनी: रु १७,३०० भन्दा कम पारिश्रमिक कोट गरेमा खरिद ऐनको दफा २३ बमोजिम बोलपत्र स्वतः रद्द हुनेछ!
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      महँगी वा स्थानीय भत्ता (रु.)
                    </label>
                    <input
                      type="number"
                      value={serviceAllowance}
                      onChange={(e) => setServiceAllowance(Number(e.target.value))}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-rose-600 focus:outline-hidden"
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={serviceIncludeSsf}
                        onChange={(e) => setServiceIncludeSsf(e.target.checked)}
                        className="rounded-sm text-rose-700"
                      />
                      <span>योगदानमा आधारित सामाजिक सुरक्षा (SSF) को २०% नियोक्ता योगदान जोड्ने</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={serviceIncludeBonus}
                        onChange={(e) => setServiceIncludeBonus(e.target.checked)}
                        className="rounded-sm text-rose-700"
                      />
                      <span>१ महिनाको चाडपर्व खर्च (वार्षिक १ तलबलाई १२ महिनामा विभाजन)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Labor & SSF Outputs */}
              <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
                <div className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                  न्यूनतम वैधानिक सेवा लागत (Statutory Minimum Cost):
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-rose-200/60 pb-1.5">
                    <span>प्रति व्यक्ति आधारभूत तलब + भत्ता:</span>
                    <strong className="text-slate-900">रु. {Math.round(serviceCalculations.basicPlusAllowance).toLocaleString('ne-NP')}</strong>
                  </div>
                  <div className="flex justify-between border-b border-rose-200/60 pb-1.5">
                    <span>नियोक्ताको २०% SSF योगदान (उपदान + संचय कोष + दुर्घटना):</span>
                    <strong className="text-slate-900">रु. {Math.round(serviceCalculations.ssfEmployerCost).toLocaleString('ne-NP')}</strong>
                  </div>
                  <div className="flex justify-between border-b border-rose-200/60 pb-1.5">
                    <span>प्रति व्यक्ति मासिक चाडपर्व भार:</span>
                    <strong className="text-slate-900">रु. {Math.round(serviceCalculations.festivalCost).toLocaleString('ne-NP')}</strong>
                  </div>
                  <div className="flex justify-between border-b border-rose-200/60 pb-1.5">
                    <span>प्रति व्यक्ति न्यूनतम मासिक लागत:</span>
                    <strong className="text-rose-950 font-bold">रु. {Math.round(serviceCalculations.monthlyCostPerPerson).toLocaleString('ne-NP')}</strong>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="font-bold text-slate-900">कुल {serviceStaffCount} जनाको न्यूनतम मासिक लागत:</span>
                    <strong className="text-rose-900 text-sm font-extrabold">रु. {Math.round(serviceCalculations.totalMonthlyCost).toLocaleString('ne-NP')}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-rose-200 text-[11px] text-slate-600 leading-relaxed">
                  सर्वोच्च अदालत र PPRC को नजिर अनुसार 'प्रशासनिक खर्च' वा 'सेवा शुल्क' नराखी शून्य वा ऋणात्मक मार्जिन राखी हालिएका बोलपत्रहरू अस्वस्थ प्रतिस्पर्धा ठहर्‍याई बदर गरिएका छन्। त्यसैले न्यूनतम वैधानिक लागतमा आफ्नो निश्चित सेवा शुल्क जोडेर मात्र दररेट पेश गर्नुहोस्।
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: FATAL MISTAKES & RISK AUDITOR HUB */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'fatal-mistakes' && (
        <div className="space-y-8">
          {/* Section 1: Bid Security Validity Calculator */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800">
                  <Clock className="w-4 h-4" />
                  <span>औजार १: बैंक जमानत म्याद र रकम प्रमाणीकरण क्याल्कुलेटर (Bid Security Checker)</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  नियम ५० अनुसार '१ दिनको म्याद कमी' पासोबाट जोगिने क्याल्कुलेटर
                </h3>
              </div>
              <span className="text-xs bg-rose-50 text-rose-900 border border-rose-200 px-3 py-1 rounded-full font-semibold">
                खरिद नियमावली नियम ५०
              </span>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  बोलपत्रको मान्य अवधि (दिन)
                </label>
                <select
                  value={bgSubmissionDays}
                  onChange={(e) => setBgSubmissionDays(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-rose-600 focus:outline-hidden"
                >
                  <option value={90}>९० दिन (रु. १० करोडसम्मको खरिदमा)</option>
                  <option value={120}>१२० दिन (रु. १० करोडभन्दा माथिको खरिदमा)</option>
                  <option value={45}>४५ दिन (सिलबन्दी दरभाउपत्र - SQ)</option>
                  <option value={30}>३० दिन (विशेष संक्षिप्त खरिद)</option>
                </select>
                <span className="text-[10px] text-slate-500">
                  SBD Section I (ITB Clause 18.1) अनुसार
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  लागत अनुमान रकम (भ्याट बाहेक रु.)
                </label>
                <input
                  type="number"
                  value={bgEstimateAmt}
                  onChange={(e) => setBgEstimateAmt(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-rose-600 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-500">
                  रु. {bgEstimateAmt.toLocaleString('ne-NP')}
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  जमानत प्रतिशत (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="2"
                  max="5"
                  value={bgSecurityRate}
                  onChange={(e) => setBgSecurityRate(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-rose-600 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-500">
                  सामान्यतया २% देखि ३% (मानक २.५%)
                </span>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-600 block">
                  बोलपत्र मान्य अवधि (Bid Validity)
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 block">
                  {bgSubmissionDays} दिन
                </span>
                <span className="text-[10px] text-slate-500">
                  (बिड खोल्ने मितिबाट गणना)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200">
                <span className="text-[11px] font-semibold text-rose-800 block">
                  बैंक ग्यारेन्टीको अनिवार्य म्याद (नियम ५०)
                </span>
                <span className="text-base sm:text-lg font-extrabold text-rose-950 mt-0.5 block">
                  {bgCalculations.requiredSecurityDays} दिन अनिवार्य
                </span>
                <span className="text-[10px] text-rose-700">
                  (बोलपत्र मान्य अवधि + ३० दिन थप)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
                <span className="text-[11px] font-semibold text-emerald-800 block">
                  सुरक्षित सिफारिस म्याद (Safe Buffer)
                </span>
                <span className="text-base sm:text-lg font-extrabold text-emerald-950 mt-0.5 block">
                  {bgCalculations.safeRecommendedDays} दिन राख्नुहोस्
                </span>
                <span className="text-[10px] text-emerald-700">
                  (१ दिनको कमीले बिड खारेज हुनबाट बचाउने)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white shadow-sm">
                <span className="text-[11px] font-medium text-rose-300 block">
                  न्यूनतम बैंक धरौटी रकम
                </span>
                <span className="text-base sm:text-lg font-bold text-white mt-0.5 block">
                  रु. {Math.round(bgCalculations.minSecurityAmount).toLocaleString('ne-NP')}
                </span>
                <span className="text-[10px] text-slate-300">
                  (लागत अनुमानको {bgSecurityRate}%)
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 leading-relaxed flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">PPRC को सर्वसम्मत नजिर:</strong>
                यदि बोलपत्र कागजातमा १२० दिनको बैंक ग्यारेन्टी माग भएकोमा बैंकले ११९ दिन मात्र लेखिदियो भने मूल्याङ्कन समितिले कुनै पनि स्पष्टीकरण नमागी सिधै बोलपत्र गैर-जिम्मेवार (Non-Responsive) ठहर गर्दछ। त्यसैले बैंकबाट ग्यारेन्टी पत्र बुझ्दा अनिवार्य रूपमा मिति र दिन गणना गर्नुहोस्।
              </div>
            </div>
          </div>

          {/* Section 2: Pre-Bid Risk Auditor */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-800">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>औजार २: बोलपत्र पेश गर्नुपूर्वको जोखिम अडिटर (Pre-Bid Risk Auditor)</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  बिड सबमिट गर्नुअघि १० संवेदनशील बुँदा जाँची आफ्नो रेडीनेस स्कोर निकाल्नुहोस्
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleResetAudit}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>रिसेट गर्नुहोस्</span>
                </button>
              </div>
            </div>

            {/* Score and Status Meter */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>अडिट प्रगति:</span>
                  <span className="text-purple-700">{auditCompletedCount} / 10 बुँदा सुरक्षित</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      auditRiskLevel === 'safe'
                        ? 'bg-emerald-600'
                        : auditRiskLevel === 'medium'
                        ? 'bg-amber-500'
                        : 'bg-rose-600'
                    }`}
                    style={{ width: `${auditPercent}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl border sm:col-span-2 flex items-center gap-3.5 bg-slate-50 border-slate-200">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                    auditRiskLevel === 'safe'
                      ? 'bg-emerald-100 text-emerald-800'
                      : auditRiskLevel === 'medium'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {auditRiskLevel === 'safe' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : auditRiskLevel === 'medium' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <ShieldAlert className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    जोखिम स्तर (Risk Level):
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {auditRiskLevel === 'safe' && '🟢 सुरक्षित बोलपत्र (Safe to Submit) - कुनै गम्भीर त्रुटि देखिएन'}
                    {auditRiskLevel === 'medium' && '🟡 मध्यम जोखिम (Review Required) - केही संवेदनशील शर्तहरू छुटेका छन्'}
                    {auditRiskLevel === 'high' && '🔴 उच्च जोखिम (High Disqualification Risk) - यी कैफियत नसच्याई बिड हाल्दा बदर हुने जोखिम उच्च छ'}
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Checklist Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PRE_BID_RISK_AUDIT_ITEMS.map((item) => {
                const isChecked = !!auditCheckedItems[item.id];
                return (
                  <div
                    key={item.id}
                    role="checkbox"
                    aria-checked={isChecked}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        handleToggleAudit(item.id);
                      }
                    }}
                    onClick={() => handleToggleAudit(item.id)}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all select-none ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-300 text-slate-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                          : 'bg-white border-slate-300 text-transparent hover:border-slate-400'
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 stroke-[3] transition-transform ${isChecked ? 'scale-100' : 'scale-50'}`} />
                    </div>
                    <div className="text-xs leading-relaxed flex-1 space-y-1">
                      <div className="font-semibold text-slate-900 flex items-center justify-between gap-2">
                        <span>{item.question}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm shrink-0">
                          {item.ruleRef}
                        </span>
                      </div>
                      {!isChecked && (
                        <p className="text-[11px] text-rose-700 font-medium">
                          ⚠️ जोखिम: {item.riskIfNo}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: 15 Fatal Mistakes Database */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800">
                  <FileWarning className="w-4 h-4" />
                  <span>खण्ड ३: हेर्दा साना तर बोलपत्र सिधै बदर गराउने १५ घातक गल्तीहरू (Detailed Case Database)</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  कानूनी छिद्रहरू, स्थापित नजिरहरू, र बच्ने व्यावहारिक सुरक्षा उपायहरू
                </h3>
              </div>

              <div className="w-full sm:w-64">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="गल्ती वा नजिर खोज्नुहोस्..."
                    value={mistakeSearchQuery}
                    onChange={(e) => setMistakeSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-rose-600 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {FATAL_MISTAKES_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setMistakeCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    mistakeCategoryFilter === cat.id
                      ? 'bg-rose-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Mistakes List */}
            <div className="space-y-4">
              {filteredFatalMistakes.map((mistake) => {
                const isExpanded = expandedMistakeId === mistake.id;
                return (
                  <div
                    key={mistake.id}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-white hover:border-slate-300 transition-all shadow-2xs"
                  >
                    <div
                      onClick={() => setExpandedMistakeId(isExpanded ? null : mistake.id)}
                      className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              mistake.severity === 'critical'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {mistake.severity === 'critical' ? 'अति संवेदनशील' : 'उच्च जोखिम'}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {mistake.categoryNepali}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {mistake.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          <strong>हेर्दा सानो लाग्ने गल्ती:</strong> {mistake.subtleMistake}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="text-xs font-semibold text-rose-700 shrink-0 flex items-center gap-1 hover:text-rose-900 mt-1 cursor-pointer"
                      >
                        <span>{isExpanded ? 'विवरण बन्द गर्नुहोस्' : 'विस्तृत विवरण हेर्नुहोस्'}</span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 space-y-4 bg-slate-50/50 text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <div className="p-3.5 rounded-xl bg-red-50/80 border border-red-200 space-y-1 text-slate-800">
                            <span className="font-bold text-red-900 block flex items-center gap-1.5">
                              <XCircle className="w-4 h-4 text-red-700" />
                              <span>कानूनी परिणाम (Legal Consequence):</span>
                            </span>
                            <p className="leading-relaxed">{mistake.legalConsequence}</p>
                            <span className="text-[11px] text-slate-600 block mt-1 font-semibold">
                              कानूनी आधार: {mistake.legalReference}
                            </span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200 space-y-1 text-slate-800">
                            <span className="font-bold text-purple-900 block flex items-center gap-1.5">
                              <Scale className="w-4 h-4 text-purple-700" />
                              <span>PPRC वा अदालतको वास्तविक नजिर:</span>
                            </span>
                            <p className="leading-relaxed">{mistake.precedentReference}</p>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 text-slate-800">
                          <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>बच्ने सुरक्षित उपाय (Safe Prevention Protocol):</span>
                          </span>
                          <p className="leading-relaxed">{mistake.safePreventionProtocol}</p>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-slate-700">
                          <span className="font-semibold text-slate-900">
                            🔍 तुरुन्तै रुजु गर्ने टिप्स:
                          </span>
                          <span className="text-slate-600">{mistake.checklistHint}</span>
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
      {/* TAB 3: BIDDING FORMS GENERATOR */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'forms' && <BiddingFormsGenerator hideHeader={true} />}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: PRE-BID SUBMISSION 30-POINT CHECKLIST & PPRC PRECEDENTS */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'checklist' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  बोलपत्र पेश गर्नुपूर्वको अनिवार्य ३०-बुँदे चेकलिस्ट (Pre-Bid Check)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  बोलपत्र प्राविधिक वा कानूनी त्रुटिका कारण गैर-जिम्मेवार (Non-Responsive) हुनबाट जोगिन यी ३० वटा बुँदाहरू अनिवार्य रुजु गर्नुहोस्।
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>प्रिन्ट गर्नुहोस्</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetChecklist}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>रिसेट</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>चेकलिस्ट प्रगति: {checkedCount} / {totalCheckItems} बुँदा रुजु गरियो</span>
                <span className="text-emerald-700">{checklistProgressPercent}% पूरा</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${checklistProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Checklist Sections */}
            <div className="space-y-6">
              {checklistSections.map((sec) => (
                <div key={sec.id} className="space-y-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 border-b border-slate-100 pb-1.5">
                    {sec.title}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {sec.items.map((item) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          role="checkbox"
                          aria-checked={isChecked}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              handleToggleCheck(item.id);
                            }
                          }}
                          onClick={() => handleToggleCheck(item.id)}
                          className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all select-none ${isChecked
                            ? 'bg-emerald-50/70 border-emerald-300 text-slate-900 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                        >
                          <div
                            className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center border transition-all shrink-0 ${isChecked
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                              : 'bg-white border-slate-300 text-transparent hover:border-slate-400'
                              }`}
                          >
                            <Check className={`w-3.5 h-3.5 stroke-[3] transition-transform ${isChecked ? 'scale-100' : 'scale-50'}`} />
                          </div>
                          <div className="text-xs leading-relaxed flex-1">
                            <span className={isChecked ? 'line-through text-slate-400 font-normal' : 'font-medium text-slate-800'}>
                              {item.text}
                            </span>
                            {item.required && (
                              <span className="ml-2 text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded-sm">
                                अनिवार्य
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* PPRC Precedents Section: Real Disqualification Cases */}
            <div className="mt-10 pt-6 border-t border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-800">
                    <Scale className="w-4 h-4" />
                    <span>PPRC का स्थापित नजिरहरू (Precedents on Bid Disqualification)</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    बोलपत्रदाताका पक्ष र विपक्षमा भएका वास्तविक पुनरावलोकन निर्णयहरू
                  </h3>
                </div>
                <div className="w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="नजिर खोज्नुहोस्..."
                    value={precedentSearch}
                    onChange={(e) => setPrecedentSearch(e.target.value)}
                    className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredPrecedents.map((precedent) => (
                  <div
                    key={precedent.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-2xs transition-all space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                      <div>
                        <span className="text-[11px] font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md mr-2">
                          {precedent.caseNo}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{precedent.title}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${precedent.pprcVerdict === 'favour-bidder'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {precedent.pprcVerdict === 'favour-bidder'
                          ? 'बोलपत्रदाताको पक्षमा निर्णय'
                          : 'सार्वजनिक निकायको पक्षमा (बोलपत्र बदर)'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 space-y-1">
                      <p>
                        <strong>निवेदक:</strong> {precedent.applicant} | <strong>विपक्षी:</strong>{' '}
                        {precedent.respondent}
                      </p>
                      <p>
                        <strong>विवादित प्रश्न:</strong> {precedent.keyLegalIssue}
                      </p>
                      <p className="text-slate-600 leading-relaxed">
                        <strong>PPRC को फैसला सार:</strong> {precedent.decisionSummary}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>बोलपत्रदाताले सिक्नुपर्ने मुख्य पाठ:</strong>{' '}
                        {precedent.lessonForBidders}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: E-GP BIDDER GUIDE */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'egp-guide' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-800">
                <FileCheck2 className="w-4 h-4" />
                <span>विद्युतीय खरिद प्रणाली सञ्चालन निर्देशिका, २०८० अनुसार</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                e-GP पोर्टलमा बोलपत्रदाताहरूको ६-चरणबद्ध बिडिङ प्रक्रिया
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                PPMO को e-GP पोर्टल (www.bolpatra.gov.np/egp) मा बिड तयार गर्दा, दस्तुर बुझाउँदा र सबमिट गर्दा पालना गर्नुपर्ने चरणहरू:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  step: '१',
                  title: 'दर्ता तथा डिजिटल हस्ताक्षर (Token/DSC)',
                  desc: 'कम्पनीको स्थायी लेखा नम्बर (PAN) र आधिकारिक विवरणसहित e-GP मा प्रोफाइल बनाउने र मान्यता प्राप्त संस्थाबाट डिजिटल हस्ताक्षर (Token) लिई इन्स्टल गर्ने।',
                  clause: 'निर्देशिका दफा ९-१२',
                  points: ['e-GP Signer वा PKI Component अनिवार्य इन्स्टल गर्नुहोस्', 'टोकनको वैधता कम्तीमा १ वर्ष हुनुपर्ने', 'कम्पनीको आधिकारिक इमेल दर्ता गर्नुपर्ने'],
                },
                {
                  step: '२',
                  title: 'बोलपत्र कागजात खोज तथा डाउनलोड',
                  desc: 'IFB No. वा कार्यालयको नामबाट बोलपत्र खोज्ने र सम्पूर्ण SBD कागजात, ड्रइङ, स्पेसिफिकेसन तथा संशोधन (Addenda) निःशुल्क डाउनलोड गर्ने।',
                  clause: 'निर्देशिका दफा २३-२४',
                  points: ['My Bids मा गएर टेन्डर My Saved Bids मा राख्नुहोस्', 'Addendum जारी भएको छ कि छैन अन्तिम समयसम्म रुजु गर्नुहोस्'],
                },
                {
                  step: '३',
                  title: 'दस्तुर तथा जमानत दाखिला (Payment)',
                  desc: 'बोलपत्र फाराम दस्तुर ConnectIPS/e-Payment बाट राजस्व खातामा र धरौटी बापतको रकम धरौटी खातामा जम्मा गरी भौचर वा बैंक ग्यारेन्टी स्क्यान गरी अपलोड गर्ने।',
                  clause: 'निर्देशिका दफा २१-२२',
                  points: ['राजस्व शीर्षक नं. र कार्यालय कोड स्पष्ट भर्नुहोस्', 'अनलाइन बैंक ग्यारेन्टी भेरिफिकेसन कोड जाँच गर्नुहोस्'],
                },
                {
                  step: '४',
                  title: '१ वा २ खाम प्रस्ताव तयारी तथा अपलोड',
                  desc: 'प्राविधिक प्रस्तावमा योग्यता सम्बन्धी सम्पूर्ण कागजात र आर्थिक प्रस्तावमा प्रणालीबाट प्राप्त BOQ एक्सल फाइलमा दररेट भरी सही ढाँचामा अपलोड गर्ने।',
                  clause: 'निर्देशिका दफा २६-२७',
                  points: ['BOQ को कुनै फर्मुला फेरबदल नगर्नुहोस्', 'प्राविधिक खाममा मूल्यको कुनै अंश नपरोस्'],
                },
                {
                  step: '५',
                  title: 'डिजिटल हस्ताक्षर, सबमिसन तथा ह्यास',
                  desc: 'डिजिटल सिग्नेचर टोकन मार्फत फाइल इन्क्रिप्ट गरी अन्तिम बिड सबमिट गर्ने र सबमिसन ह्यास (Hash Slip) प्रिन्ट/सुरक्षित राख्ने।',
                  clause: 'निर्देशिका दफा २८-२९',
                  points: ['सबमिसन कन्फर्मेसन स्लिप डाउनलोड गर्नुहोस्', 'म्याद सकिनुभन्दा कम्तीमा ४ घण्टा अगावै बिड सबमिट गर्नुहोस्'],
                },
                {
                  step: '६',
                  title: 'अनलाइन बिड खोल्ने र मूल्यांकन नतिजा',
                  desc: 'तोकिएको मिति र समयमा e-GP बाट स्वतः बिड खोल्ने सारांश (Bid Opening Record) हेर्ने र मूल्यांकन पश्चात प्रकाशित हुने LOI नतिजा अनुगमन गर्ने।',
                  clause: 'निर्देशिका दफा ३१-३४',
                  points: ['Bid Opening Summary बाट प्रतिस्पर्धीको दररेट हेर्नुहोस्', 'LOI जारी भएको ७ दिनभित्र दाबी/पुनरावलोकन गर्न सकिन्छ'],
                },
              ].map((stepItem) => (
                <div
                  key={stepItem.step}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                      {stepItem.step}
                    </span>
                    <span className="text-[10px] text-blue-900 bg-blue-100 font-semibold px-2 py-0.5 rounded-md">
                      {stepItem.clause}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {stepItem.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stepItem.desc}
                  </p>
                  <ul className="text-[11px] text-slate-500 space-y-1 list-disc list-inside">
                    {stepItem.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Common e-GP Technical Problems & Solutions */}
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-700" />
                <span>बोलपत्रदाताहरूले e-GP मा भोग्ने सामान्य प्राविधिक समस्या र समाधान (Troubleshooting):</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 font-semibold block">
                    Q: BOQ फाइल अपलोड गर्दा 'Calculation/Formula Mismatch' भन्छ, के गर्ने?
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    A: e-GP बाट डाउनलोड भएको मूल एक्सल फाइलको फर्म्याट, कोलम वा फर्मुला परिमार्जन नगरी केवल 'Rate' कोलममा मात्र दर भर्नुपर्छ। दर भरेपछि फाइल सेभ गर्दा नाम नफेर्नुहोस्।
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 font-semibold block">
                    Q: डिजिटल हस्ताक्षर (Token) ले हस्ताक्षर गर्दा 'Token Not Found' भन्छ?
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    A: ब्राउजरमा e-GP Signer वा PKI Component चालु (Active) छ कि छैन जाँच गर्नुहोस्। कम्प्युटर रिस्टार्ट गरी टोकनको ड्राइभर पुनः इन्स्टल गर्नुहोस्।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: ADMINISTRATIVE REVIEW & GRIEVANCE (दफा ४७ र ४९) */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'review' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-800">
                <Scale className="w-4 h-4" />
                <span>सार्वजनिक खरिद ऐन, २०६३ • परिच्छेद ४ (पुनरावलोकन)</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                बोलपत्रदाताको पुनरावलोकन तथा उजुरी सम्बन्धी हक र प्रक्रिया
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                मूल्याङ्कनमा अन्याय भएको महसुस भएमा खरिद ऐनको दफा ४७ र ४९ बमोजिम अवलम्बन गर्नुपर्ने कानूनी चरणहरू:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 1: Head of Procuring Entity (Section 47) */}
              <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-blue-800 text-white px-2.5 py-1 rounded-lg">
                    पहिलो चरण: कार्यालय प्रमुख समक्ष निवेदन
                  </span>
                  <span className="text-xs font-bold text-blue-900">दफा ४७</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  आशयको सूचना (LOI) प्रकाशित भएको ७ दिनभित्र निवेदन
                </h3>
                <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
                  <li>सार्वजनिक निकायले बोलपत्र स्वीकृत गर्ने आशयको सूचना प्रकाशित गरेको ७ दिनभित्र निर्णयकर्ता कार्यालय प्रमुख समक्ष निवेदन दिनुपर्नेछ।</li>
                  <li>निवेदन दर्ता भएको मितिले ५ दिनभित्र कार्यालय प्रमुखले छानबिन गरी निर्णय दिनुपर्छ।</li>
                  <li>कार्यालय प्रमुखले निवेदन मनासिव देखेमा मूल्याङ्कन प्रक्रिया सच्याउन आदेश दिनेछ।</li>
                </ul>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('forms')}
                    className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>दफा ४७ को निवेदन ढाँचा हेर्नुहोस्</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Step 2: Review Committee - PPRC (Section 49) */}
              <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-purple-800 text-white px-2.5 py-1 rounded-lg">
                    दोस्रो चरण: पुनरावलोकन समिति (PPRC)
                  </span>
                  <span className="text-xs font-bold text-purple-900">दफा ४९</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  कार्यालय प्रमुखको निर्णय चित्त नबुझेमा ७ दिनभित्र PPRC मा
                </h3>
                <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
                  <li>कार्यालय प्रमुखले म्यादभित्र निर्णय नदिएमा वा निर्णय चित्त नबुझेमा सार्वजनिक खरिद पुनरावलोकन समिति (PPRC) मा निवेदन दिन सकिन्छ।</li>
                  <li>निवेदनसाथ बोलपत्र रकमको ०.१५% धरौटी (नगद भौचर वा बैंक ग्यारेन्टी) बुझाउनु अनिवार्य हुन्छ।</li>
                  <li>PPRC ले निवेदन परेको ३० दिनभित्र अन्तिम निर्णय दिन्छ र निर्णय नहुँदासम्म ठेक्का सम्झौता रोक्का (Stay) रहन सक्छ।</li>
                </ul>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('forms')}
                    className="text-xs font-bold text-purple-800 hover:text-purple-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>PPRC पुनरावलोकन निवेदन ढाँचा हेर्नुहोस्</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Deposit Calculator for PPRC */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  PPRC पुनरावलोकन धरौटी (०.१५%) द्रुत क्याल्कुलेटर:
                </span>
                <span className="text-xs text-slate-600">
                  कबुल रकम रु {calcBidAmount.toLocaleString('ne-NP')} को ०.१५% धरौटी रकम
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">आवश्यक धरौटी:</span>
                <span className="text-sm font-bold text-purple-900">
                  रु. {Math.round(calcBidAmount * 0.0015).toLocaleString('ne-NP')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 7: SBD REPOSITORY (FOR_BIDDERS FILES BROWSER & DOWNLOADS) */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'sbd-hub' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-800">
                  <BookOpen className="w-4 h-4" />
                  <span>PPMO Standard Bidding Documents (SBDs) भण्डार</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  सार्वजनिक खरिद आधिकारिक नमूना बोलपत्र कागजातहरू
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  सार्वजनिक खरिद अनुगमन कार्यालयले स्वीकृत गरेका निर्माण कार्य, मालसामान, परामर्श सेवा र राशन खरिदका आधिकारिक Word/PDF कागजातहरू डाउनलोड गर्नुहोस्।
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-semibold">
                  कुल कागजात: {filteredSbds.length}
                </span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {[
                  { id: 'all', label: 'सबै विधा' },
                  { id: 'works', label: 'निर्माण कार्य (Works)' },
                  { id: 'goods', label: 'मालसामान (Goods)' },
                  { id: 'services', label: 'परामर्श सेवा (Services)' },
                  { id: 'special', label: 'विशेष खरिद (राशन)' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSbdCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${sbdCategoryFilter === cat.id
                      ? 'bg-purple-800 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[200px] sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="कागजात खोज्नुहोस्..."
                  value={sbdSearchQuery}
                  onChange={(e) => setSbdSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-purple-600"
                />
              </div>
            </div>

            {/* SBD Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSbds.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-900 px-2 py-0.5 rounded-md">
                        {doc.categoryNepali}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">
                        {doc.fileType.toUpperCase()} • {doc.fileSizeText}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {doc.titleNepali}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      {doc.titleEnglish}
                    </p>

                    <div className="pt-2 text-xs text-slate-600 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">खरिद विधि:</span>
                        <span className="font-semibold text-slate-800">{doc.biddingMethod}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">सीमा/थ्रेसहोल्ड:</span>
                        <span className="font-semibold text-slate-800">{doc.thresholdNepali}</span>
                      </div>
                    </div>

                    {/* Critical advice snippet */}
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs">
                      <strong>बोलपत्रदाताले ख्याल गर्नुपर्ने:</strong> {doc.criticalBidderAdvice}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSbdForModal(doc)}
                      className="px-3 py-1.5 text-xs font-semibold text-purple-800 hover:text-purple-950 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                    >
                      BDS मुख्य बुँदाहरू हेर्नुहोस्
                    </button>

                    <a
                      href={doc.fileUrl}
                      download={doc.fileName}
                      className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>डाउनलोड ({doc.fileType.toUpperCase()})</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* BDS Details Modal */}
            {selectedSbdForModal && (
              <div
                className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity"
                onClick={() => setSelectedSbdForModal(null)}
              >
                <div
                  className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-[10px] bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded-md">
                        {selectedSbdForModal.categoryNepali}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        {selectedSbdForModal.titleNepali}
                      </h3>
                      <p className="text-xs text-slate-500">{selectedSbdForModal.titleEnglish}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedSbdForModal(null)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      BDS (Bid Data Sheet) का प्रमुख व्यवस्थाहरू:
                    </h4>
                    <div className="space-y-2">
                      {selectedSbdForModal.bdsHighlights.map((hl, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                          <strong className="text-slate-900 block font-semibold">{hl.label}</strong>
                          <span className="text-slate-600 mt-0.5 block leading-relaxed">{hl.description}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                      <strong>विशेष मार्गदर्शन:</strong> {selectedSbdForModal.criticalBidderAdvice}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      फाइल: {selectedSbdForModal.fileName}
                    </span>
                    <a
                      href={selectedSbdForModal.fileUrl}
                      download={selectedSbdForModal.fileName}
                      className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>आधिकारिक फाइल डाउनलोड गर्नुहोस्</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
