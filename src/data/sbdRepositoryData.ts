export interface SbdDocumentItem {
  id: string;
  category: 'works' | 'goods' | 'services' | 'special';
  categoryNepali: string;
  titleNepali: string;
  titleEnglish: string;
  fileName: string;
  fileUrl: string;
  fileType: 'doc' | 'docx' | 'pdf';
  fileSizeText: string;
  thresholdNepali: string;
  biddingMethod: string;
  sbdRevision: string;
  bdsHighlights: {
    label: string;
    description: string;
  }[];
  criticalBidderAdvice: string;
}

export const SBD_DOCUMENTS_LIST: SbdDocumentItem[] = [
  // Works SBDs
  {
    id: 'sbd-works-ncb-1s1e-2cr',
    category: 'works',
    categoryNepali: 'निर्माण कार्य (Works)',
    titleNepali: 'SBD Works (NCB) 1S1E (रु २ करोडसम्म योग्यता नचाहिने)',
    titleEnglish: 'SBD Works (NCB) 1S1E with Qualification Required upto 2 crore',
    fileName: 'SBD Works (NCB) 1S1E with Qualification Required upto 2 crore_0g5cy0w.doc',
    fileUrl: '/for_bidders/works/SBD Works (NCB) 1S1E with Qualification Required upto 2 crore_0g5cy0w.doc',
    fileType: 'doc',
    fileSizeText: '1.79 MB',
    thresholdNepali: 'रु २ करोडसम्म (१ खाम खुला बोलपत्र)',
    biddingMethod: 'राष्ट्रिय खुला बोलपत्र (१ खाम - 1S1E)',
    sbdRevision: 'PPMO Revision (भाद्र २०८१ अद्यावधिक)',
    bdsHighlights: [
      { label: 'बोलपत्र मान्य अवधि (Bid Validity)', description: '९० दिन (जमानत कम्तीमा १२० दिन मान्य हुनुपर्ने)' },
      { label: 'बोलपत्र जमानत (Bid Security)', description: 'लागत अनुमानको २% देखि ३% सम्म (वाणिज्य बैंकको ग्यारेन्टी)' },
      { label: 'योग्यताका शर्तहरू', description: 'रु २ करोडसम्मका अधिकांश काममा AACT र समान कामको अनुभव नतोकिने' },
      { label: '५ ठेक्काको सीमा', description: 'नियम ६५(४घ) बमोजिम ५ भन्दा बढी चालू सम्झौता नरहेको स्वघोषणा अनिवार्य' },
    ],
    criticalBidderAdvice: 'यसमा प्राविधिक र आर्थिक प्रस्ताव एउटै खाममा पेश हुन्छ। BOQ का कुनै पनि आइटम खाली नछोडी दर अंक र अक्षर दुवैमा भर्नुहोस्।',
  },
  {
    id: 'sbd-works-ncb-1s2e-qual',
    category: 'works',
    categoryNepali: 'निर्माण कार्य (Works)',
    titleNepali: 'SBD Works (NCB) 1S2E (योग्यता चाहिने दुई खाम बोलपत्र)',
    titleEnglish: 'SBD Works, NCB 1S2E September Revision',
    fileName: 'SBD Works,NCB 1S2E_September_tntlxrd.doc',
    fileUrl: '/for_bidders/works/SBD Works,NCB 1S2E_September_tntlxrd.doc',
    fileType: 'doc',
    fileSizeText: '1.57 MB',
    thresholdNepali: 'रु ५ करोडदेखि माथिका निर्माण कार्यहरू',
    biddingMethod: 'राष्ट्रिय खुला बोलपत्र (२ खाम - 1S2E)',
    sbdRevision: 'PPMO Revision (September 2026)',
    bdsHighlights: [
      { label: 'प्राविधिक र आर्थिक खाम', description: 'Envelope 1 (Technical) र Envelope 2 (Price Bid) अलग-अलग अपलोड गर्नुपर्ने' },
      { label: 'AACT कारोबार आवश्यकता', description: 'Section III अनुसार विगत १० वर्षमध्ये उत्कृष्ट ३ वर्षको औसत कारोबार रकम' },
      { label: 'समान प्रकृतिको काम (Similar Work)', description: 'लागत अनुमानको न्यूनतम ८०% बराबरको १ वा २ वटा सम्पन्न ठेक्का अनुभव' },
      { label: 'बिड क्षमता (Bid Capacity)', description: '(A * N * 3) - B सूत्र अनुसार बिड क्षमता लागत अनुमानभन्दा बढी हुनुपर्ने' },
    ],
    criticalBidderAdvice: 'प्राविधिक प्रस्तावमा कुनै पनि मूल्य (Price) को अंश उल्लेख नगर्नुहोस्। प्राविधिक खाममा मूल्य परेमा बोलपत्र सिधै बदर हुन्छ।',
  },
  {
    id: 'sbd-works-dnb-1s2e',
    category: 'works',
    categoryNepali: 'निर्माण कार्य (Works)',
    titleNepali: 'SBD Works Design & Build (DnB) 1S2E',
    titleEnglish: 'SBD Works (DnB) 1S2E September Revision',
    fileName: 'SBD Works (DnB) 1S2E_September_qgilp89.doc',
    fileUrl: '/for_bidders/works/SBD Works (DnB) 1S2E_September_qgilp89.doc',
    fileType: 'doc',
    fileSizeText: '2.23 MB',
    thresholdNepali: 'डिजाइन तथा निर्माण (Design & Build) ठेक्काहरू',
    biddingMethod: 'Design & Build 1S2E (विस्तृत परियोजना कार्य)',
    sbdRevision: 'PPMO Revision 2026',
    bdsHighlights: [
      { label: 'डिजाइन जिम्मेवारी', description: 'विस्तृत इन्जिनियरिङ डिजाइन र निर्माण दुवै ठेकेदारकै जिम्मेवारीमा रहने' },
      { label: 'डिजाइन परामर्शदाता', description: 'योग्य इन्जिनियरिङ कन्सल्ट्यान्टसँग सम्झौता वा इन-हाउस डिजाइनरको अनुभव अनिवार्य' },
      { label: 'म्याद र माइलस्टोन', description: 'डिजाइन स्वीकृति पश्चात मात्र भौतिक निर्माण सुरु हुने चरणबद्ध माइलस्टोन' },
    ],
    criticalBidderAdvice: 'डिजाइन तथा ड्रइङका अवधारणात्मक प्रस्ताव (Conceptual Drawings) र स्पेसिफिकेसन प्रस्तावमा विशेष ध्यान दिनुपर्छ।',
  },
  {
    id: 'sbd-works-icb-1s2e',
    category: 'works',
    categoryNepali: 'निर्माण कार्य (Works)',
    titleNepali: 'SBD Works ICB 1S2E (अन्तर्राष्ट्रिय खुला बोलपत्र)',
    titleEnglish: 'SBD Works ICB 1S2E September Revision',
    fileName: 'SBD Works ICB 1S2E SBD 18 September 2026_unxhjvo.docx',
    fileUrl: '/for_bidders/works/SBD Works ICB 1S2E SBD 18 September 2026_unxhjvo.docx',
    fileType: 'docx',
    fileSizeText: '367 KB',
    thresholdNepali: 'रु ५ अर्बभन्दा माथि वा दातृ निकायको खरिद',
    biddingMethod: 'अन्तर्राष्ट्रिय खुला बोलपत्र (ICB Works 1S2E)',
    sbdRevision: 'PPMO ICB Standard (September 2026)',
    bdsHighlights: [
      { label: 'घरेलु प्राथमिकता (Margin of Preference)', description: 'स्वदेशी निर्माण व्यवसायी वा स्वदेशी ५०%+ जे.भी.लाई सामान्यतया ५% सम्म प्राथमिकता' },
      { label: 'मुद्रा तथा भुक्तानी', description: 'विदेशी मुद्रा र नेपाली रुपैयाँमा संयुक्त भुक्तानी व्यवस्था' },
      { label: 'विवाद समाधान', description: 'FIDIC ढाँचामा आधारित Dispute Board (DB) वा मध्यस्थता (Arbitration)' },
    ],
    criticalBidderAdvice: 'अन्तर्राष्ट्रिय बैंक ग्यारेन्टी भएमा नेपालको वाणिज्य बैंकबाट प्रति-जमानत (Counter Guarantee) अनिवार्य चाहिन्छ।',
  },
  {
    id: 'sbd-works-epc-icb',
    category: 'works',
    categoryNepali: 'निर्माण कार्य (Works)',
    titleNepali: 'EPC ICB SBD (इन्जिनियरिङ, खरिद र निर्माण ठेक्का)',
    titleEnglish: 'EPC ICB - SBD Revision Final 2026',
    fileName: 'EPC ICB- SBD-Revision Final 2026 Upload_7bhlzis.doc',
    fileUrl: '/for_bidders/works/EPC ICB- SBD-Revision Final 2026 Upload_7bhlzis.doc',
    fileType: 'doc',
    fileSizeText: '1.38 MB',
    thresholdNepali: 'विद्युत, सुरुङ, विमानस्थल, औद्योगिक बृहत् पूर्वाधार',
    biddingMethod: 'EPC / Turnkey Contract Method',
    sbdRevision: 'PPMO EPC Standard Revision',
    bdsHighlights: [
      { label: 'एकमुष्ट ठेक्का (Lump Sum EPC)', description: 'सम्पन्न भई हस्तान्तरण नभएसम्म सम्पूर्ण जोखिम र दायित्व ठेकेदारको' },
      { label: 'कार्यसम्पादन ग्यारेन्टी', description: '१०% कार्यसम्पादन जमानत र दीर्घकालीन गुणस्तर ग्यारेन्टी' },
    ],
    criticalBidderAdvice: 'EPC ठेक्कामा सामान्यतया भेरिएसन दाबी गर्न कठिन हुने भएकाले जोखिम मूल्यांकन गरी दररेट निर्धारण गर्नुपर्छ।',
  },
  {
    id: 'sbd-works-sq',
    category: 'works',
    categoryNepali: 'निर्माण कार्य (Works)',
    titleNepali: 'SQ Works (सिलबन्दी दरभाउपत्र निर्माण कार्य)',
    titleEnglish: 'Sealed Quotation (SQ) Works September Revision',
    fileName: 'SQ Works September_ceb1rfy.docx',
    fileUrl: '/for_bidders/works/SQ Works September_ceb1rfy.docx',
    fileType: 'docx',
    fileSizeText: '161 KB',
    thresholdNepali: 'रु २० लाखसम्मको सानो निर्माण कार्य',
    biddingMethod: 'सिलबन्दी दरभाउपत्र (Sealed Quotation)',
    sbdRevision: 'PPMO SQ Standard 2026',
    bdsHighlights: [
      { label: 'पेश गर्ने म्याद', description: 'कम्तीमा १५ दिनको सूचना म्याद' },
      { label: 'मान्य अवधि', description: '४५ दिनको मान्य अवधि (जमानत ७५ दिन मान्य हुनुपर्ने)' },
      { label: 'धरौटी रकम', description: 'लागत अनुमानको २% देखि ३% सम्म' },
    ],
    criticalBidderAdvice: 'दरभाउपत्रमा AACT र बिड क्यापासिटी चाहिँदैन तर कर चुक्ता र फर्म दर्ता नवीकरण अनिवार्य चाहिन्छ।',
  },
  {
    id: 'sbd-works-prequalification',
    category: 'works',
    categoryNepali: 'निर्माण कार्य (Works)',
    titleNepali: 'Prequalification of Bidders (पूर्व-योग्यता कागजात)',
    titleEnglish: 'Prequalification of Bidders Standard Document',
    fileName: 'Prequalification of Bidders.docx',
    fileUrl: '/for_bidders/works/Prequalification of Bidders.docx',
    fileType: 'docx',
    fileSizeText: '130 KB',
    thresholdNepali: 'जटिल तथा ठूला पूर्वाधार निर्माण कार्यहरू',
    biddingMethod: 'पूर्वयोग्यता निर्धारण (Prequalification - PPA Sec 12)',
    sbdRevision: 'PPMO PQ Guidelines',
    bdsHighlights: [
      { label: 'पास/फेल मापदण्ड', description: 'प्राविधिक, वित्तीय र अनुभवगत मापदण्डमा पास हुनेहरू मात्र बोलपत्रमा आमन्त्रित हुने' },
      { label: 'मूल्यांकन', description: 'पूर्वयोग्यतामा आर्थिक प्रस्ताव (BOQ) पेश हुँदैन, केवल योग्यता मात्र जाँचिन्छ' },
    ],
    criticalBidderAdvice: 'समान प्रकृतिका कार्यहरूको सम्झौता पत्र र कार्यसम्पन्न प्रमाणपत्र स्पष्ट प्रतिलिपि संलग्न गर्नुहोस्।',
  },

  // Goods SBDs
  {
    id: 'sbd-goods-ncb-1s1e',
    category: 'goods',
    categoryNepali: 'मालसामान आपूर्ति (Goods)',
    titleNepali: 'SBD Goods NCB 1S1E (बिना योग्यता मालसामान खरिद)',
    titleEnglish: 'SBD Goods NCB-1S1E (Without Qualification)',
    fileName: 'SBD-GOODS NCB-1S1E (Without Qualification) Sept_q7vllou.doc',
    fileUrl: '/for_bidders/goods/SBD-GOODS NCB-1S1E (Without Qualification) Sept_q7vllou.doc',
    fileType: 'doc',
    fileSizeText: '799 KB',
    thresholdNepali: 'साधारण मालसामान खुला बोलपत्र',
    biddingMethod: 'राष्ट्रिय खुला बोलपत्र (१ खाम - Goods)',
    sbdRevision: 'PPMO Revision (September)',
    bdsHighlights: [
      { label: 'स्पेसिफिकेसन अनुपालन', description: 'कार्यालयले माग गरेको प्राविधिक स्पेसिफिकेसन तालिका हुबहु रुजु गरी भर्नुपर्ने' },
      { label: 'उत्पादकको अधिकार पत्र', description: 'Manufacturer Authorization Form (यदि BDS मा माग गरिएको भए)' },
      { label: 'डेलिभरी अवधि', description: 'सम्झौता भएको मितिले सामान कार्यालयमा दाखिला गर्ने समयसीमा' },
    ],
    criticalBidderAdvice: 'प्राविधिक स्पेसिफिकेसनमा केवल "Comply" मात्र नलेखी आफ्नो सामानको ब्रान्ड, मोडल र प्राविधिक विवरण खुलाउनुहोस्।',
  },
  {
    id: 'sbd-goods-ncb-1s2e',
    category: 'goods',
    categoryNepali: 'मालसामान आपूर्ति (Goods)',
    titleNepali: 'SBD Goods NCB 1S2E (योग्यता सहितको मालसामान खरिद)',
    titleEnglish: 'SBD Goods NCB 1S2E (With Qualification)',
    fileName: 'SBD-GOODS NCB 1S2E (With Qualification) Sept_blzfvvs (1).doc',
    fileUrl: '/for_bidders/goods/SBD-GOODS NCB 1S2E (With Qualification) Sept_blzfvvs (1).doc',
    fileType: 'doc',
    fileSizeText: '1.10 MB',
    thresholdNepali: 'विशिष्ट उपकरण, सवारी साधन, जटिल यन्त्र आपूर्ति',
    biddingMethod: 'दुई खाम मालसामान बोलपत्र (1S2E Goods)',
    sbdRevision: 'PPMO Revision September',
    bdsHighlights: [
      { label: 'वार्षिक आपूर्ति कारोबार', description: 'विगत ३ वर्षको मालसामान आपूर्तिको औसत वार्षिक कारोबार रकम' },
      { label: 'आपूर्ति अनुभव', description: 'समान प्रकृतिका उपकरण वा मालसामान आपूर्तिको प्रमाणित अनुभव' },
      { label: 'वारेन्टी तथा बिक्रीपछिको सेवा', description: 'कम्तीमा १ देखि ३ वर्षको वारेन्टी र नेपालमै सर्भिस सेन्टरको सुविधा' },
    ],
    criticalBidderAdvice: 'प्राविधिक खाममा आधिकारिक क्याटलग, ब्रोसर र ISO/गुणस्तर प्रमाणपत्रहरू अनिवार्य समावेश गर्नुहोस्।',
  },
  {
    id: 'sbd-goods-sq',
    category: 'goods',
    categoryNepali: 'मालसामान आपूर्ति (Goods)',
    titleNepali: 'SQ Goods (सिलबन्दी दरभाउपत्र मालसामान आपूर्ति)',
    titleEnglish: 'Sealed Quotation (SQ) Goods September',
    fileName: 'SQ Goods September_p5ic7gc.docx',
    fileUrl: '/for_bidders/goods/SQ Goods September_p5ic7gc.docx',
    fileType: 'docx',
    fileSizeText: '126 KB',
    thresholdNepali: 'रु २० लाखसम्मको मालसामान खरिद',
    biddingMethod: 'सिलबन्दी दरभाउपत्र (SQ Goods)',
    sbdRevision: 'PPMO SQ Goods Standard',
    bdsHighlights: [
      { label: 'म्याद', description: '१५ दिनको सूचना, ४५ दिन मान्य अवधि' },
      { label: 'धरौटी', description: 'लागत अनुमानको २% देखि ३% सम्म (७५ दिन मान्य)' },
    ],
    criticalBidderAdvice: 'दरभाउपत्रमा सामानको मूल्य भ्याट बाहेक उल्लेख गरी १३% भ्याट नियमानुसार जोडेर जम्मा अङ्क खुलाउनुहोस्।',
  },
  {
    id: 'sbd-goods-catalogue-shopping',
    category: 'goods',
    categoryNepali: 'मालसामान आपूर्ति (Goods)',
    titleNepali: 'Catalogue Shopping Guideline (क्याटलग सपिङ निर्देशिका)',
    titleEnglish: 'Catalogue Shopping Guideline for Public Procurement',
    fileName: 'Catalogue shopping guideline (4)_y1nnub9 (1).doc',
    fileUrl: '/for_bidders/goods/Catalogue shopping guideline (4)_y1nnub9 (1).doc',
    fileType: 'doc',
    fileSizeText: '66 KB',
    thresholdNepali: 'सवारी साधन, हेभी उपकरण, औषधी उपकरण',
    biddingMethod: 'क्याटलग सपिङ खरिद विधि (PPA Sec 41(क))',
    sbdRevision: 'PPMO Directive Guideline',
    bdsHighlights: [
      { label: 'उत्पादक/अधिकृत विक्रेता', description: 'नेपालका लागि आधिकारिक विक्रेता वा उत्पादकले मात्र भाग लिन पाउने' },
      { label: 'क्याटलग दर्ता', description: 'उत्पादकले सार्वजनिक रूपमा प्रकाशित गरेको आधिकारिक क्याटलग र मूल्यसूची' },
    ],
    criticalBidderAdvice: 'आधिकारिक विक्रेताको लेटरहेड र क्याटलगमा उल्लेखित अधिकृत दररेट र छुट प्रतिशत प्रमाणित गरी पेश गर्नुपर्छ।',
  },

  // Services SBDs
  {
    id: 'sbd-services-eoi',
    category: 'services',
    categoryNepali: 'परामर्श सेवा (Services)',
    titleNepali: 'EOI Services (परामर्श सेवा आशयपत्र आह्वान)',
    titleEnglish: 'Expression of Interest (EOI) for Consulting Services',
    fileName: 'EOI services.doc',
    fileUrl: '/for_bidders/services/EOI services.doc',
    fileType: 'doc',
    fileSizeText: '188 KB',
    thresholdNepali: 'रु २० लाखभन्दा माथिको परामर्श सेवा',
    biddingMethod: 'आशयपत्र आह्वान (EOI - PPA Sec 30)',
    sbdRevision: 'PPMO Standard EOI Format',
    bdsHighlights: [
      { label: 'शर्टलिस्टिङ मापदण्ड', description: 'योग्यता (४०-५०%), अनुभव (४०-५०%), र वित्तीय क्षमता (१०%) का आधारमा ३ देखि ६ वटा फर्म छनौट' },
      { label: 'शुल्क नलाग्ने', description: 'EOI फारामको कुनै शुल्क लाग्दैन र धरौटी पनि चाहिँदैन' },
    ],
    criticalBidderAdvice: 'EOI मा प्रस्तावित मुख्य विज्ञहरूको संक्षिप्त बायोडाटा (CV) र फर्मले सम्पन्न गरेका अध्ययन प्रतिवेदनहरूको विवरण राख्नुपर्छ।',
  },
  {
    id: 'sbd-services-srfp-lumpsum',
    category: 'services',
    categoryNepali: 'परामर्श सेवा (Services)',
    titleNepali: 'SRFP Lump Sum Consultants (एकमुष्ट परामर्श सेवा RFP)',
    titleEnglish: 'Standard Request for Proposals - Lump Sum Consultants',
    fileName: 'SRFP Lump Sum Consultants_petfdyb.docx',
    fileUrl: '/for_bidders/services/SRFP Lump Sum Consultants_petfdyb.docx',
    fileType: 'docx',
    fileSizeText: '2.95 MB',
    thresholdNepali: 'विस्तृत डिपिआर, डिजाइन, सर्वेक्षण, सुपरिवेक्षण',
    biddingMethod: 'RFP (QCBS - Quality & Cost Based Selection)',
    sbdRevision: 'PPMO Revision Standard SRFP',
    bdsHighlights: [
      { label: 'प्राविधिक र आर्थिक भार', description: 'सामान्यतया प्राविधिक प्रस्ताव ८०% र आर्थिक प्रस्ताव २०% भार' },
      { label: 'प्राविधिक कटअफ', description: 'प्राविधिक प्रस्तावमा कम्तीमा ७०% वा ८०% अंक ल्याउनेको मात्र आर्थिक प्रस्ताव खोलिने' },
    ],
    criticalBidderAdvice: 'कार्यविधि (Methodology) र कार्यतालिका (Work Plan) आयोजना विशेष अनुकूल बनाएर मौलिक रूपमा पेश गर्नुहोस्।',
  },
  {
    id: 'sbd-services-srfp-timebased',
    category: 'services',
    categoryNepali: 'परामर्श सेवा (Services)',
    titleNepali: 'SRFP Time Based Consultants (समय-आधारित परामर्श सेवा)',
    titleEnglish: 'Standard Request for Proposals - Time-Based Consultants',
    fileName: 'SRFP_Time based_opbzrhz.docx',
    fileUrl: '/for_bidders/services/SRFP_Time based_opbzrhz.docx',
    fileType: 'docx',
    fileSizeText: '347 KB',
    thresholdNepali: 'निर्माण सुपरिवेक्षण, परियोजना अनुगमन, व्यवस्थापन',
    biddingMethod: 'RFP Time-Based (व्यक्तिगत वा फर्म परामर्शदाता)',
    sbdRevision: 'PPMO Standard SRFP Time-Based',
    bdsHighlights: [
      { label: 'महिनावारी पारिश्रमिक', description: 'विज्ञहरूको काम गरेको समय (महिना वा दिन) का आधारमा दररेट भुक्तानी' },
      { label: 'आउट-अफ-पकेट खर्च', description: 'यातायात, आवास, ल्याब टेस्ट आदि बिल अनुसार शोधभर्ना हुने' },
    ],
    criticalBidderAdvice: 'विज्ञहरूको पारिश्रमिक (Remuneration) र सोधभर्ना हुने खर्च (Reimbursable expenses) अलग-अलग फाराममा भर्नुपर्छ।',
  },

  // Special SBDs
  {
    id: 'sbd-special-ration',
    category: 'special',
    categoryNepali: 'विशेष खरिद (Special)',
    titleNepali: 'राशन खरिद नमूना बोलपत्र कागजात (Procurement of Ration)',
    titleEnglish: 'Standard Bidding Document for Procurement of Ration',
    fileName: 'procurement of ration.pdf',
    fileUrl: '/for_bidders/procurement of ration.pdf',
    fileType: 'pdf',
    fileSizeText: '406 KB',
    thresholdNepali: 'नेपाली सेना, नेपाल प्रहरी, सशस्त्र प्रहरी, कारागार',
    biddingMethod: 'विशेष राशन खरिद (Ration Procurement SBD)',
    sbdRevision: 'PPMO Official Approved Standard',
    bdsHighlights: [
      { label: 'गुणस्तर प्रमाणीकरण', description: 'खाद्य प्रविधि तथा गुण नियन्त्रण विभागको मापदण्ड अनुसार गुणस्तर परीक्षण' },
      { label: 'मासिक आपूर्ति चक्र', description: 'मौसम अनुसार खाद्य वस्तुको मूल्य र आपूर्ति चक्र' },
    ],
    criticalBidderAdvice: 'खाद्य सामग्रीको गुणस्तर नमूना (Sample Testing) र समयमै ढुवानी गर्ने प्रतिबद्धता पत्र अनिवार्य पेश गर्नुहोस्।',
  },
];

export interface BidderPrecedentCase {
  id: string;
  caseNo: string;
  title: string;
  applicant: string;
  respondent: string;
  subject: string;
  keyLegalIssue: string;
  pprcVerdict: 'favour-bidder' | 'favour-entity';
  decisionSummary: string;
  lessonForBidders: string;
}

export const BIDDER_PRECEDENT_CASES: BidderPrecedentCase[] = [
  {
    id: 'case-bank-guarantee-validity',
    caseNo: 'PPRC निर्णय नं. २०७८/७९-१०',
    title: 'बोलपत्र जमानत (बैंक ग्यारेन्टी) को म्याद तोकिएको भन्दा १ दिन कम भएको विवाद',
    applicant: 'कन्स्ट्रक्सन एण्ड इन्जिनियरिङ प्रा.लि.',
    respondent: 'सडक डिभिजन कार्यालय, बुटवल',
    subject: 'सार्वजनिक खरिद ऐन दफा २१ र नियमावली नियम ५३',
    keyLegalIssue: 'के बैंक ग्यारेन्टीको म्याद तोकिएको १२० दिन भन्दा १ दिन कम भएमा त्यसलाई सामान्य त्रुटि (Minor deviation) मानी सच्याउन दिन सकिन्छ?',
    pprcVerdict: 'favour-entity',
    decisionSummary: 'पुनरावलोकन समितिले बोलपत्र जमानतको म्याद र रकम खरिद ऐनको दफा २१ अनुसार "सारभूत शर्त" (Substantive requirement) भएको ठहर गर्दै १ दिन मात्र कम भए पनि बोलपत्र गैर-जिम्मेवार (Non-responsive) ठहर गरी कार्यालयको निर्णय सदर गर्‍यो।',
    lessonForBidders: 'बैंक ग्यारेन्टी बनाउँदा मिति गणना गर्न क्यालेन्डर क्याल्कुलेटर प्रयोग गर्नुहोस् र तोकिएको भन्दा २-३ दिन बढी नै म्याद राखेर ग्यारेन्टी जारी गराउनुहोस्।',
  },
  {
    id: 'case-jv-power-of-attorney',
    caseNo: 'PPRC निर्णय नं. २०७९/८०-०४',
    title: 'संयुक्त उपक्रम (JV) मा अख्तियारी पत्र (Power of Attorney) र साझेदारको शेयर',
    applicant: 'सूर्य - चन्द्र जे.भी., पोखरा',
    respondent: 'खानेपानी तथा ढल व्यवस्थापन डिभिजन',
    subject: 'खरिद नियमावली नियम ३१ख र SBD ITB Clause 4.1',
    keyLegalIssue: 'जे.भी. सम्झौता पेश भए पनि साझेदार कम्पनीका तर्फबाट Lead Partner का प्रतिनिधिलाई अख्तियारी दिइएको छुट्टै Power of Attorney पेश नहुँदा बोलपत्र बदर हुने वा नहुने?',
    pprcVerdict: 'favour-entity',
    decisionSummary: 'साझेदार कम्पनीहरूले आधिकारिक बोर्ड निर्णय र अधिकार प्रत्यायोजन पत्र नदिएसम्म जे.भी. सम्झौता मात्रले कानूनी रूपमा संयुक्त तथा व्यक्तिगत दायित्व बहन गरेको मान्न नसकिने भएकोले बोलपत्र बदर भएको ठहर भयो।',
    lessonForBidders: 'जे.भी. गर्दा प्रत्येक साझेदारको बोर्ड निर्णयको प्रतिलिपि र आधिकारिक वारिसनामा (Power of Attorney) नोटरी प्रमाणित गरी अनिवार्य पेश गर्नुहोस्।',
  },
  {
    id: 'case-boq-blank-rate',
    caseNo: 'PPRC निर्णय नं. २०८०/८१-१२',
    title: 'BOQ को एउटा आइटममा दररेट खाली छोडिएको वा शून्य राखिएको विषय',
    applicant: 'बज्रगुरु सप्लायर्स प्रा.लि.',
    respondent: 'स्वास्थ्य सेवा विभाग',
    subject: 'सार्वजनिक खरिद ऐन दफा २५ र नियमावली नियम ६३',
    keyLegalIssue: 'BOQ को ५० वटा आइटममध्ये एउटा साना आइटममा दररेट नलेखी खाली छोडिएकोमा समग्र बोलपत्र अस्वीकृत गर्न मिल्छ वा अन्य दररेटमा समावेश भएको मान्न मिल्छ?',
    pprcVerdict: 'favour-bidder',
    decisionSummary: 'SBD को ITB Clause अनुसार यदि बोलपत्र कागजातमा "दररेट नभरिएको आइटमको मूल्य अन्य दररेटमा समावेश भएको मानिनेछ" भन्ने स्पष्ट प्रावधान रहेको र सो आइटम समग्र लागत अनुमानको ०.१% भन्दा कम रहेको पाइएमा त्यसलाई सामान्य प्रक्रियागत त्रुटि मानी बोलपत्रलाई मूल्याङ्कनमा समावेश गर्न समितिले आदेश दियो।',
    lessonForBidders: 'सकेसम्म कुनै पनि आइटम खाली नछोड्नुहोस्। यदि कुनै आइटमको लागत अन्य काममै पर्छ भने पनि "Included" वा यकिन दर नै उल्लेख गर्नुहोस्।',
  },
  {
    id: 'case-5-contracts-declaration',
    caseNo: 'PPRC निर्णय नं. २०८०/८१-१४',
    title: '१६औँ संशोधन अनुसार ५ वटा चालू ठेक्काको स्वघोषणा र झुट्टा विवरणको परिणाम',
    applicant: 'हिमशिखर निर्माण सेवा',
    respondent: 'सिँचाइ व्यवस्थापन डिभिजन, दाङ',
    subject: 'खरिद नियमावली नियम ६५(४घ) र नियम १४१',
    keyLegalIssue: 'बोलपत्रदाताले आफूसँग ४ वटा मात्र चालू ठेक्का रहेको स्वघोषणा गरेकोमा मूल्याङ्कनका क्रममा अर्को सार्वजनिक निकायमा ५औँ ठेक्का सम्झौता भइसकेको भेटिएपछि बोलपत्र रद्द र धरौटी जफत हुने वा नहुने?',
    pprcVerdict: 'favour-entity',
    decisionSummary: 'बोलपत्र पेश गर्दा ५ भन्दा बढी सम्झौता रहेको तथ्य लुकाई पेश गरिएको स्वघोषणा झुट्टा ठहर भएकोले बोलपत्र रद्द गरी बोलपत्र जमानत (Bid Bond) जफत गर्ने र कालोसूचीका लागि PPMO मा लेखी पठाउने निर्णय सदर भयो।',
    lessonForBidders: 'नेपालभरका कुनै पनि सरकारी निकायमा रु ५ करोडभन्दा माथिका चालू सम्झौताहरूको यथार्थ विवरण राख्नुहोस्, कुनै पनि सम्झौता नलुकाउनुहोस्।',
  },
  {
    id: 'case-line-of-credit-fin5',
    caseNo: 'PPRC निर्णय नं. २०७९/८०-११',
    title: 'ऋण सुविधा प्रतिबद्धता (Line of Credit Form FIN-5) मा बैंकले थपेको सर्त',
    applicant: 'कन्चनजङ्घा बिल्डर्स प्रा.लि.',
    respondent: 'शहरी विकास तथा भवन निर्माण विभाग',
    subject: 'SBD Section IV Form FIN-5 र ITB Clause 32',
    keyLegalIssue: 'वाणिज्य बैंकले जारी गरेको लाइन अफ क्रेडिट पत्रमा "बैंकको आन्तरिक कर्जा नीति तथा धितो मूल्याङ्कनको अधीनमा रही मात्र ऋण उपलब्ध गराइनेछ" भनी थपेको सर्तले गर्दा बोलपत्र अयोग्य हुन्छ वा हुँदैन?',
    pprcVerdict: 'favour-entity',
    decisionSummary: 'PPMO को Form FIN-5 एक बिना सर्त (Unconditional commitment) हुनुपर्ने कानूनी प्रावधान भएकोले बैंकले अतिरिक्त सर्त थप गरी जारी गरेको पत्रलाई सारभूत त्रुटि मानी मूल्याङ्कन समितिले गरेको अस्वीकृति कानूनसम्मत ठहर भयो।',
    lessonForBidders: 'बैंकलाई FIN-5 पत्र बनाउन लगाउँदा PPMO को तोकिएको शब्द र ढाँचामा कुनै पनि थप सर्त वा सीमितता (Conditionality) नराख्न स्पष्ट अनुरोध गर्नुहोस्।',
  },
];
