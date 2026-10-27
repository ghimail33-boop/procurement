/**
 * International Competitive Bidding (ICB - अन्तर्राष्ट्रिय खुला बोलपत्र) Data
 * 
 * Compliant with:
 * - Public Procurement Act, 2063 (PPA) - Sections 4, 5, 11, 14, 15, 23, 25, 27, 47, 49, 67
 * - Public Procurement Regulations, 2064 (PPR - including 16th Amendment) - Rules 10, 14, 31, 31ङ, 39, 42, 52, 59, 60-65, 88-93, 110, 115
 * - PPMO Standard Bidding Documents (SBD) for Goods ICB (Single Stage Two Envelope & One Envelope) & Works ICB
 * - ICC Incoterms 2020 Rules
 */

export interface IcbStage {
  id: number;
  stageNo: number;
  titleNepali: string;
  titleEnglish: string;
  objective: string;
  responsibleEntity: string;
  timelineDays: string;
  legalBasisAct: string;
  legalBasisRule: string;
  sbdClauses: string;
  
  // Public Entity View
  entityDuties: string[];
  entityChecklist: string[];
  
  // Bidder View
  bidderDuties: string[];
  bidderChecklist: string[];
  
  requiredDocuments: string[];
  criticalMistakesAndRisks: string[];
  ppmoOpinionsAndPprcRulings: {
    caseTitle: string;
    decisionSummary: string;
    relevance: string;
  }[];
  practicalFeatures: {
    title: string;
    description: string;
  };
  officialSources: {
    title: string;
    url: string;
  }[];
}

export interface IncotermRule {
  code: string;
  nameEnglish: string;
  nameNepali: string;
  category: 'any-mode' | 'maritime';
  deliveryPoint: string;
  riskTransferPoint: string;
  freightResponsibility: string;
  insuranceLiability: string;
  exportCustoms: string;
  importCustoms: string;
  loadingUnloading: string;
  nepalContextUsage: string;
  entityGuidance: string;
  bidderPricingGuidance: string;
  practicalExample: string;
  sbdClausesMapping: string;
}

export interface LocalAgentCaseStudy {
  id: string;
  title: string;
  facts: string;
  legalSources: string;
  analysis: string;
  recommendedAction: string;
}

export interface IcbQuizQuestion {
  id: string;
  level: 'basic' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  legalRef: string;
}

export interface IcbEvaluationStep {
  stepNo: number;
  title: string;
  objective: string;
  legalRef: string;
  details: string[];
  passingCriteria: string;
  fatalPitfalls: string;
}

// --------------------------------------------------------------------------
// 1. THE 7-STAGE EXPANDED ICB WORKFLOW
// --------------------------------------------------------------------------
export const ICB_WORKFLOW_STAGES: IcbStage[] = [
  {
    id: 1,
    stageNo: 1,
    titleNepali: 'चरण १: आवश्यकता पहिचान, स्पेसिफिकेसन, डेलिभरी तालिका र बजेट सुनिश्चितता',
    titleEnglish: 'Stage 1: Needs Assessment, Specifications, Delivery Schedule & Budget Securing',
    objective: 'आयात गर्नुपर्ने मालसामानको यथार्थ आवश्यकता पुष्टि गरी गैर-भेदभावपूर्ण प्राविधिक स्पेसिफिकेसन, आपूर्ति तालिका र बजेट सुनिश्चित गर्ने।',
    responsibleEntity: 'प्राविधिक शाखा, खरिद महाशाखा/एकाइ, योजना शाखा र कार्यालय प्रमुख',
    timelineDays: 'बोलपत्र आह्वान हुनुभन्दा कम्तीमा ३० देखि ६० दिन अगावै सम्पन्न गर्नुपर्ने',
    legalBasisAct: 'सार्वजनिक खरिद ऐन, २०६३ को दफा ४ (स्पेसिफिकेसन), दफा ५ (लागत अनुमान), दफा ८ (खरिद योजना)',
    legalBasisRule: 'सार्वजनिक खरिद नियमावली, २०६४ को नियम ३ (खरिद योजना), नियम १० (लागत अनुमान), नियम ४२ (स्पेसिफिकेसन)',
    sbdClauses: 'Goods ICB SBD Section VI (Schedule of Requirements & Technical Specifications)',
    entityDuties: [
      'खरिदको आवश्यकता, औचित्य र कार्यालयमा मौज्दात नभएको यकिन गर्ने (ऐन दफा ४(१))।',
      'दीर्घकालीन खरिद गुरुयोजना (Master Procurement Plan) र वार्षिक खरिद योजना (Annual Procurement Plan) मा समावेश भएको सुनिश्चित गर्ने।',
      'वस्तुगत, तटस्थ र प्रतिस्पर्धालाई सीमित नगर्ने प्राविधिक विशेषता (Generic Specifications) तयार गर्ने।',
      'कुनै खास ब्रान्ड, ट्रेडमार्क, प्याटेन्ट वा उत्पादक उल्लेख गर्न नपाइने; अनिवार्य भएमा "वा सो सरह" (Or Equivalent) थप गर्ने (ऐन दफा ४(३))।',
      'निरीक्षण, परीक्षण (FAT/PSI), गुणस्तर मानक (ISO/CE/NS/IEC) र Acceptance मापदण्ड निर्धारण गर्ने।',
      'डेलिभरी बिन्दु (Project Site, Central Store) र व्यवहारिक डेलिभरी तालिका तयार गर्ने।',
      'वारेन्टी अवधि (कम्तीमा १ देखि ३ वर्ष), स्पेयर पार्ट्स उपलब्धता (५ देखि १० वर्ष), जडान र कमिसनिङ आवश्यकता यकिन गर्ने।',
      'आयातित सामानका लागि अन्तर्राष्ट्रिय ढुवानी, पारवहन बीमा, भन्सार क्लियरेन्स र Incoterms (CIP/CIF) को प्रारम्भिक योजना बनाउने।',
      'बजेट उपशीर्षकमा पर्याप्त रकम विनियोजन भएको र विदेशी मुद्रा भुक्तानीका लागि स्रोत सुनिश्चित भएको पुष्टि गर्ने।',
    ],
    entityChecklist: [
      'खरिद योजनामा स्वीकृत कार्यक्रम र बजेट कोड उल्लेख छ?',
      'स्पेसिफिकेसन कुनै खास विदेशी कम्पनीको ब्रोसरसँग हुबहु मिल्ने (Tailor-made) त छैन?',
      'ब्रान्ड उल्लेख गरिएको भए "वा सो सरह" (Or Equivalent) अनिवार्य थपिएको छ?',
      'डेलिभरी तालिका निर्माण/परियोजनाको कार्यतालिकासँग तालमेल गरिएको छ?',
      'वारेन्टी, तालिम, जडान र कमिसनिङका सर्तहरू स्पष्ट छन्?',
      'विदेशी मुद्रा निकासी र भुक्तानी पद्धतिको बजेट सुनिश्चितता छ?',
    ],
    bidderDuties: [
      'सार्वजनिक निकायले मागेका प्राविधिक मापदण्डहरू आफ्ना उत्पादनले पूरा गर्न सक्ने वा नसक्ने पूर्व-विश्लेषण गर्ने।',
      'नेपालको भौगोलिक अवस्था, भन्सार मार्ग (Kolkata Port, Dry Ports) र ढुवानी समय यकिन गर्ने।',
      'निर्माताबाट आवश्यक पर्ने वारेन्टी, स्पेयर पार्ट्स र बिक्रीपछिको सेवा (After-Sales Service) को प्रत्याभूति जुटाउने।',
      'यदि "वा सो सरह" प्रावधान अन्तर्गत प्रस्ताव गर्ने भए आफ्नो उत्पादन समान वा उत्कृष्ट रहेको प्राविधिक प्रमाण तयार राख्ने।',
    ],
    bidderChecklist: [
      'हाम्रो उत्पादनले SBD मा तोकिएका Must-have प्राविधिक मापदण्ड शतप्रतिशत पूरा गर्छ?',
      'नेपालसम्म सामान ढुवानी गर्न लाग्ने पारवहन समय (Transit Time) तालिका भित्र सम्भव छ?',
      'नेपालमा स्थानीय सेवा केन्द्र वा स्थानीय एजेन्ट मार्फत आफ्टर-सेल्स सर्भिस दिन सम्भव छ?',
    ],
    requiredDocuments: [
      'खरिद माग फाराम र औचित्य पुष्टि टिप्पणी',
      'विस्तृत प्राविधिक स्पेसिफिकेसन (Technical Specification Sheet)',
      'मागको परिमाण र कार्यतालिका (Schedule of Requirements)',
      'स्वीकृत वार्षिक खरिद योजना (Annual Procurement Plan)',
      'स्रोत तथा बजेट सुनिश्चितता पत्र (Budget Confirmation Letter)',
    ],
    criticalMistakesAndRisks: [
      'कुनै निश्चित विदेशी ब्रान्डको क्याटलग हुबहु कपी गरी स्पेसिफिकेसन बनाउँदा प्रतिस्पर्धा सीमित भई PPRC मा उजुरी पर्नु र ठेक्का रद्द हुनु।',
      'नेपालको पारवहन प्रक्रिया (Kolkata Port Clearance, Railway Transit) को जटिलता नजरअन्दाज गरी छोटो डेलिभरी तालिका तोक्दा आपूर्तिकर्ता ढिलाइ हुनु र आयोजना प्रभावित हुनु।',
      'विदेशी मुद्राको बजेट सुनिश्चित नगरी प्रक्रिया अघि बढाउँदा पछि एलसी (L/C) खोल्न नसकिनु।',
    ],
    ppmoOpinionsAndPprcRulings: [
      {
        caseTitle: 'PPRC निर्णय: DOHS/G/ICB-44 - भेरिएसन र स्पेसिफिकेसन डेभिएसन',
        decisionSummary: 'विशिष्टीकृत मेडिकल उपकरण खरिदमा स्पेसिफिकेसनमा अनिवार्य भनिएका मापदण्डलाई सामान्य विचलन मानी पास गराउन पाइँदैन; सुरुको स्पेसिफिकेसनमै तटस्थ र स्पष्ट हुनुपर्छ।',
        relevance: 'स्पेसिफिकेसन तटस्थ तर प्राविधिक रूपमा सम्झौताहीन हुनुपर्छ।',
      },
      {
        caseTitle: 'PPMO राय: फास्ट ट्र्याक आयोजना - ब्रान्ड नेम प्रयोग सम्बन्धी',
        decisionSummary: 'विशेष प्राविधिक कारणले कुनै खास प्रविधि वा ब्रान्ड उल्लेख गर्नैपर्ने बाध्यात्मक अवस्थामा सोको प्राविधिक पुष्टि फाइलमा राखी "वा सो सरह" अनिवार्य थप्नुपर्दछ।',
        relevance: 'ऐनको दफा ४(३) को अनिवार्य पालना।',
      },
    ],
    practicalFeatures: {
      title: 'Specification Readiness Checklist',
      description: 'विदेशी सामानको स्पेसिफिकेसन अन्तिम गर्नुअघि तटस्थता, वारेन्टी, डेलिभरी बिन्दु र बजेट सुनिश्चितता जाँच्ने डिजिटल चेकलिस्ट।',
    },
    officialSources: [
      { title: 'सार्वजनिक खरिद ऐन, २०६३ (दफा ४ र ५)', url: 'https://ppmo.gov.np/category/acts-regulations/' },
      { title: 'PPMO Goods ICB SBD (Section VI)', url: 'https://ppmo.gov.np' },
    ],
  },
  {
    id: 2,
    stageNo: 2,
    titleNepali: 'चरण २: लागत अनुमान, खरिद विधि र Goods ICB SBD कागजात',
    titleEnglish: 'Stage 2: Cost Estimate, Procurement Method & Goods ICB SBD Documents',
    objective: 'अन्तर्राष्ट्रिय बजार दर, भन्सार महसुल र ढुवानी विश्लेषण गरी यथार्थ लागत अनुमान तयार गर्ने र PPMO को मानक ICB SBD कागजात स्वीकृत गर्ने।',
    responsibleEntity: 'लागत अनुमान समिति, खरिद महाशाखा/एकाइ र अख्तियार प्राप्त अधिकारी',
    timelineDays: 'बोलपत्र आह्वान हुनुभन्दा १५ देखि ३० दिन अगावै लागत अनुमान र SBD स्वीकृत हुनुपर्ने',
    legalBasisAct: 'सार्वजनिक खरिद ऐन, २०६३ को दफा ५ (लागत अनुमान), दफा १५ (अन्तर्राष्ट्रिय खुला बोलपत्रको अवस्था)',
    legalBasisRule: 'सार्वजनिक खरिद नियमावली, २०६४ को नियम १०, ११, १४ (लागत अनुमान र अख्तियारी), नियम ३१ङ (अन्तर्राष्ट्रिय बोलपत्र)',
    sbdClauses: 'Goods ICB SBD: ITB 14, 15 (Bid Prices & Currency), ITB 19 (Bid Security), BDS, GCC/SCC',
    entityDuties: [
      'अन्तर्राष्ट्रिय बजार मूल्य, विदेशी उत्पादकको कोटेशन, पूर्व आयात मूल्य र भन्सार महसुल विश्लेषण गरी लागत अनुमान तयार गर्ने (नियम ११)।',
      'लागत अनुमानमा FOB दर, अन्तर्राष्ट्रिय ढुवानी (Ocean Freight), ट्रान्जिट बीमा, नेपाल भन्सार महसुल, अन्तशुल्क, भ्याट र आन्तरिक ढुवानी स्पष्ट छुट्ट्याउने।',
      'ऐनको दफा १५ अनुसार ICB छनोटको कानुनी आधार पुष्टि गर्ने (नेपालभित्र पर्याप्त प्रतिस्पर्धा नहुने, विदेशी मुद्रा भुक्तानी, ५ अर्ब माथिका निर्माण आदि)।',
      'PPMO को स्वीकृत नवीनतम Goods ICB SBD (Single Stage Two Envelope वा Single Stage One Envelope) छनोट गर्ने।',
      'Bidding Data Sheet (BDS) मा बोलपत्र मान्य अवधि (९०/१२० दिन), जमानत रकम (२-३%), मुद्रा (USD, EUR, JPY, NPR) स्पष्ट भर्ने।',
      'General Conditions of Contract (GCC) सँग अनुकूल हुने गरी Special Conditions of Contract (SCC) तयार गर्ने।',
      'योग्यताका मापदण्ड (Turnover, Specific Supply Experience, Manufacturing Capacity) तोक्ने।',
      'Incoterms 2020 संस्करण (विशेष गरी CIP/CIF) तोक्ने र अधिकार प्राप्त अधिकारीबाट कागजात स्वीकृत गराउने।',
    ],
    entityChecklist: [
      'लागत अनुमान आधिकारिक दर विश्लेषण (विदेशी मूल्य + कर + ढुवानी) सहित तयार छ?',
      'नियम १४ बमोजिम अधिकार प्राप्त अधिकारी (विभागीय प्रमुख/सचिव) बाट लागत अनुमान स्वीकृत छ?',
      'PPMO को पछिल्लो परिमार्जित Goods ICB SBD ढाँचा प्रयोग गरिएको छ?',
      'BDS र SCC बीच कुनै अन्तरविरोध छैन?',
      'योग्यताका मापदण्डहरू कुनै खास बोलपत्रदातालाई लक्षित नगरी वस्तुपरक छन्?',
      'घरेलु प्राथमिकता (Domestic Preference - १५%) दिने वा नदिने BDS मा स्पष्ट छ?',
    ],
    bidderDuties: [
      'PPMO को e-GP पोर्टलबाट आधिकारिक SBD कागजात डाउनलोड गरी ITB, BDS, GCC, SCC को विस्तृत अध्ययन गर्ने।',
      'लागू हुने Incoterm (CIP Destination / CIF Seaport) अनुसार मूल्य संरचना बुझ्ने।',
      'बिड सेक्युरिटीको ढाँचा, मान्य अवधि (बोलपत्र मान्य अवधि + ३० दिन) र स्वीकार्य मुद्रा (USD/NPR) यकिन गर्ने।',
      'नेपालको वाणिज्य बैंकबाट काउन्टर ग्यारेन्टी (Counter-Guarantee) आवश्यक पर्ने वा नपर्ने बुझ्ने।',
    ],
    bidderChecklist: [
      'SBD मा तोकिएको योग्यता (Turnover, विगतको समान अनुभव, उत्पादन क्षमता) हामीसँग प्रमाणित छ?',
      'Price Schedule को उपयुक्त ढाँचा (विदेशबाट आयात हुने वा स्थानीय आपूर्ति) छनोट गरिएको छ?',
      'बैंक ग्यारेन्टीको प्रारूप SBD को Section IV सँग हुबहु मिल्छ?',
    ],
    requiredDocuments: [
      'विस्तृत दर विश्लेषण सहितको स्वीकृत लागत अनुमान (Cost Estimate Sheet)',
      'लागत अनुमान स्वीकृति टिप्पणी तथा निर्णय',
      'PPMO Goods ICB Bidding Document (BDS, SCC, EQC, Schedule of Requirements सहित)',
      'Incoterms र ढुवानी योजना विवरण',
    ],
    criticalMistakesAndRisks: [
      'भन्सार महसुल, भ्याट र स्थानीय ढुवानी नजोडी लागत अनुमान गर्दा कबोल मूल्य लागत अनुमानभन्दा अत्यधिक बढी भई ठेक्का रद्द हुनु।',
      'ITB को अपरिवर्तनीय बुँदाहरू BDS मा गलत तरिकाले परिमार्जन गर्दा कानूनी विवाद सिर्जना हुनु।',
      'अवास्तविक उच्च योग्यता मापदण्ड (Unreasonable Turnover/Experience) राखेर प्रतिस्पर्धा सीमित गराउनु।',
    ],
    ppmoOpinionsAndPprcRulings: [
      {
        caseTitle: 'PPRC निर्णय: NAMS/ICB/78/79/02 - मेडिकल क्याथल्याब खरिद',
        decisionSummary: 'SBD को BDS मा तोकिएको मुद्रा र मूल्य संरचना भन्दा फरक ढाँचामा बोलपत्र दाखिला भएमा सोलाई सारभूत त्रुटि मान्न सकिन्छ। BDS र ITB को सर्त अक्षरशः पालना हुनुपर्छ।',
        relevance: 'BDS को स्पष्टता र SBD मापदण्डको सर्वोच्चता।',
      },
      {
        caseTitle: 'PPMO राय: Steel Tubular Pole खरिद - भन्सार र कर मूल्याङ्कन',
        decisionSummary: 'SBD मा भन्सार महसुल छुट रहने वा नरहने स्पष्ट तोकिनुपर्छ। अस्पष्ट सर्त राखेर बोलपत्र मूल्याङ्कन गर्दा विवाद आउने हुँदा लागत अनुमानमै करको दायित्व यकिन हुनुपर्छ।',
        relevance: 'लागत अनुमानमा कर तथा भन्सारको स्पष्ट दायित्व।',
      },
    ],
    practicalFeatures: {
      title: 'SBD Preparation & Document Review Checklist',
      description: 'Goods ICB SBD कागजात सार्वजनिक गर्नुअघि BDS, SCC, EQC र Price Schedule को कानुनी तादाम्यता परीक्षण गर्ने टुल्स।',
    },
    officialSources: [
      { title: 'सार्वजनिक खरिद नियमावली, २०६४ (नियम १०, १४, ३१ङ)', url: 'https://ppmo.gov.np/category/acts-regulations/' },
      { title: 'PPMO SBD Guidelines for ICB', url: 'https://ppmo.gov.np' },
    ],
  },
  {
    id: 3,
    stageNo: 3,
    titleNepali: 'चरण ३: e-GP मार्फत बोलपत्र आह्वान तथा सूचना प्रकाशन',
    titleEnglish: 'Stage 3: Bid Invitation & Notice Publication via e-GP',
    objective: 'PPMO को e-GP प्रणाली मार्फत अन्तर्राष्ट्रिय प्रतिस्पर्धाका लागि कम्तीमा ३० दिनको म्याद दिई राष्ट्रिय दैनिक र पोर्टलमा सूचना प्रकाशन गर्ने।',
    responsibleEntity: 'खरिद महाशाखा/एकाइ र सूचना प्रकाशन शाखा',
    timelineDays: 'अन्तर्राष्ट्रिय बोलपत्र (ICB) मा कम्तीमा ३० दिन (PPR नियम ३१ङ(१)); पुनः आह्वान भए कम्तीमा १५ दिन',
    legalBasisAct: 'सार्वजनिक खरिद ऐन, २०६३ को दफा १४ (बोलपत्र आह्वानको सूचना), दफा ६५ (विद्युतीय खरिद)',
    legalRuleSection: 'सार्वजनिक खरिद नियमावली, २०६४ को नियम ३१ङ (अन्तर्राष्ट्रिय बोलपत्रको सूचना), नियम ४९क, ५२ (प्रि-बिड)',
    sbdClauses: 'Goods ICB SBD: ITB 7, 8 (Clarification & Amendment of Bidding Documents), ITB 22 (Submission Deadline)',
    entityDuties: [
      'PPMO को आधिकारिक e-GP प्रणाली (www.bolpatra.gov.np/egp) मा ICB टेन्डर सिर्जना गरी बोलपत्र कागजात अपलोड गर्ने।',
      'कम्तीमा एउटा राष्ट्रिय स्तरको अंग्रेजी दैनिक पत्रिका (e.g. The Rising Nepal) र e-GP पोर्टलमा कम्तीमा ३० दिनको म्याद दिई सूचना प्रकाशन गर्ने।',
      'आवश्यक भए विदेशस्थित नेपाली कूटनीतिक नियोगहरू (Embassies) लाई समेत सूचना पठाउने (नियम ३१ङ(२))।',
      'बोलपत्र पेश गर्ने अन्तिम मिति भन्दा कम्तीमा १५ दिन अगावै Pre-bid Meeting आयोजना गर्ने (नियम ५२)।',
      'बोलपत्रदाताले मागेका स्पष्टीकरणहरूको लिखित जवाफ म्याद सकिनु भन्दा कम्तीमा १० दिन अगावै e-GP मार्फत सबैलाई उपलब्ध गराउने।',
      'आवश्यक परे बोलपत्र कागजातमा संशोधन (Addendum) जारी गर्ने र कम्तीमा १० दिनको समय नपुग्ने भए म्याद थप गर्ने (नियम ५३)।',
      'बोलपत्र पेश गर्ने समय समाप्त हुनासाथ e-GP मार्फत सोही दिन सार्वजनिक रूपमा बोलपत्र डिक्रिप्ट गरी खोल्ने (नियम ५९)।',
    ],
    entityChecklist: [
      'सूचनामा अन्तर्राष्ट्रिय बोलपत्र (ICB) को लागि कम्तीमा ३० दिनको म्याद दिइएको छ?',
      'e-GP पोर्टलमा अपलोड गरिएका फाइलहरू खुला, डाउनलोडयोग्य र सही छन्?',
      'प्रि-बिड बैठकको माइन्युट र प्रश्नोत्तर सबै बोलपत्रदाताले देख्ने गरी e-GP मा पोस्ट गरिएको छ?',
      'कुनै संशोधन (Addendum) जारी गरिएको भए बोलपत्र पेश गर्ने म्याद पर्याप्त छ?',
      'बिड ओपनिङको मिति र समय e-GP मा स्पष्ट रूपमा प्रकाशित छ?',
    ],
    bidderDuties: [
      'PPMO को e-GP प्रणालीमा विदेशी बोलपत्रदाताको रूपमा समयमै दर्ता भई युजर अकाउन्ट र डिजिटल सिग्नेचर (DSC) प्रमाणित गर्ने।',
      'SBD कागजात अध्ययन गरी कुनै प्राविधिक वा कानूनी अस्पष्टता भए प्रि-बिड बैठक अगावै e-GP मार्फत प्रश्न (Clarification) पेश गर्ने।',
      'जारी भएका संशोधन (Addenda) र प्रि-बिड माइन्युट अनिवार्य डाउनलोड गरी सोही अनुसार बिड परिमार्जन गर्ने।',
      'तोकिएको ढाँचामा बिड सेक्युरिटी (Bank Guarantee) तयार गरी नेपालको "A" वर्गको बैंकबाट प्रमाणीकरण वा काउन्टर ग्यारेन्टी गराउने।',
      'म्याद सकिनुभन्दा केही घण्टा अगावै e-GP मार्फत सम्पूर्ण प्राविधिक तथा आर्थिक फाइलहरू अपलोड र इनक्रिप्ट गरी सबमिट गर्ने।',
    ],
    bidderChecklist: [
      'हाम्रो e-GP अकाउन्ट सक्रिय छ र विदेशी कम्पनीको लगइन सहज रूपमा चलेको छ?',
      'सबै जारी Addendum हरू डाउनलोड गरी प्रस्तावमा समावेश गरिएको छ?',
      'बिड सेक्युरिटीको रकम, मुद्रा र म्याद (Notice period + Validity + 30 days) सही छ?',
      'अन्तिम मिनेटको इन्टरनेट वा सर्भर समस्याबाट बच्न म्याद सकिनु ३-४ घण्टा अगावै सबमिसन सम्पन्न गरिएको छ?',
    ],
    requiredDocuments: [
      'बोलपत्र आह्वानको पत्रिका सूचना प्रतिलिपि (Scanned Newspaper Notice)',
      'e-GP टेन्डर पब्लिकेशन स्क्रिनसट तथा आधिकारिक विवरण',
      'प्रि-बिड बैठकको माइन्युट (Pre-bid Meeting Minutes)',
      'स्पष्टीकरण तथा जवाफ पत्र (Clarification Responses)',
      'बोलपत्र संशोधन पत्रहरू (Addendum No. 1, 2, ... if any)',
      'बोलपत्र खोल्ने मुचुल्का (Opening Minutes from e-GP)',
    ],
    criticalMistakesAndRisks: [
      'अन्तर्राष्ट्रिय बोलपत्रमा ३० दिनको सट्टा २१ दिन मात्र म्याद राखेर सूचना निकाल्दा प्रक्रिया गैरकानूनी हुनु।',
      'प्रि-बिड बैठकमा मौखिक रूपमा दिइएका जवाफलाई e-GP मार्फत औपचारिक Addendum जारी नगर्दा बोलपत्रदाताबीच असमान सूचना हुनु।',
      'अन्तिम मितिको अन्तिम मिनेटमा बिड सबमिट गर्न खोज्दा e-GP टाइमआउट भई बिड दर्ता हुन नसक्नु।',
    ],
    ppmoOpinionsAndPprcRulings: [
      {
        caseTitle: 'PPRC निर्णय: DOHS/G/ICB-24 - बिड सेक्युरिटीको मुद्रा र वैधता',
        decisionSummary: 'SBD ले परिवर्त्य विदेशी मुद्रा वा नेपाली रुपैयाँमा बिड सेक्युरिटी मागेकोमा तोकिएको मुद्रा र बैंकको काउन्टर ग्यारेन्टी नभएको बिड स्वतः गैर-प्रभावग्राही हुन्छ।',
        relevance: 'बिड सेक्युरिटीको कडा अनुपालन।',
      },
      {
        caseTitle: 'PPMO राय: Addendum जारी गर्दा म्याद थप सम्बन्धी',
        decisionSummary: 'बोलपत्रमा सारभूत संशोधन हुने गरी Addendum जारी गर्दा बोलपत्रदातालाई तयारी गर्न कम्तीमा १० दिनको समय नपुग्ने भए अनिवार्य रूपमा बोलपत्र पेश गर्ने म्याद थप गर्नुपर्छ।',
        relevance: 'नियम ५३ को अनिवार्य पालना।',
      },
    ],
    practicalFeatures: {
      title: 'Bid Invitation Timeline & Bid Submission Checklist',
      description: '३० दिने सूचना, प्रि-बिड बैठक, स्पष्टीकरण, Addendum र बिड सबमिसनको अन्तरक्रियात्मक क्यालेन्डर र चेकलिस्ट।',
    },
    officialSources: [
      { title: 'सार्वजनिक खरिद ऐन, २०६३ (दफा १४ र ६५)', url: 'https://ppmo.gov.np/category/acts-regulations/' },
      { title: 'PPMO e-GP Portal (bolpatra.gov.np/egp)', url: 'https://www.bolpatra.gov.np/egp/' },
    ],
  },
  {
    id: 4,
    stageNo: 4,
    titleNepali: 'चरण ४: बोलपत्र खोल्ने, परीक्षण र मूल्याङ्कन (१५ उपचरणहरू)',
    titleEnglish: 'Stage 4: Bid Opening, Examination & Comprehensive Evaluation (15 Sub-Steps)',
    objective: 'e-GP मा प्राप्त अन्तर्राष्ट्रिय बोलपत्रहरूको प्रारम्भिक, योग्यता, प्राविधिक र आर्थिक गरी १५ वटा स्पष्ट उपचरणमा निष्पक्ष मूल्याङ्कन गर्ने।',
    responsibleEntity: 'मूल्याङ्कन समिति (Evaluation Committee - PPA Sec 10), खरिद एकाइ',
    timelineDays: 'बोलपत्र खोलेको सामान्यतया ३० देखि ४५ दिनभित्र मूल्याङ्कन प्रतिवेदन स्वीकृत गराउनुपर्ने',
    legalBasisAct: 'सार्वजनिक खरिद ऐन, २०६३ को दफा १० (समिति), दफा २३ (परीक्षण र स्पष्टीकरण), दफा २५ (मूल्याङ्कन)',
    legalRuleSection: 'सार्वजनिक खरिद नियमावली, २०६४ को नियम ६०, ६१, ६२, ६३, ६४, ६५ (मूल्याङ्कनका नियमहरू)',
    sbdClauses: 'Goods ICB SBD Section I (ITB 26 to 37) & Section III (Evaluation & Qualification Criteria - EQC)',
    entityDuties: [
      'ऐनको दफा १० बमोजिम गठित मूल्याङ्कन समितिले e-GP प्रणालीबाट बोलपत्र अनलाइन डिक्रिप्ट गरी खोल्ने।',
      '१५ वटा स्थापित उपचरणहरू (Opening, Completeness, Bid Security, Qualification, Technical Compliance, Responsiveness, Financial Evaluation, Arithmetical Corrections, Discounts/ALB, Report) कडाइका साथ पालना गर्ने।',
      'बोलपत्र खोलिसकेपछि मूल्याङ्कनका कुनै पनि मापदण्ड (Evaluation Criteria) मनलाग्दी थपघट वा परिवर्तन नगर्ने (ऐन दफा २५)।',
      'आवश्यक परे बोलपत्रको सारभूत विषय (Substance) र मूल्य परिवर्तन नहुने गरी मात्र e-GP मार्फत लिखित स्पष्टीकरण (Clarification) माग्ने (दफा २३)।',
      'घरेलु प्राथमिकता (Domestic Preference) सम्बन्धी प्रावधान SBD मा भए सो अनुसार गणना गर्ने।',
      'असामान्य रूपमा कम मूल्य (Abnormally Low Bid) देखिएमा दर विश्लेषण माग गरी जोखिम परीक्षण गर्ने।',
      'विस्तृत मूल्याङ्कन प्रतिवेदन (Evaluation Report) तयार गरी अधिकार प्राप्त अधिकारी समक्ष सिफारिस पेश गर्ने।',
    ],
    entityChecklist: [
      'सबै बोलपत्रदाताहरूको कालोसूची (PPMO Blacklist) स्थिति जाँच गरिएको छ?',
      'बिड सेक्युरिटीको रकम, मुद्रा र मान्य अवधि SBD को सर्त अनुसार शतप्रतिशत ठीक छ?',
      'निर्माताको अधिकार पत्र (Manufacturer Authorization Form - MAF) सक्कल र आधिकारिक छ?',
      'प्राविधिक स्पेसिफिकेसनमा देखिएका विचलनहरू (Deviations) Minor हुन् कि Major, कानुनी विश्लेषण गरिएको छ?',
      'गणितीय त्रुटि सच्याउँदा SBD ITB अनुसार Unit Rate लाई मान्यता दिइएको छ?',
      'मूल्याङ्कन प्रतिवेदनमा समितिका सबै सदस्यहरूको हस्ताक्षर र स्पष्ट सिफारिस छ?',
    ],
    bidderDuties: [
      'बोलपत्र खोलिएको e-GP अनलाइन मुचुल्का तुरुन्त डाउनलोड गरी प्रतिस्पर्धीहरूको कबोल र उपस्थिति विवरण हेर्ने।',
      'मूल्याङ्कन समितिले e-GP मार्फत कुनै स्पष्टीकरण (Clarification) मागेमा तोकिएको म्यादभित्र सत्य र स्पष्ट जवाफ पेश गर्ने।',
      'स्पष्टीकरण दिँदा आफ्नो दररेट, मूल्य वा बोलपत्रको सारभूत सर्तहरू परिवर्तन गर्ने प्रयास नगर्ने।',
      'मूल्याङ्कन प्रक्रियालाई प्रभावित पार्ने कुनै अनुचित प्रभाव वा चलखेल नगर्ने (भ्रष्टाचार तथा आचारसंहिता विरुद्ध)।',
    ],
    bidderChecklist: [
      'हाम्रो e-GP इमेल सूचना नियमित जाँच भइरहेको छ?',
      'समितिले मागेको स्पष्टीकरण पत्र तोकिएको समयसीमा भित्रै प्रणाली मार्फत पठाइएको छ?',
      'कुनै पनि कागजातमा दोहोरो वा विरोधाभासी विवरण परेको छैन?',
    ],
    requiredDocuments: [
      'e-GP बोलपत्र खोल्ने मुचुल्का (Bid Opening Checklist & Record)',
      'कालोसूची परीक्षण अभिलेख (PPMO Blacklist Verification Printout)',
      'बिड सेक्युरिटी प्रमाणीकरण विवरण (Bank Guarantee Verification)',
      'प्राविधिक अनुपालन तालिका (Technical Compliance Comparative Sheet)',
      'आर्थिक तुलनात्मक तालिका (Financial Comparison Sheet & Arithmetic Corrections)',
      'औपचारिक मूल्याङ्कन प्रतिवेदन (Detailed Evaluation Report signed by Committee)',
    ],
    criticalMistakesAndRisks: [
      'बोलपत्र खोलिसकेपछि मूल्याङ्कन समितिले नयाँ मापदण्ड बनाई बोलपत्रदातालाई अयोग्य बनाउनु, जुन कानूनी रूपमा सिधै बदरयोग्य हुन्छ।',
      'Minor Deviation (जस्तै सामान्य ढाँचाको फरक) लाई Major Deviation मानी न्यूनतम मूल्याङ्कित प्रभावग्राही बोलपत्र खारेज गर्नु।',
      'गणितीय त्रुटि सच्याउँदा कुल रकमलाई आधार मान्नु, जबकि नियम अनुसार प्रति इकाई दर (Unit Rate) नै अन्तिम हुन्छ।',
    ],
    ppmoOpinionsAndPprcRulings: [
      {
        caseTitle: 'PPRC निर्णय: NAMS/ICB/78/79/02 - अङ्क र अक्षरको फरक',
        decisionSummary: 'बोलपत्रमा अङ्क र अक्षरको रकम फरक परेमा SBD ITB अनुसार अक्षरमा लेखिएको रकमलाई नै मान्यता दिनुपर्छ। गणितीय त्रुटि सच्याउने विधि SBD मा तोकिए बमोजिम मात्र हुनुपर्छ।',
        relevance: 'SBD को Arithmetical Correction नियमको सर्वोच्चता।',
      },
      {
        caseTitle: 'PPRC निर्णय: TU Cricket Ground Floodlight - माइनर डेभिएसन सम्बन्धी',
        decisionSummary: 'प्राविधिक प्रस्तावमा सामान्य प्रकृतिका सच्याउन सकिने त्रुटि (Minor Deviation) लाई आधार बनाएर मनलाग्दी अयोग्य ठहराई महँगो प्रस्ताव स्वीकृत गर्न पाइँदैन।',
        relevance: 'Substantial Responsiveness को निष्पक्ष परीक्षण।',
      },
    ],
    practicalFeatures: {
      title: 'Technical & Financial Evaluation Checklists & 15 Sub-Steps Workflow',
      description: '१५ वटा स्थापित उपचरण, प्राविधिक अनुपालन चार्ट, गणितीय त्रुटि परीक्षण र आर्थिक तुलना सिमुलेटर।',
    },
    officialSources: [
      { title: 'सार्वजनिक खरिद ऐन, २०६३ (दफा २३ र २५)', url: 'https://ppmo.gov.np/category/acts-regulations/' },
      { title: 'PPMO Procurement Evaluation Manual', url: 'https://ppmo.gov.np' },
    ],
  },
  {
    id: 5,
    stageNo: 5,
    titleNepali: 'चरण ५: आशयको सूचना (LOI), आपत्ति/गुनासो र सम्झौता',
    titleEnglish: 'Stage 5: Letter of Intent (LOI), Standstill Period, Review & Contract Award',
    objective: 'सफल बोलपत्रदातालाई ७ दिनको आशयको सूचना दिने, उजुरी प्रक्रिया सम्पन्न गर्ने, कार्यसम्पादन जमानत लिई १५ दिनभित्र खरिद सम्झौता गर्ने।',
    responsibleEntity: 'कार्यालय प्रमुख, खरिद एकाइ, सार्वजनिक खरिद पुनरावलोकन समिति (PPRC)',
    timelineDays: 'LOI अवधि ७ दिन (Standstill Period); LOA पछि सम्झौताका लागि १५ दिनको म्याद (ऐन दफा २७)',
    legalBasisAct: 'सार्वजनिक खरिद ऐन, २०६३ को दफा २७ (बोलपत्र स्वीकृति), दफा ४७ (कार्यालय प्रमुख समक्ष उजुरी), दफा ४९ (PPRC मा पुनरावलोकन)',
    legalRuleSection: 'सार्वजनिक खरिद नियमावली, २०६४ को नियम ११० (सम्झौता), नियम १११, नियम ११०क (कार्यसम्पादन जमानत)',
    sbdClauses: 'Goods ICB SBD Section I (ITB 40 to 44) & Section VIII (Contract Forms - LOI, LOA, Agreement)',
    entityDuties: [
      'मूल्याङ्कन समितिको सिफारिस अधिकार प्राप्त अधिकारीबाट स्वीकृत भएपछि ७ दिनको Letter of Intent (LOI) जारी गर्ने (ऐन दफा २७(२))।',
      'LOI सूचना e-GP प्रणाली र कार्यालयको वेबसाइटमा प्रकाशन गरी सबै सहभागी बोलपत्रदातालाई सूचित गर्ने।',
      '७ दिनको प्रतीक्षा अवधि (Standstill Period) भित्र कुनै बोलपत्रदाताले दफा ४७ बमोजिम कार्यालय प्रमुख समक्ष निवेदन दिएमा छानबिन गरी ५ दिनभित्र लिखित निर्णय दिने।',
      'PPRC मा उजुरी परेमा सोको निर्णय नभएसम्म सम्झौता प्रक्रिया रोक्ने; कुनै उजुरी नपरे वा उजुरी खारेज भएपछि Letter of Acceptance (LOA) जारी गर्ने।',
      'LOA मा तोकिए बमोजिम १५ दिनभित्र कबोल अङ्कको ५% कार्यसम्पादन जमानत (Performance Security) प्राप्त गर्ने।',
      '८५% भन्दा बढी घटेर कबोल गरेको अवस्था भए नियमावली अनुसार अतिरिक्त कार्यसम्पादन जमानत लिनुपर्ने।',
      '१५ दिनभित्र द्विपक्षीय खरिद सम्झौता (Contract Agreement) मा हस्ताक्षर गर्ने र सम्झौताको सूचना e-GP मा प्रकाशन गर्ने।',
    ],
    entityChecklist: [
      'LOI मा सफल बोलपत्रदाताको नाम, ठेगाना र कबोल रकम स्पष्ट छ?',
      '७ दिनको Standstill Period कडा रूपमा गणना गरिएको छ (मिति गणनामा अन्तिम दिन बिदा परे अर्को दिन)?',
      'कार्यसम्पादन जमानत नेपालको वाणिज्य बैंकबाट जारी वा काउन्टर ग्यारेन्टी भएको छ?',
      'जमानतको म्याद सम्झौता अवधि + वारेन्टी अवधि सम्म मान्य छ?',
      '१५ दिनभित्र सम्झौता हस्ताक्षर सम्पन्न गरी e-GP मा Contract Award प्रकाशित गरिएको छ?',
    ],
    bidderDuties: [
      'LOI जारी भएपछि आफ्नो स्थिति हेर्ने; यदि मूल्याङ्कनमा गैरकानूनी त्रुटि भएको लागेमा ७ दिनभित्र कार्यालय प्रमुख समक्ष उजुरी दिने।',
      'कार्यालय प्रमुखको निर्णय चित्त नबुझे ७ दिनभित्र कबोल अङ्कको ०.१५% (बढीमा रु ५ लाख) नगद धरौटी राखी PPRC मा पुनरावलोकन निवेदन दिने।',
      'सफल भएको अवस्थामा LOA प्राप्त हुनासाथ १५ दिनभित्र ५% कार्यसम्पादन जमानत बैंकबाट जारी गराई सम्झौताका लागि उपस्थित हुने।',
      'सम्झौता गर्न समयमै नआएमा बिड सेक्युरिटी जफत हुने र १ देखि ३ वर्षसम्म कालोसूचीमा पर्ने कानूनी जोखिमप्रति सचेत रहने।',
    ],
    bidderChecklist: [
      'हाम्रो बैंकले १५ दिनभित्र Performance Security जारी गर्न पूर्व-स्वीकृति दिएको छ?',
      'सम्झौतामा हस्ताक्षर गर्न अख्तियारप्राप्त प्रतिनिधि (Authorized Signatory) को Power of Attorney तयार छ?',
      'यदि पुनरावलोकनमा जाने भए ७ दिनको हदम्याद र PPRC धरौटी भौचर तयार छ?',
    ],
    requiredDocuments: [
      'आशयको सूचना पत्र (Letter of Intent - LOI)',
      'e-GP मा LOI पब्लिकेशन स्क्रिनसट तथा बोलपत्रदातालाई पठाइएको इमेल',
      'स्वीकृतिको पत्र (Letter of Acceptance - LOA / Notification of Award)',
      'कार्यसम्पादन जमानत (Performance Security Guarantee)',
      'द्विपक्षीय खरिद सम्झौता पत्र (Signed Contract Agreement)',
      'उजुरी परेको भए कार्यालय प्रमुखको निर्णय वा PPRC को फैसला प्रतिलिपि',
    ],
    criticalMistakesAndRisks: [
      '७ दिनको Standstill Period नसकिँदै हतार-हतार सम्झौता गर्नु, जसले गर्दा PPRC ले सम्पूर्ण सम्झौता खारेज गरिदिने जोखिम हुनु।',
      'कार्यसम्पादन जमानतको म्याद सम्झौता अवधिसम्म मात्र राख्नु (वारेन्टी अवधिसम्म मान्य नहुनु)।',
      'पहिलो न्यूनतमले सम्झौता नगरेमा दोस्रोलाई स्वतः सम्झौता गर्न बोलाउनु, जबकि ऐन अनुसार पहिलोको धरौटी जफत गरी दोस्रोको मूल्य विश्लेषण गरेर मात्र निर्णय गर्नुपर्छ।',
    ],
    ppmoOpinionsAndPprcRulings: [
      {
        caseTitle: 'PPRC निर्णय: Floodlight खरिद - दफा २७(३) र LOI म्याद उल्लङ्घन',
        decisionSummary: '७ दिनको LOI म्याद र पुनरावलोकनको मौका नदिई सम्झौता गरिएमा त्यस्तो सम्झौता कानून विपरीत ठहरिन्छ। Standstill Period को अनिवार्य पालना हुनैपर्छ।',
        relevance: 'दफा २७(२) र २७(३) को पालना सम्झौताको पूर्वसर्त हो।',
      },
      {
        caseTitle: 'PPMO राय: Performance Security म्याद सकिएमा कारबाही सम्बन्धी',
        decisionSummary: 'सम्झौता कार्यान्वयन हुनु अगावै वा कार्य सम्पन्न नहुँदै कार्यसम्पादन जमानतको म्याद सकिन लागेमा आपूर्तिकर्ताले म्याद थप नगरे सो जमानत तत्काल दाबी गरी जफत गर्नुपर्छ।',
        relevance: 'नियम ११०क को जमानत व्यवस्थापन।',
      },
    ],
    practicalFeatures: {
      title: 'Contract Award & Signing Checklist',
      description: 'LOI म्याद गणना, Standstill Period, Performance Security प्रमाणीकरण र सम्झौता हस्ताक्षरको कानुनी चेकलिस्ट।',
    },
    officialSources: [
      { title: 'सार्वजनिक खरिद ऐन, २०६३ (दफा २७, ४७, ४९)', url: 'https://ppmo.gov.np/category/acts-regulations/' },
      { title: 'सार्वजनिक खरिद पुनरावलोकन समिति (PPRC) निर्णयहरू', url: 'https://pprc.gov.np' },
    ],
  },
  {
    id: 6,
    stageNo: 6,
    titleNepali: 'चरण ६: सम्झौता कार्यान्वयन र आपूर्ति व्यवस्थापन',
    titleEnglish: 'Stage 6: Contract Execution, L/C, Shipment & Delivery Tracking',
    objective: 'प्रतीतपत्र (L/C) खोल्ने, ढुवानी अनुगमन गर्ने, Pre-shipment/Arrival Inspection गर्ने र समयमै गुणस्तरीय आपूर्ति लिने।',
    responsibleEntity: 'आयोजना प्रमुख, खरिद एकाइ, निरीक्षण तथा जाँचपास समिति, बैंक',
    timelineDays: 'सम्झौतामा तोकिएको डेलिभरी अवधि (सामान्यतया ६० देखि १२० दिन)',
    legalBasisAct: 'सार्वजनिक खरिद ऐन, २०६३ को दफा ५२ (सम्झौता संशोधन/भेरिएसन), दफा ५६ (निरीक्षण र दाखिला)',
    legalRuleSection: 'सार्वजनिक खरिद नियमावली, २०६४ को नियम ११५ (निरीक्षण), नियम ११८ (भेरिएसन), नियम १२१ (ढिलाइ र LD)',
    sbdClauses: 'Goods ICB SBD Section VII (GCC 12, 13, 15, 26, 27 - Delivery, Inspections, Liquidated Damages, Warranty)',
    entityDuties: [
      'सम्झौता भएपछि आपूर्तिकर्ताको नाममा irrevocable Letter of Credit (L/C) नेपाल राष्ट्र बैंकको निर्देशन अनुसार खोल्ने।',
      'Performance Security को निरन्तर वैधता अनुगमन गर्ने र आवश्यक परे म्याद थप गराउने।',
      'आपूर्तिकर्ताबाट ढुवानी तालिका, Bill of Lading / Airway Bill र ट्रान्जिट विवरण निरन्तर ट्र्याक गर्ने।',
      'सम्झौतामा उल्लेख भए बमोजिम Pre-shipment Inspection (PSI) वा Factory Acceptance Test (FAT) गराउने।',
      'नेपाल भन्सार बिन्दु (Kolkata/Birgunj/TIA) मा सामान आइपुगेपछि भन्सार क्लियरेन्स र कर छुट (यदि सम्झौतामा भए) समन्वय गर्ने।',
      'सामान कार्यस्थलमा आइपुगेपछि प्राविधिक निरीक्षण तथा परीक्षण (Inspection & Testing) गरी Goods Receipt Note (GRN) जारी गर्ने।',
      'ढिलाइ भएमा सम्झौता अनुसार Liquidated Damages (प्रति दिन ०.०५%, अधिकतम १०%) कट्टा गर्ने।',
      'जडान (Installation), कमिसनिङ र कर्मचारी तालिम सम्पन्न गरी Provisional Acceptance Certificate जारी गर्ने।',
    ],
    entityChecklist: [
      'L/C का सर्तहरू सम्झौताका सर्तहरूसँग शतप्रतिशत मेल खान्छन्?',
      'ढुवानीका सम्पूर्ण कागजातहरू (B/L, Commercial Invoice, Packing List, Certificate of Origin) प्राप्त छन्?',
      'सामान सम्झौतामा तोकिएको Incoterm बिन्दुमा सही अवस्थामा आइपुगेको छ?',
      'प्राविधिक जाँचपास समितिले स्पेसिफिकेसन अनुसार गुणस्तर परीक्षण गरेको छ?',
      'ढिलाइ भएको अवस्थामा Liquidated Damages (LD) गणना गरी कट्टा गरिएको छ?',
    ],
    bidderDuties: [
      'सम्झौता अनुसारको समयतालिका भित्र उत्पादन सम्पन्न गरी गुणस्तरीय प्याकिङ र मार्किङ गर्ने।',
      'L/C प्राप्त भएपछि सर्तहरू जाँच्ने र कुनै संशोधन (Amendment) चाहिए तुरुन्त अनुरोध गर्ने।',
      'अन्तर्राष्ट्रिय ढुवानीकर्ता (Freight Forwarder) मार्फत सुरक्षित ढुवानी र ११०% CIP बीमा कभरेज सुनिश्चित गर्ने।',
      'सामान नेपाल आइपुगेपछि समयमै साइटमा डेलिभरी, अनलोडिङ र प्राविधिक जडान सम्पन्न गर्ने।',
      'वारेन्टी दायित्व अनुसार सम्झौता अवधिभर स्पेयर पार्ट्स र मर्मत सेवा उपलब्ध गराउने।',
    ],
    bidderChecklist: [
      'L/C मा उल्लिखित कागजातहरू र मितिहरू (Latest Shipment Date) पालना भएका छन्?',
      'Certificate of Origin र Manufacturer Quality Test Certificate संलग्न छन्?',
      'ढुवानीमा क्षति भए दाबी गर्न ट्रान्जिट बीमा पोलिसी सक्रिय छ?',
      'जडान र कमिसनिङका लागि दक्ष इन्जिनियर साइटमा परिचालित छन्?',
    ],
    requiredDocuments: [
      'प्रतीतपत्र (Letter of Credit - L/C) प्रतिलिपि',
      'ढुवानी कागजातहरू (Bill of Lading / Airway Bill, Commercial Invoice, Packing List)',
      'उत्पत्ति प्रमाणपत्र (Certificate of Origin)',
      'बीमा प्रमाणपत्र (Insurance Certificate - 110% CIP Value)',
      'Pre-shipment Inspection / FAT प्रतिवेदन',
      'जिन्सी दाखिला प्रतिवेदन (Goods Receipt Note - GRN)',
      'जाँचपास तथा स्वीकारोक्ति प्रमाणपत्र (Provisional Acceptance Certificate)',
    ],
    criticalMistakesAndRisks: [
      'L/C का सर्त र खरिद सम्झौताका सर्तबीच अन्तरविरोध हुँदा बैंकबाट कागजात अस्वीकृत (Discrepancy) भई सामान पोर्टमै अड्किनु र डेमरेज लाग्नु।',
      'सामान आइपुगेपछि प्राविधिक परीक्षण नगरी सिधै दाखिला गर्दा पछि गुणस्तरहीन वा नक्कली सामान भेटिनु।',
      'म्याद थप नगरी आपूर्तिकर्तालाई सामान आपूर्ति गर्न लगाउनु, जसले पछि भुक्तानीमा महालेखा परीक्षकको बेरुजु आउनु।',
    ],
    ppmoOpinionsAndPprcRulings: [
      {
        caseTitle: 'PPRC निर्णय: DOHS/G/ICB-75.4 - उच्चस्तरीय अल्ट्रासाउन्ड डेलिभरी र कमिसनिङ',
        decisionSummary: 'सामान आपूर्ति भए पनि सम्झौता अनुसार जडान, परीक्षण र अस्पतालमा कमिसनिङ सम्पन्न नभएसम्म आपूर्ति पूर्ण भएको मानिँदैन र अन्तिम भुक्तानी दिन मिल्दैन।',
        relevance: 'Installation र Acceptance को कानुनी अनिवार्यता।',
      },
      {
        caseTitle: 'PPMO राय: विदेशी सामानको भन्सार महसुल र विवाद समाधान',
        decisionSummary: 'ICB सम्झौतामा भन्सार महसुल कसले व्यहोर्ने भन्ने सर्त Incoterms र SCC अनुसार किटान हुनुपर्छ। आपूर्तिकर्ताको दायित्व भए खरिदकर्ताले तिर्न मिल्दैन।',
        relevance: 'Incoterms र कर दायित्वको कडा पालना।',
      },
    ],
    practicalFeatures: {
      title: 'Delivery Tracking Checklist & Contract Management Dashboard',
      description: 'L/C खोल्ने, ढुवानी ट्र्याकिङ, भन्सार क्लियरेन्स, प्राविधिक जाँचपास र LD क्याल्कुलेटर।',
    },
    officialSources: [
      { title: 'सार्वजनिक खरिद नियमावली, २०६४ (नियम ११५, ११८, १२१)', url: 'https://ppmo.gov.np/category/acts-regulations/' },
      { title: 'नेपाल राष्ट्र बैंक - विदेशी विनिमय व्यवस्थापन (L/C नियमावली)', url: 'https://www.nrb.org.np' },
    ],
  },
  {
    id: 7,
    stageNo: 7,
    titleNepali: 'चरण ७: भुक्तानी, दाबी र सम्झौता सम्पन्न (Contract Closure)',
    titleEnglish: 'Stage 7: Payment, Claims, Warranty Management & Contract Closure',
    objective: 'सम्झौता सर्त अनुसार L/C मार्फत भुक्तानी फछ्र्यौट गर्ने, वारेन्टी व्यवस्थापन गर्ने, जमानत फुकुवा र सम्झौता अन्त्य गर्ने।',
    responsibleEntity: 'लेखा शाखा, खरिद एकाइ, कार्यालय प्रमुख, बैंक',
    timelineDays: 'दाखिला र स्वीकारोक्ति भएको ३० दिनभित्र अन्तिम भुक्तानी (नियम १२३)',
    legalBasisAct: 'सार्वजनिक खरिद ऐन, २०६३ को दफा ५६ (भुक्तानी), दफा ५८ (विवाद समाधान)',
    legalRuleSection: 'सार्वजनिक खरिद नियमावली, २०६४ को नियम १२३ (भुक्तानीको समयसीमा), नियम १२५ (विवाद समाधान)',
    sbdClauses: 'Goods ICB SBD Section VII (GCC 16 - Payment, GCC 28 - Warranty, GCC 32 - Force Majeure, GCC 33 - Disputes)',
    entityDuties: [
      'स्वीकृत Acceptance Certificate र दाखिला प्रतिवेदनका आधारमा L/C मार्फत वा सिधै बैंक ट्रान्सफरबाट भुक्तानी प्रक्रिया अघि बढाउने।',
      'सम्झौतामा उल्लिखित भुक्तानी तालिका (जस्तै: ८०% कागजात प्राप्त भएपछि, २०% जडान र स्वीकारोक्तिपछि) अनुसार फछ्र्यौट गर्ने।',
      'ढिलाइ भएको भए सम्झौता अनुसारको Liquidated Damages (LD) रकम बिलबाट कट्टा गर्ने।',
      'सम्झौता अवधिभर वारेन्टी दाबी (Warranty Claims) को नियमित अनुगमन गर्ने र सामान बिग्रिएमा आपूर्तिकर्ताबाट निःशुल्क मर्मत वा प्रतिस्थापन गराउने।',
      'वारेन्टी अवधि सफलतापूर्वक समाप्त भएपछि आपूर्तिकर्ताको Performance Security फुकुवा (Release) गर्ने।',
      'विवाद उत्पन्न भएमा सम्झौतामा तोकिएको Dispute Resolution (Adjudication / Arbitration) संयन्त्र अवलम्बन गर्ने।',
      'सम्पूर्ण कागजातहरूको अन्तिम फाइल, Audit Trail तयार गरी ठेक्का विधिवत सम्पन्न (Contract Closed) गर्ने।',
    ],
    entityChecklist: [
      'सम्पूर्ण सामान दाखिला भई Final Acceptance Certificate जारी भएको छ?',
      'भुक्तानीका लागि आवश्यक सबै प्रमाणित बिल, भरपाई र बैंक कागजात संलग्न छन्?',
      'लागू हुने Liquidated Damages (LD) वा अन्य कट्टी रकम घटाइएको छ?',
      'वारेन्टी अवधिभर Performance Security बैंकमा सुरक्षित र सक्रिय राखिएको छ?',
      'अन्तिम भुक्तानी पश्चात् लेखापरीक्षण (Internal/Final Audit) का लागि कागजात व्यवस्थित छन्?',
    ],
    bidderDuties: [
      'सम्झौता अनुसारका सम्पूर्ण बिल, इन्भ्वाइस र प्रमाणित Acceptance Certificates समयमै पेश गर्ने।',
      'L/C मार्फत भुक्तानी प्राप्त गर्न आफ्ना बैंक कागजातहरू क्लिन र त्रुटिरहित पेश गर्ने।',
      'वारेन्टी अवधिभर सम्झौतामा तोकिएको Response Time भित्र प्राविधिक सेवा र स्पेयर पार्ट्स उपलब्ध गराउने।',
      'वारेन्टी अवधि सकिएपछि आफ्नो Performance Security फिर्ता लिन सार्वजनिक निकायमा लिखित अनुरोध पेश गर्ने।',
    ],
    bidderChecklist: [
      'बैंकमा पेश गरिएका कागजातमा कुनै Discrepancy छैन?',
      'नेपाल सरकारको नियमानुसार लाग्ने अग्रिम कर वा कट्टीको विवरण बुझिएको छ?',
      'वारेन्टी सेवा प्रदान गर्न स्थानीय प्राविधिक संयन्त्र तयारी अवस्थामा छ?',
    ],
    requiredDocuments: [
      'वाणिज्य इन्भ्वाइस (Commercial Invoice)',
      'अन्तिम स्वीकारोक्ति प्रमाणपत्र (Final Acceptance Certificate)',
      'बैंक भुक्तानी फछ्र्यौट पत्र (L/C Settlement Advice)',
      'कर कट्टी तथा लेखा दाखिला प्रमाण (TDS / Tax Deductions)',
      'कार्यसम्पादन जमानत फुकुवा पत्र (Performance Security Release Letter)',
      'सम्झौता समाप्ति प्रतिवेदन (Contract Completion & Closure Report)',
    ],
    criticalMistakesAndRisks: [
      'Acceptance Certificate नहुँदै वा सामानमा प्राविधिक कैफियत छँदै L/C को शतप्रतिशत रकम भुक्तानी फुकुवा गरिदिनु।',
      'वारेन्टी अवधि बाँकी छँदै आपूर्तिकर्ताको कार्यसम्पादन जमानत फिर्ता गर्नु, जसले गर्दा पछि सामान बिग्रिँदा मर्मत गराउन नसकिनु।',
      'विवाद पर्दा सम्झौतामा उल्लिखित Arbitration प्रक्रिया बेवास्ता गरी सिधै अदालत जानु, जसले समय र स्रोतको बर्बादी हुनु।',
    ],
    ppmoOpinionsAndPprcRulings: [
      {
        caseTitle: 'PPRC निर्णय: Skimmed Milk Powder ICB - सम्झौता रद्द र भुक्तानी विवाद',
        decisionSummary: 'सारभूत रूपमा प्रभावग्राही ठहरिएको बोलपत्रदातासँग कानुन विपरीत सम्झौता नगर्ने वा भुक्तानी रोक्ने निर्णय गर्न पाइँदैन। राज्यलाई क्षति पुग्ने गरी गरिएको निर्णय बदरयोग्य हुन्छ।',
        relevance: 'कानूनसम्मत खरिद कार्यान्वयन र भुक्तानीको दायित्व।',
      },
      {
        caseTitle: 'PPMO राय: सम्झौता सम्पन्न र जमानत फिर्ता सम्बन्धी',
        decisionSummary: 'खरिद सम्झौताका सम्पूर्ण दायित्वहरू (आपूर्ति, जडान, वारेन्टी) पूरा भएपछि निकायले बिना कारण आपूर्तिकर्ताको जमानत रोकेर राख्न मिल्दैन; तुरुन्त फुकुवा गर्नुपर्छ।',
        relevance: 'नियम ११०क अनुसार समयमै जमानत फिर्ताको अनिवार्यता।',
      },
    ],
    practicalFeatures: {
      title: 'Final Payment & Contract Closure Checklist',
      description: 'L/C भुक्तानी, कर कट्टी, वारेन्टी ट्र्याकिङ र जमानत फुकुवाको अन्तिम परीक्षण चेकलिस्ट।',
    },
    officialSources: [
      { title: 'सार्वजनिक खरिद ऐन, २०६३ (दफा ५६ र ५८)', url: 'https://ppmo.gov.np/category/acts-regulations/' },
      { title: 'PPMO Standard Contract Management Directives', url: 'https://ppmo.gov.np' },
    ],
  },
];

// --------------------------------------------------------------------------
// 2. INCOTERMS 2020 MODULE (11 RULES WITH GOODS ICB INTEGRATION)
// --------------------------------------------------------------------------
export const INCOTERMS_2020_RULES: IncotermRule[] = [
  // Any Mode of Transport (7 Rules)
  {
    code: 'EXW',
    nameEnglish: 'Ex Works',
    nameNepali: 'एक्स वर्क्स (उत्पादकको कारखानामा डेलिभरी)',
    category: 'any-mode',
    deliveryPoint: 'आपूर्तिकर्ताको कारखाना, गोदाम वा प्लान्ट (नेपाल बाहिर वा भित्र)',
    riskTransferPoint: 'आपूर्तिकर्ताको गोदाममै खरिदकर्तालाई सामान उपलब्ध गराउनासाथ जोखिम सर्छ।',
    freightResponsibility: 'सम्पूर्ण अन्तर्राष्ट्रिय र स्थानीय ढुवानी खर्च खरिदकर्ता (सार्वजनिक निकाय) ले व्यहोर्नुपर्छ।',
    insuranceLiability: 'बीमाको सम्पूर्ण जिम्मेवारी खरिदकर्ताको हुन्छ।',
    exportCustoms: 'निर्यात भन्सार क्लियरेन्स समेत खरिदकर्ताकै दायित्व हुन्छ।',
    importCustoms: 'नेपाल भन्सार क्लियरेन्स खरिदकर्ताकै दायित्व हुन्छ।',
    loadingUnloading: 'आपूर्तिकर्ताको गोदाममा गाडीमा लोड गर्ने जिम्मेवारी समेत खरिदकर्ताको हुन्छ।',
    nepalContextUsage: 'नेपालका सार्वजनिक निकायहरूले सामान्यतया ICB मा EXW प्रयोग गर्दैनन् किनकि विदेशमा ढुवानी र निर्यात भन्सार गर्न निकायसँग अन्तर्राष्ट्रिय संयन्त्र हुँदैन।',
    entityGuidance: 'अत्यन्त विशेष अवस्था बाहेक सरकारी निकायले EXW मा सामान खरिद नगर्नुहोस्; सम्पूर्ण अन्तर्राष्ट्रिय जोखिम निकायमै पर्छ।',
    bidderPricingGuidance: 'कारखानाबाट सामान हस्तान्तरण गर्ने लागत मात्र जोड्ने; ढुवानी र भन्सार खर्च समावेश नगर्ने।',
    practicalExample: 'जापानको टोकियोस्थित कारखानामा सामान हस्तान्तरण; काठमाडौंसम्म ल्याउने सम्पूर्ण ढुवानी र भन्सार नेपाल सरकारले गर्नुपर्ने।',
    sbdClausesMapping: 'Goods ICB SBD मा EXW सामान्यतया स्थानीय सामानका लागि मात्र वैकल्पिक रूपमा प्रयोग हुन्छ (Price Schedule 1 vs 2)।',
  },
  {
    code: 'FCA',
    nameEnglish: 'Free Carrier',
    nameNepali: 'फ्रि क्यारियर (तोकिएको क्यारियरलाई हस्तान्तरण)',
    category: 'any-mode',
    deliveryPoint: 'आपूर्तिकर्ताको देशमा खरिदकर्ताले तोकेको ट्रान्सपोर्टर/क्यारियरको गोदाम वा टर्मिनल',
    riskTransferPoint: 'तोकिएको क्यारियरलाई सामान हस्तान्तरण गर्नासाथ जोखिम सर्छ।',
    freightResponsibility: 'क्यारियरसम्म आपूर्तिकर्ताको; त्यसपछिको सम्पूर्ण अन्तर्राष्ट्रिय ढुवानी खरिदकर्ताको।',
    insuranceLiability: 'अन्तर्राष्ट्रिय ढुवानी बीमा खरिदकर्ताको।',
    exportCustoms: 'निर्यात भन्सार आपूर्तिकर्ताले गर्छ।',
    importCustoms: 'नेपाल भन्सार खरिदकर्ताले गर्छ।',
    loadingUnloading: 'आपूर्तिकर्ताको परिसर भए लोड गर्ने जिम्मा आपूर्तिकर्ताको; अन्यत्र भए अनलोड गर्ने जिम्मा खरिदकर्ताको।',
    nepalContextUsage: 'हवाई ढुवानी (Air Cargo) वा बहु-मोडल यातायातमा विदेशबाट सामान मगाउँदा प्रयोग हुनसक्छ।',
    entityGuidance: 'निकायले आफ्नै Freight Forwarder नियुक्त गरी हवाई मार्गबाट महँगो औषधि वा औजार ल्याउँदा प्रयोग गर्न सकिन्छ।',
    bidderPricingGuidance: 'निर्यात भन्सार र तोकिएको टर्मिनलसम्मको ढुवानी लागत मूल्यमा समावेश गर्ने।',
    practicalExample: 'जर्मनीको फ्रान्कफर्ट एयरपोर्टको कार्गो टर्मिनलमा सामान हस्तान्तरण; त्यहाँबाट काठमाडौंको एयर कार्गो भाडा निकायले तिर्ने।',
    sbdClausesMapping: 'Goods ICB ITB 14/15 मा उल्लेख गर्न सकिने बहु-मोडल नियम।',
  },
  {
    code: 'CPT',
    nameEnglish: 'Carriage Paid To',
    nameNepali: 'क्यारेज पेड टु (तोकिएको गन्तव्यसम्म ढुवानी भाडा भुक्तान)',
    category: 'any-mode',
    deliveryPoint: 'आपूर्तिकर्ताले पहिलो क्यारियरलाई सामान हस्तान्तरण गर्दा डेलिभरी हुन्छ तर ढुवानी नेपालको तोकिएको ठाउँसम्म आपूर्तिकर्ताले तिर्छ।',
    riskTransferPoint: 'पहिलो क्यारियरलाई सामान सुम्पेपछि नै जोखिम खरिदकर्तामा सर्छ (भाडा तिरे पनि जोखिम पहिले नै सर्छ)।',
    freightResponsibility: 'नेपालको तोकिएको गन्तव्य (e.g. Kathmandu/Birgunj) सम्मको ढुवानी भाडा आपूर्तिकर्ताले तिर्छ।',
    insuranceLiability: 'आपूर्तिकर्ताले बीमा किन्न बाध्य छैन; जोखिम खरिदकर्तामै हुने हुँदा खरिदकर्ताले बीमा गर्नुपर्छ।',
    exportCustoms: 'निर्यात भन्सार आपूर्तिकर्ताको।',
    importCustoms: 'नेपाल भन्सार खरिदकर्ताको।',
    loadingUnloading: 'अन्तर्राष्ट्रिय अनलोडिङ सम्झौता बमोजिम।',
    nepalContextUsage: 'CIP को सट्टा कहिलेकाहीँ प्रयोग हुन्छ तर बीमा खरिदकर्ताले व्यहोर्नुपर्ने हुँदा निकायहरू कम प्राथमिकता दिन्छन्।',
    entityGuidance: 'जोखिम पहिलो क्यारियरमै सर्ने तर बीमा आपूर्तिकर्ताले नगर्ने हुँदा CPT को सट्टा सधैं CIP रोज्नु उपयुक्त हुन्छ।',
    bidderPricingGuidance: 'तोकिएको गन्तव्यसम्मको ढुवानी भाडा जोड्ने तर बीमा खर्च समावेश नगर्ने।',
    practicalExample: 'चीनको सांघाइबाट काठमाडौंसम्मको ढुवानी भाडा आपूर्तिकर्ताले तिर्ने; तर बाटोको जोखिमको बीमा निकायले गर्नुपर्ने।',
    sbdClausesMapping: 'Goods ICB SBD Section I ITB 15.7 मा उल्लेखित प्रावधान।',
  },
  {
    code: 'CIP',
    nameEnglish: 'Carriage and Insurance Paid to',
    nameNepali: 'सि.आइ.पी. (ढुवानी तथा ११०% "All Risks" बीमा सहित गन्तव्यसम्म)',
    category: 'any-mode',
    deliveryPoint: 'नेपालको तोकिएको अन्तिम गन्तव्य (Named Place of Destination: e.g. Project Site, Kathmandu, Birgunj Dry Port)',
    riskTransferPoint: 'पहिलो क्यारियरलाई सामान सुम्पेपछि जोखिम सर्छ, तर आपूर्तिकर्ताले गन्तव्यसम्मको सम्पूर्ण "All Risks" बीमा गरिदिनुपर्छ।',
    freightResponsibility: 'नेपालको तोकिएको अन्तिम परियोजना स्थलसम्मको सम्पूर्ण ढुवानी भाडा आपूर्तिकर्ताले तिर्छ।',
    insuranceLiability: 'आपूर्तिकर्ताले अनिवार्य रूपमा सम्झौता मूल्यको ११०% रकम बराबरको Institute Cargo Clauses (A) "All Risks" बीमा गरिदिनुपर्छ।',
    exportCustoms: 'निर्यात भन्सार क्लियरेन्स आपूर्तिकर्ताको दायित्व।',
    importCustoms: 'नेपालको आयात भन्सार महसुल र भ्याट खरिदकर्ताको (वा सम्झौता अनुसार)।',
    loadingUnloading: 'गन्तव्यमा अनलोडिङ सम्झौताको SCC अनुसार।',
    nepalContextUsage: 'नेपालको सार्वजनिक खरिदमा Goods ICB SBD को लागि सबैभन्दा बढी प्रयोग हुने आधिकारिक Incoterm!',
    entityGuidance: 'नेपाल भूपरिवेष्ठित देश भएकोले र बहु-मोडल (समुद्र + रेल + सडक) ढुवानी हुने हुँदा CIP Project Site सबैभन्दा सुरक्षित विकल्प हो।',
    bidderPricingGuidance: 'कारखाना मूल्य + निर्यात कर + समुद्री भाडा + कोलकाता पोर्ट ह्यान्डलिङ + नेपालसम्मको सडक/रेल ढुवानी + ११०% "All Risks" बीमा लागत समावेश गर्ने।',
    practicalExample: 'दक्षिण कोरियाबाट काठमाडौंसम्म ट्रान्सफर हुने सामान; कोलकाता बन्दरगाह हुँदै वीरगञ्जबाट काठमाडौंसम्मको सम्पूर्ण ढुवानी र बीमा कोरियाली आपूर्तिकर्ताले व्यहोर्ने।',
    sbdClausesMapping: 'PPMO Goods ICB SBD ITB 15.6, ITB 15.7(b)(i), BDS ITB 15.7, GCC 42.8 मा अनिवार्य रूपमा तोकिएको Incoterm!',
  },
  {
    code: 'DAP',
    nameEnglish: 'Delivered at Place',
    nameNepali: 'डिलिभर्ड एट प्लेस (तोकिएको स्थानमा सवारी साधनबाट अनलोड गर्न तयार गरी डेलिभरी)',
    category: 'any-mode',
    deliveryPoint: 'नेपालको तोकिएको आयोजना स्थल वा गोदाममा आइपुगेको गाडीमा सामान उपलब्ध गराउने।',
    riskTransferPoint: 'तोकिएको गन्तव्यमा गाडीबाट अनलोड नगरी सामान उपलब्ध गराउनासाथ जोखिम खरिदकर्तामा सर्छ।',
    freightResponsibility: 'नेपालको गन्तव्यसम्मको सम्पूर्ण अन्तर्राष्ट्रिय तथा स्थानीय ढुवानी भाडा आपूर्तिकर्ताको।',
    insuranceLiability: 'आपूर्तिकर्ताले गन्तव्यसम्मको आफ्नै जोखिम ढाक्न बीमा गर्नुपर्छ।',
    exportCustoms: 'निर्यात भन्सार आपूर्तिकर्ताको दायित्व।',
    importCustoms: 'नेपाल भन्सार महसुल, भ्याट र क्लियरेन्स खरिदकर्ताको दायित्व।',
    loadingUnloading: 'गन्तव्यमा गाडीबाट अनलोड गर्ने खर्च र जोखिम खरिदकर्ता (निकाय) को हुन्छ।',
    nepalContextUsage: 'विदेशबाट सामान सीधै प्रोजेक्ट साइटमा मगाउँदा तर भन्सार निकाय आफैँले तिर्ने अवस्थामा प्रयोग हुन्छ।',
    entityGuidance: 'सामान साइटमै आइपुगेपछि मात्र जोखिम सर्ने हुँदा निकायका लागि अत्यन्त सुरक्षित हुन्छ।',
    bidderPricingGuidance: 'साइटसम्म पुग्ने सम्पूर्ण यातायात र बीमा जोड्ने तर नेपाल भन्सार र अनलोडिङ खर्च नजोड्ने।',
    practicalExample: 'भारत वा विदेशबाट पोखरा अन्तर्राष्ट्रिय विमानस्थलको साइटसम्म सामान ढुवानी; पोखरामा अनलोड निकायले गर्ने।',
    sbdClausesMapping: 'Goods ICB SBD BDS मा विशेष खरिदको लागि छनोट गर्न सकिने Incoterm।',
  },
  {
    code: 'DPU',
    nameEnglish: 'Delivered at Place Unloaded',
    nameNepali: 'डिलिभर्ड एट प्लेस अनलोडेड (तोकिएको स्थानमा अनलोड समेत गरी डेलिभरी)',
    category: 'any-mode',
    deliveryPoint: 'नेपालको तोकिएको आयोजना स्थल वा गोदाममा सामान गाडीबाट सुरक्षित अनलोड गरिसकेपछि डेलिभरी हुन्छ।',
    riskTransferPoint: 'सामान गाडीबाट जमिनमा अनलोड गरिसकेपछि मात्र जोखिम खरिदकर्तामा सर्छ।',
    freightResponsibility: 'सम्पूर्ण ढुवानी र अनलोडिङको खर्च आपूर्तिकर्ताको।',
    insuranceLiability: 'अनलोडिङ अवधिसम्मको सम्पूर्ण बीमा आपूर्तिकर्ताले गर्नुपर्छ।',
    exportCustoms: 'निर्यात भन्सार आपूर्तिकर्ताको।',
    importCustoms: 'नेपाल भन्सार महसुल र क्लियरेन्स खरिदकर्ताको।',
    loadingUnloading: 'अनलोडिङको क्रेन, कामदार र सम्पूर्ण दायित्व आपूर्तिकर्ताको!',
    nepalContextUsage: 'भारी ट्रान्सफर्मर, टर्बाइन वा हेभी इक्विपमेन्ट जसलाई अनलोड गर्न विशेष क्रेन चाहिन्छ, त्यसमा प्रयोग हुन्छ।',
    entityGuidance: 'अनलोड गर्दा टुटफुट हुने जोखिम उच्च भएका गह्रुँगा मेसिनरीका लागि यो नियम सर्वोत्तम हुन्छ।',
    bidderPricingGuidance: 'साइटमा हेभी क्रेन भाडा र अनलोडिङ लेबर खर्च समेत मूल्यमा जोड्नुपर्छ।',
    practicalExample: 'हेटौंडा सबस्टेसनमा १०० टनको ट्रान्सफर्मर ल्याएर फाउन्डेसनमा अनलोड गरी हस्तान्तरण गर्ने।',
    sbdClausesMapping: 'Incoterms 2020 मा DAT (Delivered at Terminal) लाई प्रतिस्थापन गरी बनेको नयाँ नियम।',
  },
  {
    code: 'DDP',
    nameEnglish: 'Delivered Duty Paid',
    nameNepali: 'डिलिभर्ड ड्युटी पेड (नेपाल भन्सार, कर र ढुवानी सबै तिरेर साइटमा डेलिभरी)',
    category: 'any-mode',
    deliveryPoint: 'नेपालको तोकिएको आयोजना स्थल वा गोदाममा सम्पूर्ण कर तिरी अनलोडका लागि तयार।',
    riskTransferPoint: 'गन्तव्यमा सबै कर र भन्सार तिरी सामान उपलब्ध गराएपछि जोखिम सर्छ।',
    freightResponsibility: 'सम्पूर्ण अन्तर्राष्ट्रिय र स्थानीय ढुवानी आपूर्तिकर्ताको।',
    insuranceLiability: 'आपूर्तिकर्ताको दायित्व।',
    exportCustoms: 'निर्यात भन्सार आपूर्तिकर्ताको।',
    importCustoms: 'नेपाल भन्सार महसुल, अन्तशुल्क र भ्याट सबै आपूर्तिकर्ताले नै तिर्नुपर्छ!',
    loadingUnloading: 'अनलोडिङ खरिदकर्ताको।',
    nepalContextUsage: 'विदेशी बोलपत्रदाताको नेपालमा दर्ता नभएको अवस्थामा नेपाल भन्सार तिर्न कानूनी जटिलता हुनसक्छ, त्यसैले स्थानीय एजेन्ट भएको अवस्थामा मात्र सम्भव हुन्छ।',
    entityGuidance: 'निकायले कुनै झन्झट लिन नपर्ने भए पनि विदेशी कम्पनीले नेपालमा कर तिर्न नसक्ने व्यावहारिक समस्या आउन सक्छ।',
    bidderPricingGuidance: 'नेपालको भन्सार दर, १३% भ्याट र क्लियरेन्स एजेन्ट खर्च अनिवार्य रूपमा मूल्यमा जोड्ने।',
    practicalExample: 'काठमाडौंको मन्त्रालय परिसरमा सम्पूर्ण भन्सार र कर तिरेर कम्प्युटर उपकरण हस्तान्तरण।',
    sbdClausesMapping: 'Goods ICB SBD मा कर छुट नभएको र स्थानीय एजेन्ट मार्फत डेलिभरी लिने ठेक्कामा उपयुक्त।',
  },

  // Maritime / Inland Waterway Transport (4 Rules)
  {
    code: 'FAS',
    nameEnglish: 'Free Alongside Ship',
    nameNepali: 'फ्रि अलङसाइड सिप (पानीजहाजको छेउमा डेलिभरी)',
    category: 'maritime',
    deliveryPoint: 'निर्यात बन्दरगाह (Port of Shipment) मा तोकिएको पानीजहाजको छेउको डक वा बार्जमा।',
    riskTransferPoint: 'जहाजको छेउमा सामान राखिदिएपछि जोखिम खरिदकर्तामा सर्छ।',
    freightResponsibility: 'समुद्री ढुवानी र नेपालसम्मको सम्पूर्ण भाडा खरिदकर्ताको।',
    insuranceLiability: 'खरिदकर्ताको दायित्व।',
    exportCustoms: 'निर्यात भन्सार आपूर्तिकर्ताको।',
    importCustoms: 'नेपाल भन्सार खरिदकर्ताको।',
    loadingUnloading: 'जहाजमा लोड गर्ने खर्च खरिदकर्ताको।',
    nepalContextUsage: 'नेपालमा समुद्र नभएकोले नियमित मालसामानमा प्रयोग हुँदैन; केवल ठूलो बल्क कार्गो (मल, गहुँ) मा प्रयोग हुनसक्छ।',
    entityGuidance: 'नेपालका सार्वजनिक निकायले कन्टेनर कार्गोमा FAS प्रयोग गर्न मिल्दैन।',
    bidderPricingGuidance: 'बन्दरगाहको डकसम्म पुर्‍याउने खर्च मात्र समावेश गर्ने।',
    practicalExample: 'सिंगापुर बन्दरगाहमा पानीजहाजको छेउमा मलका बोरा राखिदिने।',
    sbdClausesMapping: 'Goods ICB मा सामान्यतया प्रयोग नहुने नियम।',
  },
  {
    code: 'FOB',
    nameEnglish: 'Free on Board',
    nameNepali: 'फ्रि अन बोर्ड (पानीजहाजमा लोड गरिसकेपछि डेलिभरी)',
    category: 'maritime',
    deliveryPoint: 'तोकिएको निर्यात बन्दरगाहमा पानीजहाजको डेकमा सामान लोड भएपछि।',
    riskTransferPoint: 'सामान पानीजहाजको डेकमा लोड हुनासाथ जोखिम खरिदकर्तामा सर्छ।',
    freightResponsibility: 'समुद्री भाडा र कोलकातादेखि नेपालसम्मको ढुवानी खरिदकर्ताको।',
    insuranceLiability: 'समुद्री र आन्तरिक बीमा खरिदकर्ताको।',
    exportCustoms: 'निर्यात भन्सार आपूर्तिकर्ताको।',
    importCustoms: 'नेपाल भन्सार खरिदकर्ताको।',
    loadingUnloading: 'जहाजमा लोड गर्ने जिम्मा आपूर्तिकर्ताको; अनलोडिङ खरिदकर्ताको।',
    nepalContextUsage: 'विदेशी दातृ निकायको ऋण/अनुदानमा नेपाल सरकारले आफैँ जहाज चार्टर गरी बल्क सामान ल्याउँदा बाहेक प्रयोग हुँदैन।',
    entityGuidance: 'कन्टेनरमा सामान आउँदा FOB को सट्टा FCA प्रयोग गर्न Incoterms 2020 ले स्पष्ट निर्देशन दिएको छ।',
    bidderPricingGuidance: 'जहाजमा लोड गर्नेसम्मको सम्पूर्ण लागत समावेश गर्ने; समुद्री भाडा नजोड्ने।',
    practicalExample: 'भारतको विशाखापट्टनम बन्दरगाहमा जहाजमा सामान लोड गरिदिने।',
    sbdClausesMapping: 'Goods ICB SBD मा बल्क खरिदमा मात्र वैकल्पिक।',
  },
  {
    code: 'CFR',
    nameEnglish: 'Cost and Freight',
    nameNepali: 'कस्ट एण्ड फ्रेट (कोलकाता बन्दरगाहसम्म समुद्री ढुवानी भाडा सहित)',
    category: 'maritime',
    deliveryPoint: 'निर्यात बन्दरगाहमा जहाजमा लोड हुँदा डेलिभरी हुन्छ तर समुद्री भाडा कोलकातासम्म आपूर्तिकर्ताले तिर्छ।',
    riskTransferPoint: 'निर्यात जहाजमा लोड हुनासाथ जोखिम सर्छ तर भाडा गन्तव्य बन्दरगाहसम्मको हुन्छ।',
    freightResponsibility: 'कोलकाता/हल्दिया बन्दरगाहसम्मको समुद्री ढुवानी भाडा आपूर्तिकर्ताको।',
    insuranceLiability: 'खरिदकर्ताले समुद्री बीमा गर्नुपर्छ (आपूर्तिकर्ताले बीमा गर्दैन)।',
    exportCustoms: 'निर्यात भन्सार आपूर्तिकर्ताको।',
    importCustoms: 'नेपाल भन्सार खरिदकर्ताको।',
    loadingUnloading: 'कोलकातामा अनलोडिङ सर्त अनुसार।',
    nepalContextUsage: 'नेपाल ल्याउने सामान कोलकाता बन्दरगाहसम्म समुद्री भाडा जोडेर ल्याउँदा प्रयोग हुन्छ तर बीमा खरिदकर्ताले गर्नुपर्छ।',
    entityGuidance: 'बीमाको जोखिम निकायमा रहने हुँदा CFR भन्दा CIF वा CIP धेरै सुरक्षित हुन्छ।',
    bidderPricingGuidance: 'कोलकाता बन्दरगाहसम्मको समुद्री भाडा जोड्ने तर बीमा नजोड्ने।',
    practicalExample: 'अमेरिकाबाट कोलकाता बन्दरगाहसम्म समुद्री भाडा आपूर्तिकर्ताले तिर्ने; कोलकाताबाट काठमाडौं ढुवानी र बीमा नेपालको निकायले गर्ने।',
    sbdClausesMapping: 'Goods ICB SBD मा गैर-कन्टेनर समुद्री ढुवानीमा लागू हुने।',
  },
  {
    code: 'CIF',
    nameEnglish: 'Cost, Insurance and Freight',
    nameNepali: 'सि.आइ.एफ. (कोलकाता बन्दरगाहसम्म लागत, समुद्री बीमा र ढुवानी भाडा सहित)',
    category: 'maritime',
    deliveryPoint: 'निर्यात बन्दरगाहमा जहाजमा लोड हुँदा डेलिभरी हुन्छ तर कोलकाता बन्दरगाहसम्मको भाडा र न्यूनतम समुद्री बीमा आपूर्तिकर्ताले गरिदिन्छ।',
    riskTransferPoint: 'निर्यात जहाजमा लोड हुनासाथ जोखिम सर्छ तर बीमा आपूर्तिकर्ताले गरिदिएको हुन्छ।',
    freightResponsibility: 'कोलकाता/हल्दिया बन्दरगाह (Port of Destination) सम्मको समुद्री भाडा आपूर्तिकर्ताको।',
    insuranceLiability: 'आपूर्तिकर्ताले न्यूनतम Institute Cargo Clauses (C) बीमा गरिदिनुपर्छ (११०% मूल्य)।',
    exportCustoms: 'निर्यात भन्सार आपूर्तिकर्ताको।',
    importCustoms: 'नेपाल भन्सार खरिदकर्ताको।',
    loadingUnloading: 'कोलकाता बन्दरगाहमा अनलोडिङ सम्झौता अनुसार।',
    nepalContextUsage: 'नेपालका निकायहरूले ऐतिहासिक रूपमा कोलकाता बन्दरगाहसम्म CIF Kolkata Port धेरै प्रयोग गर्दै आएका छन् तर कोलकातादेखि नेपालसम्मको जोखिम र ढुवानी निकायले व्यहोर्नुपर्छ।',
    entityGuidance: 'कोलकाता बन्दरगाहबाट नेपालसम्म आन्तरिक ढुवानी र ट्रान्जिटको झन्झट निकायले लिनुभन्दा सीधै CIP Kathmandu / CIP Project Site गर्नु धेरै उत्तम हुन्छ।',
    bidderPricingGuidance: 'कोलकाता बन्दरगाहसम्मको समुद्री भाडा र समुद्री बीमा लागत मूल्यमा जोड्ने।',
    practicalExample: 'रासायनिक मल वा फलाम आयात गर्दा CIF Kolkata Port; कोलकाताबाट नेपाल ल्याउने रेल ढुवानी नेपाल सरकारले गर्ने।',
    sbdClausesMapping: 'Goods ICB SBD ITB 15.7(b)(i) मा CIF Seaport उल्लेख गर्न सकिने प्रावधान छ।',
  },
];

// --------------------------------------------------------------------------
// 3. GOODS ICB VS WORKS ICB (INCOTERMS & CONTRACTUAL DIFFERENCES)
// --------------------------------------------------------------------------
export const ICB_GOODS_VS_WORKS_DIFFERENCES = {
  goodsIcb: {
    title: 'Goods ICB (मालसामान अन्तर्राष्ट्रिय बोलपत्र)',
    sbdFramework: 'PPMO Goods ICB SBD (Single Stage Two Envelope वा Single Stage One Envelope)',
    incotermsApplicability: 'Incoterms अनिवार्य रूपमा लागू हुन्छ (विशेष गरी CIP Project Site / CIF Kolkata)। ITB 15.6 र BDS ले Incoterms 2020 लाई वैधानिक स्वीकार गरेको छ।',
    deliveryFocus: 'सामानको भौतिक आपूर्ति, वारेन्टी, स्पेयर पार्ट्स, ढुवानी, ट्रान्जिट बीमा र दाखिला।',
    localAgentRole: 'PPA दफा १४(९), १४(१०) र नियम ३९ अनुसार स्थानीय एजेन्ट, कमिसन र प्यान दर्ता अनिवार्य घोषणा गर्नुपर्ने।',
    paymentMechanism: 'सामान्यतया बैंक मार्फत प्रतीतपत्र (Letter of Credit - L/C) वा सिधै Bank Wire Transfer।',
  },
  worksIcb: {
    title: 'Works ICB (निर्माण कार्य अन्तर्राष्ट्रिय बोलपत्र)',
    sbdFramework: 'PPMO Works ICB SBD (1S2E) तथा FIDIC आधारित सम्झौता ढाँचा (Red/Yellow/Silver Book)',
    incotermsApplicability: 'Incoterms निर्माण ठेक्कामा सिधै लागू हुँदैन! निर्माण सामग्री (सीमेन्ट, डन्डी आदि) निर्माण व्यवसायी आफैँले साइटमा ल्याउने दायित्व सम्झौताका सामान्य सर्त (GCC) बमोजिम हुन्छ, Incoterms अनुसार होइन।',
    deliveryFocus: 'भौतिक पूर्वाधार निर्माण, ड्रइङ, इन्जिनियरिङ, माइलस्टोन, नापजाँच (MB), रनिङ बिल र कार्यसम्पन्न।',
    localAgentRole: 'Works ICB मा विदेशी निर्माण व्यवसायीले प्रायः नेपाली कम्पनीसँग संयुक्त उपक्रम (Joint Venture - JV) गर्नुपर्ने कानुनी व्यवस्था (नियम ३१च)। ५ अर्ब मुनि विदेशी व्यवसायी निषेध।',
    paymentMechanism: 'मोबिलाइजेसन पेश्की (बैंक ग्यारेन्टी विरुद्ध), मासिक रनिङ बिल र नापी किताब (Measurement Book) अनुसार भुक्तानी।',
  },
};

// --------------------------------------------------------------------------
// 4. LOCAL AGENT SUB-MODULE (विदेशी बोलपत्रदाताको Local Agent)
// --------------------------------------------------------------------------
export const LOCAL_AGENT_GUIDELINES = {
  title: 'विदेशी बोलपत्रदाताको Local Agent: जिम्मेवारी, कागजात र सार्वजनिक निकायको कार्य',
  legalBasis: [
    {
      actClause: 'सार्वजनिक खरिद ऐन, २०६३ को दफा १४(९)',
      description: 'विदेशी बोलपत्रदाताले नेपाल राज्यभित्र आफ्नो कुनै एजेन्ट नियुक्त गरेको भएमा बोलपत्र साथ सो एजेन्टको नाम, ठेगाना, कमिसनको रकम वा प्रतिशत, भुक्तानीको मुद्रा र भुक्तानीको तरिका तथा एजेन्टसँग भएका अन्य सर्तहरू स्पष्ट रूपमा खुलाउनुपर्नेछ।',
    },
    {
      actClause: 'सार्वजनिक खरिद ऐन, २०६३ को दफा १४(१०)',
      description: 'दफा १४(९) बमोजिमको विवरण नखुलाएको बोलपत्र उपर कुनै कारबाही गरिने छैन (अर्थात त्यस्तो बोलपत्र सिधै गैर-प्रभावग्राही ठहरिनेछ)।',
    },
    {
      ruleClause: 'सार्वजनिक खरिद नियमावली, २०६४ को नियम ३९',
      description: 'विदेशी बोलपत्रदाताले नेपालस्थित एजेन्ट नियुक्त गर्दा सो एजेन्टको स्थायी लेखा नम्बर (PAN) दर्ता प्रमाणपत्र, एजेन्टको रूपमा कार्य गर्न दिएको स्वीकृति पत्र, र अधिकारपत्र (Power of Attorney) बोलपत्रसाथ पेश गर्नुपर्नेछ।',
    },
    {
      sbdClause: 'Goods ICB SBD: ITB Clause 4.8 / 11.1 (Local Agent Information)',
      description: 'Bidding Forms अन्तर्गत Bid Submission Sheet मा Local Agent को पूर्ण विवरण, विदेशी मुद्रामा कमिसन नदिइने र नेपाली रुपैयाँमै भुक्तानी हुने सर्त समावेश हुन्छ।',
    },
  ],
  agentDuties: {
    beforeBidding: [
      'विदेशी बोलपत्रदातासँग आफ्नो प्रतिनिधित्वको स्पष्ट दायरा, जिम्मेवारी र सीमा किटान गर्ने।',
      'एजेन्ट नियुक्ति सम्बन्धी औपचारिक सम्झौता वा अधिकारपत्र (Agency Agreement / Power of Attorney) तयार गर्ने।',
      'एजेन्टको नाम, दर्ता ठेगाना, प्यान (PAN) नम्बर, इमेल र आधिकारिक सम्पर्क विवरण विदेशी प्रिन्सिपललाई उपलब्ध गराउने।',
      'पाउने कमिसनको रकम वा प्रतिशत, भुक्तानीको मुद्रा (प्रचलित कानुन अनुसार नेपाली रुपैयाँ) र भुक्तानी विधि खुलाउने।',
      'आन्तरिक राजस्व कार्यालयबाट जारी स्थायी लेखा नम्बर (PAN) दर्ता प्रमाणपत्र र कर चुक्ता प्रमाणपत्र अद्यावधिक राख्ने।',
      'विदेशी बोलपत्रदाताको बोलपत्रमा आफू एजेन्ट रहेको तथ्य सत्य रूपमा घोषणा भएको सुनिश्चित गर्ने।',
    ],
    duringSubmission: [
      'विदेशी बोलपत्रदाताले दिएको Power of Attorney को सीमाभित्र रही कागजात प्रमाणीकरण र समन्वय गर्ने।',
      'e-GP प्रणालीमा बिड अपलोड गर्दा Local Agent Form, PAN र Acceptance Letter अपलोड भएको सुनिश्चित गर्ने।',
      'बोलपत्रको कुल मूल्य र त्यसमा समावेश वा अतिरिक्त हुने एजेन्ट कमिसनको विवरणमा कुनै विरोधाभास नहुने गरी जाँच गर्ने।',
      'स्थानीय रूपमा आवश्यक पर्ने बैंक ग्यारेन्टी प्रमाणीकरण (Local Bank Counter-Guarantee) मा समन्वय गर्ने।',
      'स्पेसिफिकेसन, वारेन्टी, बिक्रीपछिको सेवा र स्थानीय सेवा केन्द्रको क्षमता सम्बन्धी प्रमाणहरू उपलब्ध गराउने।',
    ],
    afterSubmission: [
      'सार्वजनिक निकायले मागेको आधिकारिक र वैध स्पष्टीकरणमा विदेशी प्रिन्सिपलसँग द्रुत समन्वय गरी जवाफ पठाउन सहयोग गर्ने।',
      'बोलपत्रको मूल्य, दर वा सारभूत विषय परिवर्तन हुने गरी निकायसँग कुनै अनधिकृत संवाद नगर्ने।',
      'मूल्याङ्कन समिति वा सार्वजनिक निकायका पदाधिकारीलाई कुनै पनि अनुचित प्रभाव, लोभ वा दबाब नदिने (आचारसंहिता पालना)।',
      'छनोट भएमा खरिद सम्झौता, Performance Security र डेलिभरी समन्वयमा सहयोग गर्ने।',
      'सामान आपूर्ति भएपछि नेपालभित्र स्थानीय भन्सार क्लियरेन्स, ढुवानी, जडान र वारेन्टी मर्मतमा तोकिए अनुसार सहयोग पुर्‍याउने।',
    ],
  },
  entityDuties: {
    beforeInvitation: [
      'बोलपत्र कागजात (SBD) मा ऐनको दफा १४(९) र नियम ३९ अनुसार स्थानीय एजेन्ट सम्बन्धी आवश्यकता र ढाँचा अनिवार्य समावेश गर्ने।',
      'विदेशी बोलपत्रदाताले नेपालमा एजेन्ट भए सोको कमिसन र विवरण खुलाउनुपर्ने र एजेन्ट नभए "एजेन्ट नरहेको" स्वघोषणा गर्नुपर्ने स्पष्ट व्यवस्था गर्ने।',
      'एजेन्ट नियुक्त भएकै कारणले विदेशी बोलपत्रदातालाई पूर्वाग्रही वा अयोग्य नठहराउने।',
    ],
    duringEvaluation: [
      'विदेशी बोलपत्रदाताले स्थानीय एजेन्ट सम्बन्धी विवरण (नाम, ठेगाना, कमिसन, PAN, स्वीकृतिपत्र) पेश गरेको छ वा छैन परीक्षण गर्ने।',
      'एजेन्ट घोषणा गरेको अवस्थामा नेपालको PAN दर्ता प्रमाणपत्र र आधिकारिक अख्तियारी (Power of Attorney) संलग्न रहेको पुष्टि गर्ने।',
      'एजेन्ट नियुक्त गरेको तर सो तथ्य वा कमिसन लुकाएको पाइएमा ऐनको दफा १४(१०) बमोजिम त्यस्तो बोलपत्रलाई सिधै अस्वीकृत (Non-Responsive) गर्ने।',
      'एजेन्टको कमिसन कबोल मूल्य भित्र समावेश छ वा अतिरिक्त छ, मूल्य मूल्याङ्कनमा स्पष्ट पार्ने।',
      'एजेन्टले बोलपत्रमा हस्ताक्षर गरेको भए उसलाई हस्ताक्षर गर्ने वैध Power of Attorney छ वा छैन कडाइका साथ जाँच्ने।',
    ],
    duringExecution: [
      'एजेन्टको भूमिका केवल अधिकृत प्रतिनिधिको रूपमा मात्र स्वीकार गर्ने; मुख्य सम्झौता र कानूनी दायित्व विदेशी आपूर्तिकर्तासँगै रहने यकिन गर्ने।',
      'सम्झौता सम्बन्धी सम्पूर्ण औपचारिक पत्राचार विदेशी आपूर्तिकर्ता र अधिकृत प्रतिनिधिलाई एकसाथ पठाउने।',
      'एजेन्टलाई कमिसन भुक्तानी गर्दा नेपालको प्रचलित आयकर ऐन अनुसार लाग्ने कर कट्टी (TDS) अनिवार्य गर्ने।',
      'वारेन्टी र मर्मत सम्भारमा एजेन्टको उपस्थिति रहे पनि अन्तिम करारात्मक जवाफदेहिता विदेशी कम्पनीकै हुने गरी काम गर्ने।',
    ],
  },
  agentChecklist: [
    'प्रतिनिधित्वको अधिकारपत्र (Power of Attorney) आधिकारिक र प्रमाणीकरण भएको छ?',
    'स्थानीय एजेन्टको स्थायी लेखा नम्बर (PAN) दर्ता प्रमाणपत्र संलग्न छ?',
    'एजेन्ट नियुक्ति र स्वीकृति पत्र (Letter of Acceptance) बोलपत्रमा संलग्न छ?',
    'कमिसनको रकम वा प्रतिशत र भुक्तानीको मुद्रा (नेपाली रुपैयाँ) स्पष्ट खुलाइएको छ?',
    'एजेन्ट र विदेशी बोलपत्रदाता बीचका अन्य सर्तहरू स्पष्ट छन्?',
    'बोलपत्रमा पेश गरिएका विवरणहरू र सम्झौता कागजात बीच पूर्ण एकरूपता छ?',
    'विदेशी प्रिन्सिपलको तर्फबाट वारेन्टी र मर्मत सेवा दिन स्थानीय पूर्वाधार उपलब्ध छ?',
    'कुनै स्वार्थ बाझिने (Conflict of Interest) अवस्था छैन?',
  ],
  entityChecklist: [
    'विदेशी बोलपत्रदाताले स्थानीय एजेन्ट भएको वा नभएको स्पष्ट घोषणा गरेको छ?',
    'एजेन्ट भएको भए नाम, ठेगाना, सम्पर्क, कमिसन रकम र मुद्रा खुलाइएको छ?',
    'स्थानीय एजेन्टको आधिकारिक PAN दर्ता प्रमाणपत्र संलग्न छ?',
    'हस्ताक्षरकर्ताको अधिकारपत्र (Power of Attorney) को वैधानिकता परीक्षण गरिएको छ?',
    'एजेन्टको कमिसन लुकाइएको वा गलत घोषणा गरिएको त छैन?',
    'एजेन्टलाई भुक्तानी हुने कमिसनमा प्रचलित कर कट्टी (TDS) को व्यवस्था गरिएको छ?',
    'मूल्याङ्कन प्रतिवेदनमा स्थानीय एजेन्ट सम्बन्धी तथ्यहरू स्पष्ट अभिलेख गरिएको छ?',
  ],
};

// --------------------------------------------------------------------------
// 5. SIX SCENARIO CASE STUDIES ON LOCAL AGENTS
// --------------------------------------------------------------------------
export const LOCAL_AGENT_CASE_STUDIES: LocalAgentCaseStudy[] = [
  {
    id: 'case-1',
    title: 'केस १: विदेशी बोलपत्रदाताले नेपालमा एजेन्ट भएको र ५% कमिसन घोषणा गरेको अवस्था',
    facts: 'जापानी कम्पनीले स्वास्थ्य उपकरणको ICB मा नेपालस्थित एक प्राइभेट फर्मलाई स्थानीय एजेन्ट घोषणा गरी ५% कमिसन पाउने र कर चुक्ता सहितको PAN प्रमाणपत्र संलग्न गरी प्रस्ताव पेश गर्‍यो।',
    legalSources: 'सार्वजनिक खरिद ऐन, २०६३ को दफा १४(९), नियमावली नियम ३९ र SBD ITB 4.8',
    analysis: 'विदेशी बोलपत्रदाताले ऐनको दफा १४(९) ले मागेका सबै विवरण (नाम, ठेगाना, कमिसन, PAN, स्वीकृति) पूर्ण रूपमा पेश गरेकोले यो बोलपत्र स्थानीय एजेन्टको हकमा पूर्ण प्रभावग्राही (Responsive) ठहरिन्छ। कमिसन रकम विदेशी मुद्रामा भुक्तानी गर्न पाइँदैन र नेपालमै नेपाली मुद्रामा कर कट्टा गरी भुक्तानी हुनुपर्छ।',
    recommendedAction: 'मूल्याङ्कन समितिले स्थानीय एजेन्टको विवरणलाई रितपूर्वक मानी अन्य प्राविधिक र आर्थिक मूल्याङ्कन अघि बढाउने।',
  },
  {
    id: 'case-2',
    title: 'केस २: बोलपत्रमा एजेन्ट नभएको घोषणा तर पछि स्थानीय व्यक्तिले पत्राचार र समन्वय गरेको देखिएको अवस्था',
    facts: 'एक विदेशी बोलपत्रदाताले Bid Submission Sheet मा "No Agent Appointed" भनी घोषणा गर्‍यो। तर मूल्याङ्कनको क्रममा नेपालस्थित एक व्यक्तिले आधिकारिक लेटरप्याड बिना नै स्पष्टीकरण पत्र पेश गर्ने र निकायमा धाउने गर्‍यो।',
    legalSources: 'सार्वजनिक खरिद ऐन, २०६३ को दफा १४(१०) र दफा ६३ (कालोसूची)',
    analysis: 'ऐनको दफा १४(१०) अनुसार एजेन्ट सम्बन्धी विवरण नखुलाएको बोलपत्र उपर कुनै कारबाही गर्न मिल्दैन। यदि वास्तवमा एजेन्ट कार्यरत रहेको तर सरकारी निकायलाई ढाँट्न वा कमिसनको कर छल्न झुठ्ठा घोषणा गरिएको प्रमाणित भएमा बोलपत्र गैर-प्रभावग्राही भई रद्द हुन्छ र झुठ्ठा विवरण दिएकोमा कालोसूची सिफारिस हुनसक्छ।',
    recommendedAction: 'मूल्याङ्कन समितिले विदेशी बोलपत्रदातासँग औपचारिक e-GP मार्फत उक्त व्यक्तिको हैसियतबारे लिखित स्पष्टीकरण माग्ने। अनधिकृत व्यक्तिको पत्राचार अस्वीकार गर्ने। यदि एजेन्ट रहेको तर लुकाइएको पाइएमा दफा १४(१०) बमोजिम बोलपत्र अस्वीकृत गर्ने।',
  },
  {
    id: 'case-3',
    title: 'केस ३: एजेन्टको कमिसन Bid Form मा २% तर Agency सम्झौतामा ५% फरक देखिएको अवस्था',
    facts: 'विदेशी कम्पनीले पेश गरेको Bid Form मा स्थानीय एजेन्टलाई २% कमिसन दिने लेखियो तर संलग्न Agency Agreement अध्ययन गर्दा खुद बिक्री मूल्यको ५% कमिसन भुक्तानी गर्ने सम्झौता देखियो।',
    legalSources: 'सार्वजनिक खरिद ऐन, २०६३ को दफा १४(९) र दफा २३ (स्पष्टीकरण)',
    analysis: 'कागजातहरू बीचको आन्तरिक विरोधाभासले कमिसनको यथार्थ रकम र कर दायित्वमा शंका उब्जाउँछ। ऐनको दफा २३ अनुसार बोलपत्रको सारभूत विषय परिवर्तन नहुने गरी यसको कारणबारे स्पष्टीकरण माग्न सकिन्छ।',
    recommendedAction: 'मूल्याङ्कन समितिले विदेशी बोलपत्रदातासँग कुन प्रतिशत आधिकारिक हो भनी लिखित स्पष्टीकरण माग्ने। यदि कर छल्न वा भ्रामक विवरण दिन खोजिएको देखिएमा बोलपत्रलाई गैर-प्रभावग्राही ठहर गर्ने।',
  },
  {
    id: 'case-4',
    title: 'केस ४: एजेन्टले बोलपत्रमा हस्ताक्षर गरेको तर Power of Attorney स्पष्ट नभएको अवस्था',
    facts: 'विदेशी कम्पनीको बोलपत्रमा नेपालस्थित एजेन्टका प्रबन्ध निर्देशकले हस्ताक्षर गरेका छन्। तर संलग्न Power of Attorney मा केवल "कागजात बुझाउने" अधिकार मात्र दिइएको छ, "सम्झौता गर्न वा बोलपत्रमा हस्ताक्षर गर्न" अधिकार तोकिएको छैन।',
    legalSources: 'सार्वजनिक खरिद नियमावली, २०६४ को नियम ३९(क) र नियम ६१ (प्रारम्भिक परीक्षण)',
    analysis: 'बोलपत्रमा हस्ताक्षर गर्ने व्यक्तिसँग कानुनी रूपमा बाध्यकारी हुने गरी अख्तियारी (Valid Power of Attorney) हुनुपर्छ। केवल कागजात पेश गर्ने अधिकार पाएको एजेन्टले बोलपत्रमा हस्ताक्षर गर्न सक्दैन। अधिकार बिना गरिएको हस्ताक्षर गैरकानूनी हुन्छ।',
    recommendedAction: 'मूल्याङ्कन समितिले बोलपत्रलाई प्रारम्भिक परीक्षामै अनधिकृत हस्ताक्षर (Unauthorized Signature) को आधारमा गैर-प्रभावग्राही (Non-Responsive) घोषणा गरी मूल्याङ्कनबाट हटाउने।',
  },
  {
    id: 'case-5',
    title: 'केस ५: मूल्याङ्कनको क्रममा एजेन्टले सिधै मूल्याङ्कन समितिलाई स्पष्टीकरण र नयाँ कागजात पेश गरेको अवस्था',
    facts: 'मूल्याङ्कन जारी रहँदा स्थानीय एजेन्टले "विदेशी प्रिन्सिपलको नयाँ टेस्ट रिपोर्ट" भन्दै कार्यालयमा थप कागजात दर्ता गराउन खोज्यो र आफ्नो प्रतिस्पर्धीलाई अयोग्य गर्न दबाब दियो।',
    legalSources: 'सार्वजनिक खरिद ऐन, २०६३ को दफा २३ र दफा ६२ (आचारसंहिता)',
    analysis: 'सार्वजनिक निकायले माग नगरेसम्म बोलपत्रदाता वा एजेन्टले पछिबाट नयाँ प्राविधिक कागजात थप्न पाउँदैन (Post-bid submission of technical documents is strictly prohibited)। साथै मूल्याङ्कन प्रक्रियालाई अनुचित प्रभाव पार्न खोज्नु आचारसंहिताको गम्भीर उल्लङ्घन हो।',
    recommendedAction: 'सार्वजनिक निकायले त्यस्तो अनधिकृत कागजात दर्ता गर्न अस्वीकार गर्ने र अभिलेखमा राख्ने। केवल निकायले e-GP मार्फत औपचारिक रूपमा मागेको स्पष्टीकरण मात्र स्वीकार गर्ने।',
  },
  {
    id: 'case-6',
    title: 'केस ६: सामान डेलिभरी र वारेन्टी स्थानीय एजेन्टले गरेको तर विदेशी कम्पनी सम्पर्कविहीन भएको अवस्था',
    facts: 'सामान आपूर्ति भई संचालनमा आएको १ वर्षपछि बिग्रेकोमा विदेशी उत्पादक कम्पनी सम्पर्कविहीन भयो। तर स्थानीय एजेन्ट नेपालमै कार्यरत रहेको छ। निकायले वारेन्टी कसबाट दाबी गर्ने?',
    legalSources: 'सार्वजनिक खरिद ऐनको दफा २७, सम्झौताका सामान्य सर्त (GCC 28) र Performance Security',
    analysis: 'खरिद सम्झौता विदेशी आपूर्तिकर्तासँग भएको हुँदा मुख्य कानूनी दायित्व विदेशी कम्पनीकै हो। तर नेपालस्थित एजेन्टले सम्झौता अनुसार स्थानीय सेवा दिनुपर्ने अख्तियारी पाएको र निकायसँग अझै Performance Security बैंक ग्यारेन्टी बाँकी रहेको हुन्छ।',
    recommendedAction: 'निकायले स्थानीय एजेन्टलाई तत्काल मर्मत गर्न औपचारिक पत्राचार गर्ने। मर्मत नगरे बैंकमा रहेको Performance Security तुरुन्त जफत (Encash) गर्ने र विदेशी कम्पनी तथा गैर-जिम्मेवार एजेन्टलाई कालोसूचीमा राख्न PPMO मा लेखी पठाउने।',
  },
];

// --------------------------------------------------------------------------
// 6. ICB EVALUATION: 15 DETAILED SUB-STEPS
// --------------------------------------------------------------------------
export const ICB_EVALUATION_SUB_STEPS: IcbEvaluationStep[] = [
  {
    stepNo: 1,
    title: '१. बोलपत्र अनलाइन खोल्ने प्रक्रिया (Decryption & Opening)',
    objective: 'e-GP प्रणालीमा म्यादभित्र परेका अन्तर्राष्ट्रिय बोलपत्रहरू डिक्रिप्ट गरी सार्वजनिक रूपमा खोल्ने।',
    legalRef: 'ऐन दफा २२, नियम ५९',
    details: [
      'तोकिएको मिति र समय सकिनासाथ खरिद अधिकृतले e-GP पोर्टलमा बिड खोल्ने।',
      'उपस्थित बोलपत्रदाता वा तिनका स्थानीय प्रतिनिधिको रोहबरमा डिक्रिप्शन गर्ने।',
      'बोलपत्रदाताको नाम, कबोल मुद्रा, छुट, बिड सेक्युरिटी विवरण सार्वजनिक रूपमा पढेर सुनाउने।',
    ],
    passingCriteria: 'म्यादभित्र e-GP मा सफलतापूर्वक इनक्रिप्ट भई सबमिट भएको हुनुपर्ने।',
    fatalPitfalls: 'म्याद सकिएपछि आएको वा डिक्रिप्ट हुन नसकेको फाइल स्वतः अस्वीकृत हुन्छ।',
  },
  {
    stepNo: 2,
    title: '२. बोलपत्र प्राप्ति अभिलेख र मुचुल्का (Opening Record & Attendance)',
    objective: 'बोलपत्र खोल्दा देखिएका विवरणहरूको आधिकारिक मुचुल्का e-GP मा तयार गरी सबैलाई उपलब्ध गराउने।',
    legalRef: 'नियम ५९(६), (७)',
    details: [
      'Bid Opening Checklist अनलाइन तयार गर्ने।',
      'प्रत्येक बोलपत्रदाताको कबोल मूल्य, वैकल्पिक प्रस्ताव (यदि अनुमति भए), र छुटको विवरण अभिलेख गर्ने।',
      'उपस्थित प्रतिनिधिहरूको डिजिटल हस्ताक्षर वा उपस्थिति मुचुल्का संलग्न गर्ने।',
    ],
    passingCriteria: 'e-GP प्रणालीबाट आधिकारिक Opening Minutes उत्पादन भएको।',
    fatalPitfalls: 'खोल्दाको मुचुल्कामा उल्लेख नभएको छुट वा सर्त पछि मूल्याङ्कनमा गणना गर्न पाइँदैन।',
  },
  {
    stepNo: 3,
    title: '३. प्रारम्भिक परीक्षण तथा ग्राह्यता जाँच (Eligibility & Debarment Check)',
    objective: 'बोलपत्रदाता कानुनी रूपमा योग्य छ वा छैन (कालोसूची, कर चुक्ता, दर्ता) परीक्षण गर्ने।',
    legalRef: 'ऐन दफा १०, नियम ६१',
    details: [
      'PPMO को आधिकारिक कालोसूची (Blacklist) मा नाम नरहेको पुष्टि गर्ने।',
      'कम्पनी दर्ता, इजाजतपत्र र विदेशी देशको आधिकारिक व्यवसाय दर्ता जाँच गर्ने।',
      'स्वार्थ बाझिने (Conflict of Interest) अवस्था नरहेको स्वघोषणा परीक्षण गर्ने।',
    ],
    passingCriteria: 'बोलपत्रदाता कालोसूचीमा नरहेको र कानुनी रूपमा दर्ता प्रमाणित भएको।',
    fatalPitfalls: 'कालोसूचीमा परेको कम्पनीको बोलपत्र तत्कालै अयोग्य हुन्छ।',
  },
  {
    stepNo: 4,
    title: '४. बोलपत्रको पूर्णता र आवश्यक कागजात परीक्षण (Completeness Examination)',
    objective: 'SBD ले मागेका अनिवार्य फारामहरू र अधिकारपत्र संलग्न छन् वा छैनन् जाँच्ने।',
    legalRef: 'नियम ६१(१)(क)',
    details: [
      'Bid Submission Form रितपूर्वक भरिएको र अख्तियारप्राप्त व्यक्तिबाट हस्ताक्षर भएको।',
      'Power of Attorney (अधिकृत अधिकारपत्र) संलग्न रहेको।',
      'संयुक्त उपक्रम (JV) भए JV Agreement वा आशयपत्र संलग्न रहेको।',
      'स्थानीय एजेन्ट भए ऐन दफा १४(९) अनुसारको विवरण र PAN संलग्न रहेको।',
    ],
    passingCriteria: 'सबै अनिवार्य फारामहरू हस्ताक्षरसहित संलग्न हुनुपर्ने।',
    fatalPitfalls: 'हस्ताक्षर नभएको वा अधिकारपत्र नभएको प्रस्ताव स्वतः गैर-प्रभावग्राही हुन्छ।',
  },
  {
    stepNo: 5,
    title: '५. Bid Security को वैधानिकता परीक्षण (Bid Security Verification)',
    objective: 'बैंक ग्यारेन्टीको रकम, मुद्रा, ढाँचा र मान्य अवधि SBD अनुसार छ वा छैन यकिन गर्ने।',
    legalRef: 'ऐन दफा २१, नियम ६१(१)(ख)',
    details: [
      'तोकिएको रकम (लागत अनुमानको २ देखि ३%) बराबर भएको।',
      'स्वीकार्य मुद्रा (USD/EUR/NPR) मा जारी भएको।',
      'मान्य अवधि: बोलपत्र मान्य अवधि भन्दा कम्तीमा ३० दिन बढी (Total 120 or 150 days) भएको।',
      'नेपालको "A" वर्गको वाणिज्य बैंकबाट जारी वा काउन्टर ग्यारेन्टी भएको।',
    ],
    passingCriteria: 'SBD को ढाँचासँग हुबहु मिल्ने र बैंकबाट आधिकारिक रूपमा प्रमाणीकरण भएको।',
    fatalPitfalls: 'म्याद १ दिन मात्र कम भए पनि वा रकम अपुग भएमा बोलपत्र तत्काल रद्द हुन्छ (Major Deviation)।',
  },
  {
    stepNo: 6,
    title: '६. निर्माताको अधिकार पत्र परीक्षण (Manufacturer Authorization Form - MAF)',
    objective: 'आपूर्तिकर्ता आधिकारिक उत्पादक हो वा उत्पादकबाट आधिकारिक अधिकार पाएको छ भनी जाँच्ने।',
    legalRef: 'Goods ICB SBD Section IV (Bidding Forms)',
    details: [
      'उत्पादक कम्पनीको आधिकारिक लेटरप्याडमा जारी भएको MAF हुनुपर्ने।',
      'उक्त ठेक्का नम्बर स्पष्ट उल्लेख गरी आपूर्ति तथा वारेन्टीको पूर्ण जिम्मेवारी उत्पादकले लिएको हुनुपर्ने।',
      'शंका लागेमा उत्पादकको इमेल/वेबसाइट मार्फत सत्यता प्रमाणीकरण गर्ने।',
    ],
    passingCriteria: 'उत्पादकबाट सक्कल प्रमाणित अधिकार पत्र प्राप्त भएको।',
    fatalPitfalls: 'नक्कली वा अनधिकृत डिलरबाट जारी गरिएको MAF भेटिएमा बोलपत्र खारेज र कालोसूची सिफारिस।',
  },
  {
    stepNo: 7,
    title: '७. बोलपत्रदाताको योग्यता मूल्याङ्कन (Qualification Evaluation - EQC)',
    objective: 'वित्तीय क्षमता, औसत वार्षिक कारोबार, विगतको समान आपूर्ति अनुभव र उत्पादन क्षमता जाँच्ने।',
    legalRef: 'SBD Section III (EQC)',
    details: [
      'न्यूनतम औसत वार्षिक कारोबार (Average Annual Turnover - AATO)।',
      'विगत ३ देखि ५ वर्षभित्र समान प्रकृतिको कम्तीमा १ वा २ वटा सम्झौता सफलतापूर्वक सम्पन्न गरेको अनुभव प्रमाणपत्र।',
      'उत्पादकको वार्षिक उत्पादन क्षमता (Annual Production Capacity) माग गरिएको परिमाणभन्दा बढी भएको।',
      'वित्तीय स्रोत र तरलता (Liquid Assets / Credit Facility)।',
    ],
    passingCriteria: 'EQC मा तोकिएका सबै Pass/Fail मापदण्डहरू पूर्ण रूपमा उत्तीर्ण भएको।',
    fatalPitfalls: 'अनुभव प्रमाणपत्रमा तोकिएको रकम वा परिमाण नपुगेमा बोलपत्र असफल हुन्छ।',
  },
  {
    stepNo: 8,
    title: '८. प्राविधिक स्पेसिफिकेसन अनुपालन परीक्षण (Technical Compliance Check)',
    objective: 'प्रस्तावित मालसामानले SBD को Section VI मा तोकिएका विशेषताहरू पूरा गर्छ वा गर्दैन जाँच्ने।',
    legalRef: 'ऐन दफा २५, नियम ६२',
    details: [
      'Technical Data Sheet / Compliance Sheet मा "Comply / Not Comply" र ब्रोसरको पृष्ठ नम्बर जुधाउने।',
      'उत्पादकको आधिकारिक ब्रोसर वा क्याटलगसँग प्राविधिक दाबी भिडान गर्ने।',
      'विद्युतीय, मेकानिकल, सुरक्षा र कार्यसम्पादन मानकहरू (ISO, CE, IEC) प्रमाणित गर्ने।',
    ],
    passingCriteria: 'सबै अनिवार्य प्राविधिक मापदण्डहरूमा पूर्ण सहमति वा सो सरह भएको।',
    fatalPitfalls: 'अनिवार्य प्राविधिक क्षमता नपुग्ने सामान प्रस्तावित गरेमा प्राविधिक रूपमा अयोग्य हुन्छ।',
  },
  {
    stepNo: 9,
    title: '९. Substantial Responsiveness परीक्षण (Minor vs Major Deviations)',
    objective: 'प्राविधिक वा कानुनी विचलनहरू सारभूत (Major) हुन् वा सामान्य (Minor) हुन् वर्गीकरण गर्ने।',
    legalRef: 'ऐन दफा २५(१), SBD ITB 30',
    details: [
      'Major Deviation: दायरा, गुणस्तर, कार्यसम्पादनमा प्रतिकूल असर पार्ने वा खरिदकर्ताको अधिकार सीमित गर्ने विचलन।',
      'Minor Deviation: सामान्य ढाँचाको फरक, सजिलै सच्याउन सकिने सामान्य त्रुटि।',
      'Minor Deviation भएमा सोको आर्थिक प्रभाव गणना (Quantification) गरी कबोल मूल्यमा समायोजन गर्ने।',
    ],
    passingCriteria: 'कुनै पनि Major Deviation नरहेको र बोलपत्र सारभूत रूपमा प्रभावग्राही (Substantially Responsive) भएको।',
    fatalPitfalls: 'Major Deviation लाई नजरअन्दाज गरी पास गराएमा PPRC ले सम्पूर्ण मूल्याङ्कन बदर गर्छ।',
  },
  {
    stepNo: 10,
    title: '१०. नमुना, ल्याब टेस्ट र निरीक्षण प्रमाण (Samples & Type Test Reports)',
    objective: 'SBD मा माग गरिएको भए नमुना परीक्षण वा आधिकारिक ल्याबको Type Test Report परीक्षण गर्ने।',
    legalRef: 'SBD Section VI & BDS',
    details: [
      'अन्तर्राष्ट्रिय मान्यता प्राप्त ल्याब (ILAC/NABL Accredited) बाट जारी Type Test Certificates।',
      'नमुनाको भौतिक परीक्षण र लाहाछाप प्रमाणीकरण।',
      'विद्युतका पोल, कन्डक्टर, औषधि, रासायनिक वस्तुमा नमुना र ल्याब टेस्ट अनिवार्य।',
    ],
    passingCriteria: 'स्वीकृत मापदण्ड अनुसारको टेस्ट रिपोर्ट र नमुना उत्तीर्ण भएको।',
    fatalPitfalls: 'मान्यता नभएको ल्याबको रिपोर्ट वा फेल भएको नमुना भएमा प्राविधिक अयोग्य।',
  },
  {
    stepNo: 11,
    title: '११. आर्थिक प्रस्ताव खोल्ने र प्रारम्भिक जाँच (Financial Bid Opening - 2 Envelope)',
    objective: 'दुई खाम प्रणाली भए प्राविधिक रूपमा उत्तीर्ण भएकाहरूको मात्र आर्थिक प्रस्ताव खोल्ने।',
    legalRef: 'नियम ६५घ, ६५ङ',
    details: [
      'प्राविधिक रूपमा सफल बोलपत्रदातालाई ७ दिनको सूचना दिई आर्थिक प्रस्ताव खोल्ने।',
      'असफल भएकाहरूको आर्थिक प्रस्ताव नखोली सुरक्षित फिर्ता गर्ने।',
      'खोलेका आर्थिक प्रस्तावहरूको कबोल रकम पढेर सुनाई मुचुल्का गर्ने।',
    ],
    passingCriteria: 'प्राविधिक प्रस्तावमा सफल ठहरिएको औपचारिक निर्णय हुनुपर्ने।',
    fatalPitfalls: 'प्राविधिक मूल्याङ्कन नसकिँदै वा असफलको आर्थिक प्रस्ताव खोलेमा सम्पूर्ण प्रक्रिया रद्द हुन्छ।',
  },
  {
    stepNo: 12,
    title: '१२. गणितीय त्रुटि सच्याउने प्रक्रिया (Arithmetical Correction)',
    objective: 'Price Schedule मा अङ्क, अक्षर, प्रति इकाई दर र कुल रकम बीचको त्रुटि सच्याउने।',
    legalRef: 'SBD ITB 31, नियम ६३',
    details: [
      'प्रति इकाई दर (Unit Rate) र परिमाण गुणा गर्दा कुल रकम फरक परेमा Unit Rate लाई नै मान्यता दिइनेछ।',
      'अङ्क र अक्षरमा लेखिएको रकम फरक परेमा अक्षरमा लेखिएको रकमलाई मान्यता दिइनेछ।',
      'सच्याइएको रकम बोलपत्रदातालाई e-GP मार्फत जानकारी गराई सहमति लिने।',
    ],
    passingCriteria: 'बोलपत्रदाताले सच्याइएको रकम स्वीकार गरेको (अस्वीकार गरे जमानत जफत)।',
    fatalPitfalls: 'Unit Rate लाई बेवास्ता गरी कुल रकमलाई मान्यता दिएमा कानूनी त्रुटि हुन्छ।',
  },
  {
    stepNo: 13,
    title: '१३. मुद्रा रूपान्तरण र तुलना (Currency Conversion & Financial Comparison)',
    objective: 'विभिन्न विदेशी मुद्रामा कबोल गरिएका मूल्यलाई नेपाल राष्ट्र बैंकको विनिमय दरमा रूपान्तरण गर्ने।',
    legalRef: 'SBD ITB 32, नियम ६४',
    details: [
      'बोलपत्र खोल्ने दिनको नेपाल राष्ट्र बैंकको आधिकारिक विनिमय बिक्री दर (Selling Rate) लागू गर्ने।',
      'सबै बोलपत्रलाई नेपाली रुपैयाँ (NPR) वा तोकिएको एकल मुद्रामा रूपान्तरण गर्ने।',
      'Incoterm (CIP Site) अनुसार सबैको मूल्य एउटै आधारमा ल्याई तुलना गर्ने।',
    ],
    passingCriteria: 'एउटै विनिमय दर र समान आधारमा तुलनात्मक तालिका तयार भएको।',
    fatalPitfalls: 'फरक-फरक मितिको विनिमय दर प्रयोग गर्न पाइँदैन।',
  },
  {
    stepNo: 14,
    title: '१४. छुट, घरेलु प्राथमिकता र असामान्य कम मूल्य (Discounts, Preference & ALB)',
    objective: 'सशर्त/निःसर्त छुट, घरेलु प्राथमिकता (१५%) र असामान्य कम मूल्यको परीक्षण गर्ने।',
    legalRef: 'ऐन दफा ११, २५, नियम १७',
    details: [
      'खोल्ने समयमा घोषित निःसर्त छुट मात्र मूल्याङ्कनमा समायोजन गर्ने।',
      'घरेलु प्राथमिकता लागू हुने भए स्वदेशी मूल्य अभिवृद्धि प्रमाणित सामानलाई विदेशी मूल्यमा १५% सम्म प्राथमिकता दिने।',
      'लागत अनुमान भन्दा अत्यधिक घटेर आएको भए (ALB) दर विश्लेषण माग गरी कार्यसम्पादनको जोखिम परीक्षण गर्ने।',
    ],
    passingCriteria: 'नियमसम्मत समायोजन पश्चात् मूल्याङ्कित रकम निर्धारण भएको।',
    fatalPitfalls: 'खोल्दा उल्लेख नभएको गोप्य छुट पछि समावेश गर्न पाइँदैन।',
  },
  {
    stepNo: 15,
    title: '१५. मूल्याङ्कन प्रतिवेदन, सिफारिस र स्वीकृति (Evaluation Report & Recommendation)',
    objective: 'न्यूनतम मूल्याङ्कित सारभूत प्रभावग्राही बोलपत्र छनोट गरी स्वीकृतिका लागि सिफारिस गर्ने।',
    legalRef: 'ऐन दफा २५, २७, नियम ६५',
    details: [
      'मूल्याङ्कन समितिका सबै सदस्यहरूले हस्ताक्षर गरेको विस्तृत प्रतिवेदन तयार गर्ने।',
      'पहिलो, दोस्रो र तेस्रो न्यूनतम मूल्याङ्कित बोलपत्रदाताहरूको स्पष्ट वरियता सूची बनाउने।',
      'अधिकार प्राप्त अधिकारी समक्ष स्वीकृतिका लागि पेश गर्ने।',
    ],
    passingCriteria: 'अधिकार प्राप्त अधिकारीबाट मूल्याङ्कन प्रतिवेदन स्वीकृत भएको।',
    fatalPitfalls: 'मूल्याङ्कनमा असहमत सदस्यको फरक मत (Dissenting Opinion) भए स्पष्ट उल्लेख गर्नुपर्छ।',
  },
];

// --------------------------------------------------------------------------
// 7. ICB INTERACTIVE QUIZ (15 QUESTIONS ACROSS BASIC, INTERMEDIATE & ADVANCED)
// --------------------------------------------------------------------------
export const ICB_QUIZ_QUESTIONS: IcbQuizQuestion[] = [
  // Basic Level (5 Questions)
  {
    id: 'q-b1',
    level: 'basic',
    question: 'सार्वजनिक खरिद ऐन र नियमावली अनुसार अन्तर्राष्ट्रिय खुला बोलपत्र (ICB) को सूचना प्रकाशनको न्यूनतम म्याद कति दिन हुनुपर्छ?',
    options: ['कम्तीमा २१ दिन', 'कम्तीमा १५ दिन', 'कम्तीमा ३० दिन', 'कम्तीमा ४५ दिन'],
    correctIndex: 2,
    explanation: 'सार्वजनिक खरिद नियमावली, २०६४ को नियम ३१ङ(१) अनुसार अन्तर्राष्ट्रिय स्तरको खुला बोलपत्र (ICB) मा बोलपत्र पेश गर्न कम्तीमा ३० दिनको म्याद दिनुपर्छ। (२१ दिन राष्ट्रिय खुला बोलपत्रको हकमा लागू हुन्छ)।',
    legalRef: 'नियम ३१ङ(१)',
  },
  {
    id: 'q-b2',
    level: 'basic',
    question: 'नेपालको सार्वजनिक खरिदमा Goods ICB SBD ले आधिकारिक रूपमा कुन Incoterms संस्करणलाई मान्यता दिएको छ?',
    options: ['Incoterms 2000', 'Incoterms 2010', 'Incoterms 2020', 'Incoterms 1990'],
    correctIndex: 2,
    explanation: 'PPMO को पछिल्लो Goods ICB SBD को ITB 15.6 तथा BDS अनुसार अन्तर्राष्ट्रिय व्यापार चेम्बर (ICC) द्वारा जारी Incoterms 2020 नियमहरू लागू हुन्छन्।',
    legalRef: 'Goods ICB SBD ITB 15.6',
  },
  {
    id: 'q-b3',
    level: 'basic',
    question: 'विदेशी बोलपत्रदाताले नेपालभित्र स्थानीय एजेन्ट नियुक्त गरेको भए कुन विवरण खुलाउनु अनिवार्य छैन?',
    options: ['एजेन्टको नाम र ठेगाना', 'कमिसनको रकम वा प्रतिशत', 'एजेन्टको स्थायी लेखा नम्बर (PAN)', 'एजेन्टका कर्मचारीहरूको व्यक्तिगत सम्पत्ति विवरण'],
    correctIndex: 3,
    explanation: 'ऐनको दफा १४(९) र नियम ३९ अनुसार एजेन्टको नाम, ठेगाना, कमिसन, भुक्तानी मुद्रा, सर्त र PAN खुलाउनु अनिवार्य छ; कर्मचारीको व्यक्तिगत सम्पत्ति खुलाउनु पर्दैन।',
    legalRef: 'ऐन दफा १४(९), नियम ३९',
  },
  {
    id: 'q-b4',
    level: 'basic',
    question: 'Incoterms 2020 को CIP नियममा आपूर्तिकर्ताले कति प्रतिशत रकम बराबरको बीमा गरिदिनुपर्छ?',
    options: ['सम्झौता मूल्यको १००%', 'सम्झौता मूल्यको ११०%', 'सम्झौता मूल्यको १२५%', 'सम्झौता मूल्यको ८५%'],
    correctIndex: 1,
    explanation: 'Incoterms 2020 को CIP नियम र PPMO SBD अनुसार आपूर्तिकर्ताले सम्झौता मूल्य (CIP Value) को ११०% रकम बराबरको Institute Cargo Clauses (A) "All Risks" बीमा गरिदिनुपर्छ।',
    legalRef: 'Incoterms 2020 CIP Rule & SBD ITB 15.7',
  },
  {
    id: 'q-b5',
    level: 'basic',
    question: 'बोलपत्र स्वीकृतिको आशयको सूचना (LOI) जारी भएपछि अन्य बोलपत्रदातालाई गुनासो/उजुरी गर्न कति दिनको म्याद (Standstill Period) हुन्छ?',
    options: ['३ दिन', '५ दिन', '७ दिन', '१५ दिन'],
    correctIndex: 2,
    explanation: 'सार्वजनिक खरिद ऐन, २०६३ को दफा २७(२) अनुसार छनोट भएको बोलपत्र स्वीकृत गर्ने आशयको सूचना जारी भएको मितिले ७ दिनको म्याद हुन्छ।',
    legalRef: 'ऐन दफा २७(२)',
  },

  // Intermediate Level (5 Questions)
  {
    id: 'q-i1',
    level: 'intermediate',
    question: 'Goods ICB को बोलपत्रमा प्रति इकाई दर (Unit Rate) र कुल रकम (Total Amount) बीच गणितीय त्रुटि देखिएमा SBD अनुसार केलाई मान्यता दिइन्छ?',
    options: ['कुल रकम (Total Amount) लाई', 'प्रति इकाई दर (Unit Rate) लाई', 'बोलपत्रदाताले रोजेको जुनसुकै रकमलाई', 'औसत रकमलाई'],
    correctIndex: 1,
    explanation: 'SBD ITB 31 अनुसार प्रति इकाई दर (Unit Rate) र परिमाण गुणा गर्दा कुल रकम फरक परेमा Unit Rate लाई नै मान्यता दिइनेछ र सोही अनुसार कुल रकम सच्याइनेछ।',
    legalRef: 'Goods ICB SBD ITB 31.1',
  },
  {
    id: 'q-i2',
    level: 'intermediate',
    question: 'विदेशी बोलपत्रदाताले नेपालमा स्थानीय एजेन्ट रहेको तर बोलपत्रमा सो सम्बन्धी कुनै विवरण नखुलाएको पाइएमा कानुन अनुसार के हुन्छ?',
    options: ['१०% जरिवाना तिराएर सदर गरिन्छ', 'उक्त बोलपत्र उपर कुनै कारबाही गरिने छैन (स्वतः रद्द हुनेछ)', 'विदेशी मुद्रामा मात्र भुक्तानी दिइन्छ', 'आपूर्तिकर्ता आफैँ आएर माफी माग्न पाउँछ'],
    correctIndex: 1,
    explanation: 'सार्वजनिक खरिद ऐन, २०६३ को दफा १४(१०) अनुसार दफा १४(९) बमोजिम एजेन्टको विवरण नखुलाएको बोलपत्र उपर कुनै कारबाही गरिने छैन। अर्थात बोलपत्र सिधै अस्वीकृत हुन्छ।',
    legalRef: 'ऐन दफा १४(१०)',
  },
  {
    id: 'q-i3',
    level: 'intermediate',
    question: 'Works ICB (निर्माण कार्य) मा Incoterms सम्बन्धी कुन भनाइ सही हो?',
    options: [
      'Works ICB मा पनि Goods ICB जस्तै Incoterms अनिवार्य लागू हुन्छ।',
      'Works ICB मा Incoterms सिधै लागू हुँदैन, निर्माण सामग्री साइटमा ल्याउने दायित्व FIDIC/GCC सर्त अनुसार निर्माण व्यवसायीकै हुन्छ।',
      'Works ICB मा केवल EXW मात्र लागू हुन्छ।',
      'सार्वजनिक खरिद अनुगमन कार्यालयले Works ICB मा Incoterms प्रयोग गर्न निषेध गरेको छ।',
    ],
    correctIndex: 1,
    explanation: 'Works ICB निर्माण ठेक्का भएकोले यसमा FIDIC आधारित सम्झौताका सामान्य सर्तहरू (GCC) लागू हुन्छन्। यसमा Goods ICB जस्तो Incoterms सिधै लागू हुँदैन, निर्माण व्यवसायीले सामग्री साइटमै उपलब्ध गराउनुपर्छ।',
    legalRef: 'Works ICB SBD Guidelines',
  },
  {
    id: 'q-i4',
    level: 'intermediate',
    question: 'Goods ICB मा नेपाल भूपरिवेष्ठित देश भएकोले र कोलकाता बन्दरगाहबाट सडक/रेल ढुवानी भई नेपाल आउने हुँदा सबैभन्दा उपयुक्त र सुरक्षित Incoterm कुन मानिन्छ?',
    options: ['FOB Tokyo', 'CIF Kolkata Port', 'CIP Project Site (Nepal)', 'EXW Factory'],
    correctIndex: 2,
    explanation: 'CIP Project Site (Named Destination in Nepal) सबैभन्दा सुरक्षित मानिन्छ किनकि यसमा कोलकातादेखि नेपालको कार्यस्थलसम्मको सम्पूर्ण ढुवानी र ११०% All Risks बीमाको दायित्व आपूर्तिकर्ताकै हुन्छ।',
    legalRef: 'Incoterms 2020 & PPMO Goods ICB BDS',
  },
  {
    id: 'q-i5',
    level: 'intermediate',
    question: 'सार्वजनिक खरिद ऐन, २०६३ को दफा ४७ अनुसार कार्यालय प्रमुख समक्ष दिइएको उजुरीमा कार्यालय प्रमुखले कति दिनभित्र निर्णय दिनुपर्छ?',
    options: ['३ दिनभित्र', '५ दिनभित्र', '७ दिनभित्र', '१५ दिनभित्र'],
    correctIndex: 1,
    explanation: 'सार्वजनिक खरिद ऐन, २०६३ को दफा ४७(६) अनुसार कार्यालय प्रमुखले उजुरी परेको मितिले ५ दिनभित्र आफ्नो निर्णय लिखित रूपमा दिनुपर्छ।',
    legalRef: 'ऐन दफा ४७(६)',
  },

  // Advanced Level (5 Questions)
  {
    id: 'q-a1',
    level: 'advanced',
    question: 'सार्वजनिक खरिद ऐनको दफा ११ तथा नियमावलीको नियम १७ अनुसार स्वदेशी मालसामानलाई विदेशी सामानभन्दा कति प्रतिशतसम्म महँगो भए पनि घरेलु प्राथमिकता (Domestic Preference) दिन सकिन्छ?',
    options: ['५ प्रतिशत', '१० प्रतिशत', '१५ प्रतिशत', '२० प्रतिशत'],
    correctIndex: 2,
    explanation: 'ऐनको दफा ११ र नियम १७ अनुसार कम्तीमा ३०% स्वदेशी मूल्य अभिवृद्धि भएको मालसामानलाई विदेशी मालसामानको मूल्याङ्कित मूल्यभन्दा १५ प्रतिशतसम्म महँगो भए पनि खरिदमा प्राथमिकता दिन सकिन्छ।',
    legalRef: 'ऐन दफा ११, नियम १७',
  },
  {
    id: 'q-a2',
    level: 'advanced',
    question: 'विदेशी बैंकबाट जारी भएको बोलपत्र जमानत (Bid Security) नेपालको खरिद कारबाहीमा मान्य हुन के अनिवार्य हुनुपर्छ?',
    options: [
      'नेपाल राष्ट्र बैंकको गभर्नरको हस्ताक्षर',
      'नेपालस्थित "क" वर्गको इजाजतपत्र प्राप्त वाणिज्य बैंकबाट जारी काउन्टर ग्यारेन्टी (Counter-Guarantee)',
      'परराष्ट्र मन्त्रालयको प्रमाणीकरण',
      'एजेन्टको व्यक्तिगत चेक',
    ],
    correctIndex: 1,
    explanation: 'PPMO SBD ITB 19 तथा बैंकिङ अभ्यास अनुसार विदेशी बैंकको ग्यारेन्टी भएमा नेपालको "A" वर्गको वाणिज्य बैंकबाट जारी गरिएको काउन्टर ग्यारेन्टी (Counter-Guarantee) अनिवार्य हुनुपर्छ।',
    legalRef: 'Goods ICB SBD ITB 19.3',
  },
  {
    id: 'q-a3',
    level: 'advanced',
    question: 'बोलपत्र खोलिसकेपछि मूल्याङ्कनको क्रममा समितिले कुनै खास बोलपत्रदाताको प्रस्तावमा रहेको प्राविधिक मापदण्ड परिवर्तन गरी नयाँ मापदण्डका आधारमा मूल्याङ्कन गरेमा के हुन्छ?',
    options: [
      'समितिले आफ्नो तजबिज प्रयोग गर्न पाउने भएकोले सदर हुन्छ।',
      'ऐनको दफा २५ विपरीत भई त्यस्तो मूल्याङ्कन गैरकानूनी ठहरिन्छ र बदर हुन्छ।',
      'मन्त्रालयको सहमति भए गर्न पाइन्छ।',
      'दोस्रो न्यूनतम बोलपत्रदाताले मानेमा सदर हुन्छ।',
    ],
    correctIndex: 1,
    explanation: 'सार्वजनिक खरिद ऐनको दफा २५ अनुसार बोलपत्र कागजातमा उल्लेख भएका मापदण्ड बाहेक पछि नयाँ मापदण्ड बनाउन वा परिमार्जन गर्न सख्त पाइँदैन। यस्तो कार्य कानून विपरीत ठहरिन्छ।',
    legalRef: 'ऐन दफा २५(१)',
  },
  {
    id: 'q-a4',
    level: 'advanced',
    question: 'Incoterms 2020 को DPU (Delivered at Place Unloaded) र DAP (Delivered at Place) बीचको मुख्य प्राविधिक फरक के हो?',
    options: [
      'DPU मा भन्सार आपूर्तिकर्ताले तिर्छ, DAP मा तिर्दैन।',
      'DPU मा गन्तव्यमा गाडीबाट सामान अनलोड गर्ने दायित्व आपूर्तिकर्ताको हुन्छ, DAP मा अनलोडिङ खरिदकर्ताको हुन्छ।',
      'DPU हवाई मार्गमा मात्र प्रयोग हुन्छ, DAP समुद्री मार्गमा।',
      'दुवै बीच कुनै फरक छैन।',
    ],
    correctIndex: 1,
    explanation: 'Incoterms 2020 अनुसार DPU एक मात्र यस्तो नियम हो जसमा सामान गन्तव्यमा गाडीबाट सुरक्षित अनलोड गर्ने खर्च र जोखिम समेत आपूर्तिकर्ताकै हुन्छ। DAP मा अनलोडिङको जिम्मेवारी खरिदकर्ताको हुन्छ।',
    legalRef: 'Incoterms 2020 DPU vs DAP Rules',
  },
  {
    id: 'q-a5',
    level: 'advanced',
    question: 'सार्वजनिक खरिद पुनरावलोकन समिति (PPRC) मा पुनरावलोकन निवेदन दर्ता गर्दा निवेदक बोलपत्रदाताले कबोल रकमको कति धरौटी जम्मा गर्नुपर्छ?',
    options: [
      'कबोल रकमको १ प्रतिशत',
      'कबोल रकमको ०.१५ प्रतिशत (बढीमा रु ५ लाख)',
      'लागत अनुमानको २ प्रतिशत',
      'एकमुष्ट रु ५०,००० मात्र',
    ],
    correctIndex: 1,
    explanation: 'सार्वजनिक खरिद ऐन, २०६३ को दफा ४९ तथा नियमावली अनुसार पुनरावलोकन समितिमा निवेदन दिँदा कबोल अङ्कको ०.१५ प्रतिशत (बढीमा रु ५ लाख) नगद धरौटी जम्मा गर्नुपर्छ।',
    legalRef: 'ऐन दफा ४९(३)',
  },
];

// --------------------------------------------------------------------------
// 8. ICB GLOSSARY AND FAQS
// --------------------------------------------------------------------------
export const ICB_GLOSSARY_TERMS = [
  { term: 'ICB', nepali: 'अन्तर्राष्ट्रिय खुला बोलपत्र (International Competitive Bidding)', definition: 'विदेशी तथा स्वदेशी बोलपत्रदाताहरू बीच खुला प्रतिस्पर्धा गराई ठूला मालसामान वा पूर्वाधार खरिद गर्ने विधि।' },
  { term: 'Incoterms 2020', nepali: 'अन्तर्राष्ट्रिय वाणिज्य सर्तहरू (International Commercial Terms)', definition: 'ICC द्वारा जारी गरिएको क्रेता र विक्रेता बीच ढुवानी, जोखिम, बीमा र भन्सार लागत बाँडफाँड गर्ने ११ वटा विश्वव्यापी नियमहरू।' },
  { term: 'CIP', nepali: 'ढुवानी तथा बीमा भुक्तानी सहित गन्तव्यसम्म (Carriage and Insurance Paid to)', definition: 'आपूर्तिकर्ताले नेपालको तोकिएको कार्यस्थलसम्मको ढुवानी र ११०% All Risks बीमा व्यहोर्ने बहु-मोडल Incoterm।' },
  { term: 'CIF', nepali: 'लागत, बीमा र ढुवानी (Cost, Insurance and Freight)', definition: 'समुद्री ढुवानीमा तोकिएको बन्दरगाह (e.g. Kolkata Port) सम्म भाडा र समुद्री बीमा आपूर्तिकर्ताले व्यहोर्ने नियम।' },
  { term: 'Letter of Credit (L/C)', nepali: 'प्रतीतपत्र', definition: 'अन्तर्राष्ट्रिय खरिदमा बैंक मार्फत सम्झौताका कागजात प्रमाणित भएपछि मात्र भुक्तानी ग्यारेन्टी गरिने वित्तीय उपकरण।' },
  { term: 'Local Agent', nepali: 'स्थानीय एजेन्ट (नेपालस्थित अधिकृत प्रतिनिधि)', definition: 'विदेशी बोलपत्रदाताको तर्फबाट नेपालमा समन्वय गर्न नियुक्त गरिएको र प्यान दर्ता भएको अधिकृत व्यक्ति वा फर्म।' },
  { term: 'Power of Attorney (PoA)', nepali: 'अख्तियारनामा / वारिसनामा', definition: 'कम्पनीको सञ्चालक समितिबाट बोलपत्रमा हस्ताक्षर गर्न र सम्झौता गर्न आधिकारिक प्रतिनिधिलाई दिइएको कानूनी अधिकारपत्र।' },
  { term: 'Manufacturer Authorization Form (MAF)', nepali: 'उत्पादकको अधिकार पत्र', definition: 'उत्पादक कम्पनीले आफ्ना उत्पादनको आपूर्ति, ग्यारेन्टी र वारेन्टीका लागि बोलपत्रदातालाई दिएको औपचारिक पत्र।' },
  { term: 'Standstill Period', nepali: 'प्रतीक्षा अवधि (LOI अवधि)', definition: 'बोलपत्र स्वीकृतिको आशय सूचना प्रकाशित भएपछि उजुरी गर्न दिइने अनिवार्य ७ दिनको कानुनी प्रतीक्षा समय।' },
  { term: 'Counter-Guarantee', nepali: 'काउन्टर ग्यारेन्टी', definition: 'विदेशी बैंकले जारी गरेको बैंक ग्यारेन्टीको आधारमा नेपालको "A" वर्गको वाणिज्य बैंकले जारी गर्ने स्थानीय जमानत।' },
  { term: 'FAT / PSI', nepali: 'कारखाना परीक्षण (FAT) र ढुवानीपूर्व निरीक्षण (PSI)', definition: 'सामान विदेशबाट लोड हुनु अगावै उत्पादकको कारखानामा प्राविधिक टोलीले गर्ने गुणस्तर परीक्षण र जाँच।' },
  { term: 'Substantial Responsiveness', nepali: 'सारभूत प्रभावकारिता', definition: 'बोलपत्र कागजातका अनिवार्य सर्त, योग्यता र स्पेसिफिकेसनमा कुनै गम्भीर विचलन नरहेको अवस्था।' },
];

export const ICB_FAQS = [
  {
    q: 'नेपालमा मालसामान खरिद गर्दा कुन अवस्थामा ICB (अन्तर्राष्ट्रिय बोलपत्र) आह्वान गर्नुपर्छ?',
    a: 'सार्वजनिक खरिद ऐनको दफा १५ अनुसार: (क) नेपालभित्र प्रतिस्पर्धात्मक रूपमा वस्तु उपलब्ध नहुने भएमा, (ख) विदेशी मुद्रामा भुक्तानी गर्नुपर्ने भएमा, (ग) उच्च प्राविधिक क्षमता चाहिने भएमा, वा (घ) वैदेशिक सहायता सम्झौतामा ICB गर्नुपर्ने उल्लेख भएमा अन्तर्राष्ट्रिय बोलपत्र आह्वान गर्नुपर्छ।',
  },
  {
    q: 'ICB को सूचना कुन-कुन माध्यममा प्रकाशन गर्नुपर्छ र म्याद कति दिन हुन्छ?',
    a: 'कम्तीमा एउटा राष्ट्रिय स्तरको अंग्रेजी दैनिक पत्रिका (जस्तै The Rising Nepal) र PPMO को e-GP पोर्टलमा कम्तीमा ३० दिनको म्याद दिई सूचना प्रकाशन गर्नुपर्छ। पुनः आह्वान भए कम्तीमा १५ दिनको म्याद दिनुपर्छ।',
  },
  {
    q: 'विदेशी कम्पनीले नेपालको बैंक ग्यारेन्टी कसरी पेश गर्नुपर्छ?',
    a: 'विदेशी बोलपत्रदाताले विदेशको प्रतिष्ठित बैंकबाट SWIFT मार्फत नेपालको "A" वर्गको वाणिज्य बैंकमा काउन्टर ग्यारेन्टी पठाउनुपर्छ र नेपालको वाणिज्य बैंकले सोही आधारमा स्थानीय Bid Security वा Performance Security जारी गर्नुपर्छ।',
  },
  {
    q: 'स्थानीय एजेन्टलाई कमिसन कसरी भुक्तानी गरिन्छ?',
    a: 'स्थानीय एजेन्टलाई कमिसन विदेशी मुद्रामा दिन पाइँदैन। नेपाल सरकारको प्रचलित कानून अनुसार लाग्ने अग्रिम कर कट्टी (TDS) गरी नेपाली मुद्रा (NPR) मा मात्र भुक्तानी गरिन्छ।',
  },
  {
    q: 'Incoterms 2020 मा CIF भन्दा CIP किन नेपालको लागि उपयुक्त मानिन्छ?',
    a: 'CIF केवल समुद्री ढुवानीका लागि मात्र हो, जसले कोलकाता बन्दरगाहसम्म मात्र समेट्छ। नेपाल भूपरिवेष्ठित देश भएकोले कोलकाताबाट काठमाडौंसम्मको रेल/सडक ढुवानी र ११०% All Risks बीमा समेट्न बहु-मोडल नियम "CIP Project Site" सबैभन्दा उपयुक्त हुन्छ।',
  },
];
