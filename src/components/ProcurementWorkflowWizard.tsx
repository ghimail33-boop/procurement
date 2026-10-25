import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Circle, 
  Printer, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Scale, 
  ArrowRight, 
  RotateCcw,
  Building,
  Check,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PROCUREMENT_METHODS } from '../data/procurementData';
import { formatNepaliCurrency } from '../utils/procurementUtils';

export interface WorkflowPreset {
  id: string;
  title: string;
  methodName: string;
  defaultAmount: number;
  category: 'works' | 'goods' | 'services' | 'user-committee';
  shortDesc: string;
}

export const WORKFLOW_PRESETS: WorkflowPreset[] = [
  {
    id: 'ncb-works-3cr',
    title: 'रु ३ करोडको भवन निर्माण (NCB Works - राष्ट्रिय खुला बोलपत्र)',
    methodName: 'राष्ट्रिय खुला बोलपत्र (एकल चरण दुई खाम)',
    defaultAmount: 30000000,
    category: 'works',
    shortDesc: '२ करोड देखि ५ अर्ब सम्मको निर्माण कार्य, प्राविधिक र आर्थिक प्रस्ताव छुट्टाछुट्टै खोल्ने विधि।',
  },
  {
    id: 'ncb-goods-50l',
    title: 'रु ५० लाखको सवारी साधन / यन्त्र खरिद (NCB Goods)',
    methodName: 'राष्ट्रिय खुला बोलपत्र (एक खाम विधि)',
    defaultAmount: 5000000,
    category: 'goods',
    shortDesc: '२० लाख भन्दा माथिको मालसामान आपूर्ति, २१ वा ३० दिने राष्ट्रिय बोलपत्र।',
  },
  {
    id: 'sq-works-18l',
    title: 'रु १८ लाखको सडक मर्मत तथा स्तरोन्नति (Sealed Quotation)',
    methodName: 'सिलबन्दी दरभाउपत्र (SQ)',
    defaultAmount: 1800000,
    category: 'works',
    shortDesc: '२० लाख सम्मको निर्माण वा मालसामान खरिद, ७ वा १५ दिने सूचना।',
  },
  {
    id: 'user-committee-80l',
    title: 'रु ८० लाखको खानेपानी तथा सिँचाइ योजना (उपभोक्ता समिति)',
    methodName: 'उपभोक्ता समिति वा लाभग्राही समुदाय',
    defaultAmount: 8000000,
    category: 'user-committee',
    shortDesc: '१ करोड सम्मको श्रममूलक कार्य, हेभी मेशिनरी प्रयोग पूर्ण रूपमा निषेध।',
  },
  {
    id: 'consulting-qcbs-60l',
    title: 'रु ६० लाखको विस्तृत इन्जिनियरिङ अध्ययन / DPR (QCBS Consulting)',
    methodName: 'परामर्श सेवा खरिद (गुणस्तर तथा लागत विधि)',
    defaultAmount: 6000000,
    category: 'services',
    shortDesc: 'आशयपत्र (EOI) छनोट र RFP मार्फत प्राविधिक (८०%) र आर्थिक (२०%) प्रस्ताव मूल्याङ्कन।',
  },
  {
    id: 'direct-purchase-12l',
    title: 'रु १२ लाखको कार्यालय फर्निचर तथा कम्प्युटर (Direct Purchase)',
    methodName: 'सोझै खरिद (Direct Purchase)',
    defaultAmount: 1200000,
    category: 'goods',
    shortDesc: '१५ लाख सम्मको मालसामान वा निर्माण कार्य, ३ वटा दरभाउ सूचीबाट खरिद।',
  },
];

interface MilestoneTask {
  id: string;
  label: string;
  clauseRef: string;
  isMandatory: boolean;
}

interface WorkflowMilestone {
  stepNo: number;
  titleNepali: string;
  titleEnglish: string;
  targetTimeline: string;
  legalBasis: string;
  tasks: MilestoneTask[];
  requiredDocs: string[];
  redFlags: string[];
  templateId?: string;
  templateLabel?: string;
}

export const MILESTONES_DATA: WorkflowMilestone[] = [
  {
    stepNo: 1,
    titleNepali: 'खरिद पूर्वतयारी, विस्तृत सर्भे तथा लागत अनुमान स्वीकृति',
    titleEnglish: 'Procurement Planning & Cost Estimate Approval',
    targetTimeline: 'खरिद प्रक्रिया सुरु गर्नुपूर्व (कम्तीमा १५-३० दिन अगावै)',
    legalBasis: 'सार्वजनिक खरिद ऐन दफा ५, नियमावली नियम ६, ७, ८, ११, १२, १४',
    tasks: [
      { id: 'm1-1', label: 'वार्षिक खरिद गुरुयोजना वा वार्षिक खरिद योजनामा समावेश भएको रुजु गर्ने', clauseRef: 'ऐन दफा ७, नियम ८', isMandatory: true },
      { id: 'm1-2', label: 'विस्तृत साइट सर्भे, माटो परीक्षण तथा स्ट्रक्चरल डिजाइन सम्पन्न गर्ने', clauseRef: 'नियम ६', isMandatory: true },
      { id: 'm1-3', label: 'सम्बन्धित मन्त्रालय/विभागको स्वीकृत नर्म्स अनुसार परिमाण (BOQ) निकाल्ने', clauseRef: 'नियम ७', isMandatory: true },
      { id: 'm1-4', label: 'जिल्ला दररेट निर्धारण समितिको चालु आ.व. को आधिकारिक दररेट प्रयोग गर्ने', clauseRef: 'नियम ११ र १२', isMandatory: true },
      { id: 'm1-5', label: 'अधिकार प्राप्त अधिकारीबाट नियम १४ बमोजिम लागत अनुमान स्वीकृत गराउने', clauseRef: 'नियम १४', isMandatory: true },
      { id: 'm1-6', label: 'प्रतिस्पर्धा छल्न खरिदलाई टुक्रा-टुक्रा (Splitting) नगरिएको सुनिश्चित गर्ने', clauseRef: 'ऐन दफा ८(२)', isMandatory: true },
    ],
    requiredDocs: [
      'विस्तृत इन्जिनियरिङ नक्सा तथा ड्रइङ',
      'दर विश्लेषण (Rate Analysis Sheet)',
      'दर परिमाण सूची (BOQ)',
      'जिल्ला दररेट निर्धारण समितिको निर्णय प्रतिलिपि',
      'बजेट उपशीर्षक तथा स्रोत सुनिश्चितता पत्र',
      'लागत अनुमान स्वीकृत टिप्पणी तथा आदेश',
    ],
    redFlags: [
      'जिल्ला दररेट बाहिर गएर बजार दर प्रयोग गर्दा सीडीओ समितिको दररेट उपलब्ध नभएको स्पष्ट प्राविधिक पुष्टि हुनुपर्छ।',
      'सार्वजनिक खरिद ऐनको दफा ८(२) विपरीत खरिदलाई टुक्रा पार्नु गम्भीर आर्थिक अनुशासन उल्लंघन र बेरुजु मानिन्छ।',
    ],
    templateId: 'tmpl-notesheet-estimate',
    templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
  },
  {
    stepNo: 2,
    titleNepali: 'मानक बोलपत्र कागजात (SBD) तयारी तथा बोलपत्र आह्वान',
    titleEnglish: 'SBD Preparation & Invitation for Bids (IFB)',
    targetTimeline: 'सूचना प्रकाशन मिति (कम्तीमा २१ वा ३० दिनको म्याद)',
    legalBasis: 'सार्वजनिक खरिद ऐन दफा १४, नियमावली नियम ४९, ६५',
    tasks: [
      { id: 'm2-1', label: 'PPMO को पछिल्लो मानक बोलपत्र कागजात (SBD) प्रयोग गरी कागजात तयार गर्ने', clauseRef: 'ऐन दफा ४(२)', isMandatory: true },
      { id: 'm2-2', label: '२ करोड माथिका निर्माण कार्यमा अनिवार्य एकल चरण दुई खाम विधि तय गर्ने', clauseRef: 'नियम ३१क', isMandatory: true },
      { id: 'm2-3', label: 'लागत अनुमानको २ देखि ३ प्रतिशतले हुन आउने बिड बन्ड (मान्य अवधि १२० दिन) निर्धारण गर्ने', clauseRef: 'ऐन दफा २१', isMandatory: true },
      { id: 'm2-4', label: 'बोलपत्र फाराम दस्तुर राजश्व खातामा जम्मा हुने गरी नियम अनुसार तोक्ने', clauseRef: 'नियम ४८', isMandatory: true },
      { id: 'm2-5', label: 'बोलपत्रदाताले ५ वटा भन्दा बढी चालू ठेक्का नरहेको स्वघोषणा माग गर्ने सर्त राख्ने', clauseRef: 'नियम ६५(४घ)', isMandatory: true },
      { id: 'm2-6', label: 'राष्ट्रिय दैनिक समाचारपत्र तथा e-GP प्रणालीमा अनिवार्य सूचना प्रकाशित गर्ने', clauseRef: 'नियम ४९', isMandatory: true },
    ],
    requiredDocs: [
      'स्वीकृत मानक बोलपत्र कागजात (SBD)',
      'बोलपत्र आह्वान गर्ने स्वीकृत टिप्पणी तथा आदेश',
      'राष्ट्रिय दैनिक समाचारपत्रमा प्रकाशित सूचनाको कटिङ',
      'e-GP पोर्टलमा प्रकाशित सूचना र बिड डकुमेन्ट लिङ्क',
    ],
    redFlags: [
      'स्थानीय पत्रिकामा मात्र सूचना निकालेर e-GP मा नराख्नु वा म्याद २१/३० दिन भन्दा घटाउनु गैरकानूनी हुन्छ।',
      'कुनै खास फर्मलाई फाइदा पुग्ने गरी प्रतिस्पर्धा सीमित गर्ने प्रतिबन्धात्मक सर्त (Restrictive Specifications) राख्न पाइँदैन (ऐन दफा ४)।',
    ],
    templateId: 'tmpl-notesheet-ifb',
    templateLabel: 'बोलपत्र आह्वान सम्बन्धी टिप्पणी तथा आदेश ढाँचा',
  },
  {
    stepNo: 3,
    titleNepali: 'प्रि-बिड बैठक, जिज्ञासा निरुपण तथा संशोधन (Addendum)',
    titleEnglish: 'Pre-Bid Meeting & Clarifications',
    targetTimeline: 'बोलपत्र पेस गर्ने अन्तिम मिति भन्दा कम्तीमा १० दिन अगावै',
    legalBasis: 'सार्वजनिक खरिद नियमावली नियम ५०, नियम ५१',
    tasks: [
      { id: 'm3-1', label: 'बोलपत्र पेस गर्ने अन्तिम म्याद भन्दा कम्तीमा १० दिन अगावै प्रि-बिड बैठक आयोजना गर्ने', clauseRef: 'नियम ५०', isMandatory: true },
      { id: 'm3-2', label: 'उपस्थित निर्माण व्यवसायीहरूको जिज्ञासा, साइट कन्डिसन र प्राविधिक सर्तमा छलफल गर्ने', clauseRef: 'नियम ५०(२)', isMandatory: true },
      { id: 'm3-3', label: 'प्रि-बिड बैठकको आधिकारिक माइन्युट (Minutes) तयार गरी हस्ताक्षर गराउने', clauseRef: 'नियम ५०(३)', isMandatory: true },
      { id: 'm3-4', label: 'कागजात संशोधन गर्नुपरेमा अन्तिम म्याद भन्दा कम्तीमा ७ दिन अगावै e-GP मा सुचना/संशोधन अपलोड गर्ने', clauseRef: 'नियम ५१', isMandatory: true },
    ],
    requiredDocs: [
      'प्रि-बिड बैठक उपस्थिति पुस्तिका तथा निर्णयको माइन्युट',
      'e-GP प्रणालीमा अपलोड गरिएको जिज्ञासा स्पष्टीकरण प्रतिवेदन',
      'बोलपत्र कागजात संशोधन सूचना (Addendum Notice)',
    ],
    redFlags: [
      'प्रि-बिड बैठक आयोजना नै नगर्नु वा १० दिनको म्याद नपुर्‍याउनुले बोलपत्र रद्द वा पुनरावलोकन समितिबाट खारेज हुने जोखिम निम्त्याउँछ।',
      'अन्तिम म्याद सकिन ७ दिनभन्दा कम समय बाँकी छँदा बोलपत्र संशोधन गरेमा अनिवार्य रूपमा बोलपत्र पेस गर्ने म्याद थप गर्नुपर्छ (नियम ५१(२))।',
    ],
  },
  {
    stepNo: 4,
    titleNepali: 'बोलपत्र दाखिला, अनलाइन खोल्ने प्रक्रिया र मुचुल्का',
    titleEnglish: 'Bid Submission, Online Opening & Minutes',
    targetTimeline: 'सूचना अनुसारको अन्तिम दिन (दिनको १२:०० बजे दाखिला बन्द, १:०० बजे खोल्ने)',
    legalBasis: 'सार्वजनिक खरिद ऐन दफा २२, नियमावली नियम ५९, नियम ६२',
    tasks: [
      { id: 'm4-1', label: 'e-GP प्रणालीमा दिनको ठीक १२:०० बजे बोलपत्र दर्ता प्रणाली स्वतः बन्द भएको रुजु गर्ने', clauseRef: 'नियम ५८', isMandatory: true },
      { id: 'm4-2', label: 'सोही दिन १:०० बजे उपस्थित बोलपत्रदाताका प्रतिनिधिहरूको रोहबरमा अनलाइन बिड खोल्ने', clauseRef: 'नियम ५९', isMandatory: true },
      { id: 'm4-3', label: 'दुई खाम प्रणाली भए प्राविधिक प्रस्ताव मात्र खोल्ने र आर्थिक प्रस्ताव सुरक्षित राख्ने', clauseRef: 'नियम ३१क', isMandatory: true },
      { id: 'm4-4', label: 'कबोल अङ्क, छुट प्रतिशत, बैंक जमानतको रकम र म्याद पढेर सुनाउने र मुचुल्का तयार गर्ने', clauseRef: 'नियम ६२', isMandatory: true },
      { id: 'm4-5', label: 'बोलपत्र खोल्दाको बखत कुनै पनि बोलपत्र स्वीकृत वा अस्वीकृत नगर्ने (नियम ५९(५))', clauseRef: 'नियम ५९(५)', isMandatory: true },
    ],
    requiredDocs: [
      'e-GP बिड ओपनिङ सारांश प्रतिवेदन (System Generated Opening Report)',
      'उपस्थिति तथा बोलपत्र खोल्ने मुचुल्का (Opening Minutes)',
      'बैंक जमानत (बिड बन्ड) को सक्कल वा अनलाइन प्रमाणित प्रति',
    ],
    redFlags: [
      'खोल्ने समयमा कुनै कागजात पुगेन वा त्रुटि देखियो भन्दै प्रारम्भिक अवस्थामै बोलपत्र बहिस्कार वा अस्वीकृत गर्न पाइँदैन। त्यो मूल्याङ्कन समितिको क्षेत्राधिकार हो।',
    ],
    templateId: 'tmpl-notesheet-opening-minutes',
    templateLabel: 'बोलपत्र खोल्ने मुचुल्का तथा प्रारम्भिक टिप्पणी ढाँचा',
  },
  {
    stepNo: 5,
    titleNepali: 'मूल्याङ्कन समितिद्वारा परीक्षण, ३०% घटी कबोल जाँच र आशयको सूचना (LOI)',
    titleEnglish: 'Bid Evaluation, 30% Cutoff & Letter of Intent (LOI)',
    targetTimeline: 'बोलपत्र खोलेको १५ देखि २१ दिनभित्र',
    legalBasis: 'सार्वजनिक खरिद ऐन दफा १५, २५, २७, नियमावली नियम ६५, ६५च, ६६',
    tasks: [
      { id: 'm5-1', label: 'ऐनको दफा १५ बमोजिम खरिद अधिकृत संयोजकत्वमा मूल्याङ्कन समिति गठन गर्ने', clauseRef: 'ऐन दफा १५', isMandatory: true },
      { id: 'm5-2', label: 'सारभूत रूपमा प्रभावग्राही (Substantially Responsive) बोलपत्रहरूको सूची तयार गर्ने', clauseRef: 'नियम ६५', isMandatory: true },
      { id: 'm5-3', label: '१६औँ संशोधन: लागत भन्दा ३०% भन्दा घटी कबोल भएको बोलपत्र स्वतः अस्वीकृत गर्ने', clauseRef: 'ऐन दफा २५(७ख), नियम ६५च', isMandatory: true },
      { id: 'm5-4', label: '१६औँ संशोधन: सिफारिस फर्मको ५ वटा चालू खरिद सम्झौता सीमा e-GP विवरण रुजु गर्ने', clauseRef: 'नियम ६५(४घ)', isMandatory: true },
      { id: 'm5-5', label: '१५% भन्दा घटेको कबोल भए ५% आधारभूत + थप ५०% अतिरिक्त कार्यसम्पादन जमानत हिसाब गर्ने', clauseRef: 'नियम ६५च', isMandatory: true },
      { id: 'm5-6', label: 'मूल्याङ्कन प्रतिवेदन स्वीकृत गरी सफल फर्मको नाममा ७ (सात) दिने आशयको सूचना (LOI) प्रकाशित गर्ने', clauseRef: 'ऐन दफा २७(२), नियम ६६', isMandatory: true },
    ],
    requiredDocs: [
      'मूल्याङ्कन समितिको पूर्ण प्रतिवेदन (Technical & Financial Evaluation Report)',
      '५ वटा चालू ठेक्का परीक्षण रुजु फाराम',
      'अतिरिक्त कार्यसम्पादन जमानत हिसाब तालिका',
      'मूल्याङ्कन प्रतिवेदन स्वीकृत गर्ने टिप्पणी तथा आदेश',
      'e-GP पोर्टल तथा कार्यालयमा प्रकाशित ७ दिने LOI सूचना',
    ],
    redFlags: [
      '३०% भन्दा बढी घटेको बोलपत्रलाई कुनै पनि बहानामा स्वीकृत गरेमा सिधै बेरुजु र अख्तियारको अनुसन्धान आकर्षित हुन्छ।',
      '७ दिने LOI सूचना प्रकाशित नगरी सिधै सम्झौता गरेमा ठेक्का बदरभागी हुन्छ र उजुरी परेमा सार्वजनिक निकाय हार्छ।',
    ],
    templateId: 'tmpl-notesheet-evaluation',
    templateLabel: 'मूल्याङ्कन प्रतिवेदन स्वीकृत तथा LOI सम्बन्धी टिप्पणी ढाँचा',
  },
  {
    stepNo: 6,
    titleNepali: 'कार्यसम्पादन जमानत दाखिला, स्वीकृति पत्र (LOA) र सम्झौता',
    titleEnglish: 'Letter of Acceptance (LOA) & Contract Agreement',
    targetTimeline: 'LOI सकिएको लगत्तै १५ दिनको म्याद दिई बोलाउने',
    legalBasis: 'सार्वजनिक खरिद ऐन दफा २७(३), दफा ५२, नियमावली नियम ६८, अनुसूची ३, ४, ८',
    tasks: [
      { id: 'm6-1', label: '७ दिने LOI अवधिमा कुनै उजुरी नपरेको निश्चित गरी १५ दिने सम्झौता आह्वान पत्र (LOA) पठाउने', clauseRef: 'ऐन दफा २७(३), नियम ६८', isMandatory: true },
      { id: 'm6-2', label: 'कबोल रकमको ५% (+ आवश्यक परे थप रकम) बराबरको मान्य कार्यसम्पादन जमानत बुझ्ने', clauseRef: 'ऐन दफा २७(४)', isMandatory: true },
      { id: 'm6-3', label: 'निर्माण व्यवसायीको सामाजिक सुरक्षा कोष (SSF) मा श्रमिक आबद्धता प्रतिबद्धता रुजु गर्ने', clauseRef: 'ऐन दफा ५२ख', isMandatory: true },
      { id: 'm6-4', label: 'तोकिएको ढाँचामा दुवै पक्षबाट खरिद सम्झौता पत्रमा आधिकारिक हस्ताक्षर र छाप लगाउने', clauseRef: 'ऐन दफा ५२, नियम २१', isMandatory: true },
      { id: 'm6-5', label: 'कार्यस्थलमा नियम १११(१)(ज१) बमोजिम अनुसूची-८ को नागरिक सूचना पाटी अनिवार्य राख्न लगाउने', clauseRef: 'नियम १११, अनुसूची ८', isMandatory: true },
    ],
    requiredDocs: [
      'बोलपत्र स्वीकृति तथा सम्झौता आह्वान पत्र (LOA)',
      'सक्कल कार्यसम्पादन बैंक जमानत (Performance Guarantee)',
      'सामाजिक सुरक्षा कोष (SSF) सूचीकरण प्रमाण',
      'हस्ताक्षरित खरिद सम्झौता पत्र र दर परिमाण सूची (BOQ)',
      'कार्यसम्पादन समय तालिका (Work Schedule)',
      'कार्यस्थल सूचना पाटीको तस्बिर',
    ],
    redFlags: [
      '१५ दिनभित्र व्यवसायी सम्झौता गर्न नआएमा तत्काल ऐनको दफा २७(५) बमोजिम बिड बन्ड जफत गरी दोस्रो फर्मलाई बोलाउने वा कालोसूची प्रक्रिया अघि बढाउने।',
    ],
    templateId: 'tmpl-notesheet-loi-loa',
    templateLabel: 'LOA जारी तथा सम्झौता आह्वान सम्बन्धी टिप्पणी ढाँचा',
  },
  {
    stepNo: 7,
    titleNepali: 'मोबिलाइजेसन पेश्की, भेरिएसन, म्याद थप र कार्य सम्पन्न प्रतिवेदन',
    titleEnglish: 'Mobilization Advance, Variations, Extension & Completion',
    targetTimeline: 'सम्झौता प्रारम्भदेखि सम्पन्न र १ वर्षे DLP अवधि समाप्तिसम्म',
    legalBasis: 'सार्वजनिक खरिद ऐन दफा ५२क, ५४, ५६, नियमावली नियम ११३, ११८, १२०, १२५',
    tasks: [
      { id: 'm7-1', label: 'बढीमा २०% मोबिलाइजेसन पेश्की बैंक जमानत विरुद्ध मात्र उपलब्ध गराउने', clauseRef: 'ऐन दफा ५२क, नियम ११३', isMandatory: true },
      { id: 'm7-2', label: 'प्रत्येक रनिङ बिल भुक्तानी गर्दा ५% रिटेन्सन मनी र पेश्की कट्टा गर्ने', clauseRef: 'नियम १२३(४)', isMandatory: true },
      { id: 'm7-3', label: 'अनपेक्षित साइट अवस्था फेरिएमा १५% सम्मको भेरिएसन तोकिएको अख्तियारीबाट स्वीकृत गराउने', clauseRef: 'ऐन दफा ५४, नियम ११८', isMandatory: true },
      { id: 'm7-4', label: 'म्याद थपको निवेदन सम्झौता सकिनु भन्दा कम्तीमा २१ दिन अगावै दर्ता भएको रुजु गर्ने', clauseRef: 'नियम १२०(१)', isMandatory: true },
      { id: 'm7-5', label: 'कार्य सम्पन्न भएपछि प्राविधिक नापजाँच गरी नियम १२५ बमोजिम कार्य सम्पन्न प्रमाणपत्र दिने', clauseRef: 'नियम १२५', isMandatory: true },
      { id: 'm7-6', label: 'कम्तीमा १ वर्षको त्रुटि सच्याउने अवधि (DLP) सकिएपछि मात्र धरौटी रकम फिर्ता गर्ने', clauseRef: 'नियम १२३', isMandatory: true },
    ],
    requiredDocs: [
      'मोबिलाइजेसन पेश्की बैंक जमानत (Advance Bank Guarantee)',
      'नाप किताब (Measurement Book - MB) र रनिङ बिलहरू',
      'भेरिएसन आदेश टिप्पणी र स्वीकृत दर विश्लेषण',
      '२१ दिन अगावै दर्ता भएको म्याद थपको निवेदन र निर्णय',
      'कार्य सम्पन्न प्रतिवेदन तथा एज-बिल्ट नक्सा (As-Built Drawings)',
      'कार्य सम्पन्न प्रमाणपत्र (Work Completion Certificate)',
    ],
    redFlags: [
      'सम्झौताको म्याद सकिन २१ दिनभन्दा कम समय बाँकी हुँदा परेको म्याद थप निवेदन स्वीकृत गरेमा सो म्याद थप गैरकानूनी ठहरिन्छ (नियम १२०)।',
      '१५% भन्दा बढीको भेरिएसन भएमा विभागीय प्रमुखको सट्टा मन्त्रालय वा मन्त्रिपरिषद् जानुपर्ने अख्तियारी सीमा ख्याल गर्नुहोस्।',
    ],
    templateId: 'tmpl-notesheet-variation-extension',
    templateLabel: 'भेरिएसन आदेश तथा म्याद थप स्वीकृत सम्बन्धी टिप्पणी ढाँचा',
  },
];

interface ProcurementWorkflowWizardProps {
  onNavigateToTemplate?: (templateId: string) => void;
  onNavigateToClause?: (clauseNo: string) => void;
}

export const ProcurementWorkflowWizard: React.FC<ProcurementWorkflowWizardProps> = ({
  onNavigateToTemplate,
  onNavigateToClause,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('ncb-works-3cr');
  const [customProjectTitle, setCustomProjectTitle] = useState<string>('रु ३ करोडको प्रशासनिक भवन निर्माण कार्य');
  const [customOfficeName, setCustomOfficeName] = useState<string>('शहरी विकास तथा भवन निर्माण विभाग');
  const [customContractNo, setCustomContractNo] = useState<string>('DUDBC/NCB/WORKS/02-081/82');
  const [customAmount, setCustomAmount] = useState<number>(30000000);

  // Completed task ids
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>({});
  const [activeStepNo, setActiveStepNo] = useState<number>(1);

  // Active preset
  const activePreset = useMemo(() => {
    return WORKFLOW_PRESETS.find(p => p.id === selectedPresetId) || WORKFLOW_PRESETS[0];
  }, [selectedPresetId]);

  const handleSelectPreset = (preset: WorkflowPreset) => {
    setSelectedPresetId(preset.id);
    setCustomProjectTitle(preset.title);
    setCustomAmount(preset.defaultAmount);
    setCustomContractNo(`OFFICE/${preset.category.toUpperCase()}/01-081/82`);
    setActiveStepNo(1);
  };

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Progress calculation
  const totalTasks = useMemo(() => {
    return MILESTONES_DATA.reduce((acc, m) => acc + m.tasks.length, 0);
  }, []);

  const completedCount = useMemo(() => {
    return Object.values(completedTaskIds).filter(Boolean).length;
  }, [completedTaskIds]);

  const progressPercentage = Math.round((completedCount / totalTasks) * 100);

  const activeMilestone = useMemo(() => {
    return MILESTONES_DATA.find(m => m.stepNo === activeStepNo) || MILESTONES_DATA[0];
  }, [activeStepNo]);

  const activeStepCompletedCount = activeMilestone.tasks.filter(t => completedTaskIds[t.id]).length;
  const isActiveStepFullyDone = activeStepCompletedCount === activeMilestone.tasks.length;

  const handlePrint = () => {
    window.print();
  };

  const resetAllProgress = () => {
    if (window.confirm('के तपाईं सम्पूर्ण कार्यप्रवाहको चेकलिस्ट सुरुदेखि पुनः रिसेट गर्न चाहनुहुन्छ?')) {
      setCompletedTaskIds({});
      setActiveStepNo(1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>अन्तरक्रियात्मक खरिद कार्यप्रवाह विजार्ड (Interactive Workflow Guide)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            चरणबद्ध खरिद प्रक्रिया तथा माइलस्टोन अनुपालन गाइड
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            आफ्नो आयोजनाको खरिद विधि छान्नुहोस् र पूर्वतयारीदेखि बोलपत्र खोल्ने, मूल्याङ्कन, आशयको सूचना, सम्झौता र कार्य सम्पन्नसम्मका ७ माइलस्टोनहरू क्रमैसँग पछ्याउनुहोस्।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={resetAllProgress}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>रिसेट</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>A4 प्रिन्ट / PDF एक्सपोर्ट</span>
          </button>
        </div>
      </div>

      {/* Printable Official Header (Shown Only on Print) */}
      <div className="hidden print-only text-center border-b pb-4 mb-4">
        <h1 className="text-xl font-bold text-black">{customOfficeName}</h1>
        <h2 className="text-base font-semibold text-gray-800 mt-1">
          सार्वजनिक खरिद प्रक्रियागत माइलस्टोन तथा अनुपालन चेकलिस्ट
        </h2>
        <div className="flex justify-between text-xs mt-3 text-gray-700 px-4">
          <span><strong>आयोजना:</strong> {customProjectTitle}</span>
          <span><strong>ठेक्का नं:</strong> {customContractNo}</span>
          <span><strong>लागत अनुमान:</strong> {formatNepaliCurrency(customAmount)}</span>
        </div>
      </div>

      {/* Preset Selector Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs no-print space-y-3">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
          <Layers className="w-4 h-4 text-red-700" />
          <span>१. खरिद विधि वा आयोजनाको नमूना छान्नुहोस्:</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {WORKFLOW_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-red-50 border-red-600 shadow-xs ring-1 ring-red-600'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-red-700' : 'text-slate-600'}`}>
                    {preset.methodName}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-red-700" />}
                </div>
                <h4 className="text-xs font-semibold text-slate-900 leading-snug">
                  {preset.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {preset.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Project customization metadata */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-[11px] font-medium text-slate-600 block mb-1">कार्यालयको नाम:</label>
            <input
              type="text"
              value={customOfficeName}
              onChange={(e) => setCustomOfficeName(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-red-600 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-600 block mb-1">आयोजनाको नाम:</label>
            <input
              type="text"
              value={customProjectTitle}
              onChange={(e) => setCustomProjectTitle(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-red-600 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-600 block mb-1">ठेक्का नं:</label>
            <input
              type="text"
              value={customContractNo}
              onChange={(e) => setCustomContractNo(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-red-600 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <div className="w-full sm:w-auto">
          <span className="text-xs text-slate-500">कुल प्रक्रियागत प्रगति:</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xl font-bold text-slate-900">{progressPercentage}%</span>
            <span className="text-xs text-slate-600">
              ({completedCount}/{totalTasks} अनिवार्य कार्य सम्पन्न)
            </span>
          </div>
        </div>

        <div className="w-full sm:flex-1 max-w-md">
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-red-600 to-emerald-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          {progressPercentage === 100 ? (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>सम्पूर्ण खरिद चक्र सम्पन्न!</span>
            </span>
          ) : (
            <span>चालु माइलस्टोन: चरण {activeStepNo}/७</span>
          )}
        </div>
      </div>

      {/* Stepper Navigation: 7 Horizontal Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 no-print">
        {MILESTONES_DATA.map((milestone) => {
          const isActive = activeStepNo === milestone.stepNo;
          const stepDoneTasks = milestone.tasks.filter(t => completedTaskIds[t.id]).length;
          const isStepDone = stepDoneTasks === milestone.tasks.length;

          return (
            <button
              key={milestone.stepNo}
              onClick={() => setActiveStepNo(milestone.stepNo)}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                isActive
                  ? 'bg-red-700 text-white border-red-700 shadow-md ring-2 ring-red-700/20'
                  : isStepDone
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className={`font-mono font-bold ${isActive ? 'text-red-200' : isStepDone ? 'text-emerald-700' : 'text-slate-500'}`}>
                  चरण {milestone.stepNo}
                </span>
                {isStepDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className={`text-[10px] font-mono ${isActive ? 'text-red-200' : 'text-slate-400'}`}>
                    {stepDoneTasks}/{milestone.tasks.length}
                  </span>
                )}
              </div>
              <h4 className="text-xs font-bold leading-snug line-clamp-2">
                {milestone.titleNepali}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Milestone Deep-Dive Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Milestone Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wide">
              <span>माइलस्टोन {activeMilestone.stepNo} / ७</span>
              <span>·</span>
              <span className="text-slate-500 font-normal">{activeMilestone.targetTimeline}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              {activeMilestone.titleNepali}
            </h3>
            <span className="text-xs text-slate-600 font-mono mt-0.5 block">
              कानूनी आधार: {activeMilestone.legalBasis}
            </span>
          </div>

          {/* Quick template button */}
          {activeMilestone.templateId && onNavigateToTemplate && (
            <button
              onClick={() => onNavigateToTemplate(activeMilestone.templateId!)}
              className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold shadow-2xs transition-colors shrink-0"
            >
              <FileText className="w-4 h-4 text-red-600" />
              <span>सम्बन्धित टिप्पणी ढाँचा खोल्नुहोस्</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Milestone Body */}
        <div className="p-6 space-y-6">
          {/* 1. Action Checklist Tasks */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>यस चरणमा गर्नैपर्ने अनिवार्य कार्यहरू (Step Tasks Checklist):</span>
              </h4>
              <span className="text-xs text-slate-500">
                सम्पन्न भएका बुँदामा टिक लगाउनुहोस् ({activeStepCompletedCount}/{activeMilestone.tasks.length})
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {activeMilestone.tasks.map((task) => {
                const isChecked = !!completedTaskIds[task.id];
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-300 text-emerald-950'
                        : 'bg-slate-50/60 border-slate-200 text-slate-800 hover:bg-white'
                    }`}
                  >
                    <button
                      type="button"
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="flex-1 text-xs sm:text-sm">
                      <p className={`font-medium ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {task.label}
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-mono text-red-700 bg-red-50 px-2 py-0.5 rounded-sm">
                        {task.clauseRef}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Mandatory Documents & Red Flags Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Required Documents */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-red-700" />
                <span>तयार हुनुपर्ने सरकारी कागजातहरू (Required Documents):</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {activeMilestone.requiredDocs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-700 mt-1.5 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags & Fatal Mistakes */}
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2.5">
              <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>सावधानी तथा बेरुजु जोखिम (Fatal Mistakes & Red Flags):</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-amber-900/90 leading-relaxed">
                {activeMilestone.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step Navigation Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 no-print">
            <button
              disabled={activeStepNo === 1}
              onClick={() => setActiveStepNo(prev => Math.max(1, prev - 1))}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              अघिल्लो माइलस्टोन
            </button>

            <span className="text-xs text-slate-500 font-medium">
              चरण {activeStepNo} / {MILESTONES_DATA.length}
            </span>

            <button
              disabled={activeStepNo === MILESTONES_DATA.length}
              onClick={() => setActiveStepNo(prev => Math.min(MILESTONES_DATA.length, prev + 1))}
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
            >
              <span>पछिल्लो माइलस्टोन</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Complete Printable Summary (Shown Only during Print) */}
      <div className="hidden print-only space-y-6 pt-4">
        <h3 className="text-sm font-bold border-b pb-1 text-black">
          सम्पूर्ण प्रक्रियागत ७ माइलस्टोन चेकलिस्ट (Procurement Audit Roadmap):
        </h3>
        <table className="w-full text-[11px] border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 p-2 text-left w-12">चरण</th>
              <th className="border border-gray-400 p-2 text-left">माइलस्टोन तथा कानुनी आधार</th>
              <th className="border border-gray-400 p-2 text-left">अनिवार्य कागजातहरू</th>
              <th className="border border-gray-400 p-2 text-center w-24">स्थिति</th>
            </tr>
          </thead>
          <tbody>
            {MILESTONES_DATA.map((m) => {
              const doneTasks = m.tasks.filter(t => completedTaskIds[t.id]).length;
              const isDone = doneTasks === m.tasks.length;
              return (
                <tr key={m.stepNo}>
                  <td className="border border-gray-400 p-2 font-bold text-center">{m.stepNo}</td>
                  <td className="border border-gray-400 p-2">
                    <p className="font-bold text-black">{m.titleNepali}</p>
                    <p className="text-[10px] text-gray-600">{m.legalBasis}</p>
                    <p className="text-[10px] text-gray-500 italic mt-0.5">{m.targetTimeline}</p>
                  </td>
                  <td className="border border-gray-400 p-2">
                    <ul className="list-disc pl-3">
                      {m.requiredDocs.slice(0, 3).map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-400 p-2 text-center font-bold">
                    {isDone ? '✓ सम्पन्न' : `${doneTasks}/${m.tasks.length} सम्पन्न`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Official Signatures Section for File */}
        <div className="pt-12 grid grid-cols-3 gap-6 text-center text-xs text-black">
          <div>
            <div className="border-t border-black pt-1">
              <p className="font-bold">पेस गर्ने (योजना/खरिद अधिकृत)</p>
              <p>मिति: ........................</p>
            </div>
          </div>
          <div>
            <div className="border-t border-black pt-1">
              <p className="font-bold">जाँच गर्ने (लेखा अधिकृत)</p>
              <p>मिति: ........................</p>
            </div>
          </div>
          <div>
            <div className="border-t border-black pt-1">
              <p className="font-bold">स्वीकृत गर्ने (कार्यालय प्रमुख)</p>
              <p>मिति: ........................</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
