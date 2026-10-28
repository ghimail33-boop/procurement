import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Layers, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Clock, 
  CheckCircle2,
  Building,
  Check,
  Globe
} from 'lucide-react';
import { ProcurementType } from '../types/procurement';
import { PROCUREMENT_METHODS } from '../data/procurementData';
import { analyzeProcurementThreshold, formatNepaliCurrency } from '../utils/procurementUtils';

interface ProcurementAdvisorWizardProps {
  onSelectMethod?: (methodId: string) => void;
  onNavigateToTemplate?: (templateId: string) => void;
  onNavigateToIcb?: () => void;
}

export const ProcurementAdvisorWizard: React.FC<ProcurementAdvisorWizardProps> = ({
  onSelectMethod,
  onNavigateToTemplate,
  onNavigateToIcb,
}) => {
  const [step, setStep] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('advisor_step');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (parsed >= 1 && parsed <= 3) return parsed;
      }
    } catch {}
    return 1;
  });
  const [procurementType, setProcurementType] = useState<ProcurementType>(() => {
    try {
      const saved = localStorage.getItem('advisor_procurement_type');
      if (saved && ['works', 'goods', 'consulting', 'services'].includes(saved)) {
        return saved as ProcurementType;
      }
    } catch {}
    return 'works';
  });
  const [amount, setAmount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('advisor_amount');
      if (saved) {
        const parsed = Number(saved);
        if (!isNaN(parsed) && parsed > 0) return parsed;
      }
    } catch {}
    return 3500000;
  });
  const [specialCondition, setSpecialCondition] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('advisor_special_condition');
      if (saved) return saved;
    } catch {}
    return 'normal';
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('advisor_step', String(step));
      localStorage.setItem('advisor_procurement_type', procurementType);
      localStorage.setItem('advisor_amount', String(amount));
      localStorage.setItem('advisor_special_condition', specialCondition);
    } catch {}
  }, [step, procurementType, amount, specialCondition]);

  // Quick budget range choices
  const budgetPresets = [
    { label: 'रु १ लाख सम्म', value: 100000 },
    { label: 'रु १५ लाख सम्म (फुटकर/सोझै)', value: 1500000 },
    { label: 'रु २० लाख सम्म (दरभाउपत्र)', value: 2000000 },
    { label: 'रु १ करोड सम्म (उपभोक्ता समिति)', value: 10000000 },
    { label: 'रु २ करोड सम्म (१ खाम खुला)', value: 20000000 },
    { label: 'रु ५ करोड (२ खाम खुला बोलपत्र)', value: 50000000 },
    { label: 'रु २५ करोड (ठूला निर्माण)', value: 250000000 },
    { label: 'रु १ अर्ब सम्म', value: 1000000000 },
    { label: 'रु ५ अर्ब भन्दा बढी (ICB)', value: 6000000000 },
  ];

  const analysis = useMemo(() => {
    return analyzeProcurementThreshold(procurementType, Number(amount) || 0);
  }, [procurementType, amount]);

  // Derived recommendation based on special condition, category, amount, and threshold analysis
  const finalRecommendation = useMemo(() => {
    // 1. Emergency Procurement
    if (specialCondition === 'emergency') {
      return {
        methodId: 'emergency',
        methodName: 'विशेष परिस्थितिमा खरिद (Emergency Procurement)',
        legalBasis: 'सार्वजनिक खरिद ऐन दफा ६६, नियमावली नियम १४५',
        summary: 'प्राकृतिक विपद्, महामारी वा आकस्मिक संकट आइपरेमा तत्काल हानि नोक्सानी रोक्न प्रतिस्पर्धा गराई वा एउटा मात्र व्यवसायीसँग लिखित दरभाउ लिई वार्ताबाट खरिद गर्न सकिन्छ।',
        authority: 'कार्यालय प्रमुख (१ तह माथिको अधिकारीलाई तुरुन्त विस्तृत जानकारी गराउनुपर्ने)',
        noticeDays: 'तत्काल / आवश्यकता अनुसार छोटो समय',
        bidSecurityText: 'आवश्यक नपर्ने',
        performanceSecurityText: 'परिस्थिति अनुसार कार्यालय प्रमुखको निर्णय बमोजिम',
        caution: '१० लाख भन्दा बढी रकमको खरिद गरेमा सार्वजनिक सूचना प्रकाशन गरी PPMO मा अनिवार्य जानकारी पठाउनुपर्छ (नियम १४५(३))। खरिदको अभिलेख सुरक्षित राख्नुपर्छ।',
        nextSteps: [
          {
            stepNum: 1,
            title: 'संकट र तत्काल आवश्यकता पहिचान:',
            description: 'प्राकृतिक विपद् वा आकस्मिक संकट आइपरेको यकिन गरी थप हानि नोक्सानी रोक्न आवश्यक मालसामान, काम वा सेवाको परिमाण तत्काल यकिन गर्ने (ऐन दफा ६६)।',
          },
          {
            stepNum: 2,
            title: 'कार्यालय प्रमुखको निर्णय र माथिल्लो निकायमा जानकारी:',
            description: 'विशेष परिस्थिति खुलाई खरिद गर्ने निर्णय गर्ने र १ तह माथिको अधिकारीलाई तुरुन्त विस्तृत जानकारी पठाउने (नियम १४५)।',
          },
          {
            stepNum: 3,
            title: 'दरभाउ वार्ता र तत्काल कार्यादेश:',
            description: 'उपलब्ध फर्म वा व्यवसायीसँग लिखित दरभाउ लिई वार्ताबाट दर निश्चित गरी तुरुन्त कार्यादेश दिई कार्य/आपूर्ति सुरु गराउने।',
          },
          {
            stepNum: 4,
            title: 'सार्वजनिक सूचना र PPMO मा जानकारी:',
            description: '१० लाख भन्दा बढीको खरिद भए सार्वजनिक सूचना प्रकाशन गरी PPMO मा विवरण पठाउने र सम्झौता तथा भुक्तानी फरफारक गर्ने।',
          },
        ],
        templates: [
          { id: 'tmpl-direct-purchase-order', label: 'आपतकालीन खरिद माग तथा खरिद आदेश ढाँचा', isPrimary: true },
          { id: 'tmpl-contract-agreement', label: 'खरिद सम्झौताको ढाँचा' },
        ],
      };
    }

    // 2. Single Source / Proprietary
    if (specialCondition === 'single-source') {
      return {
        methodId: 'single-source',
        methodName: 'एक मात्र आपूर्तिकर्ता/प्रोप्राइट्री खरिद (Single Source / Proprietary)',
        legalBasis: 'सार्वजनिक खरिद ऐन दफा ४१(१)(ग, घ), नियम ८५(३, ५)',
        summary: 'वस्तु आपूर्ति गर्ने अधिकार एउटा मात्र आपूर्तिकर्तासँग भएको वा जडित मेशिनरीको पाटपूर्जा साविककै आपूर्तिकर्ताबाट मात्र लिनुपर्ने प्रमाणित भएमा सोझै खरिद गर्न सकिन्छ।',
        authority: 'कार्यालय प्रमुख (प्रोप्राइट्री मालसामान भए साविक सम्झौताको ३०% मूल्य सम्म, १ तह माथिको सहमति)',
        noticeDays: 'सूचना आवश्यक नपर्ने',
        bidSecurityText: 'आवश्यक नपर्ने',
        performanceSecurityText: `सम्झौता रकमको ५% (${formatNepaliCurrency(analysis.minimumPerformanceSecurity)})`,
        caution: 'उद्योगको उत्पादन लागत अस्वाभाविक देखिएमा अनुगमन कार्यालयले परीक्षण गरी कालोसूचीमा राख्न सक्नेछ। प्राविधिक समितिबाट प्रोप्राइट्री भएको प्रमाणित हुनुपर्छ।',
        nextSteps: [
          {
            stepNum: 1,
            title: 'प्रोप्राइट्री प्राविधिक पुष्टीकरण:',
            description: 'नेपालभित्र अर्को कुनै विकल्प नरहेको र साविककै उत्पादक वा अधिकृत विक्रेताबाट मात्र काम चल्ने प्राविधिक समितिबाट प्रमाणित गराउने (ऐन दफा ४१)।',
          },
          {
            stepNum: 2,
            title: 'लागत अनुमान र विधि स्वीकृति:',
            description: 'साविक खरिद मूल्य, विदेशी मुद्रा विनिमय दर र बजार दर विश्लेषण गरी लागत अनुमान स्वीकृत गराउने।',
          },
          {
            stepNum: 3,
            title: 'एकल आपूर्तिकर्तासँग लिखित वार्ता:',
            description: 'आधिकारिक उत्पादक वा एकल विक्रेतासँग दररेट, वारेन्टी र डेलिभरी सर्तहरूमा औपचारिक वार्ता गर्ने।',
          },
          {
            stepNum: 4,
            title: 'खरिद आदेश/सम्झौता, दाखिला र भुक्तानी:',
            description: 'वार्ता निष्कर्ष अनुसार सम्झौता वा खरिद आदेश दिई सामान प्राप्त भएपछि प्राविधिक जाँचपास प्रतिवेदनका आधारमा भुक्तानी गर्ने।',
          },
        ],
        templates: [
          { id: 'tmpl-direct-purchase-order', label: 'एकल स्रोत खरिद आदेश तथा दरभाउ ढाँचा', isPrimary: true },
          { id: 'tmpl-contract-agreement', label: 'एकल स्रोत खरिद सम्झौता ढाँचा' },
        ],
      };
    }

    // 3. Catalog Shopping (Goods)
    if (specialCondition === 'heavy-vehicle' && procurementType === 'goods') {
      return {
        methodId: 'catalog-shopping',
        methodName: 'उत्पादक/अधिकृत विक्रेता दरमा खरिद (क्याटलग सपिङ - Catalog Shopping)',
        legalBasis: 'सार्वजनिक खरिद ऐन दफा ८(१)(८), नियमावली नियम ३१ख',
        summary: 'सवारी साधन, हेभी इक्विपमेन्ट, एक्सरे वा स्वास्थ्य उपकरणको उत्पादकले ब्रोसर वा वेबसाइटमा सार्वजनिक गरेको दररेटमा छुट र सुविधामा प्रतिस्पर्धा गराई खरिद गर्ने।',
        authority: analysis.approvingAuthorityCostEstimate,
        noticeDays: 'कम्तीमा ७ दिन देखि बढीमा १५ दिनको लिखित सूचना',
        bidSecurityText: 'आवश्यक नपर्ने (नियम ३१ख(२))',
        performanceSecurityText: `सम्झौता रकमको ५% (${formatNepaliCurrency(analysis.minimumPerformanceSecurity)})`,
        caution: 'बोलपत्र जमानत आवश्यक पर्दैन (नियम ३१ख(२)); बहुवर्षीय ठेक्कामा यो विधि प्रयोग गर्न पाइँदैन। उत्पादकको सूचीकृत दररेट भन्दा बढी दर कबोल गर्न पाइँदैन।',
        nextSteps: [
          {
            stepNum: 1,
            title: 'प्राविधिक स्पेसिफिकेसन र ब्रोसर दर संकलन:',
            description: 'सवारी साधन वा हेभी उपकरणको स्पेसिफिकेसन तयार गरी आधिकारिक उत्पादकले वेबसाइट वा ब्रोसरमा सार्वजनिक गरेको दररेट संकलन गर्ने (नियम ३१ख)।',
          },
          {
            stepNum: 2,
            title: 'लागत अनुमान र विधि स्वीकृति:',
            description: 'उत्पादकको दररेट अनुसार लागत अनुमान तयार गरी अधिकार प्राप्त अधिकारीबाट क्याटलग सपिङ विधि स्वीकृत गराउने।',
          },
          {
            stepNum: 3,
            title: 'अधिकृत विक्रेताहरूलाई लिखित सूचना (७-१५ दिन):',
            description: 'नेपालस्थित आधिकारिक विक्रेताहरूलाई अधिकतम छुट, वारेन्टी र सुविधामा प्रतिस्पर्धा गर्न कम्तीमा ७ देखि १५ दिनको लिखित सूचना दिने।',
          },
          {
            stepNum: 4,
            title: 'मूल्याङ्कन, खरिद सम्झौता र आपूर्ति:',
            description: 'सबैभन्दा बढी छुट र सुविधा दिने अधिकृत विक्रेता छनोट गरी ५% कार्यसम्पादन जमानत लिई सम्झौता गर्ने र सामान आपूर्ति लिने।',
          },
        ],
        templates: [
          { id: 'tmpl-direct-purchase-order', label: 'क्याटलग सपिङ प्रस्ताव माग तथा खरिद आदेश ढाँचा', isPrimary: true },
          { id: 'tmpl-contract-agreement', label: 'सवारी/उपकरण आपूर्ति सम्झौता ढाँचा' },
        ],
      };
    }

    // 4. User Committee (Works <= 1 Crore)
    if (specialCondition === 'user-committee' && procurementType === 'works' && amount <= 10000000) {
      return {
        methodId: 'user-committee',
        methodName: 'उपभोक्ता समितिबाट निर्माण कार्य (User Committee)',
        legalBasis: 'सार्वजनिक खरिद ऐन दफा ४४, नियमावली नियम ९७',
        summary: 'स्थानीय बासिन्दा प्रत्यक्ष लाभग्राही हुने र जटिल प्रविधि नचाहिने रु १ करोड सम्मको निर्माण कार्य। जनसहभागिता र श्रममूलक प्रविधि अनिवार्य।',
        authority: 'स्थानीय तह वा सार्वजनिक निकायको प्रमुख',
        noticeDays: 'कम्तीमा ७ दिनको सूचना / आम भेला',
        bidSecurityText: 'आवश्यक नपर्ने (नियम ९७)',
        performanceSecurityText: 'आवश्यक नपर्ने (अन्तिम बिल भुक्तानीबाट ५% मर्मत सम्भार धरौटी कट्टी)',
        caution: 'डोजर, एक्साभेटर जस्ता हेभी मेसिन प्रयोग गर्न र ठेकेदारलाई काम सुम्पन सख्त प्रतिबन्ध छ। समिति पदाधिकारीमा सरकारी वा राजनीतिक पदमा रहेका व्यक्ति रहन पाउँदैनन्।',
        nextSteps: [
          {
            stepNum: 1,
            title: 'लाभग्राही आमभेला र उपभोक्ता समिति गठन:',
            description: 'प्रत्यक्ष लाभग्राही समुदायको आमभेला बोलाई कम्तीमा ३३% महिला सहितको उपभोक्ता समिति र छुट्टै अनुगमन समिति गठन गरी स्थानीय निकायमा दर्ता गर्ने (नियम ९७)।',
          },
          {
            stepNum: 2,
            title: 'प्राविधिक लागत अनुमान र श्रमदान अंश स्वीकृति:',
            description: 'प्राविधिकबाट कार्यस्थलको नापजाँच गरी लागत अनुमान तयार गर्ने। जनसहभागिता/श्रमदान अंश कटाएर बाँकी सरकारी अनुदान रकम स्वीकृत गराउने।',
          },
          {
            stepNum: 3,
            title: 'खरिद सम्झौता र किस्ताबन्दी पेश्की निकासा:',
            description: 'उपभोक्ता समितिसँग तोकिएको ढाँचामा सम्झौता गर्ने। कार्यतालिका र भौतिक प्रगति अनुसार बढीमा ३ किस्तामा रकम निकासा गर्ने।',
          },
          {
            stepNum: 4,
            title: 'सार्वजनिक परीक्षण (Public Audit), प्रतिवेदन र फरफारक:',
            description: 'कार्यस्थलमा नागरिक सूचना पाटी राख्ने, काम सम्पन्न भएपछि सार्वजनिक परीक्षण सम्पन्न गरी अनुगमन समितिको प्रतिवेदन सहित फरफारक गर्ने।',
          },
        ],
        templates: [
          { id: 'tmpl-user-committee-agreement', label: 'उपभोक्ता समिति योजना सम्झौता ढाँचा', isPrimary: true },
          { id: 'tmpl-site-board', label: 'कार्यस्थल नागरिक सूचना पाटी ढाँचा (अनुसूची-८)' },
        ],
      };
    }

    // 5. Standard Goods Procurement
    if (procurementType === 'goods') {
      if (amount <= 1500000) {
        // Direct Purchase Goods
        return {
          methodId: 'direct-procurement',
          methodName: 'सोझै खरिद (Direct Purchase - Goods)',
          legalBasis: 'सार्वजनिक खरिद ऐन दफा ४१(१)(क), नियमावली नियम ८५(१)(क)',
          summary: 'रु १५ लाख सम्मको मालसामान मौजुदा सूचीमा रहेका कम्तीमा ३ वटा आपूर्तिकर्ताबाट दरभाउ माग गरी सोझै खरिद गर्न सकिन्छ।',
          authority: analysis.approvingAuthorityCostEstimate,
          noticeDays: 'सूचना आवश्यक नपर्ने (मौजुदा सूचीका ३ आपूर्तिकर्ताबाट दरभाउ माग)',
          bidSecurityText: 'आवश्यक नपर्ने (नियम ८५)',
          performanceSecurityText: 'सोझै खरिदमा सामान्यतया नपर्ने / खरिद आदेशका सर्त बमोजिम',
          caution: 'एकै आपूर्तिकर्ताबाट एक आर्थिक वर्षमा तोकिएको सीमा (रु १५ लाख सम्म) भन्दा बढी सोझै खरिद गर्न पाइँदैन। प्रतिस्पर्धा छल्न खरिदलाई टुक्रा-टुक्रा पार्न सख्त निषेध छ (ऐन दफा ८(२))। मौजुदा सूचीका कम्तीमा ३ वटा आधिकारिक फर्मबाट दरभाउ लिई दर विश्लेषण गर्नुपर्छ।',
          nextSteps: [
            {
              stepNum: 1,
              title: 'माग फाराम, स्पेसिफिकेसन र बजेट सुनिश्चितता:',
              description: 'माग फाराम (Requisition) स्वीकृत गराउने, आवश्यक मालसामानको प्राविधिक स्पेसिफिकेसन र गुणस्तर मापदण्ड तयार गरी बजेट उपशीर्षक सुनिश्चित गर्ने (ऐन दफा ४ र ५)।',
            },
            {
              stepNum: 2,
              title: 'लागत अनुमान र खरिद विधि स्वीकृति:',
              description: 'बजार दररेट, साविकको खरिद दर वा आधिकारिक मूल्यसूचीका आधारमा मालसामानको लागत अनुमान तयार गरी अधिकार प्राप्त अधिकारीबाट सोझै खरिद गर्ने निर्णय/स्वीकृति गराउने (नियम १४ र नियम ८५)।',
            },
            {
              stepNum: 3,
              title: 'मौजुदा सूचीबाट दरभाउ माग र दर विश्लेषण:',
              description: 'कार्यालयको मौजुदा सूची (Standing List) मा रहेका कम्तीमा ३ वटा आधिकारिक विक्रेता/फर्मबाट लिखित वा सिलबन्दी दरभाउ माग गरी तुलनात्मक दर विश्लेषण गर्ने (नियम ८५(१)(क))।',
            },
            {
              stepNum: 4,
              title: 'खरिद आदेश, गुणस्तर परीक्षण (दाखिला) र भुक्तानी:',
              description: 'न्यूनतम दररेट पेस गर्ने फर्मलाई स्वीकृत स्पेसिफिकेसन अनुसारको खरिद आदेश (Purchase Order) दिने। सामान प्राप्त भएपछि दाखिला प्रतिवेदन (Goods Receipt) तयार गरी भुक्तानी दिने।',
            },
          ],
          templates: [
            { id: 'tmpl-direct-purchase-order', label: 'सोझै खरिदको माग, दरभाउ माग र खरिद आदेश ढाँचा', isPrimary: true },
            { id: 'tmpl-contract-agreement', label: 'खरिद सम्झौताको ढाँचा' },
          ],
        };
      }

      if (amount <= 2000000) {
        // Sealed Quotation Goods
        return {
          methodId: 'sealed-quotation',
          methodName: 'सिलबन्दी दरभाउपत्र (Sealed Quotation - Goods)',
          legalBasis: 'सार्वजनिक खरिद ऐन दफा ४०, नियमावली नियम ८४',
          summary: 'रु २० लाख सम्मको मालसामान खरिदमा कम्तीमा ७ दिनको सूचना दिई सिलबन्दी दरभाउपत्र आह्वान गर्नुपर्छ।',
          authority: analysis.approvingAuthorityCostEstimate,
          noticeDays: 'कम्तीमा ७ दिन',
          bidSecurityText: `२% देखि ३% (${formatNepaliCurrency(analysis.requiredBidSecurityRange.minAmount)} ~ ${formatNepaliCurrency(analysis.requiredBidSecurityRange.maxAmount)})`,
          performanceSecurityText: `सम्झौता रकमको ५% (${formatNepaliCurrency(analysis.minimumPerformanceSecurity)})`,
          caution: 'कम्तीमा ३ वटा दरभाउपत्र दर्ता हुनैपर्छ। ३ वटा नपरेमा म्याद थप गरी पुनः सूचना गर्नुपर्छ (नियम ८४(३क))। दरभाउपत्र फारामको दस्तुर रु १,००० (फिर्ता नहुने) र जमानत ७५ दिन मान्य हुनुपर्छ।',
          nextSteps: [
            {
              stepNum: 1,
              title: 'प्राविधिक स्पेसिफिकेसन र बजेट सुनिश्चितता:',
              description: 'मालसामानको विस्तृत स्पेसिफिकेसन र ब्रान्ड-तटस्थ मापदण्ड तयार गरी बजेट सुनिश्चित गर्ने।',
            },
            {
              stepNum: 2,
              title: 'लागत अनुमान र दरभाउपत्र कागजात स्वीकृति:',
              description: 'अधिकार प्राप्त अधिकारीबाट लागत अनुमान र PPMO को नमूना दरभाउपत्र कागजात स्वीकृत गराउने (नियम ८४)।',
            },
            {
              stepNum: 3,
              title: 'दरभाउपत्र आह्वान (कम्तीमा ७ दिन):',
              description: 'राष्ट्रिय वा स्थानीय पत्रिका, सूचना पाटी वा e-GP पोर्टलमा कम्तीमा ७ दिनको म्याद दिई सिलबन्दी दरभाउपत्र आह्वान गर्ने।',
            },
            {
              stepNum: 4,
              title: 'मूल्याङ्कन, खरिद आदेश/सम्झौता र आपूर्ति:',
              description: 'दर्ता भएका दरभाउपत्र खोली न्यूनतम मूल्याङ्कित प्रभावग्राही दरभाउदातालाई ७ दिनभित्र कार्यसम्पादन जमानत लिई खरिद आदेश वा सम्झौता गर्ने।',
            },
          ],
          templates: [
            { id: 'tmpl-sq-notice', label: 'सिलबन्दी दरभाउपत्र आह्वानको सूचना ढाँचा', isPrimary: true },
            { id: 'tmpl-contract-agreement', label: 'दरभाउपत्र खरिद सम्झौता ढाँचा' },
          ],
        };
      }

      // ICB Goods (when selected as international or large imported goods)
      if (specialCondition === 'icb-international' && procurementType === 'goods') {
        return {
          methodId: 'icb-goods',
          methodName: 'अन्तर्राष्ट्रिय खुला बोलपत्र (ICB Goods - मालसामान खरिद)',
          legalBasis: 'सार्वजनिक खरिद ऐन दफा १५, नियमावली नियम ३१ङ, नियम ३९ र PPMO ICB SBD',
          summary: 'नेपालभित्र पर्याप्त प्रतिस्पर्धा नहुने, विदेशी मुद्रामा भुक्तानी गर्नुपर्ने वा विदेशबाट पैठारी गर्नुपर्ने जटिल मालसामान खरिदमा अंग्रेजी भाषामा कम्तीमा ३० दिनको म्याद दिई ICB खुला बोलपत्र आह्वान गर्नुपर्छ।',
          authority: analysis.approvingAuthorityCostEstimate,
          noticeDays: 'कम्तीमा ३० दिन (पुनः आह्वानमा कम्तीमा १५ दिन - नियम ३१ङ(१))',
          bidSecurityText: `२% देखि ३% (${formatNepaliCurrency(analysis.requiredBidSecurityRange.minAmount)} ~ ${formatNepaliCurrency(analysis.requiredBidSecurityRange.maxAmount)}) (विदेशी बैंकको भए नेपालको 'क' वर्ग बैंक काउन्टर ग्यारेन्टी)`,
          performanceSecurityText: `सम्झौता रकमको ५% (${formatNepaliCurrency(analysis.minimumPerformanceSecurity)})`,
          caution: 'स्थानीय एजेन्ट भए ऐन दफा १४(९, १०) र नियम ३९ अनुसार एजेन्टको नाम, कमिसन, भुक्तानी मुद्रा, सर्त र PAN अनिवार्य खुलाउनुपर्छ। Incoterms 2020 सर्त (जस्तै CIP काठमाडौँ/प्रोजेक्ट साइट) स्पष्ट तोक्नुपर्छ।',
          nextSteps: [
            {
              stepNum: 1,
              title: 'आवश्यकता पहिचान, तटस्थ स्पेसिफिकेसन र Incoterms योजना:',
              description: 'मालसामानको ब्रान्ड-तटस्थ प्राविधिक स्पेसिफिकेसन, विदेशी मुद्रा/बजेट सुनिश्चितता र Incoterms (CIP/DAP) छनोट गर्ने (ऐन दफा ४ र ५)।',
            },
            {
              stepNum: 2,
              title: 'लागत अनुमान, विदेशी मुद्रा विनिमय र Goods ICB SBD स्वीकृति:',
              description: 'अन्तर्राष्ट्रिय बजार दर, ढुवानी, भन्सार र कर विश्लेषण गरी लागत अनुमान र PPMO को मानक ICB SBD कागजात स्वीकृत गराउने (नियम १४)।',
            },
            {
              stepNum: 3,
              title: 'e-GP पोर्टलमा अंग्रेजीमा बोलपत्र आह्वान (कम्तीमा ३० दिन):',
              description: 'PPMO को e-GP प्रणाली र राष्ट्रिय दैनिकमा अंग्रेजी भाषामा कम्तीमा ३० दिनको म्याद दिई अन्तर्राष्ट्रिय बोलपत्र आह्वान गर्ने (नियम ३१ङ)। Pre-bid बैठक सञ्चालन गर्ने।',
            },
            {
              stepNum: 4,
              title: 'बोलपत्र खोल्ने, १५-चरणको प्राविधिक तथा आर्थिक मूल्याङ्कन:',
              description: 'स्थानीय एजेन्ट घोषणा, विदेशी बैंक काउन्टर ग्यारेन्टी, प्राविधिक कम्प्लायन्स र Incoterms अनुसार मुद्रा रूपान्तरण गरी न्यूनतम मूल्याङ्कित प्रभावग्राही बोलपत्र छनोट गर्ने।',
            },
            {
              stepNum: 5,
              title: 'आशयको सूचना (LOI - ७ दिन), उजुरी म्याद र सम्झौता (१५ दिन):',
              description: 'छनोट भएको बोलपत्रदातालाई ७ दिनको LOI दिने (ऐन दफा २७(२))। पुनरावलोकन उजुरी नपरेमा १५ दिनभित्र कार्यसम्पादन जमानत लिई सम्झौता सम्पन्न गर्ने (दफा ५२(४))।',
            },
            {
              stepNum: 6,
              title: 'सम्झौता कार्यान्वयन, प्रतितपत्र (L/C) र आपूर्ति अनुगमन:',
              description: 'नेपाल राष्ट्र बैंकको नियम अनुसार Irrevocable L/C खोल्ने, उत्पादन तथा ढुवानी ट्र्याकिङ गर्ने, र पूर्व-ढुवानी वा आगमन पश्चात् प्राविधिक परीक्षण गर्ने।',
            },
            {
              stepNum: 7,
              title: 'दाखिला प्रतिवेदन, भुक्तानी फरफारक र सम्झौता सम्पन्न:',
              description: 'स्वीकृति प्रमाणपत्र (Acceptance Certificate), भन्सार कागजात र बिल अनुसार भुक्तानी फरफारक गर्ने, वारेन्टी व्यवस्थापन र धरौटी फिर्ता गर्ने।',
            },
          ],
          templates: [
            { id: 'tmpl-ifb-ncb', label: 'अन्तर्राष्ट्रिय बोलपत्र आह्वान सूचना ढाँचा (e-GP / English)', isPrimary: true },
            { id: 'tmpl-contract-agreement', label: 'ICB आपूर्ति सम्झौता ढाँचा (GCC/SCC)' },
          ],
        };
      }

      // NCB Goods (> 20 Lakhs)
      return {
        methodId: 'ncb-goods',
        methodName: 'राष्ट्रिय स्तरको खुला बोलपत्र (NCB Goods)',
        legalBasis: 'सार्वजनिक खरिद ऐन दफा ११, नियमावली नियम ३१, ३१ज',
        summary: 'रु २० लाख भन्दा माथिको मालसामान खरिदमा स्वदेशी आपूर्तिकर्ता बीच प्रतिस्पर्धा गराउन २१ दिनको राष्ट्रिय सूचना दिई खुला बोलपत्र आह्वान गरिन्छ (विदेशी बोलपत्रदाता आवश्यक परे ३० दिनको ICB गर्नुपर्छ)।',
        authority: analysis.approvingAuthorityCostEstimate,
        noticeDays: `कम्तीमा ${analysis.minimumNoticeDays} दिन (राष्ट्रिय खुला)`,
        bidSecurityText: `२% देखि ३% (${formatNepaliCurrency(analysis.requiredBidSecurityRange.minAmount)} ~ ${formatNepaliCurrency(analysis.requiredBidSecurityRange.maxAmount)})`,
        performanceSecurityText: `सम्झौता रकमको ५% (${formatNepaliCurrency(analysis.minimumPerformanceSecurity)})`,
        caution: "प्राविधिक स्पेसिफिकेसनमा कुनै खास ब्रान्ड, ट्रेडमार्क वा उत्पादक उल्लेख गर्न पाइँदैन ('वा सो सरह' अनिवार्य)। स्वदेशी मालसामानलाई १५% सम्म मूल्य प्राथमिकता दिन सकिन्छ (ऐन दफा ११)।",
        nextSteps: [
          {
            stepNum: 1,
            title: 'स्पेसिफिकेसन, डेलिभरी तालिका र बजेट सुनिश्चितता:',
            description: 'मालसामानको तटस्थ प्राविधिक स्पेसिफिकेसन, निरीक्षण विधि, आपूर्ति तालिका र बजेट सुनिश्चित गर्ने (ऐन दफा ४ र ५)।',
          },
          {
            stepNum: 2,
            title: 'लागत अनुमान र SBD Goods कागजात स्वीकृति:',
            description: 'बजार दर विश्लेषणका आधारमा लागत अनुमान र PPMO को स्वीकृत नमूना बोलपत्र कागजात स्वीकृत गराउने (नियम १४)।',
          },
          {
            stepNum: 3,
            title: 'e-GP पोर्टलमा बोलपत्र आह्वान (कम्तीमा २१ दिन):',
            description: 'PPMO को e-GP प्रणाली मार्फत राष्ट्रिय बोलपत्रमा कम्तीमा २१ दिन (पुनः आह्वान भए १५ दिन) को म्याद दिई राष्ट्रिय दैनिक पत्रिकामा बोलपत्र आह्वानको सूचना प्रकाशन गर्ने (नियम ३१ङ)।',
          },
          {
            stepNum: 4,
            title: 'प्राविधिक/आर्थिक मूल्याङ्कन, LOI र सम्झौता:',
            description: 'स्पेसिफिकेसन अनुपालन जाँच गरी न्यूनतम मूल्याङ्कित बोलपत्रदातालाई ७ दिनको LOI दिने, उजुरी नपरे कार्यसम्पादन जमानत लिई १५ दिनभित्र सम्झौता गर्ने (दफा २७(२) र ५२(४))।',
          },
        ],
        templates: [
          { id: 'tmpl-ifb-ncb', label: 'बोलपत्र आह्वानको सूचना ढाँचा (e-GP / राष्ट्रिय दैनिक)', isPrimary: true },
          { id: 'tmpl-contract-agreement', label: 'सार्वजनिक खरिद सम्झौताको ढाँचा' },
        ],
      };
    }

    // 6. Standard Works Procurement
    if (procurementType === 'works') {
      if (amount <= 1500000) {
        // Direct Purchase Works
        return {
          methodId: 'direct-procurement',
          methodName: 'सोझै खरिद (Direct Purchase - Works)',
          legalBasis: 'सार्वजनिक खरिद ऐन दफा ४१(१)(क), नियम ८५(१)(क)',
          summary: 'रु १५ लाख सम्मको साना निर्माण वा मर्मत कार्य मौजुदा सूचीका कम्तीमा ३ वटा निर्माण व्यवसायीबाट दरभाउ लिई सोझै गराउन सकिन्छ।',
          authority: analysis.approvingAuthorityCostEstimate,
          noticeDays: 'सूचना आवश्यक नपर्ने (मौजुदा सूचीका ३ व्यवसायीबाट दरभाउ माग)',
          bidSecurityText: 'आवश्यक नपर्ने (नियम ८५)',
          performanceSecurityText: 'सोझै खरिदमा सामान्यतया नपर्ने / कार्यादेश अनुसार',
          caution: 'एक आर्थिक वर्षमा एउटै निर्माण व्यवसायीबाट नियम ८५ को सीमा भन्दा बढी काम लिन पाइँदैन। कामलाई टुक्रा-टुक्रा पारी सोझै खरिद गर्न सख्त निषेध छ।',
          nextSteps: [
            {
              stepNum: 1,
              title: 'पूर्वतयारी, नापजाँच र बजेट सुनिश्चितता:',
              description: 'निर्माणस्थलको अवस्था यकिन गर्ने, कुनै विवाद नरहेको सुनिश्चित गर्ने र सम्बन्धित बजेट उपशीर्षकमा रकम सुनिश्चित गर्ने।',
            },
            {
              stepNum: 2,
              title: 'लागत अनुमान, ड्रइङ र खरिद विधि स्वीकृति:',
              description: 'जिल्ला दररेट र सरकारी नर्म्स अनुसार प्राविधिकबाट लागत अनुमान तयार गरी अधिकार प्राप्त अधिकारीबाट सोझै खरिद विधि स्वीकृत गराउने।',
            },
            {
              stepNum: 3,
              title: 'मौजुदा सूचीका निर्माण व्यवसायीबाट दरभाउ माग:',
              description: 'कार्यालयमा सूचीकृत कम्तीमा ३ वटा स्थानीय निर्माण व्यवसायीबाट दरभाउ माग गरी तुलनात्मक दर विश्लेषण गर्ने।',
            },
            {
              stepNum: 4,
              title: 'कार्यादेश, कार्यसम्पादन र नापी किताब अनुसार भुक्तानी:',
              description: 'सबैभन्दा कम दर कबोल गर्ने व्यवसायीलाई कार्यादेश (Work Order) जारी गर्ने। काम सम्पन्न भएपछि नापी किताब र कार्यसम्पन्न प्रतिवेदन अनुसार भुक्तानी दिने।',
            },
          ],
          templates: [
            { id: 'tmpl-direct-purchase-order', label: 'सोझै निर्माण कार्यादेश तथा दरभाउ माग ढाँचा', isPrimary: true },
            { id: 'tmpl-contract-agreement', label: 'निर्माण खरिद सम्झौता ढाँचा' },
          ],
        };
      }

      if (amount <= 2000000) {
        // Sealed Quotation Works
        return {
          methodId: 'sealed-quotation',
          methodName: 'सिलबन्दी दरभाउपत्र (Sealed Quotation - Works)',
          legalBasis: 'सार्वजनिक खरिद ऐन दफा ४०, नियमावली नियम ८४',
          summary: 'रु २० लाख सम्मको निर्माण कार्यमा कम्तीमा ७ दिनको सूचना दिई सिलबन्दी दरभाउपत्र आह्वान गर्नुपर्छ।',
          authority: analysis.approvingAuthorityCostEstimate,
          noticeDays: 'कम्तीमा ७ दिन',
          bidSecurityText: `२% देखि ३% (${formatNepaliCurrency(analysis.requiredBidSecurityRange.minAmount)} ~ ${formatNepaliCurrency(analysis.requiredBidSecurityRange.maxAmount)})`,
          performanceSecurityText: `सम्झौता रकमको ५% (${formatNepaliCurrency(analysis.minimumPerformanceSecurity)})`,
          caution: 'कम्तीमा ३ वटा दरभाउपत्र दर्ता हुनैपर्छ (नियम ८४(३क))। दरभाउ जमानत ७५ दिन मान्य हुनुपर्छ।',
          nextSteps: [
            {
              stepNum: 1,
              title: 'पूर्वतयारी, डिजाइन र बजेट सुनिश्चितता:',
              description: 'निर्माणस्थलको उपलब्धता, ड्रइङ, डिजाइन, BOQ र बजेट सुनिश्चित गर्ने।',
            },
            {
              stepNum: 2,
              title: 'लागत अनुमान र SQ कागजात स्वीकृति:',
              description: 'सरकारी नर्म्स अनुसार लागत अनुमान र PPMO को नमूना दरभाउपत्र कागजात स्वीकृत गराउने।',
            },
            {
              stepNum: 3,
              title: 'दरभाउपत्र आह्वान (कम्तीमा ७ दिन):',
              description: 'राष्ट्रिय वा स्थानीय पत्रिका, सूचना पाटी वा e-GP पोर्टलमा कम्तीमा ७ दिनको म्याद दिई दरभाउपत्र आह्वान गर्ने।',
            },
            {
              stepNum: 4,
              title: 'मूल्याङ्कन, सम्झौता र कार्यादेश:',
              description: 'दरभाउपत्र मूल्याङ्कन गरी न्यूनतम मूल्याङ्कित प्रभावग्राही व्यवसायीलाई ७ दिनभित्र कार्यसम्पादन जमानत लिई सम्झौता गर्ने।',
            },
          ],
          templates: [
            { id: 'tmpl-sq-notice', label: 'सिलबन्दी दरभाउपत्र आह्वानको सूचना ढाँचा', isPrimary: true },
            { id: 'tmpl-contract-agreement', label: 'निर्माण सम्झौताको ढाँचा' },
          ],
        };
      }

      if (amount <= 20000000) {
        // Single Stage 1-Envelope NCB Works
        return {
          methodId: 'ncb-works',
          methodName: 'एक खाम खुला बोलपत्र (Single Stage NCB Works)',
          legalBasis: 'सार्वजनिक खरिद ऐन दफा ११(४), नियम ३१क',
          summary: 'रु २ करोड सम्मको निर्माण कार्यमा योग्यता मापदण्ड नचाहिने भए १ खाम प्रणालीबाट २१ दिनको सूचनामा खुला बोलपत्र आह्वान गर्नुपर्छ।',
          authority: analysis.approvingAuthorityCostEstimate,
          noticeDays: 'कम्तीमा २१ दिन',
          bidSecurityText: `२% देखि ३% (${formatNepaliCurrency(analysis.requiredBidSecurityRange.minAmount)} ~ ${formatNepaliCurrency(analysis.requiredBidSecurityRange.maxAmount)})`,
          performanceSecurityText: `सम्झौता रकमको ५% (${formatNepaliCurrency(analysis.minimumPerformanceSecurity)})`,
          caution: 'लागत अनुमान भन्दा ३०% भन्दा बढी घटेर आउने बोलपत्र स्वतः खारेज हुनेछ। ५ वटा भन्दा बढी चालू ठेक्का भएका व्यवसायी सहभागी हुन पाउँदैनन्।',
          nextSteps: [
            {
              stepNum: 1,
              title: 'पूर्वतयारी, साइट उपलब्धता र वातावरणीय स्वीकृति:',
              description: 'साइट उपलब्धता, रुख कटान सहमति, जग्गा प्राप्ति र वातावरणीय प्रतिवेदन स्वीकृत भएको सुनिश्चित गर्ने (ऐन दफा ४क)।',
            },
            {
              stepNum: 2,
              title: 'लागत अनुमान र १ खाम बोलपत्र कागजात स्वीकृति:',
              description: 'जिल्ला दररेट र सरकारी नर्म्स अनुसार दर विश्लेषण गरी लागत अनुमान र १ खाम बोलपत्र कागजात स्वीकृत गराउने (नियम १४ र ३१क)।',
            },
            {
              stepNum: 3,
              title: 'e-GP पोर्टलमा बोलपत्र आह्वान (कम्तीमा २१ दिन):',
              description: 'PPMO को e-GP प्रणाली मार्फत कम्तीमा २१ दिनको म्याद दिई राष्ट्रिय दैनिकमा सूचना प्रकाशन गर्ने।',
            },
            {
              stepNum: 4,
              title: 'मूल्याङ्कन, LOI र सम्झौता:',
              description: '३०% भन्दा घटेको बोलपत्र खारेज गरी औसत कबोल अङ्कको नजिकको सारभूत बोलपत्र छनोट गर्ने, ७ दिनको LOI दिएर १५ दिनभित्र सम्झौता सम्पन्न गर्ने।',
            },
          ],
          templates: [
            { id: 'tmpl-ifb-ncb', label: 'बोलपत्र आह्वानको सूचना ढाँचा (e-GP / राष्ट्रिय दैनिक)', isPrimary: true },
            { id: 'tmpl-contract-agreement', label: 'सार्वजनिक खरिद सम्झौताको ढाँचा' },
          ],
        };
      }

      // ICB Works (> 5 Arba or special international bidding)
      if (amount > 5000000000 || specialCondition === 'icb-international') {
        return {
          methodId: 'icb-works',
          methodName: 'अन्तर्राष्ट्रिय स्तरको खुला बोलपत्र (ICB Works - निर्माण कार्य)',
          legalBasis: 'सार्वजनिक खरिद ऐन दफा १५, नियमावली नियम ३१ङ, PPMO ICB Works SBD',
          summary: 'रु ५ अर्ब भन्दा माथिको निर्माण कार्यमा विदेशी निर्माण व्यवसायी समेत प्रतिस्पर्धा गर्न पाउने गरी अंग्रेजी भाषामा e-GP पोर्टल तथा राष्ट्रिय दैनिकमा कम्तीमा ३० दिनको म्याद दिई अन्तर्राष्ट्रिय खुला बोलपत्र आह्वान गर्नुपर्छ।',
          authority: analysis.approvingAuthorityCostEstimate,
          noticeDays: 'कम्तीमा ३० दिन (पुनः आह्वान भए १५ दिन - नियम ३१ङ(१))',
          bidSecurityText: `२% देखि ३% (${formatNepaliCurrency(analysis.requiredBidSecurityRange.minAmount)} ~ ${formatNepaliCurrency(analysis.requiredBidSecurityRange.maxAmount)})`,
          performanceSecurityText: `सम्झौता रकमको ५% (${formatNepaliCurrency(analysis.minimumPerformanceSecurity)}) (विदेशी बैंक भए नेपालको 'क' वर्ग बैंक काउन्टर ग्यारेन्टी)`,
          caution: 'स्वदेशी निर्माण व्यवसायीलाई १०% सम्म घरेलु प्राथमिकता (Domestic Preference) दिन सकिने व्यवस्था SBD मा खुलाउनुपर्छ (ऐन दफा ११)। विदेशी व्यवसायीको स्थानीय एजेन्ट भए ऐन दफा १४(९, १०) र नियम ३९ अनुसार कमिसन र सर्त अनिवार्य खुलाउनुपर्छ। FIDIC आधारित GCC/SCC सर्त लागू हुन्छन्।',
          nextSteps: [
            {
              stepNum: 1,
              title: 'विस्तृत इन्जिनियरिङ डिजाइन, वातावरणीय स्वीकृति र पूर्वतयारी:',
              description: 'जग्गा प्राप्ति, रुख कटान, EIA प्रतिवेदन र बजेट सुनिश्चितता प्रमाणित गर्ने (ऐन दफा ४ र ४क)।',
            },
            {
              stepNum: 2,
              title: 'लागत अनुमान, विदेशी विनिमय र Works ICB SBD कागजात स्वीकृति:',
              description: 'PPMO को मानक ICB Works (FIDIC आधारित) बोलपत्र कागजात, योग्यता मापदण्ड र मूल्याङ्कन विधि मन्त्रालय/विभागबाट स्वीकृत गराउने।',
            },
            {
              stepNum: 3,
              title: 'e-GP प्रणालीमा अंग्रेजीमा अन्तर्राष्ट्रिय बोलपत्र आह्वान (कम्तीमा ३० दिन):',
              description: 'e-GP पोर्टल र राष्ट्रिय दैनिकमा कम्तीमा ३० दिनको म्याद दिई अंग्रेजी भाषामा बोलपत्र आह्वान गर्ने (नियम ३१ङ)। Pre-bid बैठक अनिवार्य सञ्चालन गर्ने।',
            },
            {
              stepNum: 4,
              title: 'प्राविधिक प्रस्ताव मूल्याङ्कन, आर्थिक प्रस्ताव र योग्यता परीक्षण:',
              description: 'दुई खाम प्रणाली अनुसार पहिले प्राविधिक प्रस्ताव खोली मूल्याङ्कन गर्ने, योग्य ठहरिएकाको मात्र आर्थिक प्रस्ताव खोली न्यूनतम मूल्याङ्कित प्रभावग्राही बोलपत्र छनोट गर्ने।',
            },
            {
              stepNum: 5,
              title: 'आशयको सूचना (LOI - ७ दिन), उजुरी म्याद र सम्झौता हस्ताक्षर:',
              description: 'सफल बोलपत्रदातालाई ७ दिनको LOI दिने। उजुरी नपरेमा १५ दिनभित्र कार्यसम्पादन जमानत लिई FIDIC सम्झौतामा हस्ताक्षर गर्ने (दफा २७ र ५२)।',
            },
            {
              stepNum: 6,
              title: 'साइट हस्तान्तरण, इन्जिनियर नियुक्ति र निर्माण अनुगमन:',
              description: 'साइट हस्तान्तरण गर्ने, परामर्शदाता/इन्जिनियर परिचालन गर्ने, र गुणस्तर परीक्षण (IPC) अनुसार प्रगति अनुगमन गर्ने।',
            },
            {
              stepNum: 7,
              title: 'Taking-Over Certificate, DLP, वारेन्टी र अन्तिम भुक्तानी:',
              description: 'कार्य सम्पन्न भएपछि Taking-Over Certificate जारी गर्ने, १ वर्षको Defect Liability Period पश्चात् Performance Security फुकुवा र अन्तिम फरफारक गर्ने।',
            },
          ],
          templates: [
            { id: 'tmpl-ifb-ncb', label: 'अन्तर्राष्ट्रिय निर्माण बोलपत्र सूचना ढाँचा (e-GP / English)', isPrimary: true },
            { id: 'tmpl-contract-agreement', label: 'ICB निर्माण सम्झौता ढाँचा (FIDIC)' },
          ],
        };
      }

      // Two-Envelope NCB Works (> 2 Crore)
      return {
        methodId: 'two-envelope',
        methodName: 'दुई खाम प्रणाली खुला बोलपत्र (Two-Envelope NCB Works)',
        legalBasis: 'सार्वजनिक खरिद ऐन दफा ११(५), नियम ३१ज, ३१ङ',
        summary: 'रु २ करोड माथिका निर्माण कार्यमा प्राविधिक र आर्थिक प्रस्ताव छुट्टै खाममा माग गरी २ खाम प्रणाली अवलम्बन गर्नुपर्छ। रु ५ अर्ब सम्म स्वदेशी व्यवसायी बीच मात्र प्रतिस्पर्धा।',
        authority: analysis.approvingAuthorityCostEstimate,
        noticeDays: `कम्तीमा ${analysis.minimumNoticeDays} दिन`,
        bidSecurityText: `२% देखि ३% (${formatNepaliCurrency(analysis.requiredBidSecurityRange.minAmount)} ~ ${formatNepaliCurrency(analysis.requiredBidSecurityRange.maxAmount)})`,
        performanceSecurityText: `सम्झौता रकमको ५% (${formatNepaliCurrency(analysis.minimumPerformanceSecurity)}) (८५% भन्दा घटी कबोल गरे थप धरौटी)`,
        caution: 'रु २ करोड माथिको निर्माण भएकाले अनिवार्य दुई खाम प्रणाली अवलम्बन गर्नुपर्छ। लागत अनुमान भन्दा ३०% भन्दा बढी घटेर आउने बोलपत्र स्वतः खारेज हुनेछ। ५ वटा भन्दा बढी चालू ठेक्का भएका व्यवसायी अयोग्य हुनेछन्।',
        nextSteps: [
          {
            stepNum: 1,
            title: 'पूर्वतयारी, साइट उपलब्धता र अनिवार्य वातावरणीय प्रतिवेदन:',
            description: 'निर्माणस्थलको जग्गा प्राप्ति, वातावरणीय अध्ययन (IEE/EIA) स्वीकृत भएको र बजेट सुनिश्चित भएको प्रमाणीकरण गर्ने (ऐन दफा ४क)।',
          },
          {
            stepNum: 2,
            title: 'लागत अनुमान र दुई खाम बोलपत्र कागजात स्वीकृति:',
            description: 'प्राविधिक योग्यता मापदण्ड (Turnover, Experience, Equipment) सहितको लागत अनुमान र २ खाम बोलपत्र कागजात स्वीकृत गराउने (नियम ३१ज)।',
          },
          {
            stepNum: 3,
            title: 'e-GP पोर्टलमा बोलपत्र आह्वान (कम्तीमा २१ दिन):',
            description: 'राष्ट्रिय दैनिक र e-GP प्रणालीमा प्राविधिक र आर्थिक प्रस्ताव छुट्टाछुट्टै खाममा पेस गर्ने गरी सूचना आह्वान गर्ने।',
          },
          {
            stepNum: 4,
            title: 'प्राविधिक प्रस्ताव मूल्याङ्कन, आर्थिक प्रस्ताव खोल्ने, LOI र सम्झौता:',
            description: 'पहिले प्राविधिक प्रस्ताव मूल्याङ्कन गरी योग्य बोलपत्रदाताको मात्र आर्थिक प्रस्ताव सार्वजनिक रूपमा खोल्ने, ७ दिनको LOI दिई सम्झौता गर्ने।',
          },
        ],
        templates: [
          { id: 'tmpl-ifb-ncb', label: 'बोलपत्र आह्वानको सूचना ढाँचा (दुई खाम प्रणाली)', isPrimary: true },
          { id: 'tmpl-contract-agreement', label: 'सार्वजनिक खरिद सम्झौताको ढाँचा' },
        ],
      };
    }

    // 7. Consulting Services
    if (procurementType === 'consulting') {
      if (amount <= 500000) {
        // Direct Consulting
        return {
          methodId: 'direct-procurement',
          methodName: 'सोझै परामर्श सेवा खरिद (Direct Consulting)',
          legalBasis: 'सार्वजनिक खरिद ऐन दफा ४१, नियमावली नियम ८२(१)',
          summary: 'रु ५ लाख सम्मको तालिम, गोष्ठी वा परामर्श सेवा कार्यालय प्रमुखले सोझै वार्ता गरी खरिद गर्न सक्ने।',
          authority: analysis.approvingAuthorityCostEstimate,
          noticeDays: 'सूचना आवश्यक नपर्ने (सोझै वार्ता)',
          bidSecurityText: 'आवश्यक नपर्ने (ऐन दफा ३०)',
          performanceSecurityText: `सम्झौता रकमको ५% (${formatNepaliCurrency(analysis.minimumPerformanceSecurity)})`,
          caution: 'परामर्शदाताको कार्यक्षेत्रगत सर्त (TOR) र योग्यता अनिवार्य यकिन गर्नुपर्छ। एउटै व्यक्ति वा संस्थाबाट वर्षमा ५ लाख भन्दा बढी सोझै लिन पाइँदैन।',
          nextSteps: [
            {
              stepNum: 1,
              title: 'कार्यक्षेत्रगत सर्त (TOR) र बजेट सुनिश्चितता:',
              description: 'अध्ययन, तालिम वा गोष्ठीको संक्षिप्त TOR, समयावधि र बजेट सुनिश्चित गर्ने।',
            },
            {
              stepNum: 2,
              title: 'लागत अनुमान र सोझै खरिद विधि स्वीकृति:',
              description: 'विज्ञको योग्यता, पारिश्रमिक दर र समयावधि यकिन गरी कार्यालय प्रमुखबाट लागत अनुमान र सोझै खरिद गर्ने निर्णय गराउने (नियम ८२(१))।',
            },
            {
              stepNum: 3,
              title: 'योग्य विज्ञ/परामर्शदातासँग वार्ता र कार्य प्रस्ताव:',
              description: 'सम्बन्धित विषयको विज्ञ व्यक्ति वा संस्थासँग लिखित कार्य प्रस्ताव र दरभाउ लिई वार्ता गर्ने।',
            },
            {
              stepNum: 4,
              title: 'कार्यादेश, कार्यसम्पादन र प्रतिवेदन स्वीकृति पश्चात भुक्तानी:',
              description: 'विज्ञलाई कार्यादेश दिने। तोकिएको समयावधिभित्र अन्तिम प्रतिवेदन वा कार्य सम्पन्न भएको प्रमाणीकरण गरी भुक्तानी दिने।',
            },
          ],
          templates: [
            { id: 'tmpl-direct-purchase-order', label: 'सोझै परामर्श सेवा कार्यादेश तथा माग ढाँचा', isPrimary: true },
            { id: 'tmpl-contract-agreement', label: 'परामर्श सेवा सम्झौता ढाँचा' },
          ],
        };
      }

      // EOI / RFP Consulting (> 5 Lakhs)
      return {
        methodId: 'rfp-consulting',
        methodName: 'प्रतिस्पर्धात्मक परामर्श सेवा (EOI & RFP Consulting)',
        legalBasis: 'सार्वजनिक खरिद ऐन दफा २९-३८, नियमावली नियम ६८-७८',
        summary: 'रु ५ लाख माथिका परामर्श सेवामा कम्तीमा १५ दिनको सूचना दिई EOI आह्वान गरी संक्षिप्त सूची तयार गर्ने र RFP माग गरी छनोट गर्ने।',
        authority: analysis.approvingAuthorityCostEstimate,
        noticeDays: 'EOI १५ दिन / RFP कम्तीमा २१ देखि ३० दिन',
        bidSecurityText: 'आवश्यक नपर्ने (ऐन दफा ३०)',
        performanceSecurityText: `सम्झौता रकमको ५% (${formatNepaliCurrency(analysis.minimumPerformanceSecurity)})`,
        caution: 'गुणस्तर तथा लागत विधि (QCBS) मा प्राविधिक प्रस्तावलाई कम्तीमा ७०-८०% भार र आर्थिक प्रस्तावलाई २०-३०% भार दिनुपर्छ। प्राविधिकमा अनुत्तीर्णको आर्थिक प्रस्ताव खोल्न पाइँदैन।',
        nextSteps: [
          {
            stepNum: 1,
            title: 'कार्यक्षेत्रगत सर्त (TOR), जनशक्ति र लागत अनुमान स्वीकृति:',
            description: 'परामर्श सेवाको विस्तृत कार्यक्षेत्र (TOR), आवश्यक जनशक्ति (Man-months) र बजार दर अनुसार लागत अनुमान स्वीकृत गराउने।',
          },
          {
            stepNum: 2,
            title: 'आशयपत्र आह्वान (EOI - कम्तीमा १५ दिन):',
            description: 'योग्यताका आधारमा ३ देखि ६ वटा परामर्शदाताको संक्षिप्त सूची (Shortlist) तयार गर्न कम्तीमा १५ दिनको सूचना दिई EOI आह्वान गर्ने (नियम ६९)।',
          },
          {
            stepNum: 3,
            title: 'प्रस्ताव माग (RFP - कम्तीमा २१ वा ३० दिन):',
            description: 'संक्षिप्त सूचीमा परेका परामर्शदाताहरूबाट प्राविधिक र आर्थिक प्रस्ताव छुट्टाछुट्टै खाममा माग गर्ने (नियम ७०)।',
          },
          {
            stepNum: 4,
            title: 'गुणस्तर र लागत मूल्याङ्कन (QCBS), वार्ता र सम्झौता:',
            description: 'प्राविधिक प्रस्तावमा न्यूनतम उत्तीर्ण अङ्क प्राप्त गर्नेको आर्थिक प्रस्ताव खोली संयुक्त मूल्याङ्कनमा पहिलो हुने फर्मसँग वार्ता गरी सम्झौता गर्ने।',
          },
        ],
        templates: [
          { id: 'tmpl-eoi-notice', label: 'परामर्श सेवा EOI आशयपत्र आह्वान ढाँचा', isPrimary: true },
          { id: 'tmpl-contract-agreement', label: 'परामर्श सेवा सम्झौता ढाँचा' },
        ],
      };
    }

    // 8. Other Non-Consulting Services
    if (amount <= 1500000) {
      // Direct Services
      return {
        methodId: 'direct-procurement',
        methodName: 'सोझै सेवा खरिद (Direct Services / Rent)',
        legalBasis: 'सार्वजनिक खरिद ऐन दफा ४१, नियमावली नियम ८५',
        summary: 'रु १५ लाख सम्मको सवारी भाडा, ढुवानी वा अन्य सेवा मौजुदा सूचीका ३ सेवा प्रदायकबाट दरभाउ लिई सोझै खरिद गर्न सकिने।',
        authority: analysis.approvingAuthorityCostEstimate,
        noticeDays: 'सूचना आवश्यक नपर्ने (मौजुदा सूचीबाट दरभाउ माग)',
        bidSecurityText: 'आवश्यक नपर्ने',
        performanceSecurityText: 'सेवा आदेश वा सम्झौता अनुसार',
        caution: 'श्रम ऐनले तोकेको न्यूनतम पारिश्रमिक भन्दा कम दरमा सम्झौता गर्न पाइँदैन। सेवा टुक्रा पारी सोझै खरिद गर्न निषेध छ।',
        nextSteps: [
          {
            stepNum: 1,
            title: 'सेवाको विवरण, जनशक्ति र बजेट सुनिश्चितता:',
            description: 'सवारी वा घरजग्गा भाडा, ढुवानी वा सरसफाइको आवश्यकता र सेवा सर्तहरू यकिन गरी बजेट सुनिश्चित गर्ने।',
          },
          {
            stepNum: 2,
            title: 'लागत अनुमान र खरिद विधि स्वीकृति:',
            description: 'सरकारी दररेट र बजार दर विश्लेषण गरी लागत अनुमान र सोझै खरिद विधि स्वीकृत गराउने।',
          },
          {
            stepNum: 3,
            title: 'मौजुदा सूचीबाट दरभाउ माग र दर विश्लेषण:',
            description: 'सूचीकृत कम्तीमा ३ वटा सेवा प्रदायकबाट दरभाउ माग गरी तुलनात्मक दर विश्लेषण गर्ने।',
          },
          {
            stepNum: 4,
            title: 'सम्झौता, कार्यादेश र मासिक भुक्तानी:',
            description: 'न्यूनतम मूल्याङ्कन गरिएको सेवा प्रदायकसँग सम्झौता गरी सेवा सम्पन्न भएको प्रमाणीकरणका आधारमा भुक्तानी दिने।',
          },
        ],
        templates: [
          { id: 'tmpl-rent-service-agreement', label: 'घरजग्गा भाडा तथा बाह्य सेवा करार सम्झौता ढाँचा', isPrimary: true },
          { id: 'tmpl-direct-purchase-order', label: 'सोझै सेवा खरिद आदेश ढाँचा' },
        ],
      };
    }

    // Competitive Services (> 15 Lakhs)
    const isSqServices = amount <= 2000000;
    return {
      methodId: isSqServices ? 'sealed-quotation' : 'ncb-goods',
      methodName: isSqServices ? 'सिलबन्दी दरभाउपत्र (Sealed Quotation - Services)' : 'खुला बोलपत्र (Open Bidding - Services)',
      legalBasis: isSqServices ? 'सार्वजनिक खरिद ऐन दफा ४०, नियमावली नियम ८४' : 'सार्वजनिक खरिद ऐन दफा ११, नियमावली नियम ३१',
      summary: isSqServices ? 'रु २० लाख सम्मको सेवा खरिदमा ७ दिनको सूचना दिई सिलबन्दी दरभाउपत्र आह्वान गर्नुपर्छ।' : 'रु २० लाख माथिको सेवा खरिदमा २१ दिनको राष्ट्रिय सूचना दिई खुला बोलपत्र आह्वान गर्नुपर्छ।',
      authority: analysis.approvingAuthorityCostEstimate,
      noticeDays: isSqServices ? 'कम्तीमा ७ दिन' : `कम्तीमा ${analysis.minimumNoticeDays} दिन`,
      bidSecurityText: `२% देखि ३% (${formatNepaliCurrency(analysis.requiredBidSecurityRange.minAmount)} ~ ${formatNepaliCurrency(analysis.requiredBidSecurityRange.maxAmount)})`,
      performanceSecurityText: `सम्झौता रकमको ५% (${formatNepaliCurrency(analysis.minimumPerformanceSecurity)})`,
      caution: 'श्रम ऐन, २०७४ र योगदानमा आधारित सामाजिक सुरक्षा कोष सम्बन्धी कानूनको पूर्ण परिपालना भएको सुनिश्चित गर्नुपर्छ। जनशक्ति आपूर्तिको हकमा इजाजतपत्र प्राप्त संस्था हुनुपर्छ।',
      nextSteps: [
        {
          stepNum: 1,
          title: 'सेवाको कार्यक्षेत्र, जनशक्ति संख्या र बजेट सुनिश्चितता:',
          description: 'सेवाको विस्तृत विवरण (Scope of Services), कामदार संख्या, न्यूनतम पारिश्रमिक र बजेट सुनिश्चित गर्ने।',
        },
        {
          stepNum: 2,
          title: 'लागत अनुमान र सेवा कागजात स्वीकृति:',
          description: 'सरकारी दररेट र श्रम ऐन अनुसार लागत अनुमान र सेवा कागजात स्वीकृत गराउने।',
        },
        {
          stepNum: 3,
          title: isSqServices ? 'दरभाउपत्र आह्वान (कम्तीमा ७ दिन):' : 'e-GP पोर्टलमा बोलपत्र आह्वान (कम्तीमा २१ दिन):',
          description: isSqServices ? 'पत्रिका वा e-GP प्रणाली मार्फत ७ दिनको म्याद दिई दरभाउपत्र आह्वान गर्ने।' : 'राष्ट्रिय दैनिक र e-GP प्रणाली मार्फत २१ दिनको म्याद दिई खुला बोलपत्र आह्वान गर्ने।',
        },
        {
          stepNum: 4,
          title: 'मूल्याङ्कन, कार्यसम्पादन जमानत र सम्झौता:',
          description: 'न्यूनतम मूल्याङ्कन गरिएको सेवा प्रदायकसँग ५% जमानत लिई सम्झौता गर्ने र मासिक कार्यसम्पादनका आधारमा भुक्तानी दिने।',
        },
      ],
      templates: [
        { id: 'tmpl-rent-service-agreement', label: 'सेवा करार सम्झौता ढाँचा', isPrimary: true },
        { id: isSqServices ? 'tmpl-sq-notice' : 'tmpl-ifb-ncb', label: isSqServices ? 'दरभाउपत्र आह्वान सूचना ढाँचा' : 'बोलपत्र आह्वानको सूचना ढाँचा' },
      ],
    };
  }, [specialCondition, procurementType, amount, analysis]);

  const handleReset = () => {
    setStep(1);
    setProcurementType('works');
    setAmount(3500000);
    setSpecialCondition('normal');
    try {
      localStorage.removeItem('advisor_step');
      localStorage.removeItem('advisor_procurement_type');
      localStorage.removeItem('advisor_amount');
      localStorage.removeItem('advisor_special_condition');
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>सजिलो खरिद सल्लाहकार (Procurement Decision Assistant)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            "मलाई के खरिद गर्नु छ?" - ३ चरणमा उपयुक्त कानूनी जानकारी
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            कामको प्रकार, बजेट र अवस्था प्रविष्ट गरी कानून सम्मत खरिद विधि, स्वीकृति गर्ने अधिकारी, सूचना म्याद, धरौटी र आवश्यक कागजातको जानकारी लिनुहोस्।
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>सुरुबाट रोज्नुहोस्</span>
        </button>
      </div>

      {/* Stepper Navigation */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
            step === 1
              ? 'bg-blue-700 text-white font-bold shadow-xs'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold hover:bg-emerald-100'
          }`}
        >
          १. खरिदको प्रकार
        </button>
        <button
          type="button"
          onClick={() => setStep(2)}
          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
            step === 2
              ? 'bg-blue-700 text-white font-bold shadow-xs'
              : step > 2
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold hover:bg-emerald-100'
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          २. बजेट र अवस्था
        </button>
        <button
          type="button"
          onClick={() => setStep(3)}
          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
            step === 3
              ? 'bg-blue-700 text-white font-bold shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          ३. सिफारिस र कार्ययोजना
        </button>
      </div>

      {/* Step 1: Select Type */}
      {step === 1 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5 text-left">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              चरण १: तपाईं कुन प्रकृतिको खरिद गर्दै हुनुहुन्छ?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              खरिद कानून अनुसार प्रत्येक प्रकृतिको लागि फरक कानूनी कार्यविधि र सीमा तोकिएको छ।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              onClick={() => { setProcurementType('works'); setStep(2); }}
              className="p-5 rounded-xl border border-slate-200 hover:border-red-500 hover:bg-red-50/20 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900 group-hover:text-red-700">
                  निर्माण कार्य (Works)
                </span>
                <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">
                  सडक, भवन, पुल, कुलो
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                नयाँ संरचना निर्माण, पुनर्निर्माण, मर्मत सम्भार वा जिर्णोद्धार। यसमा सामग्री जडान र आनुषङ्गिक कामहरू समेत पर्छन्।
              </p>
            </button>

            <button
              onClick={() => { setProcurementType('goods'); setStep(2); }}
              className="p-5 rounded-xl border border-slate-200 hover:border-red-500 hover:bg-red-50/20 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900 group-hover:text-red-700">
                  मालसामान आपूर्ति (Goods)
                </span>
                <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">
                  गाडी, उपकरण, औषधि
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                चल वा अचल, सजीव वा निर्जीव वस्तुहरू—जस्तै कार्यालय मसलन्द, फर्निचर, गाडी, स्वास्थ्य उपकरण, पाइप, औषधि आदि।
              </p>
            </button>

            <button
              onClick={() => { setProcurementType('consulting'); setStep(2); }}
              className="p-5 rounded-xl border border-slate-200 hover:border-red-500 hover:bg-red-50/20 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900 group-hover:text-red-700">
                  परामर्श सेवा (Consulting)
                </span>
                <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">
                  DPR, सर्भे, सफ्टवेयर
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                अध्ययन, अनुसन्धान, सम्भाव्यता अध्ययन, विस्तृत इन्जिनियरिङ डिजाइन, सुपरभिजन तथा सफ्टवेयर निर्माण जस्ता बौद्धिक सेवाहरू।
              </p>
            </button>

            <button
              onClick={() => { setProcurementType('services'); setStep(2); }}
              className="p-5 rounded-xl border border-slate-200 hover:border-red-500 hover:bg-red-50/20 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900 group-hover:text-red-700">
                  अन्य गैर-परामर्श सेवा (Other Services)
                </span>
                <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">
                  सुरक्षा, सरसफाइ, ढुवानी
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                सवारी वा उपकरण भाडा, ढुवानी, सरसफाइ सेवा, सुरक्षा गार्ड, मर्मत सम्भार र हवाई टिकट लगायतका भौतिक सेवाहरू।
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Amount & Special Conditions */}
      {step === 2 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 text-left">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                चरण २: अनुमानित बजेट रकम र विशेष अवस्था
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                प्रकार: <span className="font-semibold text-slate-800">{procurementType === 'works' ? 'निर्माण कार्य' : procurementType === 'goods' ? 'मालसामान' : procurementType === 'consulting' ? 'परामर्श सेवा' : 'अन्य सेवा'}</span>
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-600 hover:text-red-700 font-medium"
            >
              ← प्रकार बदल्नुहोस्
            </button>
          </div>

          {/* Amount Input & Presets */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              अनुमानित लागत रकम (रु.):
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                रु.
              </span>
              <input
                type="number"
                min={1000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-lg font-bold font-mono text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-600 focus:outline-hidden"
              />
            </div>
            <div className="text-xs font-semibold text-red-800">
              {formatNepaliCurrency(Number(amount) || 0)}
            </div>

            {/* Quick buttons */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] text-slate-500 mr-1">द्रुत सीमा:</span>
              {budgetPresets.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setAmount(b.value)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors ${
                    amount === b.value
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Special conditions selector */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              के कुनै विशेष परिस्थिति वा सर्त छ?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${specialCondition === 'normal' ? 'bg-red-50/50 border-red-500 ring-1 ring-red-500/20' : 'bg-slate-50 border-slate-200'}`}>
                <input
                  type="radio"
                  name="condition"
                  value="normal"
                  checked={specialCondition === 'normal'}
                  onChange={() => setSpecialCondition('normal')}
                  className="mt-0.5 text-red-600"
                />
                <div>
                  <span className="font-bold text-slate-900 block">सामान्य नियमित खरिद (Normal)</span>
                  <span className="text-[11px] text-slate-500">कानून बमोजिमको खुला वा नियमित विधि</span>
                </div>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${specialCondition === 'emergency' ? 'bg-red-50/50 border-red-500 ring-1 ring-red-500/20' : 'bg-slate-50 border-slate-200'}`}>
                <input
                  type="radio"
                  name="condition"
                  value="emergency"
                  checked={specialCondition === 'emergency'}
                  onChange={() => setSpecialCondition('emergency')}
                  className="mt-0.5 text-red-600"
                />
                <div>
                  <span className="font-bold text-slate-900 block">आपतकालीन वा विपद् (Emergency)</span>
                  <span className="text-[11px] text-slate-500">बाढी, पहिरो, महामारी वा विशेष परिस्थिति (दफा ६६)</span>
                </div>
              </label>

              {procurementType === 'goods' && (
                <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${specialCondition === 'heavy-vehicle' ? 'bg-red-50/50 border-red-500 ring-1 ring-red-500/20' : 'bg-slate-50 border-slate-200'}`}>
                  <input
                    type="radio"
                    name="condition"
                    value="heavy-vehicle"
                    checked={specialCondition === 'heavy-vehicle'}
                    onChange={() => setSpecialCondition('heavy-vehicle')}
                    className="mt-0.5 text-red-600"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">सवारी साधन वा हेभी मेसिनरी</span>
                    <span className="text-[11px] text-slate-500">उत्पादकको क्याटलग सपिङ गर्न मिल्ने (नियम ३१ख)</span>
                  </div>
                </label>
              )}

              {procurementType === 'works' && amount <= 10000000 && (
                <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${specialCondition === 'user-committee' ? 'bg-red-50/50 border-red-500 ring-1 ring-red-500/20' : 'bg-slate-50 border-slate-200'}`}>
                  <input
                    type="radio"
                    name="condition"
                    value="user-committee"
                    checked={specialCondition === 'user-committee'}
                    onChange={() => setSpecialCondition('user-committee')}
                    className="mt-0.5 text-red-600"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">स्थानीय उपभोक्ता समितिबाट गराउनुपर्ने</span>
                    <span className="text-[11px] text-slate-500">लाभग्राही जनसहभागितामूलक काम (दफा ४४)</span>
                  </div>
                </label>
              )}

              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${specialCondition === 'single-source' ? 'bg-red-50/50 border-red-500 ring-1 ring-red-500/20' : 'bg-slate-50 border-slate-200'}`}>
                <input
                  type="radio"
                  name="condition"
                  value="single-source"
                  checked={specialCondition === 'single-source'}
                  onChange={() => setSpecialCondition('single-source')}
                  className="mt-0.5 text-red-600"
                />
                <div>
                  <span className="font-bold text-slate-900 block">एक मात्र उत्पादक / प्रोप्राइट्री पाटपूर्जा</span>
                  <span className="text-[11px] text-slate-500">नेपालमा अर्को विकल्प नभएको प्रमाणित वस्तु (दफा ४१)</span>
                </div>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${specialCondition === 'icb-international' ? 'bg-red-50/50 border-red-500 ring-1 ring-red-500/20' : 'bg-slate-50 border-slate-200'}`}>
                <input
                  type="radio"
                  name="condition"
                  value="icb-international"
                  checked={specialCondition === 'icb-international'}
                  onChange={() => setSpecialCondition('icb-international')}
                  className="mt-0.5 text-red-600"
                />
                <div>
                  <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                    <span>अन्तर्राष्ट्रिय बोलपत्र (ICB / Foreign Bidding)</span>
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                  </span>
                  <span className="text-[11px] text-slate-500">विदेशी मुद्रा, Incoterms, वा आयात गर्नुपर्ने मालसामान/निर्माण (दफा १५, नियम ३१ङ)</span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-xs flex items-center gap-2 transition-colors"
            >
              <span>कार्ययोजना हेर्नुहोस्</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Comprehensive Tailored Roadmap & Output */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden text-left space-y-6">
          {/* Recommendation Banner */}
          <div className="p-6 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-red-400 font-semibold mb-1">
                <span>तपाईंका लागि सिफारिस गरिएको खरिद विधि</span>
                <span>·</span>
                <span className="font-mono text-slate-300">{finalRecommendation.legalBasis}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {finalRecommendation.methodName}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {finalRecommendation.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setStep(2)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors"
              >
                ← परिमार्जन गर्नुहोस्
              </button>
            </div>
          </div>

          {/* Key Parameters Cards */}
          <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-0.5">लागत अनुमान स्वीकृतिकर्ता:</span>
              <span className="font-bold text-slate-900 text-sm block">{finalRecommendation.authority}</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-0.5">सूचना म्याद:</span>
              <span className="font-bold text-slate-900 text-sm block">{finalRecommendation.noticeDays}</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-0.5">बोलपत्र/दरभाउ जमानत:</span>
              <span className="font-bold text-slate-900 text-sm block font-mono">
                {finalRecommendation.bidSecurityText}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-0.5">कार्यसम्पादन जमानत:</span>
              <span className="font-bold text-slate-900 text-sm block font-mono">
                {finalRecommendation.performanceSecurityText}
              </span>
            </div>
          </div>

          {/* Warning / Caution Callout */}
          <div className="mx-6 p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">सावधानी तथा अनिवार्य शर्तहरू:</span>
              <p className="leading-relaxed">{finalRecommendation.caution}</p>
            </div>
          </div>

          {/* Actionable Steps Roadmap */}
          <div className="px-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600" />
              <span>अब तपाईंले चाल्नुपर्ने चरणबद्ध कदमहरू (Next Steps):</span>
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm">
              {finalRecommendation.nextSteps.map((s) => (
                <div key={s.stepNum} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {s.stepNum}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block">{s.title}</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated ICB Hub Banner if ICB or foreign bidding */}
          {onNavigateToIcb && (finalRecommendation.methodId.startsWith('icb-') || specialCondition === 'icb-international' || procurementType === 'goods') && (
            <div className="mx-6 p-4 rounded-xl bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm border border-blue-800/60">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-bold uppercase tracking-wider">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>अन्तर्राष्ट्रिय बोलपत्र (ICB) विशेष मोड्युल</span>
                </div>
                <h5 className="text-sm font-bold text-white mt-1">
                  ७-चरणको विस्तृत ICB Workflow, Incoterms 2020 र Local Agent पोर्टल
                </h5>
                <p className="text-xs text-blue-100/80 mt-0.5 max-w-2xl leading-relaxed">
                  सार्वजनिक खरिद ऐन दफा १४/१५, नियम ३१ङ/३९, SBD Goods ICB अनुसार १५-चरणको मूल्याङ्कन, स्थानीय एजेन्टका कानुनी दायित्व तथा ११ वटा Incoterms।
                </p>
              </div>
              <button
                type="button"
                onClick={onNavigateToIcb}
                className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold rounded-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
              >
                <span>ICB मोड्युल खोल्नुहोस्</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Action Links to Templates & Checklists */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-900 font-bold block">यस प्रक्रियाका लागि आवश्यक नमूना कागजात तथा सम्झौता ढाँचा:</span>
              <span className="text-slate-500 text-[11px] block">छनोट गरिएको विधि र बजेट अनुसार उपयुक्त नमूना ढाँचा खोल्नुहोस्</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {onNavigateToTemplate && finalRecommendation.templates.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => onNavigateToTemplate(tmpl.id)}
                  className={`px-3.5 py-2 font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs ${
                    tmpl.isPrimary
                      ? 'bg-blue-700 hover:bg-blue-800 text-white'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300'
                  }`}
                  title={`${tmpl.label} खोल्नुहोस्`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{tmpl.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
